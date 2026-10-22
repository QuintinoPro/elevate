// Toda a copy da landing vive aqui. Trocar headline não deve exigir tocar em JSX.
// Regras (ver PRODUCT.md): nunca "comunidade" — sempre "liga". Nunca prometer
// faturamento. O produto é o Elevate Pro; a marca é a Elevate League.
//
// Estrutura da página: 6 seções. Hero, o que é, o que recebe, quem está por
// trás, oferta, FAQ. Uma ideia por bloco, frase curta, nada repetido.

// Headlines vêm quebradas em três para o trecho do meio sair em azul. O grifo
// cai sempre no que a pessoa ganha, nunca no que ela dispensa.
export type Headline = {
  before?: string
  accent: string
  after?: string
  /**
   * A partir de onde o "\n" vira quebra de verdade. 'sempre' é o padrão;
   * 'md' segura a quebra no celular, onde a coluna é estreita demais para a
   * linha inteira caber e forçar o corte só produz uma linha órfã.
   */
  quebra?: 'sempre' | 'md'
}

// Um "\n" dentro de before/after vira quebra de linha de verdade na headline.
// Usar quando a quebra for decisão de composição, não acidente de largura:
// sem isso a linha quebra onde a caixa mandar, e o corte costuma cair no meio
// do trecho em azul. Se a linha resultante só couber a partir de certa
// largura, marcar `quebra: 'md'` — abaixo disso ela volta a quebrar sozinha.
// Nesse caso, deixar um espaço antes do "\n": ele é o que separa as palavras
// quando a quebra não está valendo.

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
    // Uma frase por linha. Só a partir do md: no celular a segunda frase não
    // cabe inteira e o corte forçado quebraria em quatro linhas.
    // O espaço antes do "\n" é obrigatório: quando a quebra está escondida,
    // é ele que separa as duas frases. Sem ele sai "curso.É o". Com a quebra
    // visível ele não aparece — espaço no fim da linha é descartado.
    before: 'Não é mais um curso. \nÉ o ',
    accent: 'ambiente que faltava',
    after: '.',
    quebra: 'md',
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
      // Sem número de horas aqui, a pedido do Lucas: o card é varredura, e o
      // que convence nele é "individual" e "com os fundadores", não a conta.
      // O detalhe de quantas horas vive na oferta e no FAQ.
      title: { accent: 'Mentorias individuais', after: ' com os fundadores' } satisfies Headline,
      body: 'Uma com o Khayllan e uma com o Lucas. Só você e a tela, com o seu projeto em cima da mesa.',
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
    // Era "Quem vai estar do outro lado da call" até 21/10/2026, quando entrou
    // um terceiro card (Victoria) que não faz as calls individuais.
    before: 'Quem vai estar do ',
    accent: 'seu lado',
    after: '.',
  } satisfies Headline,
  pessoas: [
    {
      nome: 'Khayllan Martins',
      foto: '/brand/khayllan.webp',
      // Cargo e empresa vêm antes da bio de propósito: é a credencial
      // verificável, e é o que o leitor procura pra decidir se essa call vale
      // a pena. A bio adjetiva; o cargo prova.
      // Cargos revistos pelo Lucas em 21/10/2026: além da KZ, Move CRM e Dash
      // Up (negócios que o Khayllan toca em paralelo) e a própria liga.
      cargos: [
        'Fundador da KZ Company',
        'Head of Sales na Move CRM e na Dash Up',
        'Cofundador da Elevate League',
      ],
      bio: 'Empreendedor, estrategista e fundador de negócios digitais.',
      instagram: 'https://www.instagram.com/khayllan.midias/',
      handle: '@khayllan.midias',
    },
    {
      nome: 'Lucas Quintino',
      foto: '/brand/lucas.webp',
      // O rosto do Lucas fica mais baixo na foto. No topo, o recorte 5:4
      // mostrava mais o letreiro do slide ("uintino", "ad of Marketing") que
      // ele; a 35% entra o rosto e o crachá da Blockchain.RIO, que é a prova.
      enquadramento: '50% 35%',
      // "Fundador da Agência Stocks" saiu a pedido do Lucas em 21/10/2026.
      cargos: [
        'Head of Marketing na Blockchain.RIO',
        'Head of Operations na KZ Company',
        'Cofundador da Elevate League',
      ],
      bio: 'Empreendedor e especialista em negócios, estratégia e crescimento.',
      instagram: 'https://www.instagram.com/quintinopro/',
      handle: '@quintinopro',
    },
    {
      // Entrou em 21/10/2026, a pedido do Lucas. Não é fundadora da liga nem
      // faz as calls individuais — por isso a headline deixou de ser "do outro
      // lado da call".
      nome: 'Victoria Natasha',
      foto: '/brand/victoria.webp',
      enquadramento: '50% 45%',
      cargos: ['Fundadora da VT Vision', 'Account Manager na KZ Company'],
      bio: 'Designer e especialista em posicionamento estratégico de marcas.',
      instagram: 'https://www.instagram.com/natashantsc/',
      handle: '@natashantsc',
    },
  ],
  fecho:
    'Além do time, o Elevate receberá convidados e especialistas de diferentes mercados.',
} as const

export const paraQuem = {
  eyebrow: 'Antes de você entrar',
  headline: {
    before: 'A liga não é pra todo mundo.\nE isso é ',
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
      // Era "Não tem condição de investir agora" até 21/10/2026 — saiu junto com
      // o preço, porque avisava que entrar custa dinheiro.
      'Espera que alguém faça o trabalho por você',
    ],
  },
} as const

// Sem preço desde 21/10/2026 (ver lib/constants.ts). O card mostra o que a
// primeira turma recebe e o que acontece depois do cadastro — nada de valor,
// parcela, garantia de reembolso ou "condição especial".
export const oferta = {
  eyebrow: 'Como entrar',
  headline: {
    before: 'Primeira turma.\n',
    accent: 'Faça seu cadastro',
    after: '.',
  } satisfies Headline,
  produto: 'Elevate Pro',
  titulo: 'O que a primeira turma recebe',
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
  // Sem checkout no fim da peneira, a pessoa precisa saber antes de clicar o
  // que acontece depois — senão o botão parece levar a uma cobrança.
  processo:
    '7 perguntas, 1 minuto. Depois, o time da Elevate League analisa seu perfil e fala com você pelo WhatsApp.',
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
      // Prazo confirmado pelo Lucas em 13/09/2026: 12 meses. É promessa
      // comercial — se mudar, muda também na plataforma de checkout.
      q: 'Por quanto tempo tenho acesso?',
      a: 'Você tem 12 meses de acesso a partir da entrada: plataforma, encontros ao vivo, gravações e liga privada. O que entrar de conteúdo novo nesse período também é seu.',
    },
  ],
} as const
