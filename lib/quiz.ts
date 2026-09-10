// A PENEIRA — estrutura de dados do quiz de /quiz/.
//
// Regras herdadas do PRODUCT.md: nunca "comunidade" (é liga), nunca
// "questionário"/"formulário"/"diagnóstico" (é peneira), nunca prometer
// faturamento. Toda a copy vive aqui — a UI não escreve texto.
//
// COMO A CONDIÇÃO FUNCIONA
// Existe UM único ponto de ramificação: a pergunta 2 ("o que você faz hoje").
// Ela define a trilha, e a trilha decide quais 5 perguntas do miolo aparecem.
// O resto é comum a todo mundo. Isso é de propósito: um motor de condições
// genérico (regras encadeadas, dependências entre respostas) seria mais
// poderoso e impossível de manter a dois. Se um dia precisar de uma condição
// que não seja a trilha, adicionar um campo `visivelSe` — não antes.
//
// ORÇAMENTO DE PERGUNTAS
// Todo mundo responde exatamente 11 perguntas + 1 tela de ficha + 1 de contato.
// Mudam as perguntas, não a quantidade — por isso a barra de progresso pode
// dizer "3 de 11" sem mentir em nenhuma trilha. Pergunta nova só entra
// substituindo outra.

import { CTA_LABEL_OFERTA, PRICE } from '@/lib/constants'

export type Trilha = 'empreendedor' | 'carreira' | 'inicio'

// Saídas que uma resposta pode forçar, independente do resto da peneira.
export type Saida = 'recusa-menor' | 'espera-idade' | 'espera-investimento'

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
}

