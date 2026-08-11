import { expect, test } from '@playwright/test';

test.describe('estilos', () => {
  // Regressão real: ao remover o Vite, o plugin que processava o Tailwind saiu
  // junto e nada assumiu o lugar. O build passava, o CSS era servido com 200,
  // mas continha apenas o CSS escrito à mão — nenhuma classe utilitária. O
  // site subiu sem estilo e nenhum teste percebeu.
  test('o CSS servido contém as classes do Tailwind que as páginas usam', async ({
    page,
    request,
  }) => {
    await page.goto('/pt/servicos');

    const href = await page
      .locator('link[rel="stylesheet"]')
      .first()
      .getAttribute('href');
    expect(href, 'nenhuma folha de estilo no HTML').toBeTruthy();

    const css = await (await request.get(href!)).text();

    // Utilitárias do Tailwind de fato usadas nas páginas. Se o pipeline do
    // Tailwind quebrar, elas somem do CSS mesmo com o build verde.
    for (const cls of ['bg-black', 'rounded-md', 'font-semibold', 'text-4xl']) {
      expect(css, `classe "${cls}" ausente do CSS servido`).toContain(cls);
    }
  });
});

test.describe('HTML servido ao crawler', () => {
  test('a home em pt tem conteúdo sem executar JavaScript', async ({
    request,
  }) => {
    const res = await request.get('/pt');
    expect(res.status()).toBe(200);
    const html = await res.text();
    // A regressão original: body vazio com apenas <div id="root">
    expect(html).toContain('Desenvolvedor Web');
    expect(html.length).toBeGreaterThan(5000);
  });

  test('a página de serviços tem h1, serviços e CTA', async ({ request }) => {
    const html = await (await request.get('/pt/servicos')).text();
    expect(html).toContain('Criação de Sites');
    expect(html).toContain('Sistemas web e APIs sob medida');
    expect(html).toContain('wa.me/5511985346164');
  });

  test('a home em inglês tem conteúdo', async ({ request }) => {
    const res = await request.get('/');
    expect(res.status()).toBe(200);
    const html = await res.text();
    expect(html).toContain('Software Engineer');
    expect(html.length).toBeGreaterThan(5000);
  });

  test('a página de serviços em inglês responde 200', async ({ request }) => {
    const res = await request.get('/services');
    expect(res.status()).toBe(200);
  });

  // A experiência profissional vem dos currículos do usuário nos dois idiomas.
  // Antes ela existia só em inglês, e /pt renderizava títulos em português com
  // o corpo em inglês — sinal de idioma misto, que enfraquece a página nas
  // buscas em português.
  test('cada locale renderiza a experiência no seu próprio idioma', async ({
    request,
  }) => {
    const pt = await (await request.get('/pt')).text();
    expect(pt).toContain('Reconstruí a plataforma edtech');
    expect(pt).not.toContain('Rebuilt BrasilTec');

    const en = await (await request.get('/')).text();
    expect(en).toContain('Rebuilt BrasilTec');
    expect(en).not.toContain('Reconstruí a plataforma');
  });
});

