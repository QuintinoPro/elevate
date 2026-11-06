// Toda a copy da landing vive aqui. Trocar headline não deve exigir tocar em JSX.
// Regras (ver PRODUCT.md): nunca "comunidade" — sempre "liga". Nunca prometer
// faturamento. O produto é o Elevate Pro; a marca é a Elevate League.
//
// Estrutura da página: hero, o que é, o que recebe, quem está por trás,
// Elevate Experience, pra quem é, oferta, FAQ. Uma ideia por bloco, frase
// curta, nada repetido.

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
    {
      // Entrou em 05/11/2026, a pedido do Lucas. A Nautt vem antes da 6wings
      // porque o Lucas achou esse o cargo mais forte dos dois. A foto é de um
      // painel no Node (hub de inovação Web3), recortada sem o outro
      // palestrante e sem o telão.
      nome: 'Marlon Frade',
      foto: '/brand/marlon.webp',
      cargos: ['Full Stack Software Engineer na Nautt Finance', 'CTO na 6wings'],
      bio: 'Engenheiro de software e especialista em tecnologia para produtos digitais.',
      instagram: 'https://www.instagram.com/marlonfrade/',
      handle: '@marlonfrade',
    },
    {
      // Entrou em 05/11/2026, a pedido do Lucas. O card leva o perfil
      // pessoal (@raff_mkt); o da agência é @medrix_oficial.
      nome: 'Raff',
      foto: '/brand/raff.webp',
      cargos: ['Fundador da Agência Medrix'],
      bio: 'Editor e especialista em criação de conteúdo sobre posicionamento.',
      instagram: 'https://www.instagram.com/raff_mkt/',
      handle: '@raff_mkt',
    },
    {
      // Entrou em 06/11/2026, a pedido do Lucas. O nome saiu do @ (o Lucas
      // mandou só cargos e perfil): confirmar a grafia. As três empresas que
      // ele fundou vão numa linha só, senão o card dele ficava com cinco
      // linhas de cargo e o mais alto da esteira.
      nome: 'Isaac Lourenço',
      foto: '/brand/isaac.webp',
      cargos: [
        'Fundador da Deep Field, do Estúdio Tekoha e da Minúcia Sites',
        'Sócio da Doce Terapia',
        'Head Comercial na Vérten',
      ],
      bio: 'Estrategista comercial e empreendedor em marketing e vendas.',
      instagram: 'https://www.instagram.com/isaac_llourenco/',
      handle: '@isaac_llourenco',
    },
    {
      // Entrou em 06/11/2026, a pedido do Lucas, que mandou cargos e bio.
      // "Comunidade TikTok Shop Pro" é o nome do produto dele, por isso o
      // "comunidade" (a regra de dizer "liga" vale pra Elevate). A foto veio
      // do site dele (mateusvesely.netlify.app). O TikTok (@mateusveselyy)
      // fica de fora: o card leva um perfil só.
      nome: 'Mateus Vesely',
      foto: '/brand/mateus.webp',
      cargos: ['Top Creator TikTok Shop', 'Fundador da Comunidade TikTok Shop Pro'],
      bio: 'Empreendedor, criador de conteúdo e estrategista digital.',
      instagram: 'https://www.instagram.com/mateusvesely/',
      handle: '@mateusvesely',
    },
    {
      // Entrou em 06/11/2026, a pedido do Lucas. Selfie: o rosto fica baixo
      // no quadro e o 5:4 a partir do topo cortava o queixo.
      nome: 'Arthur Müller',
      foto: '/brand/arthur.webp',
      enquadramento: '50% 20%',
      cargos: ['Founder do AtendON', 'AI Solutions Architect'],
      bio: 'Empreendedor e estrategista tecnológico, especializado em arquitetura de sistemas, orquestração de agentes de IA e criação de produtos digitais escaláveis.',
      instagram: 'https://www.instagram.com/thuur.ia/',
      handle: '@thuur.ia',
    },
    {
      // Entrou em 06/11/2026, a pedido do Lucas. Sem Instagram por enquanto
      // (o card fica sem o @ até o Lucas mandar). Foto num rooftop à noite:
      // as pessoas de outras mesas, atrás dele à direita, foram desfocadas.
      nome: 'Rafael Rodrigues',
      foto: '/brand/rafael.webp',
      cargos: ['Fundador da Alpha Tec Desenvolvimento', 'Estudante de empreendedorismo na PUC-Rio'],
      bio: 'Desenvolvedor de sistemas e soluções de BI, IoT e IA para indústrias no Brasil e na China.',
    },
  ],
  fecho:
    'Além do time, o Elevate receberá convidados e especialistas de diferentes mercados.',
} as const

