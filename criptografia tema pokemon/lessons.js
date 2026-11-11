// Student content: no plain-text answer key.
export const lessons = [
  {
    "id": "atbash",
    "number": "01",
    "name": "Atbash",
    "subtitle": "O alfabeto no espelho",
    "level": "Ponte de revisão",
    "difficulty": 1,
    "time": "10–15 min",
    "tag": "SUBSTITUIÇÃO",
    "intro": "Um último olhar para a substituição antes de seguir em frente: cada letra encontra seu par no alfabeto invertido.",
    "concept": "César desloca o alfabeto; Atbash o espelha. A troca é fixa: A ↔ Z, B ↔ Y, C ↔ X. Não há uma chave escolhida pelo usuário nesta versão.",
    "prereq": "Reconhecer letras e consultar uma tabela.",
    "encrypt": [
      "Escreva o alfabeto A–Z em uma linha.",
      "Logo abaixo, escreva Z–A.",
      "Troque cada letra de cima pela letra correspondente de baixo."
    ],
    "decrypt": [
      "Use a mesma tabela espelhada.",
      "Para cada letra cifrada, encontre seu par.",
      "Aplicar Atbash novamente recupera a mensagem."
    ],
    "example": "SOL → HLO → SOL",
    "detail": "S está ligado a H; O está ligado a L; L está ligado a O. A mesma troca funciona na volta.",
    "formula": "y = 25 − x",
    "limit": "É uma revisão, não um salto de segurança. A substituição é fixa e preserva padrões e repetições do texto.",
    "question": "Se aplicar a troca duas vezes, por que o segredo desaparece?",
    "activities": [
      {
        "id": "a1",
        "level": "Guiado",
        "type": "Cifre no espelho",
        "prompt": "Treino guiado: cifre LUZ com Atbash. Consulte os pares do alfabeto invertido.",
        "kind": "text",
        "hint": "L encontra O. U encontra F. Falta descobrir o par de Z.",
        "salt": "a8c1ae2625be0e2e3a8686d6",
        "check": "483dba0c1d495b04656d85fada458725293b9d3a7152bc23082abe98de09bf9c"
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
        "hint": "Observe A→Z. O que acontece com Z na segunda aplicação?",
        "salt": "ef8b0e9c222f2e406db16e92",
        "check": "4c699568d0f3f09a19cd42aca3950cc0dba30ac87c2df58d8d4aca5b09c25fb6"
      },
      {
        "id": "a3",
        "level": "Prática",
        "type": "Decifre o bilhete",
        "prompt": "Decifre VHXLOZ com Atbash. Digite somente a palavra recuperada.",
        "kind": "text",
        "hint": "Use os mesmos pares para decifrar: V encontra E e H encontra S.",
        "salt": "e6b7abb7aabbffe4cfdefea7",
        "check": "2451ad13427350f25a0475b9766fabe62f44bb3a208a4a7e37140ae94c39f782"
      },
      {
        "id": "a4",
        "level": "Prática",
        "type": "Observe as repetições",
        "prompt": "Cifre DADO com Atbash. Preste atenção às duas ocorrências de D.",
        "kind": "text",
        "hint": "D encontra W nas duas posições. Use o alfabeto invertido para descobrir os pares de A e O.",
        "salt": "fbda9363d9cac8b2558f6898",
        "check": "6c2076f2fa349fdbc254ae2a64e1a376d20fa1ea10e309fdbb97091e74ada164"
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
        "hint": "Compare os dois D de DADO com as duas letras correspondentes de WZWL.",
        "salt": "531993f6e942459e9eb3a857",
        "check": "eee27065ac06c46de16f1baafb54ef8cdddd2bc5e96ed25c3327d8c53efd15d4"
      },
      {
        "id": "a6",
        "level": "Desafio",
        "type": "Recupere o segredo",
        "prompt": "Um bilhete diz HVTIVWL. Recupere a palavra original usando Atbash.",
        "kind": "text",
        "hint": "H→S, V→E, T→G. Continue o mesmo espelho até o fim.",
        "salt": "078192a18c24a88c0d27c495",
        "check": "8af626354b1859b615d95731d5822a12301af522978d5509f99ac7a7236f271d"
      }
    ]
  },
  {
    "id": "rail",
    "number": "02",
    "name": "Transposição em trilhos",
    "short": "Trilhos",
    "subtitle": "As mesmas letras. Outra ordem.",
    "level": "Básico +",
    "difficulty": 2,
    "time": "30–40 min",
    "tag": "TRANSPOSIÇÃO",
    "intro": "Em vez de trocar as letras, mude o caminho que elas percorrem. Escreva em zigue-zague; leia por linhas.",
    "concept": "Na cifra Rail Fence, a chave é o número de trilhos. Começamos no trilho de cima e descemos. Ao chegar ao último, subimos. A mensagem cifrada é a leitura de cada linha, de cima para baixo.",
    "prereq": "Contar posições e seguir um percurso.",
    "encrypt": [
      "Escolha o número de trilhos. Aqui, comece com 2.",
      "Distribua SEGREDO alternando os trilhos: o primeiro recebe SGEO; o segundo, ERD.",
      "Leia as linhas de cima para baixo: SGEOERD."
    ],
    "decrypt": [
      "Desenhe um zigue-zague vazio com uma posição para cada letra cifrada.",
      "Conte as casas de cada trilho. Para 7 letras e 2 trilhos, são 4 e 3.",
      "Separe SGEO | ERD, preencha as linhas e leia o zigue-zague: SEGREDO."
    ],
    "example": "SEGREDO → SGEO | ERD → SGEOERD",
    "detail": "Com 3 trilhos, o caminho é 1, 2, 3, 2, 1, 2, 3… Na volta, conte as casas; as linhas nem sempre têm o mesmo tamanho.",
    "formula": "Mudar a posição ≠ mudar a letra",
    "limit": "A quantidade de cada letra continua igual. Textos curtos e poucos trilhos permitem testar várias chaves rapidamente.",
    "question": "Quais pistas ficam visíveis quando só a ordem das letras muda?",
    "activities": [
      {
        "id": "r1",
        "level": "Guiado",
        "type": "Reconstrua o caminho",
        "prompt": "Decifre MAESGMNE com 3 trilhos. Desenhe 8 casas no percurso 1,2,3,2,1,2,3,2 antes de preenchê-las.",
        "kind": "text",
        "hint": "Os trilhos têm 2, 4 e 2 casas. Separe MA | ESGM | NE.",
        "salt": "d379571e1ea93746a8ddaeb2",
        "check": "273ea26034698de97bd51a4b98705e18c472d3cdc80fc0951fbf50f98cef9437"
      },
      {
        "id": "r2",
        "level": "Guiado",
        "type": "Construa uma mensagem",
        "prompt": "Cifre CRIPTOGRAFIA com 3 trilhos. Registre as linhas no campo de raciocínio abaixo e digite a leitura final.",
        "kind": "text",
        "hint": "O primeiro trilho usa as posições 1, 5 e 9: C, T, A.",
        "salt": "deeac5f70186a5196e2b89d1",
        "check": "cf1d0414e55d3d949c30c6e89a1d1f53e026bb4440623db5a70e292967a54cc1"
      },
      {
        "id": "r3",
        "level": "Prática",
        "type": "Mude o número de trilhos",
        "prompt": "Cifre ESCOLA com 2 trilhos. Comece no trilho de cima e alterne a cada letra.",
        "kind": "text",
        "hint": "Com 2 trilhos, separe as posições ímpares das posições pares.",
        "salt": "68ff60e6b9b1a52af2b6d811",
        "check": "c1e7cc6b70b90443c873083d5418ae0f454aac3401cf87a2c561e03f3036dca9"
      },
      {
        "id": "r4",
        "level": "Prática",
        "type": "Desfaça a transposição",
        "prompt": "Decifre CDROAEN com 2 trilhos. A mensagem tem 7 letras: as linhas não têm o mesmo tamanho.",
        "kind": "text",
        "hint": "O trilho de cima tem 4 casas; o de baixo, 3. Separe CDRO | AEN.",
        "salt": "465193aeabe56de61ea50c8f",
        "check": "7f0af25a5ffc21015f8a8ce6218868fcfbb2e6b49927b5fffd9b109a5dce0da0"
      },
      {
        "id": "r5",
        "level": "Desafio",
        "type": "Experimente quatro trilhos",
        "prompt": "Cifre SEGREDO com 4 trilhos. O caminho agora é 1,2,3,4,3,2,1.",
        "kind": "text",
        "hint": "Distribua as 7 letras pelo caminho indicado. O primeiro trilho recebe S e O.",
        "salt": "bf90cd2447823e47a670a73b",
        "check": "bd278baf6bb73347aa0171c6db18d056e1713bba3e0be3447ebf117367b8e47d"
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
        "hint": "A transposição movimenta as letras, mas não as substitui nem as apaga.",
        "salt": "46f89541aaf519659aec3504",
        "check": "d5ce13db3affaab722705c382b7344ba3a67f33cff98a67dc8d4118976d7a9b5"
      }
    ]
  },
  {
    "id": "vigenere",
    "number": "03",
    "name": "Vigenère",
    "subtitle": "Uma palavra, vários deslocamentos.",
    "level": "Intermediário",
    "difficulty": 3,
    "time": "40–50 min",
    "tag": "SUBSTITUIÇÃO POLIALFABÉTICA",
    "intro": "E se o deslocamento mudasse a cada letra? Uma palavra-chave transforma César em uma sequência de deslocamentos.",
    "concept": "Usaremos a variante de chave repetida. Repita a palavra-chave até alcançar o tamanho da mensagem. Converta letras em números: A=0, B=1, …, Z=25. Cada letra usa o deslocamento da sua posição na chave.",
    "prereq": "César, soma e subtração. O resto da divisão é explicado no exemplo.",
    "encrypt": [
      "Para AULA com chave SOL, escreva SOLS sob a mensagem.",
      "Converta AULA em 0,20,11,0 e SOLS em 18,14,11,18.",
      "Some em cada coluna e volte ao intervalo 0–25: 18,8,22,18 → SIWS."
    ],
    "decrypt": [
      "Repita a mesma chave: SOLS.",
      "Subtraia o valor da chave do valor da letra cifrada.",
      "Em I−O, temos 8−14=−6. Somando 26, chegamos a 20=U. O resultado completo é AULA."
    ],
    "example": "AULA + SOLS → SIWS",
    "detail": "mod significa o resto da divisão: 34 = 1×26+8, então 34 mod 26 = 8. Módulo 26 funciona como um relógio de 26 posições. Um resultado negativo também volta ao intervalo: −6 mod 26 = 20.",
    "formula": "Cifrar: y = (x + k) mod 26  ·  Decifrar: x = (y − k) mod 26",
    "limit": "Uma chave curta e repetida cria padrões exploráveis. É mais complexa que César, mas esta cifra histórica não protege dados atuais.",
    "question": "Por que duas letras A podem virar letras diferentes?",
    "activities": [
      {
        "id": "v1",
        "level": "Guiado",
        "type": "Siga a palavra-chave",
        "prompt": "Treino guiado: cifre LUA usando a chave SOL. Use A=0 e reduza as somas ao intervalo de 0 a 25.",
        "kind": "text",
        "hint": "L(11)+S(18)=29. Como 29=26+3, a primeira saída é D.",
        "salt": "917b3edb90f96119503215d4",
        "check": "71485db6ca2d182f6796f9ee723cdbd5c20197cb7a5b1f343ba314660d1871cf"
      },
      {
        "id": "v2",
        "level": "Guiado",
        "type": "Investigue um padrão",
        "prompt": "Cifre AAAAAA com a chave SOL. Digite apenas a mensagem cifrada. No campo de raciocínio abaixo, explique por que as posições 1 e 4 têm a mesma saída.",
        "kind": "text",
        "hint": "A vale zero: somar A ao valor de uma letra da chave mantém esse valor.",
        "salt": "42df79348febe86d4cc18996",
        "check": "f9bf050c500b3a25251af6a367e71d38b151f5f429784b6f4f283b283e6e8e6e"
      },
      {
        "id": "v3",
        "level": "Prática",
        "type": "Decifre com a chave",
        "prompt": "Decifre DWGJC com a chave SOL. Alinhe SOLSO sob o texto cifrado e subtraia.",
        "kind": "text",
        "hint": "D(3)−S(18)=−15. Some 26 para voltar ao intervalo de 0 a 25: 11=L.",
        "salt": "fe7103a260020eeef54326be",
        "check": "17aa7a217a96611ccf4f80275e4bc490c09c664b58d1bb6bec350fa8eae1f018"
      },
      {
        "id": "v4",
        "level": "Prática",
        "type": "Varie a chave",
        "prompt": "Cifre SEGREDO usando a chave LUA, repetida até o final da mensagem.",
        "kind": "text",
        "hint": "Alinhe LUALUAL. S(18)+L(11)=29→3=D.",
        "salt": "75f2900b540071c41568e45e",
        "check": "73b8523c5c1cfd413ad26c3cda32223a57e73501c9d8dcaade1ef63d0b789f77"
      },
      {
        "id": "v5",
        "level": "Desafio",
        "type": "Recupere outra mensagem",
        "prompt": "Decifre NOCM usando a chave MAR. Lembre que a chave se repete quando a mensagem é mais longa.",
        "kind": "text",
        "hint": "A chave alinhada é MARM. Na terceira posição, C(2)−R(17)=−15; some 26.",
        "salt": "30e5cc904d124b7d374d70e4",
        "check": "fd6a842db72d287375a66093701da83ced2c56b8cf03d2d145325c33d770c19e"
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
        "hint": "Na cifra de AAAAAA com SOL, a saída foi SOLSOL: o período de 3 reapareceu.",
        "salt": "013b7c9a74294d4ac81c4380",
        "check": "cf1b8b0f41ff679bb1115f332cf7f5204f21d228473406e04f1e01f7b04d3e4f"
      }
    ]
  },
  {
    "id": "affine",
    "number": "04",
    "name": "Cifra afim",
    "subtitle": "Multiplique. Some. Encontre a volta.",
    "level": "Intermediário +",
    "difficulty": 4,
    "time": "50 min",
    "tag": "ÁLGEBRA MODULAR",
    "intro": "A chave agora tem dois números: um multiplica e o outro desloca. O desafio é escolher uma multiplicação que possa ser desfeita.",
    "concept": "Represente letras por 0–25 e use y=(a×x+b) mod 26. Escolha a sem divisor comum com 26 além de 1: MDC(a,26)=1. Para decifrar, precisamos do inverso modular de a: um número que, multiplicado por a, deixa resto 1 na divisão por 26.",
    "prereq": "Multiplicação e resto da divisão. MDC é o maior divisor comum de dois números; por exemplo, MDC(5,26)=1.",
    "encrypt": [
      "Escolha a=5 e b=8. Para A, calcule 5×0+8=8 → I.",
      "Para U, calcule 5×20+8=108; 108 mod 26=4 → E.",
      "Continue com L e A. AULA se transforma em IELI."
    ],
    "decrypt": [
      "Ache o inverso de 5: é 21, pois 5×21=105=4×26+1.",
      "Para cada letra cifrada, calcule x=21×(y−8) mod 26.",
      "Para E: 21×(4−8)=−84; −84 mod 26=20 → U. IELI volta a ser AULA."
    ],
    "example": "AULA → (a=5, b=8) → IELI",
    "detail": "Valores válidos para a: 1,3,5,7,9,11,15,17,19,21,23,25. Eles têm MDC(a,26)=1. O inverso modular não é a divisão comum por a.",
    "formula": "Cifrar: y = (a×x + b) mod 26  ·  Decifrar: x = a⁻¹×(y − b) mod 26",
    "limit": "Ainda é uma substituição fixa por letra. A análise de frequência e o teste das possíveis chaves conseguem explorar essa estrutura.",
    "question": "O que dá errado quando duas letras passam a ter a mesma saída?",
    "activities": [
      {
        "id": "f1",
        "level": "Guiado",
        "type": "Cifre com dois números",
        "prompt": "Treino guiado: cifre SOL com a=5 e b=8. Para cada letra, calcule (5×x+8) mod 26.",
        "kind": "text",
        "hint": "S vale 18: 5×18+8=98. Como 98=3×26+20, a primeira saída é U.",
        "salt": "8efbd2a3e23eb4d7b92198ea",
        "check": "a4aa460656f8bf8ba99db6eaf19aaae5e3f422c02f74628d857e5f902b5c073e"
      },
      {
        "id": "f3",
        "level": "Guiado",
        "type": "Faça o caminho inverso",
        "prompt": "Decifre IQWMAU com a=5 e b=8. Use o inverso 21: x=21×(y−8) mod 26.",
        "kind": "text",
        "hint": "I vale 8: 21×(8−8)=0=A. Para as outras letras, subtraia 8 e multiplique por 21 antes de calcular o resto.",
        "salt": "e36bb363a59dd4890d58fb92",
        "check": "60c06f71ecabe1d3840fbdddeacf15e3abeece7b3ba4d637670ff4029aae3ec0"
      },
      {
        "id": "f4",
        "level": "Prática",
        "type": "Mude os dois ajustes",
        "prompt": "Cifre AULA com a=3 e b=4. Agora a regra é y=(3×x+4) mod 26.",
        "kind": "text",
        "hint": "A(0) vira 4=E. U(20) vira 64; tire 2×26 para encontrar a saída.",
        "salt": "608e229ab651796807174c01",
        "check": "d5b86a738d4a994bdb74660098ac9c2950a4935d289b2da784f91ff9697e09ba"
      },
      {
        "id": "f5",
        "level": "Prática",
        "type": "Use outro inverso",
        "prompt": "Decifre SXGD com a=7 e b=3. Use o inverso 15, pois 7×15=105 e 105 mod 26=1.",
        "kind": "text",
        "hint": "Calcule x=15×(y−3) mod 26. Para S(18), 15×15=225→17=R.",
        "salt": "462bd3c4322fde1af8a56cde",
        "check": "15c5283e14766b97415e0fac9909e9fefc74ff6d58ccd9e15a179fbd31df87fb"
      },
      {
        "id": "f2",
        "level": "Desafio",
        "type": "Encontre a falha",
        "prompt": "Com a=2 e b=8, A vira I. Qual outra letra também vira I? Digite uma única letra.",
        "kind": "text",
        "hint": "Procure x tal que 2×x seja um múltiplo de 26 diferente de zero.",
        "salt": "630b84c78b432a83c22698cf",
        "check": "af542a249b4524163ac1f9312ae7f59ac1e14fec99e3bd3ee9056eb4d9ed8023"
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
        "hint": "O multiplicador precisa ter MDC(a,26)=1. Lembre que 26=2×13.",
        "salt": "9057cc0b901842aad6ac7073",
        "check": "683c38d3795b6b2c8a24330fabf62d5ab001b5cbafef79a058aa3856a19ef288"
      }
    ]
  },
  {
    "id": "rsa",
    "number": "05",
    "name": "RSA didático",
    "subtitle": "Uma chave para enviar. Outra para abrir.",
    "level": "Avançado",
    "difficulty": 5,
    "time": "2 aulas de 50 min",
    "tag": "CHAVE PÚBLICA",
    "intro": "Até aqui, as duas pessoas compartilhavam o mesmo segredo ou a mesma regra. Agora vamos separar a chave pública da chave privada.",
    "concept": "Use os primos p=3 e q=11. Então n=33 e φ(n)=(3−1)×(11−1)=20. Escolha e=3 e d=7, pois 3×7 deixa resto 1 na divisão por 20. A chave pública é (n=33,e=3); a privada é (n=33,d=7). Aqui todos esses números ficam visíveis para estudar.",
    "prereq": "Números primos, potências, resto e inverso modular.",
    "encrypt": [
      "Escolha uma mensagem numérica inteira m entre 0 e 32.",
      "Use a chave pública: c=m³ mod 33.",
      "Se m=7: 7³=343; o resto por 33 é 13. Envie c=13."
    ],
    "decrypt": [
      "Use a chave privada: m=c⁷ mod 33.",
      "Para c=13, reduza as potências: 13² mod 33=4 e 13⁴ mod 33=16.",
      "Como 7=4+2+1, calcule 16×4×13=832. O resto por 33 é 7."
    ],
    "example": "7 → chave pública → 13 → chave privada → 7",
    "detail": "O laboratório calcula potências com restos intermediários. A mensagem é um número; não estamos cifrando palavras ou simulando um sistema pronto para uso real.",
    "formula": "Cifrar: c = mᵉ mod n  ·  Decifrar: m = cᵈ mod n",
    "limit": "Este exemplo usa primos minúsculos e RSA sem preenchimento (padding). É somente uma demonstração matemática. RSA real exige parâmetros e protocolos apropriados.",
    "question": "Qual informação pode ser divulgada sem revelar diretamente a chave de decifração?",
    "activities": [
      {
        "id": "s1",
        "level": "Guiado",
        "type": "Ida e volta numérica",
        "prompt": "Com n=33 e e=3, cifre m=4. Digite apenas o número cifrado; a conferência automática avisa se acertou.",
        "kind": "number",
        "hint": "4³=64. Qual é o resto da divisão de 64 por 33?",
        "salt": "ebd5a7d04ce4424695696fc9",
        "check": "efc2060e9f88432881524b64b413c39caf8d5eb4fbea7ffb42644045d24c548a"
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
        "hint": "Multiplique 3 por cada candidato e procure um resultado que deixe resto 1 ao dividir por 20.",
        "salt": "66e83c9925abaea91c9247ba",
        "check": "1dc719f5c9b7be0dc4f1d08f9da23163078257049d67e46007158d2db32e6a50"
      },
      {
        "id": "s3",
        "level": "Prática",
        "type": "Decifre um número",
        "prompt": "Recebemos c=8. Use a chave privada n=33 e d=7 para recuperar m. Digite apenas o número original.",
        "kind": "number",
        "hint": "8² mod 33=31 e 8⁴ mod 33=4. Como 7=4+2+1, combine 4×31×8.",
        "salt": "f8bfafe71aa886bf6fa3d24d",
        "check": "d483a4b95fe5c17d8066a3c246f5a9bb0174ec2ed45e2e380c08cd5a92fc456c"
      },
      {
        "id": "s4",
        "level": "Prática",
        "type": "Envie outra mensagem",
        "prompt": "Cifre m=5 com a chave pública n=33 e e=3. Digite c=5³ mod 33.",
        "kind": "number",
        "hint": "5³=125 e 3×33=99. O que sobra?",
        "salt": "0f8480c7d00e4a9d3942a610",
        "check": "afc7b37b892c6ed4ca1cbce1375826c51464c13cd0568197f0b691b62e9e3ed7"
      },
      {
        "id": "s5",
        "level": "Desafio",
        "type": "Confira por potências menores",
        "prompt": "Decifre c=17 com n=33 e d=7. Use restos intermediários para evitar calcular a potência inteira.",
        "kind": "number",
        "hint": "17² mod 33=25 e 17⁴ mod 33=31. Como 7=4+2+1, combine 31×25×17 e encontre o resto por 33.",
        "salt": "b851ed95e43754d38ca9a11d",
        "check": "46725b78638c442d88358c3eebc607632b170db208ba95d21b3669c3d50b1b45"
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
        "hint": "A operação de envio é c=mᵉ mod n. Quais dois valores aparecem nela?",
        "salt": "cef6df65d1a64310cd3cccf5",
        "check": "0d46730cc1a67078780e2ae3b93c6d225d75e73c83e12ffa6a436711b6b7ad6e"
      }
    ]
  }
];
