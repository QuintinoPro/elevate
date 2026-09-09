// Toda a copy da landing vive aqui. Trocar headline não deve exigir tocar em JSX.
// Regras (ver PRODUCT.md): nunca "comunidade" — sempre "liga". Nunca prometer
// faturamento. O inimigo é crescer sozinho.

export const hero = {
  eyebrow: 'Primeira turma · 20 vagas',
  headline: 'Você não precisa de mais um curso. Precisa de gente do seu lado.',
  sub: 'Uma liga para quem tem entre 18 e 28 anos, já cansou de aprender sozinho no YouTube e quer estar perto de quem já está fazendo. Conteúdo é de graça. Ambiente, não.',
  support:
    '2h de mentoria individual com os fundadores · rede ativa no WhatsApp · encontros ao vivo toda semana',
} as const

export const problema = {
  eyebrow: 'O problema',
  headline: 'Não falta conteúdo. Falta gente.',
  paragraphs: [
    'Você já assistiu aula suficiente pra saber o que fazer. Salvou os reels, comprou o curso, anotou o passo a passo. E mesmo assim travou.',
    'Não é falta de informação. É que você está fazendo tudo isso sozinho — sem ninguém pra revisar sua proposta antes de você mandar, pra dizer quanto cobrar, pra falar "isso aqui não vai funcionar, e é por isso".',
  ],
  punchline: 'Quem cresce rápido raramente é o mais inteligente da sala. É quem está na sala certa.',
} as const

export const noventaDias = {
  eyebrow: 'O que muda',
  headline: 'O que você leva em 90 dias dentro da liga.',
  items: [
    {
      title: 'Uma rede que você não tinha',
      body: 'Gente no mesmo momento que o seu, que responde quando você pergunta. Vaga, parceria, indicação e cliente circulam ali dentro.',
    },
    {
      title: 'Repertório pra fechar os primeiros contratos',
      body: 'Como precificar, como apresentar, como fechar. A liga entrega o que você precisa pra fazer — fazer continua sendo com você.',
    },
    {
      title: 'Seu projeto analisado a fundo',
      body: 'Duas horas de call individual olhando pro seu momento real: onde você está no mercado, o que trava e qual é o próximo passo.',
    },
    {
      title: 'Outro padrão de referência',
      body: 'Quando as pessoas ao seu redor mudam, o que você acha normal muda junto. É o efeito mais difícil de medir e o que mais muda o jogo.',
    },
  ],
} as const

export const pilares = {
  eyebrow: 'O que você recebe',
  headline: 'Quatro coisas. Uma delas quase ninguém entrega.',
  destaque: {
    badge: 'O pilar principal',
    title: '2 horas de mentoria individual',
    body: 'Uma hora com o Lucas e uma hora com o Khayllan. Só você e a tela. Não é call em grupo, não é tira-dúvidas coletivo: é a sua situação, o seu projeto e os seus números em cima da mesa.',
  },
  outros: [
    {
      title: 'A liga no WhatsApp',
      body: 'Grupo fechado, sem corrente e sem bom dia. Vaga, projeto, parceria, review de proposta — e gente respondendo de verdade.',
    },
    {
      title: 'Plataforma de aulas',
      body: 'Marketing, tráfego pago, vendas, IA, criação de agência, posicionamento, conteúdo, cripto e trade. Gravadas por nós, por convidados e pelos próprios membros. Cresce com o tempo.',
    },
    {
      title: 'Encontros ao vivo toda semana',
      body: 'No mínimo um por semana. Às vezes aula, às vezes convidado, às vezes só networking. Fica gravado pra quem não puder estar.',
    },
  ],
} as const

export const fundadores = {
  eyebrow: 'Quem puxa a liga',
  headline: 'Quem vai estar do outro lado da call.',
  // TODO: confirmar números com o Lucas antes de publicar.
  pessoas: [
    {
      nome: 'Lucas Quintino',
      papel: 'Fundador da Agência Stocks',
      bio: 'Agência no ar desde 2023, com mais de 40 empresas atendidas em posicionamento digital, tráfego pago e branding. Também é head de marketing do Blockchain.RIO, o maior evento de blockchain da América Latina.',
      instagram: 'https://www.instagram.com/quintinopro/',
      handle: '@quintinopro',
    },
    {
      nome: 'Khayllan Martins',
      papel: 'Fundador da KZ Company',
      bio: 'Já trabalhou com mais de 100 empresas, com mais de R$120 milhões em faturamento gerado para elas. Opera diariamente com estratégia, aquisição e vendas no digital.',
      instagram: 'https://www.instagram.com/khayllan.midias/',
      handle: '@khayllan.midias',
    },
  ],
  fecho:
    'Não somos gurus de internet. Somos dois caras que operam todo dia — e que vão sentar com você por uma hora cada um.',
} as const

