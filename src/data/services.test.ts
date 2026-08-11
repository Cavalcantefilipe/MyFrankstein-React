import { describe, expect, it } from 'vitest'
import { services } from './services'
import { experiences } from './experience'

describe('services data', () => {
  it('tem exatamente os 5 serviços acordados', () => {
    expect(services).toHaveLength(5)
    expect(services.map((s) => s.slug)).toEqual([
      'sites-institucionais',
      'sistemas-web',
      'landing-pages-seo',
      'automacao-ia',
      'integracoes',
    ])
  })

  it('todo serviço tem conteúdo nos dois idiomas', () => {
    for (const service of services) {
      for (const locale of ['en', 'pt'] as const) {
        expect(service.title[locale].length).toBeGreaterThan(0)
        expect(service.body[locale].length).toBeGreaterThan(0)
        expect(service.proof[locale].length).toBeGreaterThan(0)
      }
    }
  })

  it('cada prova cita apenas números que existem no histórico real', () => {
    const cv = JSON.stringify(experiences)
    const numbersIn = (text: string) => text.match(/\d[\d.,]*/g) ?? []

    for (const service of services) {
      for (const n of numbersIn(service.proof.pt)) {
        // Normaliza separadores para comparar com o CV (4.854 vs 4,854)
        const variants = [n, n.replace(/\./g, ','), n.replace(/,/g, '.')]
        expect(
          variants.some((v) => cv.includes(v)),
          `número "${n}" em "${service.slug}" não existe em experience.ts`,
        ).toBe(true)
      }
    }
  })
})
