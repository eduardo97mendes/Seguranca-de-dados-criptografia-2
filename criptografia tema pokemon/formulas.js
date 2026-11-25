// Dica de fórmula por atividade: mostra a regra e como aplicar, sem entregar a resposta final.
const modTip = 'mod 26 = resto da divisão por 26. Passou de 25? Subtraia 26. Ficou negativo? Some 26.';

export const legends = {
  atbash: 'x = valor da letra original · y = valor da letra cifrada · A=0 … Z=25',
  rail: 'i = posição da letra (começa em 0) · t = número de trilhos',
  vigenere: 'x = letra da mensagem · k = letra da chave · y = letra cifrada · A=0 … Z=25',
  affine: 'x = letra original · y = letra cifrada · a = multiplicador · b = deslocamento · a⁻¹ = inverso de a',
  rsa: 'm = número original · c = número cifrado · n, e = chave pública · d = chave privada'
};

export const formulas = {
  // Atbash
  a1: {f: 'y = 25 − x', steps: ['Ache o valor x de cada letra na tabela A=0 … Z=25.', 'Calcule 25 − x.', 'Troque o resultado y pela letra. Ex.: L = 11 → 25 − 11 = 14 → O.']},
  a2: {f: '1ª vez: y = 25 − x  ·  2ª vez: z = 25 − y', steps: ['Escolha uma letra qualquer e aplique a fórmula duas vezes.', 'Compare z com o x do começo.', 'Teste com outra letra para confirmar.']},
  a3: {f: 'x = 25 − y', steps: ['Decifrar usa a mesma conta: 25 − valor da letra.', 'Ex.: V = 21 → 25 − 21 = 4 → E.', 'Faça letra por letra e junte a palavra.']},
  a4: {f: 'y = 25 − x', steps: ['Calcule cada letra separadamente.', 'Letras iguais têm o mesmo x, então dão o mesmo y.', 'Confira se as duas letras D viraram a mesma letra.']},
  a5: {f: 'mesma letra x → mesmo resultado 25 − x', steps: ['Compare as posições onde a letra se repete, antes e depois.', 'Pergunte: a repetição continua aparecendo na mensagem cifrada?']},
  a6: {f: 'x = 25 − y', steps: ['Ache o valor y de cada letra do bilhete.', 'Calcule 25 − y e troque pela letra.', 'Ex.: H = 7 → 25 − 7 = 18 → S.']},
  // Trilhos
  r1: {f: 'ciclo = 2 × (t − 1) = 4  ·  r = i mod 4  ·  trilho = r (se r < 3) ou 4 − r', steps: ['Calcule o trilho de cada posição i = 0 … 7 e conte quantas casas cada trilho tem.', 'Corte o texto cifrado nessas quantidades: trilho 1, depois 2, depois 3.', 'Leia seguindo o zigue-zague 1, 2, 3, 2, 1, 2, 3, 2.']},
  r2: {f: 'ciclo = 2 × (3 − 1) = 4  ·  r = i mod 4  ·  trilho = r (se r < 3) ou 4 − r', steps: ['Numere as letras a partir de 0 e calcule o trilho de cada uma.', 'Escreva as letras de cada trilho em uma linha do rascunho.', 'Junte as linhas de cima para baixo.']},
  r3: {f: 'ciclo = 2 × (2 − 1) = 2  ·  trilho = i mod 2', steps: ['i par (0, 2, 4…) vai para o trilho de cima; i ímpar, para o de baixo.', 'Junte o trilho de cima e depois o de baixo.']},
  r4: {f: 'cima = ⌈n ÷ 2⌉  ·  baixo = ⌊n ÷ 2⌋  (n = 7 letras)', steps: ['Calcule quantas letras ficam em cada trilho: 7 ÷ 2 = 3,5 → 4 em cima e 3 embaixo.', 'Separe o texto nesses dois pedaços.', 'Intercale: 1ª de cima, 1ª de baixo, 2ª de cima…']},
  r5: {f: 'ciclo = 2 × (4 − 1) = 6  ·  r = i mod 6  ·  trilho = r (se r < 4) ou 6 − r', steps: ['Calcule o trilho de cada posição i = 0 … 6.', 'Escreva as letras de cada trilho em uma linha.', 'Junte as linhas de cima para baixo.']},
  r6: {f: 'quantidade de cada letra antes = quantidade depois?', steps: ['Conte as letras de uma mensagem e da sua versão cifrada.', 'Compare o que mudou: a letra ou o lugar?']},
  // Vigenère
  v1: {f: 'y = (x + k) mod 26', steps: ['Alinhe a chave embaixo da mensagem, repetindo se precisar.', 'Some x + k de cada coluna.', modTip]},
  v2: {f: 'y = (x + k) mod 26,  com x = A = 0', steps: ['Alinhe SOLSOL embaixo de AAAAAA.', 'Some 0 + k em cada coluna.', 'No rascunho, compare as letras da chave nas posições 1 e 4.']},
  v3: {f: 'x = (y − k) mod 26', steps: ['Alinhe a chave embaixo do texto cifrado.', 'Subtraia y − k em cada coluna.', 'Deu negativo? Some 26. Ex.: 3 − 18 = −15 → −15 + 26 = 11 → L.']},
  v4: {f: 'y = (x + k) mod 26', steps: ['Repita a chave até ter o mesmo tamanho da mensagem.', 'Some x + k em cada coluna.', modTip]},
  v5: {f: 'x = (y − k) mod 26', steps: ['Repita a chave até ter o mesmo tamanho do texto cifrado.', 'Subtraia y − k em cada coluna.', 'Deu negativo? Some 26.']},
  v6: {f: 'k da posição i = chave[i mod tamanho da chave]', steps: ['A chave volta ao começo depois da última letra.', 'Pense no que isso faz com letras iguais em posições que se repetem.']},
  // Cifra afim
  f1: {f: 'y = (5 × x + 8) mod 26', steps: ['Multiplique o valor da letra por 5 e some 8.', 'Tire 26 quantas vezes couber (resto da divisão).', 'Ex.: S = 18 → 5 × 18 + 8 = 98 → 98 − 3 × 26 = 20 → U.']},
  f3: {f: 'x = 21 × (y − 8) mod 26', steps: ['Subtraia 8 do valor da letra. Se der negativo, some 26.', 'Multiplique por 21.', 'Calcule o resto por 26 e troque pela letra.']},
  f4: {f: 'y = (3 × x + 4) mod 26', steps: ['Multiplique o valor da letra por 3 e some 4.', 'Calcule o resto por 26.', 'Ex.: A = 0 → 3 × 0 + 4 = 4 → E.']},
  f5: {f: 'x = 15 × (y − 3) mod 26', steps: ['Subtraia 3 do valor da letra. Se der negativo, some 26.', 'Multiplique por 15 e calcule o resto por 26.', 'Por que 15? Porque 7 × 15 = 105 e 105 mod 26 = 1.']},
  f2: {f: '(2 × x + 8) mod 26 = 8', steps: ['A letra I vale 8, então procure outro x com o mesmo resultado.', 'Teste valores de x: quando 2 × x vira múltiplo de 26?', 'Troque o x encontrado pela letra.']},
  f6: {f: 'a tem inverso ⇔ MDC(a, 26) = 1', steps: ['26 = 2 × 13. Descarte o a que for par ou múltiplo de 13.', 'Confirme: existe um número que, vezes a, dá resto 1 por 26?']},
  // RSA
  s1: {f: 'c = mᵉ mod n = 4³ mod 33', steps: ['Calcule a potência: 4 × 4 × 4.', 'Divida por 33 e fique com o resto.']},
  s2: {f: '(e × d) mod 20 = 1', steps: ['Multiplique 3 por cada alternativa.', 'Divida o resultado por 20: o resto precisa ser 1.']},
  s3: {f: 'm = cᵈ mod n = 8⁷ mod 33', steps: ['Quebre o expoente: 7 = 4 + 2 + 1, então 8⁷ = 8⁴ × 8² × 8¹.', 'Calcule cada parte com resto por 33.', 'Multiplique as partes e tire o resto por 33 de novo.']},
  s4: {f: 'c = mᵉ mod n = 5³ mod 33', steps: ['Calcule a potência: 5 × 5 × 5.', 'Divida por 33 e fique com o resto.']},
  s5: {f: 'm = cᵈ mod n = 17⁷ mod 33', steps: ['Quebre o expoente: 7 = 4 + 2 + 1.', 'Use 17² mod 33 e 17⁴ mod 33, como na dica.', 'Multiplique 17⁴ × 17² × 17 com restos por 33.']},
  s6: {f: 'cifrar: c = mᵉ mod n', steps: ['Veja quais valores aparecem na fórmula de quem envia.', 'Esses são os que podem ser divulgados.']}
};