export const paraQuem = {
  eyebrow: 'Antes de você entrar',
  headline: 'A liga não é pra todo mundo. E isso é de propósito.',
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

export const comoFunciona = {
  eyebrow: 'Como funciona',
  headline: 'Do outro lado da peneira.',
  passos: [
    {
      title: 'Você passa na peneira',
      body: 'Responde algumas perguntas sobre o seu momento e o seu objetivo. A gente avalia o perfil. Nem todo mundo entra.',
    },
    {
      title: 'Entra no grupo e na plataforma',
      body: 'Acesso liberado na hora. Você se apresenta no grupo, conta onde está e o que quer construir.',
    },
    {
      title: 'Agenda suas duas horas',
      body: 'Uma com o Lucas, uma com o Khayllan. Você escolhe quando: no começo pra traçar o plano, ou mais pra frente, com algo concreto pra revisar.',
    },
    {
      title: 'Aparece nos encontros',
      body: 'Toda semana tem. Quem aparece é quem tira mais proveito — dentro e fora da call.',
    },
  ],
} as const

export const vagas = {
  eyebrow: 'Elenco fundador',
  headline: 'Primeira turma, 20 vagas.',
  // TODO: confirmar preço final com o Lucas.
  precoAtual: 'R$697',
  precoDepois: 'R$997',
  motivo:
    'O limite não é estratégia de venda. São 20 alunos vezes 2 horas de mentoria: 40 horas entre nós dois. Não dá pra abrir mais sem entregar pior.',
  inclui: [
    '2 horas de mentoria individual (1h com cada fundador)',
    'Grupo fechado no WhatsApp',
    'Plataforma de aulas, com acesso às gravações',
    'Encontros ao vivo toda semana',
    'Acesso aos convidados e aos outros membros da liga',
  ],
  garantia:
    '7 dias de garantia. Entrou, não fez sentido, devolvemos 100% do valor. Sem pergunta e sem letra miúda.',
  nota: 'Preço de fundador, travado pra quem entra na primeira turma.',
} as const

export const faq = {
  eyebrow: 'Perguntas',
  headline: 'O que costuma travar a decisão.',
  items: [
    {
      q: 'Nunca ouvi falar da Elevate League. Por que eu confiaria?',
      a: 'Porque é a primeira turma mesmo — e a gente prefere dizer isso do que inventar depoimento. O que existe pra você avaliar é o histórico de quem está puxando: a Agência Stocks, no ar desde 2023, e a KZ Company. Os dois perfis estão aí no Instagram, com o trabalho aparecendo todo dia.',
    },
    {
      q: 'Sou CLT e não empreendo. A liga serve pra mim?',
      a: 'Serve, e metade da liga é gente exatamente nesse ponto. A peneira separa em duas trilhas justamente por isso: quem já vende algo tem um caminho, quem está construindo a saída do CLT tem outro. A rede e as mentorias funcionam nos dois casos.',
    },
    {
      q: 'Não tenho muito tempo. Vale mesmo assim?',
      a: 'Depende de quanto. As duas horas de mentoria você agenda quando quiser. Os encontros ao vivo ficam gravados. Mas se você não pretende aparecer no grupo nem participar de nada, a liga entrega bem menos do que deveria — e aí é melhor não entrar agora.',
    },
    {
      q: 'É mais um curso gravado?',
      a: 'Não. Tem plataforma de aulas, mas ela é o suporte, não o produto. O que você está comprando é acesso: à mentoria individual com os dois fundadores, à rede no WhatsApp e aos encontros ao vivo. Aula gravada você acha de graça na internet — o resto, não.',
    },
    {
      q: 'E se eu não passar na peneira?',
      a: 'Acontece, e não é um "não" pra sempre. Você fica na lista da próxima turma e a gente te avisa quando abrir. A peneira existe porque um grupo em que qualquer um entra deixa de valer pra quem está dentro.',
    },
    {
      q: 'Como funciona a garantia?',
      a: 'Você tem 7 dias depois da compra pra pedir o dinheiro de volta. Devolvemos 100%, sem perguntar por quê e sem burocracia.',
    },
  ],
} as const

export const ctaFinal = {
  headline: 'A peneira da primeira turma está aberta.',
  sub: 'Leva menos de dois minutos. No fim você descobre a sua trilha e se tem perfil pra entrar agora.',
} as const