test.describe('sinais de SEO', () => {
  test('a página de serviços tem canonical e hreflang recíprocos', async ({
    page,
  }) => {
    await page.goto('/pt/servicos');

    const canonical = await page
      .locator('link[rel=canonical]')
      .getAttribute('href');
    expect(canonical).toBe('https://filipelab.com/pt/servicos');

    // NOTE: React renders the JSX prop `hrefLang` as the HTML attribute `hrefLang`.
    // HTML attribute names are case-insensitive, so Playwright's CSS attribute
    // selector `link[hreflang="..."]` matches it correctly via locators. Do NOT
    // assert against the raw HTML string with a lowercase regex — that would not
    // match and would produce a false sense of coverage.
    const hreflangLinks = page.locator('link[rel="alternate"][hreflang]');
    await expect(hreflangLinks).toHaveCount(3);

    const pt = await page
      .locator('link[hreflang="pt-BR"]')
      .getAttribute('href');
    const en = await page.locator('link[hreflang="en"]').getAttribute('href');
    const xDefault = await page
      .locator('link[hreflang="x-default"]')
      .getAttribute('href');
    expect(pt).toBe('https://filipelab.com/pt/servicos');
    expect(en).toBe('https://filipelab.com/services');
    expect(xDefault).toBe('https://filipelab.com/services');
  });

  test('title e description respeitam os limites de tamanho', async ({
    page,
  }) => {
    for (const path of ['/', '/pt', '/services', '/pt/servicos']) {
      await page.goto(path);
      const title = await page.title();
      expect(title.length, `title de ${path}`).toBeGreaterThanOrEqual(30);
      expect(title.length, `title de ${path}`).toBeLessThanOrEqual(65);

      const desc = await page
        .locator('meta[name=description]')
        .getAttribute('content');
      expect(desc, `description de ${path}`).not.toBeNull();
      expect(desc!.length, `description de ${path}`).toBeGreaterThanOrEqual(
        110
      );
      expect(desc!.length, `description de ${path}`).toBeLessThanOrEqual(165);
    }
  });

  test('existe exatamente um h1 por página, com texto não vazio e correto', async ({
    page,
  }) => {
    const expectedH1: Record<string, { exact?: string; contains?: string }> = {
      '/': { exact: 'Filipe Alves Cavalcante' },
      '/pt': { exact: 'Filipe Alves Cavalcante' },
      '/pt/servicos': { contains: 'Desenvolvedor Web para Criação de Sites' },
    };

    for (const path of Object.keys(expectedH1)) {
      await page.goto(path);
      const h1 = page.locator('h1');
      await expect(h1, `h1 de ${path}`).toHaveCount(1);

      const text = (await h1.textContent())?.trim() ?? '';
      expect(text.length, `h1 de ${path} não pode estar vazio`).toBeGreaterThan(
        0
      );

      const expectation = expectedH1[path];
      if (expectation.exact) {
        expect(text, `h1 de ${path}`).toBe(expectation.exact);
      } else if (expectation.contains) {
        expect(text, `h1 de ${path}`).toContain(expectation.contains);
      }
    }
  });

  test('o JSON-LD é válido e não declara LocalBusiness', async ({ page }) => {
    await page.goto('/pt/servicos');
    const blocks = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    expect(blocks.length).toBeGreaterThanOrEqual(2);

    const types = blocks.map((b) => JSON.parse(b)['@type']);
    expect(types).toContain('Person');
    expect(types).toContain('ProfessionalService');
    expect(types).not.toContain('LocalBusiness');

    const rawJson = blocks.join('\n');
    expect(rawJson).not.toContain('PostalAddress');
  });

  test('a página de serviços é alcançável a partir da home', async ({
    page,
  }) => {
    await page.goto('/pt');
    await expect(page.locator('a[href="/pt/servicos"]').first()).toBeAttached();
  });
});

test.describe('crawlabilidade', () => {
  test('URL inexistente retorna 404, não 200', async ({ request }) => {
    const res = await request.get('/pagina-que-nao-existe-123', {
      maxRedirects: 0,
    });
    expect(res.status()).toBe(404);
  });

  test('caminhos cruzados entre idiomas não existem', async ({ request }) => {
    const servicos = await request.get('/servicos', { maxRedirects: 0 });
    expect(servicos.status()).toBe(404);

    const ptServices = await request.get('/pt/services', { maxRedirects: 0 });
    expect(ptServices.status()).toBe(404);
  });

  test('/en redireciona para a raiz', async ({ request }) => {
    const res = await request.get('/en', { maxRedirects: 0 });
    // Next.js redirects use 308 (permanent, preserves method); 301 tolerated
    // for compatibility with other redirect implementations.
    expect([301, 308]).toContain(res.status());
  });

  test('/en/services e /en/servicos redirecionam', async ({ request }) => {
    const services = await request.get('/en/services', { maxRedirects: 0 });
    expect([301, 308]).toContain(services.status());

    const servicos = await request.get('/en/servicos', { maxRedirects: 0 });
    expect([301, 308]).toContain(servicos.status());
  });

  test('o sitemap lista exatamente as URLs esperadas e omite /404', async ({
    request,
  }) => {
    const xml = await (await request.get('/sitemap.xml')).text();
    expect(xml).toContain('https://filipelab.com/pt/servicos');
    expect(xml).toContain('https://filipelab.com/services');
    expect(xml).not.toContain('/404');

    // Toda URL listada precisa existir de fato. Uma contagem fixa envelhece a
    // cada página nova; esta asserção não, e pega o defeito que importa —
    // sitemap apontando o crawler para uma URL morta.
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    expect(urls.length).toBeGreaterThan(0);

    for (const url of urls) {
      const path = new URL(url).pathname;
      const res = await request.get(path, { maxRedirects: 0 });
      expect(res.status(), `sitemap aponta ${path}, que não responde 200`).toBe(
        200
      );
    }
  });

  test('o robots.txt aponta para o sitemap', async ({ request }) => {
    const txt = await (await request.get('/robots.txt')).text();
    expect(txt).toContain('Sitemap: https://filipelab.com/sitemap.xml');
  });
});
