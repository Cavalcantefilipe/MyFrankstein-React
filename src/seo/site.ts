const whatsappNumber = '5511985346164';

export const site = {
  url: 'https://filipelab.com',
  name: 'Filipe Lab',
  authorName: 'Filipe Alves Cavalcante',
  // Nome exato do Google Business Profile. O JSON-LD e o rodapé usam este
  // valor para o Google conectar o site ao perfil (consistência de NAP).
  businessName: 'FA Cavalcante',
  email: 'filipe.alvescavalcante@gmail.com',
  linkedin: 'https://www.linkedin.com/in/cavalcante-filipe/',
  github: 'https://github.com/Cavalcantefilipe',
  whatsapp: whatsappNumber,
  whatsappUrl: `https://wa.me/${whatsappNumber}`,

  // Cidade-base, usada no `address` do LocalBusiness. Deliberadamente sem rua
  // ou número: o Google só exige localidade/região/país, e publicar o endereço
  // residencial no HTML o tornaria permanentemente indexável. A rua, se for
  // necessária um dia, pertence ao Google Business Profile — lá o dono
  // controla o que fica visível.
  city: 'Caraguatatuba',
  region: 'SP',
  country: 'BR',
} as const;
