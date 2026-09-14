// Copy da política de privacidade. Separada do content.ts porque não é landing:
// é compromisso legal, e mudar uma linha aqui muda o que a gente promete fazer
// com o dado de quem passou pela peneira.
//
// Regras:
// - Tem que descrever o que o código FAZ. Se a peneira passar a coletar um campo
//   novo, ou se entrar pixel de anúncio, esta página muda no mesmo commit — e a
//   data de atualização junto.
// - `{email}` vira link de e-mail na renderização.
// - Nunca "comunidade", sempre "liga" — vale aqui também.

export type SecaoPrivacidade = {
  titulo: string
  paragrafos?: string[]
  itens?: string[]
  /** Parágrafos que vêm depois da lista. */
  fecho?: string[]
}

export const privacidade = {
  titulo: 'Política de privacidade',
  atualizacao: '13 de setembro de 2026',
  resumo:
    'Em uma frase: a gente guarda o que você responde na peneira e o seu contato, usa isso pra avaliar sua entrada e falar com você pelo WhatsApp, e não vende nem repassa seus dados pra ninguém fazer propaganda.',
  secoes: [
    {
      titulo: 'Quem cuida dos seus dados',
      paragrafos: [
        'Este site é da Elevate League, a liga criada por Khayllan Martins e Lucas Quintino. É a Elevate League que decide o que é feito com os dados descritos aqui. Na linguagem da LGPD, é a controladora.',
        'Qualquer dúvida sobre esta política ou sobre os seus dados, fale com a gente em {email}.',
      ],
    },
    {
      titulo: 'O que coletamos',
      itens: [
        'Suas respostas da peneira: idade, o que você faz hoje, sua renda ou faturamento (depende da trilha), o que te trava, horas por semana e como você enxerga o investimento. Se você marcar "Outro", guardamos também o que escreveu.',
        'Seu contato: nome e WhatsApp. Pelo DDD, anotamos também o seu estado.',
        'A origem da visita, quando o link trouxer: parâmetros de campanha (como utm_source) e identificadores de clique do Google e do Meta.',
      ],
      fecho: [
        'Não pedimos CPF, endereço nem dados de cartão. O pagamento acontece na plataforma de checkout, que tem a política de privacidade dela.',
      ],
    },
    {
      titulo: 'Pra que usamos',
      itens: [
        'Avaliar se a liga faz sentido pra você e em qual trilha você entra.',
        'Mostrar o seu resultado e falar com você pelo WhatsApp sobre a sua entrada, a lista de espera ou as próximas turmas.',
        'Organizar a ordem de atendimento, já que a agenda das mentorias é limitada.',
        'Entender quais campanhas trazem as pessoas certas pra liga.',
      ],
      fecho: ['Nada disso muda o preço ou as condições que aparecem pra você.'],
    },
    {
      titulo: 'Com base em quê',
      paragrafos: [
        'Usamos esses dados com o seu consentimento, que você dá na última tela da peneira (art. 7º, I, da LGPD), e porque eles são necessários pra avaliar a sua entrada, um passo anterior à contratação que você mesmo pediu (art. 7º, V).',
      ],
    },
    {
      titulo: 'Com quem compartilhamos',
      itens: [
        'Google: as respostas ficam numa planilha do Google, com acesso restrito aos fundadores. Os servidores do Google podem ficar fora do Brasil.',
        'Plataforma de pagamento: se você clicar pra ir ao checkout, seu nome e seu WhatsApp seguem no link, só pra você não precisar digitar tudo de novo.',
        'WhatsApp: a conversa com a gente acontece lá, sob as regras do próprio aplicativo.',
      ],
      fecho: ['Não vendemos, não alugamos e não cedemos seus dados pra terceiros fazerem publicidade.'],
    },
    {
      titulo: 'Por quanto tempo guardamos',
      paragrafos: [
        'Enquanto a sua entrada na liga estiver em conversa e por até 2 anos depois do último contato com você. Se você pedir a exclusão antes disso, a gente apaga, exceto o que a lei obrigar a guardar.',
      ],
    },
    {
      titulo: 'Seus direitos',
      paragrafos: ['A qualquer momento, você pode pedir pra:'],
      itens: [
        'Confirmar se temos dados seus e ver quais são.',
        'Corrigir o que estiver incompleto ou errado.',
        'Apagar, bloquear ou anonimizar seus dados.',
        'Receber seus dados pra levar a outro serviço.',
        'Saber com quem compartilhamos.',
        'Retirar o seu consentimento.',
      ],
      fecho: [
        'É só mandar um e-mail pra {email} com o nome e o WhatsApp que você usou na peneira. Respondemos em até 15 dias. Se achar que a gente não resolveu, você também pode reclamar à ANPD, a Autoridade Nacional de Proteção de Dados.',
      ],
    },
    {
      titulo: 'Cookies',
      paragrafos: [
        'Hoje o site não usa cookies de publicidade nem de análise. Ele só usa o armazenamento de sessão do navegador pra lembrar de qual campanha você veio enquanto passa da página pra peneira, e isso some quando você fecha a aba.',
        'Se isso mudar, esta política muda antes, e o site passa a pedir a sua permissão.',
      ],
    },
    {
      titulo: 'Menores de idade',
      paragrafos: [
        'A liga é pra maiores de 18 anos. Quem responde que tem menos que isso tem a peneira encerrada na primeira pergunta, antes de qualquer dado de contato ser pedido.',
      ],
    },
    {
      titulo: 'Segurança',
      paragrafos: [
        'Só os fundadores acessam as respostas. Nenhum sistema é 100% seguro. Se acontecer algum incidente que possa te afetar, a gente avisa você e a ANPD.',
      ],
    },
    {
      titulo: 'Mudanças nesta política',
      paragrafos: [
        'Quando esta política mudar, a data de atualização no topo da página muda junto.',
      ],
    },
  ] satisfies SecaoPrivacidade[],
} as const