// Conta montada: a 1ª linha resolvida (exemplo) nas atividades guiadas; o resto com espaços para completar.
export const montadas = {
 "a1": [
  [
   "L 11 → 25 − 11 = 14 → O",
   1
  ],
  [
   "U 20 → 25 − 20 = ___ → ___",
   0
  ],
  [
   "Z 25 → 25 − 25 = ___ → ___",
   0
  ]
 ],
 "a3": [
  [
   "V 21 → 25 − 21 = ___ → ___",
   0
  ],
  [
   "H 7 → 25 − 7 = ___ → ___",
   0
  ],
  [
   "X 23 → 25 − 23 = ___ → ___",
   0
  ],
  [
   "L 11 → 25 − 11 = ___ → ___",
   0
  ],
  [
   "O 14 → 25 − 14 = ___ → ___",
   0
  ],
  [
   "Z 25 → 25 − 25 = ___ → ___",
   0
  ]
 ],
 "a4": [
  [
   "D 3 → 25 − 3 = ___ → ___",
   0
  ],
  [
   "A 0 → 25 − 0 = ___ → ___",
   0
  ],
  [
   "D 3 → 25 − 3 = ___ → ___",
   0
  ],
  [
   "O 14 → 25 − 14 = ___ → ___",
   0
  ]
 ],
 "r1": [
  [
   "8 letras · caminho dos trilhos: 1, 2, 3, 2, 1, 2, 3, 2",
   1
  ],
  [
   "casas: trilho 1 = 2 · trilho 2 = 4 · trilho 3 = 2",
   1
  ],
  [
   "separe o texto: MA | ESGM | NE",
   1
  ],
  [
   "leia na ordem do caminho: M (T1) → E (T2) → N (T3) → ___ …",
   0
  ]
 ],
 "r2": [
  [
   "C R I P T O G R A F I A",
   1
  ],
  [
   "caminho: 1 2 3 2 1 2 3 2 1 2 3 2",
   1
  ],
  [
   "trilho 1: C T ___",
   0
  ],
  [
   "trilho 2: R P ___ ___ ___ ___",
   0
  ],
  [
   "trilho 3: I ___ ___",
   0
  ],
  [
   "resposta = trilho 1 + trilho 2 + trilho 3",
   1
  ]
 ],
 "r3": [
  [
   "E S C O L A · caminho: cima, baixo, cima, baixo…",
   1
  ],
  [
   "cima: ___ ___ ___",
   0
  ],
  [
   "baixo: ___ ___ ___",
   0
  ],
  [
   "resposta = cima + baixo",
   1
  ]
 ],
 "r4": [
  [
   "7 letras: cima = 4 casas, baixo = 3 casas",
   1
  ],
  [
   "cima: ___ ___ ___ ___",
   0
  ],
  [
   "baixo: ___ ___ ___",
   0
  ],
  [
   "leia alternando: cima, baixo, cima, baixo…",
   1
  ]
 ],
 "v1": [
  [
   "L 11 + S 18 = 29 → 29 − 26 = 3 → D",
   1
  ],
  [
   "U 20 + O 14 = ___ → ___",
   0
  ],
  [
   "A 0 + L 11 = ___ → ___",
   0
  ]
 ],
 "v2": [
  [
   "A 0 + S 18 = 18 → S",
   1
  ],
  [
   "A 0 + O 14 = ___ → ___",
   0
  ],
  [
   "A 0 + L 11 = ___ → ___",
   0
  ],
  [
   "A 0 + S 18 = ___ → ___",
   0
  ],
  [
   "A 0 + O 14 = ___ → ___",
   0
  ],
  [
   "A 0 + L 11 = ___ → ___",
   0
  ]
 ],
 "v3": [
  [
   "D 3 − S 18 = ___ → ___",
   0
  ],
  [
   "W 22 − O 14 = ___ → ___",
   0
  ],
  [
   "G 6 − L 11 = ___ → ___",
   0
  ],
  [
   "J 9 − S 18 = ___ → ___",
   0
  ],
  [
   "C 2 − O 14 = ___ → ___",
   0
  ]
 ],
 "v4": [
  [
   "S 18 + L 11 = ___ → ___",
   0
  ],
  [
   "E 4 + U 20 = ___ → ___",
   0
  ],
  [
   "G 6 + A 0 = ___ → ___",
   0
  ],
  [
   "R 17 + L 11 = ___ → ___",
   0
  ],
  [
   "E 4 + U 20 = ___ → ___",
   0
  ],
  [
   "D 3 + A 0 = ___ → ___",
   0
  ],
  [
   "O 14 + L 11 = ___ → ___",
   0
  ]
 ],
 "f1": [
  [
   "S 18: 5 × 18 + 8 = 98 → resto por 26 = 20 → U",
   1
  ],
  [
   "O 14: 5 × 14 + 8 = ___ → resto por 26 = ___ → ___",
   0
  ],
  [
   "L 11: 5 × 11 + 8 = ___ → resto por 26 = ___ → ___",
   0
  ]
 ],
 "f3": [
  [
   "I 8: 8 − 8 = 0 → 21 × 0 = 0 → resto por 26 = 0 → A",
   1
  ],
  [
   "Q 16: 16 − 8 = ___ (negativo? +26) → 21 × ___ → resto por 26 = ___ → ___",
   0
  ],
  [
   "W 22: 22 − 8 = ___ (negativo? +26) → 21 × ___ → resto por 26 = ___ → ___",
   0
  ],
  [
   "M 12: 12 − 8 = ___ (negativo? +26) → 21 × ___ → resto por 26 = ___ → ___",
   0
  ],
  [
   "A 0: 0 − 8 = ___ (negativo? +26) → 21 × ___ → resto por 26 = ___ → ___",
   0
  ],
  [
   "U 20: 20 − 8 = ___ (negativo? +26) → 21 × ___ → resto por 26 = ___ → ___",
   0
  ]
 ],
 "f4": [
  [
   "A 0: 3 × 0 + 4 = ___ → resto por 26 = ___ → ___",
   0
  ],
  [
   "U 20: 3 × 20 + 4 = ___ → resto por 26 = ___ → ___",
   0
  ],
  [
   "L 11: 3 × 11 + 4 = ___ → resto por 26 = ___ → ___",
   0
  ],
  [
   "A 0: 3 × 0 + 4 = ___ → resto por 26 = ___ → ___",
   0
  ]
 ],
 "f5": [
  [
   "S 18: 18 − 3 = ___ (negativo? +26) → 15 × ___ → resto por 26 = ___ → ___",
   0
  ],
  [
   "X 23: 23 − 3 = ___ (negativo? +26) → 15 × ___ → resto por 26 = ___ → ___",
   0
  ],
  [
   "G 6: 6 − 3 = ___ (negativo? +26) → 15 × ___ → resto por 26 = ___ → ___",
   0
  ],
  [
   "D 3: 3 − 3 = ___ (negativo? +26) → 15 × ___ → resto por 26 = ___ → ___",
   0
  ]
 ],
 "s1": [
  [
   "4³ = 4 × 4 × 4 = ___",
   0
  ],
  [
   "___ ÷ 33: fique com o resto → c = ___",
   0
  ]
 ],
 "s3": [
  [
   "8² = 64 → resto por 33 = ___",
   0
  ],
  [
   "8⁴ = (8²)² → (___)² → resto por 33 = ___",
   0
  ],
  [
   "7 = 4 + 2 + 1 → 8⁷ = 8⁴ × 8² × 8",
   1
  ],
  [
   "___ × ___ × 8 → resto por 33 = ___",
   0
  ]
 ],
 "s4": [
  [
   "5³ = 5 × 5 × 5 = ___",
   0
  ],
  [
   "___ ÷ 33: fique com o resto → c = ___",
   0
  ]
 ]
};