export type Pergunta = {
  id: string
  /** 1 a 11. Duas perguntas podem ter o mesmo passo se forem de trilhas diferentes. */
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

export const TOTAL_PASSOS = 11

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
  body: '11 perguntas, 2 minutos. No fim você sabe se entra — e em qual trilha.',
  nota: 'A peneira reprova de verdade. Suas respostas ficam só com o Khayllan e o Lucas.',
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
  ajuda: 'Vale o que ocupa a maior parte do seu dia.',
  tipo: 'unica',
  opcoes: [
    { value: 'empreendo', label: 'Tenho meu negócio ou presto serviço', trilha: 'empreendedor', score: 10 },
    { value: 'freela', label: 'Faço freelas e bicos, sem constância', trilha: 'empreendedor', score: 5 },
    { value: 'clt', label: 'Trabalho registrado (CLT)', trilha: 'carreira', score: 10 },
    { value: 'estudante', label: 'Sou estudante', trilha: 'inicio', score: 5 },
    { value: 'transicao', label: 'Estou entre uma coisa e outra', trilha: 'inicio', score: 0 },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// PASSOS 3-7 — TRILHA EMPREENDEDOR
// ─────────────────────────────────────────────────────────────────────────────

const empreendedor: Pergunta[] = [
  {
    id: 'e-oque',
    passo: 3,
    trilhas: ['empreendedor'],
    pergunta: 'O que você vende?',
    tipo: 'unica',
    opcoes: [
      { value: 'servico', label: 'Serviço (design, edição, dev, social media, tráfego)' },
      { value: 'agencia', label: 'Agência ou equipe de marketing' },
      { value: 'infoproduto', label: 'Infoproduto, mentoria ou curso' },
      { value: 'produto', label: 'Produto físico ou e-commerce' },
      { value: 'mercado', label: 'Trade, cripto ou investimentos' },
      { value: 'montando', label: 'Ainda estou montando, não vendi nada' },
      { value: 'outro', label: 'Outra coisa' },
    ],
  },
  {
    id: 'e-tempo',
    passo: 4,
    trilhas: ['empreendedor'],
    pergunta: 'Há quanto tempo?',
    tipo: 'unica',
    opcoes: [
      { value: '<6m', label: 'Menos de 6 meses' },
      { value: '6-12m', label: 'De 6 meses a 1 ano', score: 5 },
      { value: '1-3a', label: 'De 1 a 3 anos', score: 10 },
      { value: '3a+', label: 'Mais de 3 anos', score: 10 },
    ],
  },
  {
    id: 'e-faturamento',
    passo: 5,
    trilhas: ['empreendedor'],
    pergunta: 'Quanto entra por mês, na média dos últimos 3 meses?',
    ajuda: 'Faturamento, não lucro. Só a gente vê.',
    tipo: 'unica',
    opcoes: [
      { value: '0', label: 'Ainda não fatura', score: 0 },
      { value: 'ate-2k', label: 'Até R$2 mil', score: 5 },
      { value: '2-5k', label: 'De R$2 mil a R$5 mil', score: 10 },
      { value: '5-10k', label: 'De R$5 mil a R$10 mil', score: 15 },
      { value: '10-30k', label: 'De R$10 mil a R$30 mil', score: 20 },
      { value: '30k+', label: 'Mais de R$30 mil', score: 20 },
    ],
  },
  {
    id: 'e-time',
    passo: 6,
    trilhas: ['empreendedor'],
    pergunta: 'Você toca isso sozinho?',
    tipo: 'unica',
    opcoes: [
      { value: 'sozinho', label: 'Sozinho, do começo ao fim' },
      { value: 'freelas', label: 'Tenho 1 ou 2 freelas ajudando', score: 5 },
      { value: 'socio', label: 'Tenho sócio', score: 5 },
      { value: 'time', label: 'Tenho time fixo', score: 10 },
    ],
  },
  {
    id: 'e-gargalo',
    passo: 7,
    trilhas: ['empreendedor'],
    pergunta: 'O que mais trava o seu crescimento hoje?',
    tipo: 'unica',
    opcoes: [
      { value: 'clientes', label: 'Conseguir cliente com constância', eco: 'previsibilidade de cliente' },
      { value: 'preco', label: 'Vender caro sem perder a venda', eco: 'preço e proposta' },
      { value: 'entrega', label: 'Dar conta da entrega e da operação', eco: 'operação' },
      { value: 'conteudo', label: 'Aparecer e manter constância de conteúdo', eco: 'constância de conteúdo' },
      { value: 'sozinho', label: 'Não ter com quem trocar antes de decidir', eco: 'decidir sozinho' },
      { value: 'dinheiro', label: 'Organizar o dinheiro do negócio', eco: 'gestão do dinheiro' },
      { value: 'direcao', label: 'Saber qual é o próximo passo', eco: 'falta de direção' },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// PASSOS 3-7 — TRILHA CARREIRA
// ─────────────────────────────────────────────────────────────────────────────

const carreira: Pergunta[] = [
  {
    id: 'c-area',
    passo: 3,
    trilhas: ['carreira'],
    pergunta: 'Em que área você trabalha?',
    tipo: 'unica',
    opcoes: [
      { value: 'tech', label: 'Tecnologia' },
      { value: 'marketing', label: 'Marketing ou comercial' },
      { value: 'admin', label: 'Administrativo ou financeiro' },
      { value: 'saude', label: 'Saúde' },
      { value: 'educacao', label: 'Educação' },
      { value: 'operacional', label: 'Operacional ou indústria' },
      { value: 'varejo', label: 'Varejo ou atendimento' },
      { value: 'outra', label: 'Outra' },
    ],
  },
  {
    id: 'c-salario',
    passo: 4,
    trilhas: ['carreira'],
    pergunta: 'Quanto você recebe por mês hoje?',
    ajuda: 'Só a gente vê.',
    tipo: 'unica',
    opcoes: [
      { value: 'ate-1.5k', label: 'Até R$1.500', score: 0 },
      { value: '1.5-3k', label: 'De R$1.500 a R$3 mil', score: 5 },
      { value: '3-5k', label: 'De R$3 mil a R$5 mil', score: 10 },
      { value: '5-10k', label: 'De R$5 mil a R$10 mil', score: 15 },
      { value: '10k+', label: 'Mais de R$10 mil', score: 20 },
    ],
  },
  {
    id: 'c-porfora',
    passo: 5,
    trilhas: ['carreira'],
    pergunta: 'Você já tenta alguma coisa por fora?',
    tipo: 'unica',
    opcoes: [
      { value: 'renda', label: 'Sim, já tiro uma renda extra', score: 15 },
      { value: 'tentando', label: 'Sim, mas ainda não virou dinheiro', score: 10 },
      { value: 'estudando', label: 'Estou estudando sobre, sem colocar em prática', score: 5 },
      { value: 'nao', label: 'Não, ainda não comecei', score: 0 },
    ],
  },
  {
    id: 'c-objetivo',
    passo: 6,
    trilhas: ['carreira'],
    pergunta: 'Onde você quer estar daqui a 12 meses?',
    tipo: 'unica',
    opcoes: [
      { value: 'renda-extra', label: 'Com uma renda extra rodando, sem largar o CLT', score: 10 },
      { value: 'sair', label: 'Fora do CLT, vivendo do meu próprio negócio', score: 10 },
      { value: 'mudar', label: 'Em outra área — tecnologia, marketing, digital', score: 5 },
      { value: 'subir', label: 'Crescendo dentro da carreira que já tenho', score: 5 },
      { value: 'nao-sei', label: 'Ainda não sei, e é isso que me incomoda', score: 0 },
    ],
  },
  {
    id: 'c-trava',
    passo: 7,
    trilhas: ['carreira'],
    pergunta: 'O que mais te trava hoje?',
    tipo: 'unica',
    opcoes: [
      { value: 'comeco', label: 'Não sei por onde começar', eco: 'não saber por onde começar' },
      { value: 'tempo', label: 'Não sobra tempo depois do trabalho', eco: 'tempo' },
      { value: 'dinheiro', label: 'Não tenho grana pra investir', eco: 'dinheiro pra investir' },
      { value: 'ninguem', label: 'Não conheço ninguém que já fez isso', eco: 'não conhecer ninguém que já fez' },
      { value: 'constancia', label: 'Começo animado e paro no meio', eco: 'constância' },
      { value: 'medo', label: 'Medo de largar o certo pelo duvidoso', eco: 'o risco de largar o certo' },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// PASSOS 3-7 — TRILHA INÍCIO (estudante e quem está em transição)
// É a trilha de quem ainda não tem negócio nem carreira formada: estudante,
// desempregado, quem está trocando de vida. Existe separada porque a objeção
// dessa pessoa é dinheiro e direção, não escala — o resultado e a mentoria
// precisam falar outra coisa.
//
// Chamava "Trilha Base" (de categoria de base) até 10/09/2026. O Lucas não
// entendeu o nome de primeira, e nome que precisa de explicação não sobrevive
// numa tela de resultado: virou "Início".
// ─────────────────────────────────────────────────────────────────────────────

const inicio: Pergunta[] = [
  {
    id: 'i-estudo',
    passo: 3,
    trilhas: ['inicio'],
    pergunta: 'Onde você está nos estudos?',
    tipo: 'unica',
    opcoes: [
      { value: 'medio', label: 'Ensino médio' },
      { value: 'tecnico', label: 'Curso técnico' },
      { value: 'faculdade', label: 'Faculdade em andamento', score: 5 },
      { value: 'formado', label: 'Já formado', score: 5 },
      { value: 'parei', label: 'Parei ou nunca comecei' },
    ],
  },
  {
    id: 'i-renda',
    passo: 4,
    trilhas: ['inicio'],
    pergunta: 'E de trabalho e renda, como está?',
    tipo: 'unica',
    opcoes: [
      { value: 'nada', label: 'Não trabalho hoje', score: 0 },
      { value: 'estagio', label: 'Estágio ou jovem aprendiz', score: 5 },
      { value: 'meio', label: 'Trabalho meio período', score: 5 },
      { value: 'freelas', label: 'Faço freelas e bicos', score: 10 },
      { value: 'ajuda', label: 'Dependo da minha família', score: 0 },
    ],
  },
  {
    id: 'i-tentou',
    passo: 5,
    trilhas: ['inicio'],
    pergunta: 'Você já tentou ganhar dinheiro no digital?',
    tipo: 'unica',
    opcoes: [
      { value: 'ganhei', label: 'Já ganhei meus primeiros reais', score: 15 },
      { value: 'tentei', label: 'Tentei e não deu certo', score: 10 },
      { value: 'estudei', label: 'Só estudei, nunca coloquei em prática', score: 5 },
      { value: 'nunca', label: 'Nunca tentei', score: 0 },
    ],
  },
  {
    id: 'i-objetivo',
    passo: 6,
    trilhas: ['inicio'],
    pergunta: 'O que você quer que aconteça primeiro?',
    tipo: 'unica',
    opcoes: [
      { value: 'primeira-renda', label: 'Fazer meu primeiro dinheiro no digital', score: 10 },
      { value: 'negocio', label: 'Montar um negócio meu', score: 10 },
      { value: 'emprego', label: 'Conseguir um estágio ou emprego melhor', score: 5 },
      { value: 'direcao', label: 'Descobrir com o que eu quero trabalhar', score: 0 },
    ],
  },
  {
    id: 'i-trava',
    passo: 7,
    trilhas: ['inicio'],
    pergunta: 'O que mais te trava hoje?',
    tipo: 'unica',
    opcoes: [
      { value: 'comeco', label: 'Não sei por onde começar', eco: 'não saber por onde começar' },
      { value: 'dinheiro', label: 'Não tenho dinheiro pra investir', eco: 'dinheiro pra investir' },
      { value: 'ninguem', label: 'Ninguém do meu círculo faz isso', eco: 'estar cercado de quem não faz isso' },
      { value: 'constancia', label: 'Começo e paro', eco: 'constância' },
      { value: 'medo', label: 'Medo de tentar e não dar certo', eco: 'o medo de tentar' },
      { value: 'tempo', label: 'Faculdade e trabalho comem meu tempo', eco: 'tempo' },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// PASSOS 8-11 — COMUM A TODAS AS TRILHAS
// ─────────────────────────────────────────────────────────────────────────────

const comuns: Pergunta[] = [
  {
    id: 'erros',
    passo: 8,
    pergunta: 'O que já te custou mais tempo até aqui?',
    ajuda: 'Escolha até 2. Ninguém aqui acertou de primeira.',
    tipo: 'multipla',
    max: 2,
    opcoes: [
      { value: 'pulei', label: 'Pulei de projeto em projeto' },
      { value: 'curso', label: 'Comprei curso e não apliquei' },
      { value: 'sozinho', label: 'Tentei fazer tudo sozinho' },
      { value: 'estudar', label: 'Estudei muito e vendi pouco' },
      { value: 'aparecer', label: 'Deixei de aparecer com medo do julgamento' },
      { value: 'constancia', label: 'Não mantive constância' },
      { value: 'demorei', label: 'Demorei demais pra começar' },
    ],
  },
  {
    id: 'temas',
    passo: 9,
    pergunta: 'O que você quer aprender dentro da liga?',
    ajuda: 'Até 3. Entra na conta do que a gente grava primeiro.',
    tipo: 'multipla',
    max: 3,
    opcoes: [
      { value: 'marketing', label: 'Marketing' },
      { value: 'trafego', label: 'Tráfego pago' },
      { value: 'vendas', label: 'Vendas' },
      { value: 'ia', label: 'Inteligência artificial' },
      { value: 'agencia', label: 'Criação de agência' },
      { value: 'negocios', label: 'Negócios e gestão' },
      { value: 'posicionamento', label: 'Posicionamento' },
      { value: 'conteudo', label: 'Conteúdo e filmmaking' },
      { value: 'cripto', label: 'Cripto e trade' },
      { value: 'empreendedorismo', label: 'Empreendedorismo' },
    ],
  },
  {
    id: 'tempo-semana',
    passo: 10,
    pergunta: 'Quantas horas por semana você consegue reservar pra isso?',
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
    id: 'investimento',
    passo: 11,
    // O preço já está na landing. Repetir aqui, antes do resultado, é o que
    // separa lead qualificado de curioso — e cumpre a promessa da seção
    // "Antes de você entrar": avisar cedo em vez de empurrar pro checkout.
    pergunta: `A primeira turma custa ${PRICE}. Sendo honesto, isso pra você é:`,
    tipo: 'unica',
    opcoes: [
      { value: 'tranquilo', label: 'Tranquilo. Se fizer sentido, eu entro', score: 40 },
      { value: 'entender', label: 'Consigo, mas quero entender bem o que recebo', score: 30 },
      { value: 'apertado', label: 'É apertado, mas eu dou um jeito', score: 15 },
      { value: 'nao', label: 'Não tenho como agora', saida: 'espera-investimento' },
    ],
  },
]

export const perguntas: Pergunta[] = [idade, momento, ...empreendedor, ...carreira, ...inicio, ...comuns]

/** As 11 perguntas de uma trilha, em ordem. */
export const perguntasDaTrilha = (trilha: Trilha): Pergunta[] =>
  perguntas.filter((p) => !p.trilhas || p.trilhas.includes(trilha)).sort((a, b) => a.passo - b.passo)

// ─────────────────────────────────────────────────────────────────────────────
// FICHA DO ELENCO — uma tela só, três seletores, nada de digitação.
// Nada aqui qualifica ou reprova ninguém. É segmentação: cidade pro encontro
// presencial e pro globo do site, formação pro nível de conteúdo, viagem pro
// produto de viagem em grupo que o Lucas quer lançar depois.
// Se a peneira precisar encurtar, esta é a primeira tela a cair.
// ─────────────────────────────────────────────────────────────────────────────

export const ficha = {
  titulo: 'Última coisa antes do resultado.',
  ajuda: 'Três toques e acabou.',
  campos: [
    {
      id: 'estado',
      label: 'De onde você é?',
      tipo: 'estado' as const, // UF + "Fora do Brasil"
    },
    {
      id: 'formacao',
      label: 'Sua formação',
      tipo: 'select' as const,
      // Quem veio pela trilha início já respondeu isso no passo 3.
      ocultarNasTrilhas: ['inicio'] as Trilha[],
      opcoes: [
        { value: 'medio', label: 'Ensino médio' },
        { value: 'tecnico', label: 'Técnico' },
        { value: 'superior-cursando', label: 'Superior em andamento' },
        { value: 'superior', label: 'Superior completo' },
        { value: 'pos', label: 'Pós ou MBA' },
        { value: 'autodidata', label: 'Sem diploma, aprendi na prática' },
      ],
    },
    {
      id: 'viagem',
      label: 'Você já saiu do Brasil?',
      tipo: 'select' as const,
      opcoes: [
        { value: 'nunca', label: 'Nunca saí' },
        { value: 'passeio', label: 'Já viajei a passeio' },
        { value: 'frequencia', label: 'Viajo com frequência' },
        { value: 'morei', label: 'Já morei fora' },
      ],
    },
  ],
} as const

// ─────────────────────────────────────────────────────────────────────────────
// CONTATO — dois campos. E-mail sai no checkout, não aqui: cada campo a mais
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
  cta?: string
  rodape?: string
}

export const resultados: Record<string, Resultado> = {
  empreendedor: {
    aprovado: true,
    eyebrow: 'Peneira concluída',
    headline: { before: 'Você entra pela ', accent: 'Trilha Empreendedor', after: '.' },
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
    cta: CTA_LABEL_OFERTA,
  },

  carreira: {
    aprovado: true,
    eyebrow: 'Peneira concluída',
    headline: { before: 'Você entra pela ', accent: 'Trilha Carreira', after: '.' },
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
    cta: CTA_LABEL_OFERTA,
  },

  inicio: {
    aprovado: true,
    eyebrow: 'Peneira concluída',
    headline: { before: 'Você entra pela ', accent: 'Trilha Início', after: '.' },
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
    cta: CTA_LABEL_OFERTA,
  },

  // ── Saídas ────────────────────────────────────────────────────────────────
  // Nenhuma tem botão de compra. Se tivesse, a peneira seria enfeite.

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

  'espera-investimento': {
    aprovado: false,
    eyebrow: 'Peneira concluída',
    headline: { before: 'Melhor a gente ser ', accent: 'direto', after: '.' },
    leitura:
      'Você tem perfil. O que não bate é o momento — e entrar numa liga apertando o orçamento é a pior forma de começar. A gente prefere te falar isso agora do que te ver pedindo reembolso em 7 dias.',
    bullets: [
      {
        titulo: 'Lista de espera',
        body: 'Quando abrir a próxima turma, você recebe o aviso antes da página ir ao ar.',
      },
      {
        titulo: 'Enquanto isso',
        body: 'Segue a gente no Instagram. O que dá pra entregar de graça, a gente entrega lá.',
      },
    ],
    rodape: 'Sua vaga não some. Ela só espera o seu momento.',
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// LEAD SCORE — interno. Não muda o resultado que a pessoa vê; muda a ordem em
// que o Khayllan e o Lucas chamam no WhatsApp. Com ~20 vagas, atender na ordem
// de chegada é desperdiçar agenda.
//
// A escala não é 0-100: o teto real fica em ~120-125 e varia um pouco por
// trilha, porque as perguntas do miolo não valem o mesmo. Isso é de propósito —
// quem empreende e fatura pontua mais que quem está começando, e é essa a ordem
// de atendimento que se quer. Comparar dentro da mesma trilha é o uso honesto.
// ─────────────────────────────────────────────────────────────────────────────

export type Temperatura = 'quente' | 'morno' | 'frio'

export const classificar = (score: number): Temperatura =>
  score >= 70 ? 'quente' : score >= 45 ? 'morno' : 'frio'

/** Soma os pontos das opções escolhidas. Multiplas contam só a de maior peso. */
export const somarScore = (respostas: Record<string, string | string[]>): number =>
  perguntas.reduce((total, p) => {
    const escolha = respostas[p.id]
    if (!escolha) return total
    const valores = Array.isArray(escolha) ? escolha : [escolha]
    const pontos = p.opcoes.filter((o) => valores.includes(o.value)).map((o) => o.score ?? 0)
    return total + (pontos.length ? Math.max(...pontos) : 0)
  }, 0)
