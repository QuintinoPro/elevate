// Toda a copy da landing vive aqui. Trocar headline não deve exigir tocar em JSX.
// Regras (ver PRODUCT.md): nunca "comunidade" — sempre "liga". Nunca prometer
// faturamento. O produto é o Elevate Pro; a marca é a Elevate League.
//
// Estrutura da página: 6 seções. Hero, o que é, o que recebe, quem está por
// trás, oferta, FAQ. Uma ideia por bloco, frase curta, nada repetido.

// Headlines vêm quebradas em três para o trecho do meio sair em azul. O grifo
// cai sempre no que a pessoa ganha, nunca no que ela dispensa.
export type Headline = { before?: string; accent: string; after?: string }

export const hero = {
  headline: {
    before: 'Você não precisa de mais conteúdo. Precisa estar no ',
    accent: 'ambiente certo',
    after: '.',
  } satisfies Headline,
  sub: 'Entre para uma liga de jovens empreendedores que estão construindo, vendendo, criando e crescendo juntos.',
  kicker: ['Conteúdo', 'Networking', 'Estratégia', 'Execução'],
} as const

export const oQueE = {
  eyebrow: 'O que é o Elevate Pro',
  headline: {
    before: 'Não é mais um curso. É o ',
    accent: 'ambiente que faltava',
    after: '.',
  } satisfies Headline,
  body: 'O Elevate Pro reúne empreendedores em uma liga onde você aprende estratégias aplicáveis, participa de encontros, conhece pessoas que estão executando e tem acesso direto a quem já está no mercado.',
  pilares: ['Networking', 'Conhecimento', 'Estratégia', 'Execução'],
} as const

export const oQueRecebe = {
  eyebrow: 'O que você recebe',
  headline: {
    before: 'Tudo que você precisa para acelerar seu ',
    accent: 'próximo nível',
    after: '.',
  } satisfies Headline,
  // O card grande é o acesso aos outros membros, não a mentoria. Decisão do
  // Lucas em 10/09/2026: a mentoria é diferencial forte, mas o que ninguém
  // copia é a sala.
  destaque: {
    badge: 'O principal',
    title: 'Acesso direto aos outros membros',
    body: 'A liga privada é onde a troca acontece todo dia. Networking, parceria, indicação, proposta revisada antes de você mandar — com gente que está executando agora.',
  },
  // A ordem aqui é a ordem de peso, e a grade respeita ela: a mentoria ocupa o
  // card alto ao lado do herói, os três últimos fecham a base. Trocar a ordem
  // troca o desenho, então não é lista solta.
  cards: [
    {
      icone: 'mentoria',
      alto: true,
      title: { accent: '2 horas', after: ' de mentoria individual' } satisfies Headline,
      body: '1 hora com o Khayllan + 1 hora com o Lucas. Só você e a tela.',
    },
    {
      icone: 'modulos',
      title: { accent: '+15', after: ' módulos' } satisfies Headline,
      body: 'Marketing, vendas, tráfego, IA, posicionamento, agência, negócios e muito mais.',
    },
    {
      icone: 'aovivo',
      title: 'Encontros ao vivo',
      body: 'Aulas em grupo para estratégia, execução e troca de experiências.',
    },
    {
      icone: 'conteudos',
      title: 'Aulas e conteúdos',
      body: 'Novos conteúdos e estratégias adicionados à plataforma.',
    },
  ],
} as const

export const fundadores = {
  eyebrow: 'Quem está por trás',
  headline: {
    before: 'Quem vai estar do ',
    accent: 'outro lado da call',
    after: '.',
  } satisfies Headline,
  pessoas: [
    {
      nome: 'Khayllan Martins',
      foto: '/brand/khayllan.webp',
      bio: 'Empreendedor, estrategista e fundador de negócios digitais.',
      instagram: 'https://www.instagram.com/khayllan.midias/',
      handle: '@khayllan.midias',
    },
    {
      nome: 'Lucas Quintino',
      foto: '/brand/lucas.webp',
      bio: 'Empreendedor e especialista em negócios, estratégia e crescimento.',
      instagram: 'https://www.instagram.com/quintinopro/',
      handle: '@quintinopro',
    },
  ],
  fecho:
    'Além de Khayllan e Lucas, o Elevate receberá convidados e especialistas de diferentes mercados.',
} as const

