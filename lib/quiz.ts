// A PENEIRA — estrutura de dados do quiz de /quiz/.
//
// Regras herdadas do PRODUCT.md: nunca "comunidade" (é liga), nunca
// "questionário"/"formulário"/"diagnóstico" (é peneira), nunca prometer
// faturamento. Toda a copy vive aqui — a UI não escreve texto.
//
// COMO A CONDIÇÃO FUNCIONA
// Existe UM único ponto de ramificação: a pergunta 2 ("o que você faz hoje").
// Ela define a trilha, e a trilha decide quais 3 perguntas do miolo aparecem.
// O resto é comum a todo mundo. Isso é de propósito: um motor de condições
// genérico (regras encadeadas, dependências entre respostas) seria mais
// poderoso e impossível de manter a dois. Se um dia precisar de uma condição
// que não seja a trilha, adicionar um campo `visivelSe` — não antes.
//
// ORÇAMENTO DE PERGUNTAS
// Todo mundo responde exatamente 7 perguntas + 1 tela de contato. Mudam as
// perguntas, não a quantidade — por isso a barra de progresso pode dizer
// "3 de 7" sem mentir em nenhuma trilha. Pergunta nova só entra substituindo
// outra.
//
// Eram 11 perguntas e uma tela de ficha até 13/09/2026. O Lucas achou longo
// ("o cara acaba achando chato") e pediu no máximo 7, com as mais úteis. O
// critério do corte: ficou o que qualifica a compra (idade, dinheiro, tempo,
// investimento) e o que alimenta o resultado (a trava, que volta como eco).
// Saiu o que só segmentava. As perguntas cortadas estão no histórico do Git,
// no commit bbb0ee4, se alguma precisar voltar.
//
// DESDE 21/10/2026 A PENEIRA NÃO VENDE. O preço saiu do site (ver
// lib/constants.ts): a peneira virou o cadastro. Ninguém é aprovado na tela —
// o resultado mostra a trilha, o lead vai pra planilha, e quem decide a
// entrada é o time da Elevate League, na conversa pelo WhatsApp.

export type Trilha = 'empreendedor' | 'carreira' | 'inicio'

// Saídas que uma resposta pode forçar, independente do resto da peneira.
export type Saida = 'recusa-menor' | 'espera-idade'

export type Opcao = {
  value: string
  label: string
  /** Define a trilha. Só usado na pergunta 2. */
  trilha?: Trilha
  /** Rota de saída imediata: encerra a peneira nesse resultado. */
  saida?: Saida
  /** Pontos para o lead score interno. Não aparece pra ninguém. */
  score?: number
  /** Frase que o resultado devolve pra pessoa, provando que a gente leu. */
  eco?: string
  /**
   * Opção "Outro": marcada, abre um campo pra pessoa escrever a resposta dela
   * e segura o avanço automático até ela escrever. Só em pergunta de categoria
   * — em pergunta de faixa (idade, faturamento, horas) as opções já cobrem
   * todos os casos, e um "Outro" ali só produz dado que não soma com nada.
   */
  outro?: true
}

export type Pergunta = {
  id: string
  /** 1 a 7. Duas perguntas podem ter o mesmo passo se forem de trilhas diferentes. */
  passo: number
  /** Ausente = todo mundo vê. Presente = só essas trilhas. */
  trilhas?: Trilha[]
  pergunta: string
  ajuda?: string
  tipo: 'unica' | 'multipla'
  /** Só para `multipla`: teto de seleções. */
  max?: number
  opcoes: Opcao[]
}

export const TOTAL_PASSOS = 7

/**
 * Opção "Outro" pronta. Rótulo de uma palavra, sem score e sem eco fixo: o eco
 * do resultado passa a ser o que a pessoa escreveu (ver `Peneira.tsx`).
 * Fica fora do teto de 5 opções — é a saída de quem não se viu na lista, não
 * uma opção a mais pra ler.
 */
const OUTRO: Opcao = { value: 'outro', label: 'Outro', outro: true }

