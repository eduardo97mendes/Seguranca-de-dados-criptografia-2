export const missions = [
  {
    "pokemon": "Pikachu",
    "title": "Ginásio do espelho",
    "story": "Pikachu encontrou um bilhete refletido no espelho do laboratório. Para ler, troque cada letra pelo seu par no alfabeto invertido. O espelho ajuda a lembrar da regra; quem faz a transformação é a tabela A–Z.",
    "plain": "PIKACHU",
    "result": "KRPZXSF",
    "steps": [
      "Escreva A–Z e, abaixo, Z–A.",
      "Procure P na primeira linha: seu par é K. I encontra R e K encontra P.",
      "Continue: A→Z, C→X, H→S, U→F. Na volta, use os mesmos pares."
    ],
    "check": "PIKACHU"
  },
  {
    "pokemon": "Squirtle",
    "title": "Ginásio das rotas",
    "story": "Squirtle leva as letras por duas rotas aquáticas. Ele coloca uma letra na rota de cima e outra na de baixo, alternadamente. Ao enviar, junta primeiro a rota de cima e depois a de baixo: isso é uma transposição.",
    "plain": "SQUIRTLE",
    "result": "SURLQITE",
    "steps": [
      "Numere S Q U I R T L E de 1 a 8. As posições ímpares vão para o trilho 1: SURL.",
      "As posições pares vão para o trilho 2: QITE. Junte SURL | QITE → SURLQITE.",
      "Para voltar, separe 4 letras para cada trilho e intercale: S, Q, U, I, R, T, L, E."
    ],
    "check": "SQUIRTLE"
  },
  {
    "pokemon": "Bulbasaur",
    "title": "Ginásio da palavra-chave",
    "story": "Bulbasaur combina com seu treinador a chave SOL. Cada letra da chave manda avançar uma quantidade diferente no alfabeto. Quando SOL acaba, começa de novo. É como usar uma sequência de cifras de César.",
    "plain": "EEVEE",
    "result": "WSGWS",
    "steps": [
      "Alinhe EEVEE com SOLSO. Use A=0: E=4, V=21, S=18, O=14, L=11.",
      "Some por coluna: 4+18=22 (W); 4+14=18 (S); 21+11=32, cujo resto por 26 é 6 (G). Continue: 4+18=22 (W), 4+14=18 (S).",
      "Resultado: WSGWS. Para voltar, subtraia SOLSO. Por exemplo, 6−11=−5; somar 26 dá 21=V."
    ],
    "check": "EEVEE"
  },
  {
    "pokemon": "Charmander",
    "title": "Ginásio dos dois números",
    "story": "Charmander usa uma máquina com dois ajustes: multiplicar por 5 e somar 8. Cada letra vira um número antes de entrar. Para sair, pegamos o resto por 26. Não basta dividir por 5 para fazer a volta: precisamos do inverso modular.",
    "plain": "MEW",
    "result": "QCO",
    "steps": [
      "M=12: 5×12+8=68. Como 68=2×26+16, a saída é 16=Q.",
      "E=4 vira 28 mod 26=2=C. W=22 vira 118 mod 26=14=O. Assim, MEW → QCO.",
      "Para decifrar, subtraia 8 e multiplique por 21, sempre módulo 26. 21 é o inverso de 5 porque 5×21=105=4×26+1."
    ],
    "check": "MEW"
  },
  {
    "pokemon": "Mewtwo",
    "title": "Ginásio das duas chaves",
    "story": "Mewtwo divulga uma chave para os treinadores enviarem números e guarda outra para abrir as mensagens. Essa é a ideia de chave pública e privada. A metáfora da caixa ajuda, mas o mecanismo aqui são potências e restos.",
    "plain": "7",
    "result": "13",
    "steps": [
      "Neste modelo, a mensagem é um número de 0 a 32. Use m=7 como código de uma missão, sem transformar nomes em números.",
      "A chave pública (n=33, e=3) dá 7³=343=10×33+13. Envie 13.",
      "A chave privada (n=33, d=7) recupera 13⁷ mod 33=7. Todos os valores ficam visíveis aqui para estudar; este modelo pequeno não oferece segurança real."
    ],
    "check": null
  }
];