export const paraQuem = {
  eyebrow: 'Antes de você entrar',
  headline: {
    before: 'A liga não é pra todo mundo. E isso é ',
    accent: 'de propósito',
    after: '.',
  } satisfies Headline,
  sim: {
    title: 'É pra você se',
    items: [
      'Tem entre 18 e 28 anos e sente que está andando mais devagar do que poderia',
      'Já vende algo no digital e travou sozinho — ou é CLT e quer construir uma saída',
      'Está disposto a aparecer, perguntar e também ajudar os outros',
      'Consegue reservar algumas horas por semana pra isso',
    ],
  },
  nao: {
    title: 'Não é pra você se',
    items: [
      'Procura fórmula pronta pra ficar rico em 30 dias',
      'Só quer mais um login com aula gravada pra assistir e esquecer',
      'Não pretende participar, só observar de longe',
      'Não tem condição de investir agora — melhor a gente te falar isso já',
    ],
  },
} as const

export const oferta = {
  eyebrow: 'A oferta',
  headline: {
    before: 'Primeira turma. ',
    accent: 'Condição especial',
    after: '.',
  } satisfies Headline,
  produto: 'Elevate Pro',
  notaPreco: 'Valor exclusivo das primeiras vagas.',
  inclui: [
    'Plataforma completa',
    '+15 módulos',
    'Liga privada',
    'Aulas ao vivo',
    'Networking',
    '1h com Khayllan',
    '1h com Lucas',
    'Novos conteúdos',
  ],
  // Ressalva honesta no lugar de contador regressivo: o preço pode mudar, e
  // dizer isso vale mais que fabricar urgência.
  ressalva:
    'Essa condição é exclusiva das primeiras vagas e poderá ser alterada nas próximas turmas.',
  garantia: '7 dias de garantia. Entrou, não fez sentido, devolvemos 100% do valor.',
} as const

export const faq = {
  eyebrow: 'Perguntas',
  headline: {
    before: 'O que costuma travar a ',
    accent: 'decisão',
    after: '.',
  } satisfies Headline,
  items: [
    {
      q: 'Para quem é o Elevate Pro?',
      a: 'Para quem tem entre 18 e 28 anos e quer construir algo no digital: quem já vende e travou sozinho, e quem ainda está montando a saída do CLT. O que a gente pede é disposição de aparecer, perguntar e também ajudar os outros.',
    },
    {
      q: 'Preciso já ter uma empresa?',
      a: 'Não. Metade da liga está exatamente no ponto anterior. Se você já vende, o caminho é um; se está começando, é outro — os dois cabem aqui.',
    },
    {
      q: 'Como funcionam as aulas e a liga?',
      a: 'A plataforma fica disponível 24h com os módulos gravados, e novos conteúdos entram com o tempo. Os encontros ao vivo acontecem em grupo e ficam gravados. A liga privada é onde a troca acontece no dia a dia.',
    },
    {
      q: 'Como funcionam as calls individuais?',
      a: 'São 2 horas suas: 1 hora com o Khayllan e 1 hora com o Lucas, agendadas quando fizer sentido pra você. Uma de cada vez, só você e a tela, com o seu projeto e os seus números na mesa.',
    },
    {
      // TODO: Lucas precisa confirmar o prazo real antes de publicar. É promessa
      // comercial — não pode ir ao ar no chute.
      q: 'Por quanto tempo tenho acesso?',
      a: 'Você tem 12 meses de acesso a partir da entrada: plataforma, encontros ao vivo, gravações e liga privada. O que entrar de conteúdo novo nesse período também é seu.',
    },
  ],
} as const