// Elevate Experience: as viagens da liga. Entrou em 05/11/2026, a pedido do
// Lucas, com a primeira edição (réveillon em Floripa) em fase de expectativa.
// É um carrossel: viagem nova é um item a mais em `edicoes`, na ordem em que
// deve aparecer. O card "surpresa" no fim é de propósito (pedido do Lucas,
// 05/11): mostra que vem mais coisa sem dizer o quê, pra gerar procura.
//
// Regras enquanto a edição estiver "em breve" (ver
// docs/elevate-experience-reveillon-floripa.md, na pasta do projeto): nada de
// preço ou número de vagas, e nada de prometer festa, fogos, passeio ou ceia
// inclusos. Data só quando o Lucas confirmar: a de Floripa (29/12 a 04/01)
// foi liberada por ele em 05/11/2026. Sem botão por decisão do Lucas (05/11/2026): o `cta` só entra
// quando a inscrição abrir.
export type StatusExperience = 'em-breve' | 'inscricoes-abertas' | 'encerrada'

type EdicaoBase = {
  id: string
  status: StatusExperience
  /** A frase da faixa azul no pé do card. */
  chamada: string
  /**
   * Datas em ISO (aaaa-mm-dd). O card mostra dia/mês; o ano fica no
   * dateTime do <time>, pra máquina. Sem isto, o card não mostra data.
   */
  periodo?: { inicio: string; fim: string }
  /** Só quando abrir inscrição. Sem ele, o card não tem botão. */
  cta?: { href: string; label: string }
}

/** Viagem anunciada: destino com nome e foto. */
export type EdicaoDestino = EdicaoBase & {
  tipo: 'destino'
  /** O nome grande do cartaz. Curto: o tamanho da letra se ajusta a ele. */
  destino: string
  /** A faixa azul abaixo do destino (réveillon, carnaval...). Opcional. */
  ocasiao?: string
  foto: {
    /** Caminho sem a largura e a extensão: o componente monta o srcset. */
    base: string
    /** Larguras disponíveis em public/, da menor pra maior. */
    larguras: readonly number[]
    alt: string
    /** Crédito exigido pela licença. Aparece pequeno no pé do card. */
    credito?: string
    /** object-position da foto. O card é 4:5, então o que conta é o eixo X. */
    enquadramento?: string
  }
}

/** Próxima viagem sem destino revelado: card desfocado, sem foto. */
export type EdicaoSurpresa = EdicaoBase & {
  tipo: 'surpresa'
  /** A faixa branca que fica no lugar do "Edition". */
  rotulo: string
}

export type EdicaoExperience = EdicaoDestino | EdicaoSurpresa

export const experiencias = {
  // "Experiências" e não "Elevate Experience": o nome já vem na faixa azul
  // de cada card, e repetir em cima e embaixo gastava a primeira leitura.
  eyebrow: 'Experiências',
  headline: {
    before: 'Tem conexão que só acontece ',
    accent: 'fora da tela',
    after: '.',
  } satisfies Headline,
  intro:
    'As viagens da liga. Conexões, negócios e experiências fora da rotina, com gente que está no mesmo caminho.',
  edicoes: [
    {
      tipo: 'destino',
      id: 'floripa-reveillon',
      destino: 'Floripa',
      ocasiao: 'Réveillon',
      status: 'em-breve',
      chamada: 'Uma nova experiência para a sua virada.',
      periodo: { inicio: '2026-12-29', fim: '2027-01-04' },
      foto: {
        // Praia Mole vista da rampa de parapente, com a Galheta ao fundo. CC0
        // (domínio público, sem crédito obrigatório), de Papa Pic no
        // Wikimedia Commons: https://commons.wikimedia.org/wiki/File:Mole_e_Galheta.jpg
        // Os arquivos já saem cortados em 4:5 (o formato do card), no trecho
        // da curva da praia: crop 1728x2160 a partir de x=750 da versão de
        // 3840px. A arte do Instagram usa outra foto da Praia Mole (do
        // visitefloripa), sem licença confirmada: por isso ela não entrou aqui.
        // Trocada em 05/11/2026 a pedido do Lucas: a do Campeche, nublada,
        // não chamava atenção.
        base: '/experiencias/floripa',
        larguras: [700, 1100],
        alt: 'Praia Mole, em Florianópolis, vista do alto: faixa de areia em curva entre o morro verde e o mar.',
      },
    },
    {
      tipo: 'surpresa',
      id: 'proximo-destino',
      rotulo: 'Próximo destino',
      status: 'em-breve',
      chamada: 'O próximo destino ainda é segredo.',
    },
  ] satisfies readonly EdicaoExperience[],
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
