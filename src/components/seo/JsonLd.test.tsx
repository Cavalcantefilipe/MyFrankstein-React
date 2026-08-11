import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { JsonLd } from './JsonLd';

describe('JsonLd', () => {
  it('escapa "<" para impedir que </script> feche a tag e injete markup', () => {
    const data = { malicious: '</script><script>alert(1)</script>' };
    const html = renderToStaticMarkup(<JsonLd data={data} />);

    // A sequência escapada é: backslash, u, 0, 0, 3, c (6 caracteres),
    // construída via fromCharCode para não depender de escapes de string.
    const backslash = String.fromCharCode(92);
    const escapedLessThan = `${backslash}u003c`;

    expect(html).not.toContain('</script><script>alert(1)</script>');
    expect(html).toContain(
      `${escapedLessThan}/script>${escapedLessThan}script>`
    );
  });

  it('serializa os dados como JSON válido dentro do script', () => {
    const data = { '@type': 'Person', name: 'Filipe' };
    const html = renderToStaticMarkup(<JsonLd data={data} />);
    const match = html.match(/>([^<]*)<\/script>/);
    expect(match).not.toBeNull();
    const parsed = JSON.parse(match![1]);
    expect(parsed).toEqual(data);
  });
});