// ─────────────────────────────────────────────────────────────────────────────
// ABERTURA
// Não é pergunta. Existe para enquadrar o que vem: peneira tem tamanho
// declarado e tem reprovação. Dizer isso na entrada é o que faz o resto ser
// levado a sério — e derruba na hora quem só ia clicar por curiosidade.
// ─────────────────────────────────────────────────────────────────────────────

export const abertura = {
  eyebrow: 'A peneira',
  headline: {
    before: 'Antes de entrar, a gente precisa saber ',
    accent: 'quem você é',
    after: '.',
  },
  body: '7 perguntas, 1 minuto. No fim você descobre sua trilha, e a gente fala com você pelo WhatsApp.',
  // "time da Elevate League", não os dois nomes: decisão do Lucas em
  // 14/09/2026 — quem guarda o dado é a marca, não duas pessoas. A regra vale
  // pra toda copy de custódia (ver a política de privacidade).
  nota: 'A peneira reprova de verdade. Suas respostas ficam só com o time da Elevate League.',
  cta: 'Começar a peneira',
} as const

// ─────────────────────────────────────────────────────────────────────────────
// PASSO 1 — IDADE
// O filtro 18-28 saiu da landing a pedido do Lucas; ele vive aqui agora.
// Vem primeiro de propósito: quem não passa gasta 10 segundos, não 2 minutos.
// ─────────────────────────────────────────────────────────────────────────────

