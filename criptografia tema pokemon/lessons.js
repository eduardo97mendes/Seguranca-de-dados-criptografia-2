export const lessons = [
{
 id:'atbash',number:'01',name:'Atbash',subtitle:'O alfabeto no espelho',level:'Ponte de revisão',difficulty:1,time:'10–15 min',tag:'SUBSTITUIÇÃO',intro:'Um último olhar para a substituição antes de seguir em frente: cada letra encontra seu par no alfabeto invertido.',concept:'César desloca o alfabeto; Atbash o espelha. A troca é fixa: A ↔ Z, B ↔ Y, C ↔ X. Não há uma chave escolhida pelo usuário nesta versão.',prereq:'Reconhecer letras e consultar uma tabela.',encrypt:['Escreva o alfabeto A–Z em uma linha.','Logo abaixo, escreva Z–A.','Troque cada letra de cima pela letra correspondente de baixo.'],decrypt:['Use a mesma tabela espelhada.','Para cada letra cifrada, encontre seu par.','Aplicar Atbash novamente recupera a mensagem.'],example:'SOL → HLO → SOL',detail:'S está ligado a H; O está ligado a L; L está ligado a O. A mesma troca funciona na volta.',formula:'y = 25 − x',limit:'É uma revisão, não um salto de segurança. A substituição é fixa e preserva padrões e repetições do texto.',question:'Se aplicar a troca duas vezes, por que o segredo desaparece?',activities:[
  {
    "id": "a1",
    "level": "Guiado",
    "type": "Cifre no espelho",
    "prompt": "Treino guiado: cifre LUZ com Atbash. Consulte os pares do alfabeto invertido.",
    "kind": "text",
    "answer": "OFA",
    "hint": "L encontra O. U encontra F. Falta descobrir o par de Z.",
    "solution": "L→O, U→F, Z→A. Resultado: OFA. Para conferir a volta, O→L, F→U, A→Z."
  },
  {
    "id": "a2",
    "level": "Guiado",
    "type": "Preveja o resultado",
    "prompt": "O que acontece quando aplicamos Atbash duas vezes à mesma mensagem?",
    "kind": "choice",
    "options": [
      "Recuperamos a mensagem original.",
      "Deslocamos todas as letras duas posições.",
      "Todas as letras viram A.",
      "A ordem das letras é invertida."
    ],
    "correct": 0,
    "hint": "Observe A→Z. O que acontece com Z na segunda aplicação?",
    "solution": "A mensagem original retorna: cada par é trocado de volta. Por exemplo, A→Z→A. Na fórmula: 25 − (25 − x) = x."
  },
  {
    "id": "a3",
    "level": "Prática",
    "type": "Decifre o bilhete",
    "prompt": "Decifre VHXLOZ com Atbash. Digite somente a palavra recuperada.",
    "kind": "text",
    "answer": "ESCOLA",
    "hint": "Use os mesmos pares para decifrar: V encontra E e H encontra S.",
    "solution": "V→E, H→S, X→C, L→O, O→L, Z→A. A mensagem é ESCOLA."
  },
  {
    "id": "a4",
    "level": "Prática",
    "type": "Observe as repetições",
    "prompt": "Cifre DADO com Atbash. Preste atenção às duas ocorrências de D.",
    "kind": "text",
    "answer": "WZWL",
    "hint": "D sempre encontra W. A encontra Z. O encontra L.",
    "solution": "D→W, A→Z, D→W, O→L: WZWL. A mesma letra D vira W nas duas posições."
  },
  {
    "id": "a5",
    "level": "Desafio",
    "type": "Investigue a limitação",
    "prompt": "Qual pista Atbash preserva quando uma mesma letra aparece várias vezes na mensagem?",
    "kind": "choice",
    "options": [
      "As ocorrências dessa letra continuam iguais entre si no texto cifrado.",
      "Cada ocorrência recebe uma saída diferente, sem repetição.",
      "Todas as ocorrências dessa letra são apagadas.",
      "A letra repetida muda de posição na mensagem."
    ],
    "correct": 0,
    "hint": "Compare os dois D de DADO com as duas letras correspondentes de WZWL.",
    "solution": "A substituição é fixa: os dois D de DADO viram W em WZWL. O padrão de repetição continua visível e pode ajudar a analisar a cifra."
  },
  {
    "id": "a6",
    "level": "Desafio",
    "type": "Recupere o segredo",
    "prompt": "Um bilhete diz HVTIVWL. Recupere a palavra original usando Atbash.",
    "kind": "text",
    "answer": "SEGREDO",
    "hint": "H→S, V→E, T→G. Continue o mesmo espelho até o fim.",
    "solution": "H→S, V→E, T→G, I→R, V→E, W→D, L→O. Resultado: SEGREDO."
  }
]
},
{
 id:'rail',number:'02',name:'Transposição em trilhos',short:'Trilhos',subtitle:'As mesmas letras. Outra ordem.',level:'Básico +',difficulty:2,time:'30–40 min',tag:'TRANSPOSIÇÃO',intro:'Em vez de trocar as letras, mude o caminho que elas percorrem. Escreva em zigue-zague; leia por linhas.',concept:'Na cifra Rail Fence, a chave é o número de trilhos. Começamos no trilho de cima e descemos. Ao chegar ao último, subimos. A mensagem cifrada é a leitura de cada linha, de cima para baixo.',prereq:'Contar posições e seguir um percurso.',encrypt:['Escolha o número de trilhos. Aqui, comece com 2.','Distribua SEGREDO alternando os trilhos: o primeiro recebe SGEO; o segundo, ERD.','Leia as linhas de cima para baixo: SGEOERD.'],decrypt:['Desenhe um zigue-zague vazio com uma posição para cada letra cifrada.','Conte as casas de cada trilho. Para 7 letras e 2 trilhos, são 4 e 3.','Separe SGEO | ERD, preencha as linhas e leia o zigue-zague: SEGREDO.'],example:'SEGREDO → SGEO | ERD → SGEOERD',detail:'Com 3 trilhos, o caminho é 1, 2, 3, 2, 1, 2, 3… Na volta, conte as casas; as linhas nem sempre têm o mesmo tamanho.',formula:'Mudar a posição ≠ mudar a letra',limit:'A quantidade de cada letra continua igual. Textos curtos e poucos trilhos permitem testar várias chaves rapidamente.',question:'Quais pistas ficam visíveis quando só a ordem das letras muda?',activities:[
  {
    "id": "r1",
    "level": "Guiado",
    "type": "Reconstrua o caminho",
    "prompt": "Decifre MAESGMNE com 3 trilhos. Desenhe 8 casas no percurso 1,2,3,2,1,2,3,2 antes de preenchê-las.",
    "kind": "text",
    "answer": "MENSAGEM",
    "hint": "Os trilhos têm 2, 4 e 2 casas. Separe MA | ESGM | NE.",
    "solution": "Preencha MA no 1º trilho, ESGM no 2º e NE no 3º. Leia o percurso 1,2,3,2,1,2,3,2: M,E,N,S,A,G,E,M. Resultado: MENSAGEM."
  },
  {
    "id": "r2",
    "level": "Guiado",
    "type": "Construa uma mensagem",
    "prompt": "Cifre CRIPTOGRAFIA com 3 trilhos. Registre as linhas no caderno e digite a leitura final.",
    "kind": "text",
    "answer": "CTARPORFAIGI",
    "hint": "O primeiro trilho usa as posições 1, 5 e 9: C, T, A.",
    "solution": "O caminho é 1,2,3,2,1,2,3,2,1,2,3,2. Os trilhos ficam CTA | RPORFA | IGI. Lendo por linha: CTARPORFAIGI."
  },
  {
    "id": "r3",
    "level": "Prática",
    "type": "Mude o número de trilhos",
    "prompt": "Cifre ESCOLA com 2 trilhos. Comece no trilho de cima e alterne a cada letra.",
    "kind": "text",
    "answer": "ECLSOA",
    "hint": "Com 2 trilhos, separe as posições ímpares das posições pares.",
    "solution": "As posições 1,3,5 formam ECL; as posições 2,4,6 formam SOA. Junte ECL | SOA: ECLSOA."
  },
  {
    "id": "r4",
    "level": "Prática",
    "type": "Desfaça a transposição",
    "prompt": "Decifre CDROAEN com 2 trilhos. A mensagem tem 7 letras: as linhas não têm o mesmo tamanho.",
    "kind": "text",
    "answer": "CADERNO",
    "hint": "O trilho de cima tem 4 casas; o de baixo, 3. Separe CDRO | AEN.",
    "solution": "Preencha o trilho 1 com CDRO e o trilho 2 com AEN. Intercale C,A,D,E,R,N,O: CADERNO."
  },
  {
    "id": "r5",
    "level": "Desafio",
    "type": "Experimente quatro trilhos",
    "prompt": "Cifre SEGREDO com 4 trilhos. O caminho agora é 1,2,3,4,3,2,1.",
    "kind": "text",
    "answer": "SOEDGER",
    "hint": "Distribua as 7 letras pelo caminho indicado. O primeiro trilho recebe S e O.",
    "solution": "Pelo percurso 1,2,3,4,3,2,1, os trilhos são SO | ED | GE | R. A leitura de cima para baixo é SOEDGER."
  },
  {
    "id": "r6",
    "level": "Desafio",
    "type": "Compare as pistas",
    "prompt": "Qual propriedade sempre permanece igual após uma transposição em trilhos?",
    "kind": "choice",
    "options": [
      "A posição de cada letra.",
      "A quantidade de cada letra na mensagem.",
      "A ordem de todas as letras.",
      "A primeira letra passa obrigatoriamente para o fim."
    ],
    "correct": 1,
    "hint": "A transposição movimenta as letras, mas não as substitui nem as apaga.",
    "solution": "A quantidade de cada letra permanece igual. Por exemplo, ESCOLA e ECLSOA têm uma ocorrência de E, S, C, O, L e A; apenas a ordem mudou."
  }
]
},
{
 id:'vigenere',number:'03',name:'Vigenère',subtitle:'Uma palavra, vários deslocamentos.',level:'Intermediário',difficulty:3,time:'40–50 min',tag:'SUBSTITUIÇÃO POLIALFABÉTICA',intro:'E se o deslocamento mudasse a cada letra? Uma palavra-chave transforma César em uma sequência de deslocamentos.',concept:'Usaremos a variante de chave repetida. Repita a palavra-chave até alcançar o tamanho da mensagem. Converta letras em números: A=0, B=1, …, Z=25. Cada letra usa o deslocamento da sua posição na chave.',prereq:'César, soma e subtração. O resto da divisão é explicado no exemplo.',encrypt:['Para AULA com chave SOL, escreva SOLS sob a mensagem.','Converta AULA em 0,20,11,0 e SOLS em 18,14,11,18.','Some em cada coluna e volte ao intervalo 0–25: 18,8,22,18 → SIWS.'],decrypt:['Repita a mesma chave: SOLS.','Subtraia o valor da chave do valor da letra cifrada.','Em I−O, temos 8−14=−6. Somando 26, chegamos a 20=U. O resultado completo é AULA.'],example:'AULA + SOLS → SIWS',detail:'mod significa o resto da divisão: 34 = 1×26+8, então 34 mod 26 = 8. Módulo 26 funciona como um relógio de 26 posições. Um resultado negativo também volta ao intervalo: −6 mod 26 = 20.',formula:'Cifrar: y = (x + k) mod 26  ·  Decifrar: x = (y − k) mod 26',limit:'Uma chave curta e repetida cria padrões exploráveis. É mais complexa que César, mas esta cifra histórica não protege dados atuais.',question:'Por que duas letras A podem virar letras diferentes?',activities:[
  {
    "id": "v1",
    "level": "Guiado",
    "type": "Siga a palavra-chave",
    "prompt": "Treino guiado: cifre LUA usando a chave SOL. Use A=0 e reduza as somas ao intervalo de 0 a 25.",
    "kind": "text",
    "answer": "DIL",
    "hint": "L(11)+S(18)=29. Como 29=26+3, a primeira saída é D.",
    "solution": "LUA + SOL: 11+18=29→3(D); 20+14=34→8(I); 0+11=11(L). Resultado: DIL."
  },
  {
    "id": "v2",
    "level": "Guiado",
    "type": "Investigue um padrão",
    "prompt": "Cifre AAAAAA com a chave SOL. Digite apenas a mensagem cifrada. No caderno, explique por que as posições 1 e 4 têm a mesma saída.",
    "kind": "text",
    "answer": "SOLSOL",
    "hint": "A vale zero: somar A ao valor de uma letra da chave mantém esse valor.",
    "solution": "A chave alinhada é SOLSOL. Somar 0 a 18,14,11,18,14,11 produz SOLSOL. As posições 1 e 4 usam a mesma letra S da chave repetida."
  },
  {
    "id": "v3",
    "level": "Prática",
    "type": "Decifre com a chave",
    "prompt": "Decifre WGNGZL com a chave SOL. Alinhe SOLSOL sob o texto cifrado e subtraia.",
    "kind": "text",
    "answer": "ESCOLA",
    "hint": "W(22)−S(18)=4=E. Em G−O, 6−14=−8; some 26 para obter 18=S.",
    "solution": "WGNGZL − SOLSOL: 22−18→4(E); 6−14→18(S); 13−11→2(C); 6−18→14(O); 25−14→11(L); 11−11→0(A). Resultado: ESCOLA."
  },
  {
    "id": "v4",
    "level": "Prática",
    "type": "Varie a chave",
    "prompt": "Cifre SEGREDO usando a chave LUA, repetida até o final da mensagem.",
    "kind": "text",
    "answer": "DYGCYDZ",
    "hint": "Alinhe LUALUAL. S(18)+L(11)=29→3=D.",
    "solution": "A chave é LUALUAL. As somas módulo 26 dão 3,24,6,2,24,3,25: DYGCYDZ. Por exemplo, R(17)+L(11)=28→2=C."
  },
  {
    "id": "v5",
    "level": "Desafio",
    "type": "Recupere outra mensagem",
    "prompt": "Decifre NOCM usando a chave MAR. Lembre que a chave se repete quando a mensagem é mais longa.",
    "kind": "text",
    "answer": "BOLA",
    "hint": "A chave alinhada é MARM. Na terceira posição, C(2)−R(17)=−15; some 26.",
    "solution": "NOCM − MARM: 13−12=1(B); 14−0=14(O); 2−17=−15→11(L); 12−12=0(A). Resultado: BOLA."
  },
  {
    "id": "v6",
    "level": "Desafio",
    "type": "Avalie a chave repetida",
    "prompt": "Qual afirmação descreve corretamente a variante de Vigenère usada aqui?",
    "kind": "choice",
    "options": [
      "Uma chave curta e repetida elimina todos os padrões do texto.",
      "Usar uma palavra-chave torna esta cifra adequada para proteger senhas atuais.",
      "A chave repetida cria uma sequência periódica de deslocamentos que pode deixar padrões.",
      "O deslocamento é sempre o mesmo em todas as posições, qualquer que seja a chave."
    ],
    "correct": 2,
    "hint": "Na cifra de AAAAAA com SOL, a saída foi SOLSOL: o período de 3 reapareceu.",
    "solution": "A chave SOL produz deslocamentos 18,14,11,18,14,11… Essa repetição pode deixar padrões exploráveis. O método é histórico e didático; não deve proteger dados atuais."
  }
]
},
{
 id:'affine',number:'04',name:'Cifra afim',subtitle:'Multiplique. Some. Encontre a volta.',level:'Intermediário +',difficulty:4,time:'50 min',tag:'ÁLGEBRA MODULAR',intro:'A chave agora tem dois números: um multiplica e o outro desloca. O desafio é escolher uma multiplicação que possa ser desfeita.',concept:'Represente letras por 0–25 e use y=(a×x+b) mod 26. Escolha a sem divisor comum com 26 além de 1: MDC(a,26)=1. Para decifrar, precisamos do inverso modular de a: um número que, multiplicado por a, deixa resto 1 na divisão por 26.',prereq:'Multiplicação e resto da divisão. MDC é o maior divisor comum de dois números; por exemplo, MDC(5,26)=1.',encrypt:['Escolha a=5 e b=8. Para A, calcule 5×0+8=8 → I.','Para U, calcule 5×20+8=108; 108 mod 26=4 → E.','Continue com L e A. AULA se transforma em IELI.'],decrypt:['Ache o inverso de 5: é 21, pois 5×21=105=4×26+1.','Para cada letra cifrada, calcule x=21×(y−8) mod 26.','Para E: 21×(4−8)=−84; −84 mod 26=20 → U. IELI volta a ser AULA.'],example:'AULA → (a=5, b=8) → IELI',detail:'Valores válidos para a: 1,3,5,7,9,11,15,17,19,21,23,25. Eles têm MDC(a,26)=1. O inverso modular não é a divisão comum por a.',formula:'Cifrar: y = (a×x + b) mod 26  ·  Decifrar: x = a⁻¹×(y − b) mod 26',limit:'Ainda é uma substituição fixa por letra. A análise de frequência e o teste das possíveis chaves conseguem explorar essa estrutura.',question:'O que dá errado quando duas letras passam a ter a mesma saída?',activities:[
  {
    "id": "f1",
    "level": "Guiado",
    "type": "Cifre com dois números",
    "prompt": "Treino guiado: cifre SOL com a=5 e b=8. Para cada letra, calcule (5×x+8) mod 26.",
    "kind": "text",
    "answer": "UAL",
    "hint": "S vale 18: 5×18+8=98. Como 98=3×26+20, a primeira saída é U.",
    "solution": "S(18): 5×18+8=98→20(U); O(14): 78→0(A); L(11): 63→11(L). Resultado: UAL."
  },
  {
    "id": "f3",
    "level": "Guiado",
    "type": "Faça o caminho inverso",
    "prompt": "Decifre CUSALI com a=5 e b=8. Use o inverso 21: x=21×(y−8) mod 26.",
    "kind": "text",
    "answer": "ESCOLA",
    "hint": "C vale 2: 21×(2−8)=−126. Somando 130 (5×26), obtemos 4=E.",
    "solution": "Aplicando 21×(y−8) mod 26 a C,U,S,A,L,I, obtemos 4,18,2,14,11,0: ESCOLA. Por exemplo, U(20) dá 21×12=252→18=S."
  },
  {
    "id": "f4",
    "level": "Prática",
    "type": "Mude os dois ajustes",
    "prompt": "Cifre AULA com a=3 e b=4. Agora a regra é y=(3×x+4) mod 26.",
    "kind": "text",
    "answer": "EMLE",
    "hint": "A(0) vira 4=E. U(20) vira 64; tire 2×26 para encontrar a saída.",
    "solution": "A(0)→4(E); U(20)→64 mod 26=12(M); L(11)→37 mod 26=11(L); A(0)→4(E). Resultado: EMLE."
  },
  {
    "id": "f5",
    "level": "Prática",
    "type": "Use outro inverso",
    "prompt": "Decifre SXGD com a=7 e b=3. Use o inverso 15, pois 7×15=105 e 105 mod 26=1.",
    "kind": "text",
    "answer": "ROTA",
    "hint": "Calcule x=15×(y−3) mod 26. Para S(18), 15×15=225→17=R.",
    "solution": "S(18): 225→17(R); X(23): 300→14(O); G(6): 45→19(T); D(3): 0→0(A). Resultado: ROTA."
  },
  {
    "id": "f2",
    "level": "Desafio",
    "type": "Encontre a falha",
    "prompt": "Com a=2 e b=8, A vira I. Qual outra letra também vira I? Digite uma única letra.",
    "kind": "text",
    "answer": "N",
    "hint": "Procure x tal que 2×x seja um múltiplo de 26 diferente de zero.",
    "solution": "N vale 13: 2×13+8=34 e 34 mod 26=8=I. A e N colidem. Como MDC(2,26)=2, não existe inverso de 2 módulo 26; a volta não é única."
  },
  {
    "id": "f6",
    "level": "Desafio",
    "type": "Escolha uma chave reversível",
    "prompt": "Qual destes valores de a permite decifrar de forma única na cifra afim módulo 26?",
    "kind": "choice",
    "options": [
      "a = 2",
      "a = 13",
      "a = 15",
      "a = 26"
    ],
    "correct": 2,
    "hint": "O multiplicador precisa ter MDC(a,26)=1. Lembre que 26=2×13.",
    "solution": "a=15 é a opção válida: MDC(15,26)=1. Seu inverso é 7, pois 15×7=105=4×26+1. Os outros valores compartilham um divisor maior que 1 com 26."
  }
]
},
{
 id:'rsa',number:'05',name:'RSA didático',subtitle:'Uma chave para enviar. Outra para abrir.',level:'Avançado',difficulty:5,time:'2 aulas de 50 min',tag:'CHAVE PÚBLICA',intro:'Até aqui, as duas pessoas compartilhavam o mesmo segredo ou a mesma regra. Agora vamos separar a chave pública da chave privada.',concept:'Use os primos p=3 e q=11. Então n=33 e φ(n)=(3−1)×(11−1)=20. Escolha e=3 e d=7, pois 3×7 deixa resto 1 na divisão por 20. A chave pública é (n=33,e=3); a privada é (n=33,d=7). Aqui todos esses números ficam visíveis para estudar.',prereq:'Números primos, potências, resto e inverso modular.',encrypt:['Escolha uma mensagem numérica inteira m entre 0 e 32.','Use a chave pública: c=m³ mod 33.','Se m=7: 7³=343; o resto por 33 é 13. Envie c=13.'],decrypt:['Use a chave privada: m=c⁷ mod 33.','Para c=13, reduza as potências: 13² mod 33=4 e 13⁴ mod 33=16.','Como 7=4+2+1, calcule 16×4×13=832. O resto por 33 é 7.'],example:'7 → chave pública → 13 → chave privada → 7',detail:'O laboratório calcula potências com restos intermediários. A mensagem é um número; não estamos cifrando palavras ou simulando um sistema pronto para uso real.',formula:'Cifrar: c = mᵉ mod n  ·  Decifrar: m = cᵈ mod n',limit:'Este exemplo usa primos minúsculos e RSA sem preenchimento (padding). É somente uma demonstração matemática. RSA real exige parâmetros e protocolos apropriados.',question:'Qual informação pode ser divulgada sem revelar diretamente a chave de decifração?',activities:[
  {
    "id": "s1",
    "level": "Guiado",
    "type": "Ida e volta numérica",
    "prompt": "Com n=33 e e=3, cifre m=4. Digite o número cifrado. Depois use o laboratório com d=7 para conferir se ele retorna a 4.",
    "kind": "number",
    "answer": "31",
    "hint": "4³=64. Qual é o resto da divisão de 64 por 33?",
    "solution": "64=1×33+31, então c=31. Na volta, 31⁷ mod 33=4. Por exemplo, 31≡−2; (−2)⁷=−128≡4 mod 33."
  },
  {
    "id": "s2",
    "level": "Guiado",
    "type": "Escolha a chave privada",
    "prompt": "Com e=3 e φ(n)=20, qual valor de d satisfaz e×d ≡ 1 (mod 20)?",
    "kind": "choice",
    "options": [
      "d = 3",
      "d = 5",
      "d = 7",
      "d = 10"
    ],
    "correct": 2,
    "hint": "Multiplique 3 por cada candidato e procure um resultado que deixe resto 1 ao dividir por 20.",
    "solution": "d=7, pois 3×7=21 e 21 mod 20=1. Os outros produtos são 9,15 e 30, cujos restos não são 1."
  },
  {
    "id": "s3",
    "level": "Prática",
    "type": "Decifre um número",
    "prompt": "Recebemos c=8. Use a chave privada n=33 e d=7 para recuperar m. Digite apenas o número original.",
    "kind": "number",
    "answer": "2",
    "hint": "8² mod 33=31 e 8⁴ mod 33=4. Como 7=4+2+1, combine 4×31×8.",
    "solution": "8⁷ mod 33 = (8⁴×8²×8) mod 33 = (4×31×8) mod 33. Como 992=30×33+2, a mensagem é m=2."
  },
  {
    "id": "s4",
    "level": "Prática",
    "type": "Envie outra mensagem",
    "prompt": "Cifre m=5 com a chave pública n=33 e e=3. Digite c=5³ mod 33.",
    "kind": "number",
    "answer": "26",
    "hint": "5³=125 e 3×33=99. O que sobra?",
    "solution": "125=3×33+26. Portanto, c=26."
  },
  {
    "id": "s5",
    "level": "Desafio",
    "type": "Confira por potências menores",
    "prompt": "Decifre c=26 com n=33 e d=7. Use restos intermediários para evitar calcular a potência inteira.",
    "kind": "number",
    "answer": "5",
    "hint": "26² mod 33=16 e 26⁴ mod 33=25. Combine 25×16×26 e encontre o resto por 33.",
    "solution": "26⁷ mod 33 = (26⁴×26²×26) mod 33 = (25×16×26) mod 33. Como 10400=315×33+5, a mensagem é m=5."
  },
  {
    "id": "s6",
    "level": "Desafio",
    "type": "Separe os papéis das chaves",
    "prompt": "Na ideia de RSA apresentada, quais valores formam a chave pública de cifração que pode ser divulgada?",
    "kind": "choice",
    "options": [
      "(n=33, e=3)",
      "(p=3, q=11)",
      "(n=33, d=7)",
      "(e=3, d=7)"
    ],
    "correct": 0,
    "hint": "A operação de envio é c=mᵉ mod n. Quais dois valores aparecem nela?",
    "solution": "A chave pública é (n=33,e=3). A chave privada didática usa (n=33,d=7). Os primos p e q ajudam a construir as chaves e não compõem a chave pública. Neste laboratório tudo fica visível para estudar, sem segurança real."
  }
]
}
];