const idade: Pergunta = {
  id: 'idade',
  passo: 1,
  pergunta: 'Quantos anos você tem?',
  tipo: 'unica',
  opcoes: [
    { value: 'menor', label: 'Menos de 18', saida: 'recusa-menor' },
    { value: '18-21', label: '18 a 21', score: 5 },
    { value: '22-25', label: '22 a 25', score: 10 },
    { value: '26-28', label: '26 a 28', score: 10 },
    // Decidido pelo Lucas em 10/09/2026: 29+ entra normalmente. A faixa 18-28
    // continua sendo o alvo da comunicação, mas não barra ninguém no checkout.
    // Pra voltar a barrar, é trocar `score` por `saida: 'espera-idade'` — o
    // resultado correspondente segue escrito logo abaixo, desligado.
    { value: '29+', label: '29 ou mais', score: 5 },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// PASSO 2 — O PONTO DE RAMIFICAÇÃO
// Tudo que é condicional na peneira nasce aqui.
// ─────────────────────────────────────────────────────────────────────────────

const momento: Pergunta = {
  id: 'momento',
  passo: 2,
  pergunta: 'O que você faz hoje?',
    tipo: 'unica',
  opcoes: [
    { value: 'empreendo', label: 'Tenho meu negócio', trilha: 'empreendedor', score: 10 },
    { value: 'freela', label: 'Faço freelas e bicos', trilha: 'empreendedor', score: 5 },
    { value: 'clt', label: 'Sou CLT', trilha: 'carreira', score: 10 },
    { value: 'estudante', label: 'Sou estudante', trilha: 'inicio', score: 5 },
    { value: 'transicao', label: 'Estou em transição', trilha: 'inicio', score: 0 },
    // Quem não se vê em nenhuma cai na Trilha Início: é a única cujas perguntas
    // (renda, se já tentou no digital, trava) servem pra qualquer situação.
    { ...OUTRO, trilha: 'inicio' },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// PASSOS 3-5 — O MIOLO DE CADA TRILHA
//
// Três perguntas por trilha, sempre na mesma ordem de papel: CONTEXTO (onde a
// pessoa está), DINHEIRO (capacidade de pagar) e TRAVA (o que ela diz que
// segura — é o que volta como eco no resultado).
//
// Teto de 5 opções por pergunta, rótulo de até 4 palavras. Regra fechada com o
// Lucas em 10/09 depois de ele preencher a peneira inteira: o cansaço também
// vem de quantas palavras a tela pede pra ler. Lista de 7 opções longas vira
// parágrafo, e parágrafo com radio do lado ninguém lê — escolhe a primeira que
// serve e segue. Opção nova entra tirando outra. O "Outro" não conta no teto.
// ─────────────────────────────────────────────────────────────────────────────

// Empreendedor. Saíram "há quanto tempo" e "sozinho ou com time": o
// faturamento já diz o estágio do negócio, e o time vira assunto da mentoria.
const empreendedor: Pergunta[] = [
  {
    id: 'e-oque',
    passo: 3,
    trilhas: ['empreendedor'],
    pergunta: 'O que você vende?',
    tipo: 'unica',
    opcoes: [
      { value: 'servico', label: 'Presto serviço' },
      { value: 'agencia', label: 'Agência' },
      { value: 'infoproduto', label: 'Infoproduto ou mentoria' },
      { value: 'produto', label: 'Produto ou e-commerce' },
      OUTRO,
    ],
  },
  {
    id: 'e-faturamento',
    passo: 4,
    trilhas: ['empreendedor'],
    pergunta: 'Quanto entra por mês?',
    // As faixas caíram de 6 pra 5 mantendo os dois cortes que decidem alguma
    // coisa: 5 mil (vive disso) e 10 mil (tem operação). O que sumiu foi a
    // divisão entre 2 e 5 mil, que não muda nada na conversa.
    ajuda: 'Média dos últimos 3 meses. Faturamento, não lucro. Só a gente vê.',
    tipo: 'unica',
    opcoes: [
      { value: '0', label: 'Ainda não fatura', score: 0 },
      { value: 'ate-5k', label: 'Até R$5 mil', score: 5 },
      { value: '5-10k', label: 'De R$5 a 10 mil', score: 15 },
      { value: '10-30k', label: 'De R$10 a 30 mil', score: 20 },
      { value: '30k+', label: 'Mais de R$30 mil', score: 20 },
    ],
  },
  {
    id: 'e-gargalo',
    passo: 5,
    trilhas: ['empreendedor'],
    pergunta: 'O que mais te trava hoje?',
    tipo: 'unica',
    opcoes: [
      { value: 'clientes', label: 'Conseguir cliente', eco: 'previsibilidade de cliente' },
      { value: 'preco', label: 'Vender mais caro', eco: 'preço e proposta' },
      { value: 'conteudo', label: 'Aparecer e postar', eco: 'constância de conteúdo' },
      { value: 'sozinho', label: 'Decidir sozinho', eco: 'decidir sozinho' },
      { value: 'direcao', label: 'Saber o próximo passo', eco: 'falta de direção' },
      OUTRO,
    ],
  },
]

// Carreira. Saíram "área" e "onde quer estar em 12 meses". Ficou "já tenta
// algo por fora", que separa o CLT curioso do CLT que já executa — é a que
// mais diz sobre quem compra.
const carreira: Pergunta[] = [
  {
    id: 'c-porfora',
    passo: 3,
    trilhas: ['carreira'],
    pergunta: 'Já tenta algo por fora?',
    tipo: 'unica',
    opcoes: [
      { value: 'renda', label: 'Sim, já tiro renda extra', score: 15 },
      { value: 'tentando', label: 'Sim, mas não virou dinheiro', score: 10 },
      { value: 'estudando', label: 'Só estudando ainda', score: 5 },
      { value: 'nao', label: 'Ainda não comecei', score: 0 },
    ],
  },
  {
    id: 'c-salario',
    passo: 4,
    trilhas: ['carreira'],
    pergunta: 'Quanto você recebe por mês?',
    ajuda: 'Só a gente vê.',
    tipo: 'unica',
    opcoes: [
      { value: 'ate-1.5k', label: 'Até R$1.500', score: 0 },
      { value: '1.5-3k', label: 'De R$1.500 a 3 mil', score: 5 },
      { value: '3-5k', label: 'De R$3 a 5 mil', score: 10 },
      { value: '5-10k', label: 'De R$5 a 10 mil', score: 15 },
      { value: '10k+', label: 'Mais de R$10 mil', score: 20 },
    ],
  },
  {
    id: 'c-trava',
    passo: 5,
    trilhas: ['carreira'],
    pergunta: 'O que mais te trava hoje?',
    tipo: 'unica',
    opcoes: [
      { value: 'comeco', label: 'Não sei por onde começar', eco: 'não saber por onde começar' },
      { value: 'tempo', label: 'Falta tempo', eco: 'tempo' },
      { value: 'ninguem', label: 'Não conheço ninguém do meio', eco: 'não conhecer ninguém que já fez' },
      { value: 'constancia', label: 'Começo e paro', eco: 'constância' },
      { value: 'medo', label: 'Medo de largar o certo', eco: 'o risco de largar o certo' },
      OUTRO,
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// TRILHA INÍCIO (estudante, quem está em transição e quem marcou "Outro")
// É a trilha de quem ainda não tem negócio nem carreira formada. Existe
// separada porque a objeção dessa pessoa é dinheiro e direção, não escala — o
// resultado e a mentoria precisam falar outra coisa.
//
// Chamava "Trilha Base" até 10/09/2026. O Lucas não entendeu o nome de
// primeira, e nome que precisa de explicação não sobrevive numa tela de
// resultado: virou "Início".
//
// Saíram "estudos" e "o que você quer primeiro". Ficou "já tentou no digital",
// que é o que separa quem executa de quem só consome.
// ─────────────────────────────────────────────────────────────────────────────

const inicio: Pergunta[] = [
  {
    id: 'i-tentou',
    passo: 3,
    trilhas: ['inicio'],
    pergunta: 'Já tentou ganhar dinheiro no digital?',
    tipo: 'unica',
    opcoes: [
      { value: 'ganhei', label: 'Já ganhei meus primeiros reais', score: 15 },
      { value: 'tentei', label: 'Tentei, não deu certo', score: 10 },
      { value: 'estudei', label: 'Só estudei', score: 5 },
      { value: 'nunca', label: 'Nunca tentei', score: 0 },
    ],
  },
  {
    id: 'i-renda',
    passo: 4,
    trilhas: ['inicio'],
    pergunta: 'Trabalho e renda hoje?',
    tipo: 'unica',
    opcoes: [
      { value: 'nada', label: 'Não trabalho', score: 0 },
      { value: 'estagio', label: 'Estágio', score: 5 },
      { value: 'meio', label: 'Meio período', score: 5 },
      { value: 'freelas', label: 'Freelas e bicos', score: 10 },
      { value: 'ajuda', label: 'Dependo da família', score: 0 },
      OUTRO,
    ],
  },
  {
    id: 'i-trava',
    passo: 5,
    trilhas: ['inicio'],
    pergunta: 'O que mais te trava hoje?',
    tipo: 'unica',
    opcoes: [
      { value: 'comeco', label: 'Não sei por onde começar', eco: 'não saber por onde começar' },
      // O eco era "dinheiro pra investir" até 21/10/2026, e a leitura da
      // Trilha Início respondia que "é exatamente o que ambiente resolve" —
      // prometer resolver falta de dinheiro quebra a regra da marca. Começar
      // com pouco é o que a liga de fato ajuda: gente que já começou do zero.
      { value: 'dinheiro', label: 'Não tenho dinheiro', eco: 'começar com pouco dinheiro' },
      { value: 'ninguem', label: 'Ninguém do meu círculo faz isso', eco: 'estar cercado de quem não faz isso' },
      { value: 'constancia', label: 'Começo e paro', eco: 'constância' },
      { value: 'medo', label: 'Medo de não dar certo', eco: 'o medo de tentar' },
      OUTRO,
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// PASSOS 6-7 — COMUM A TODAS AS TRILHAS
// "Erros que já custaram tempo" e "temas de interesse" saíram em 13/09: um
// servia pra anúncio e o outro pra fila de gravação, e nenhum dos dois ajuda a
// decidir quem entra. Os temas dá pra perguntar dentro da liga, depois da
// compra, quando responder custa zero.
// ─────────────────────────────────────────────────────────────────────────────

const comuns: Pergunta[] = [
  {
    id: 'tempo-semana',
    passo: 6,
    pergunta: 'Quantas horas por semana você tem pra isso?',
    ajuda: 'Responde de verdade. A liga funciona pra quem aparece.',
    tipo: 'unica',
    opcoes: [
      // Não reprova, mas marca o lead como frio: quem entra sem tempo não
      // participa, não vira prova social e pede reembolso.
      { value: '<2h', label: 'Menos de 2 horas', score: 0 },
      { value: '2-5h', label: 'De 2 a 5 horas', score: 10 },
      { value: '5-10h', label: 'De 5 a 10 horas', score: 15 },
      { value: '10h+', label: 'Mais de 10 horas', score: 20 },
    ],
  },
  {
    id: 'quando',
    passo: 7,
    // Era "A primeira turma custa R$497. Isso pra você é:" até 21/10/2026, com
    // uma saída pra lista de espera em "não tenho como agora". Saiu com o preço.
    // A que entrou mede prontidão sem citar dinheiro — a capacidade de pagar
    // fica com a pergunta 4 (faturamento, salário ou renda) e com a conversa.
    // Herdou os pesos (até 40), então os cortes de temperatura continuam valendo.
    pergunta: 'Se a sua entrada for aprovada, quando quer começar?',
    tipo: 'unica',
    opcoes: [
      { value: 'agora', label: 'Agora, assim que der', score: 40 },
      { value: 'semanas', label: 'Nas próximas semanas', score: 30 },
      { value: 'meses', label: 'Daqui a alguns meses', score: 15 },
      { value: 'conhecendo', label: 'Só estou conhecendo', score: 0 },
    ],
  },
]

export const perguntas: Pergunta[] = [idade, momento, ...empreendedor, ...carreira, ...inicio, ...comuns]

/** As 7 perguntas de uma trilha, em ordem. */
export const perguntasDaTrilha = (trilha: Trilha): Pergunta[] =>
  perguntas.filter((p) => !p.trilhas || p.trilhas.includes(trilha)).sort((a, b) => a.passo - b.passo)

// ─────────────────────────────────────────────────────────────────────────────
// CONTATO — dois campos. E-mail fica pra conversa, não aqui: cada campo a mais
// nessa tela custa lead, e o WhatsApp é onde o produto acontece.
// ─────────────────────────────────────────────────────────────────────────────

export const contato = {
  titulo: 'Pra onde mandamos o resultado?',
  ajuda: 'A liga vive no WhatsApp.',
  campos: [
    { id: 'nome', label: 'Seu nome', tipo: 'texto' as const, obrigatorio: true },
    { id: 'whatsapp', label: 'WhatsApp com DDD', tipo: 'telefone' as const, obrigatorio: true },
  ],
  cta: 'Ver meu resultado',
  nota: 'Sem spam. Sem lista. Só a gente.',
  // Consentimento da LGPD (13/09/2026). Caixa desmarcada de propósito:
  // consentimento pré-marcado não vale. O link abre em aba nova, senão a
  // pessoa perde a peneira inteira — o progresso vive só na memória da página.
  aceite: {
    antes: 'Li a ',
    link: 'política de privacidade',
    depois:
      ' e aceito que a Elevate League use minhas respostas pra avaliar minha entrada e fale comigo pelo WhatsApp.',
  },
  // Até 21/10/2026 o botão ficava apagado sem dizer o que faltava, e quem
  // digitava o WhatsApp incompleto travava na última tela. Agora o botão fica
  // sempre ativo e o clique aponta o campo.
  erros: {
    nome: 'Escreve seu nome.',
    whatsapp: 'Falta número: coloca o DDD e o número completo.',
    ddd: 'Esse DDD não existe. Confere o número.',
    aceite: 'Marca a caixa pra gente poder falar com você no WhatsApp.',
  },
} as const

// Quando as três tentativas de envio falham (ver quiz-envio.ts). Aparece no
// lugar do "Cadastro feito", que nesse caso seria mentira.
export const falhaEnvio = {
  titulo: 'Seu cadastro não chegou até a gente.',
  texto: 'A conexão caiu no caminho. Confere a internet e envia de novo — suas respostas continuam aqui.',
  cta: 'Enviar de novo',
  enviando: 'Enviando…',
} as const

// ─────────────────────────────────────────────────────────────────────────────
// APURAÇÃO
// Três passos curtos enquanto o resultado carrega. É teatro, mas não é mentira:
// os três passos são exatamente o que o código faz. Segurar mais que ~2,5s vira
// truque de infoproduto e derruba a confiança que a página inteira construiu.
// ─────────────────────────────────────────────────────────────────────────────

export const apuracao = {
  passos: ['Lendo suas respostas', 'Cruzando com o perfil da primeira turma', 'Definindo sua trilha'],
  duracaoMs: 2400,
} as const

// ─────────────────────────────────────────────────────────────────────────────
// RESULTADOS
// ─────────────────────────────────────────────────────────────────────────────

export type Resultado = {
  aprovado: boolean
  eyebrow: string
  headline: { before?: string; accent: string; after?: string }
  /** `{eco}` é substituído pela resposta de gargalo/trava da pessoa. */
  leitura: string
  bullets: { titulo: string; body: string }[]
  /** O que acontece agora. Aparece em destaque, antes do botão. */
  proximoPasso?: string
  rodape?: string
}

// Os três resultados de trilha terminavam num botão pro checkout da Hubla até
// 21/10/2026. Agora terminam no próximo passo: o time chama no WhatsApp. Por
// isso a manchete diz "seu perfil é da trilha", não "você entra" — quem decide
// a entrada é a conversa, não a tela.
const PROXIMO_PASSO =
  'Cadastro feito. Agora o time da Elevate League analisa seu perfil e chama você no WhatsApp.'

export const resultados: Record<string, Resultado> = {
  empreendedor: {
    aprovado: true,
    eyebrow: 'Peneira concluída',
    headline: { before: 'Seu perfil é da ', accent: 'Trilha Empreendedor', after: '.' },
    leitura:
      'Você já vende. O que te segura não é conteúdo — é {eco}, e isso é decisão, não informação. Decisão sozinho é a parte cara.',
    bullets: [
      {
        titulo: 'A sala antes da decisão',
        body: 'Proposta, preço e contrato revisados por quem já mandou o mesmo e-mail — antes de você mandar.',
      },
      {
        titulo: '2 horas de mentoria individual',
        body: '1h com o Khayllan e 1h com o Lucas, com o seu negócio e os seus números na mesa.',
      },
      {
        titulo: 'Gente no seu nível',
        body: 'Você cai perto de quem está no mesmo ponto do jogo. É de onde saem parceria e indicação.',
      },
    ],
    proximoPasso: PROXIMO_PASSO,
  },

  carreira: {
    aprovado: true,
    eyebrow: 'Peneira concluída',
    headline: { before: 'Seu perfil é da ', accent: 'Trilha Carreira', after: '.' },
    leitura:
      'Você tem estabilidade e falta de saída — as duas ao mesmo tempo. Você disse que o que trava é {eco}. Ninguém resolve isso assistindo mais aula: resolve estando perto de quem já fez a travessia.',
    bullets: [
      {
        titulo: 'O caminho, não o hype',
        body: 'Os módulos vão do zero ao primeiro cliente. Sem largar nada antes da hora.',
      },
      {
        titulo: '2 horas de mentoria individual',
        body: 'Uma hora com cada fundador pra montar o seu plano de saída com data e ordem.',
      },
      {
        titulo: 'Gente que já fez isso',
        body: 'A liga tem quem saiu do CLT e quem ainda está dentro. Os dois falam com você.',
      },
    ],
    proximoPasso: PROXIMO_PASSO,
  },

  inicio: {
    aprovado: true,
    eyebrow: 'Peneira concluída',
    headline: { before: 'Seu perfil é da ', accent: 'Trilha Início', after: '.' },
    leitura:
      'Você está no ponto onde a liga muda mais coisa. Disse que o que trava é {eco} — e é exatamente o que ambiente resolve mais rápido que curso.',
    bullets: [
      {
        titulo: 'Começar acompanhado',
        body: 'Você não vai adivinhar o próximo passo. Vai perguntar pra quem deu ele semana passada.',
      },
      {
        titulo: '2 horas de mentoria individual',
        body: 'Uma hora com cada fundador pra escolher um caminho e parar de trocar de ideia todo mês.',
      },
      {
        titulo: 'Sair do círculo errado',
        body: 'Você troca as pessoas em volta. É a alavanca mais forte que existe nessa idade.',
      },
    ],
    proximoPasso: PROXIMO_PASSO,
  },

  // ── Saídas ────────────────────────────────────────────────────────────────
  // A de investimento ("não tenho como agora") saiu com o preço em 21/10/2026.

  'recusa-menor': {
    aprovado: false,
    eyebrow: 'Peneira concluída',
    headline: { before: 'A liga é de ', accent: '18 a 28', after: '. Ainda não dá.' },
    leitura:
      'Não é papo de reprovação: é que a mentoria e a liga foram desenhadas pra quem já pode assinar as próprias decisões. Volta quando fizer 18 — a gente vai estar aqui.',
    bullets: [
      { titulo: 'Enquanto isso', body: 'Segue a gente no Instagram. Muita coisa boa sai de graça por lá.' },
    ],
    rodape: 'Sem lista de espera aqui. Só quando a idade bater.',
  },

  // DESLIGADO em 10/09/2026: nenhuma resposta leva mais aqui, porque 29+ entra.
  // Mantido escrito porque religar é trocar uma linha na opção `29+` da
  // pergunta de idade, e reescrever esta copy do zero seria o caro.
  'espera-idade': {
    aprovado: false,
    eyebrow: 'Peneira concluída',
    headline: { before: 'A primeira turma é de ', accent: '18 a 28 anos', after: '.' },
    leitura:
      'Você tem mais que isso, e a gente prefere te dizer agora a te vender uma sala que não foi montada pra você. A liga é jovem de propósito — é isso que faz a troca funcionar.',
    bullets: [
      {
        titulo: 'Lista de espera',
        body: 'Se abrirmos uma turma sem recorte de idade, você é avisado antes de todo mundo.',
      },
    ],
    // DECISÃO EM ABERTO: se o Lucas quiser recuperar essa faixa, aqui entra um
    // botão de WhatsApp direto com os fundadores em vez de só lista de espera.
    rodape: 'Você já está na lista. Nada mais a fazer agora.',
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// LEAD SCORE — interno. Não muda o resultado que a pessoa vê; muda a ordem em
// que o Khayllan e o Lucas chamam no WhatsApp. Com ~20 vagas, atender na ordem
// de chegada é desperdiçar agenda.
//
// O teto fica entre 100 e 115 e varia um pouco por trilha, porque as perguntas
// do miolo não valem o mesmo. Comparar dentro da mesma trilha é o uso honesto.
//
// Os cortes eram 70/45 com 11 perguntas e teto de ~120. O corte de 13/09 tirou
// só perguntas que somavam, então a mesma pessoa passou a pontuar uns 15% menos;
// os cortes desceram na mesma proporção pra "quente" continuar querendo dizer a
// mesma coisa: pode pagar e tem tempo. Desde 21/10 o "pode pagar" vem da renda
// (pergunta 4), e a pergunta 7 mede se a pessoa quer começar já.
// ─────────────────────────────────────────────────────────────────────────────

export type Temperatura = 'quente' | 'morno' | 'frio'

export const classificar = (score: number): Temperatura =>
  score >= 60 ? 'quente' : score >= 40 ? 'morno' : 'frio'

/** Soma os pontos das opções escolhidas. Multiplas contam só a de maior peso. */
export const somarScore = (respostas: Record<string, string | string[]>): number =>
  perguntas.reduce((total, p) => {
    const escolha = respostas[p.id]
    if (!escolha) return total
    const valores = Array.isArray(escolha) ? escolha : [escolha]
    const pontos = p.opcoes.filter((o) => valores.includes(o.value)).map((o) => o.score ?? 0)
    return total + (pontos.length ? Math.max(...pontos) : 0)
  }, 0)
