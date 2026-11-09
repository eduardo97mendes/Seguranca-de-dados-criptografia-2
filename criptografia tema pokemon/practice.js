import {alphabet, normalize, atbash, railFence, vigenere, affine, rsa, multipliers} from './ciphers.js';

const practiceWords = {
  guiado: ['LUA', 'SOL', 'OLA', 'PAZ', 'REDE', 'DADO', 'CHAVE', 'TURMA', 'LIVRO', 'JOGO'],
  pratica: ['ESCOLA', 'SEGREDO', 'MENSAGEM', 'CIENCIA', 'AMIZADE', 'BIBLIOTECA', 'TREINADOR', 'DESCOBERTA', 'APRENDER', 'ALGORITMO'],
  desafio: ['APRENDER EM EQUIPE', 'A CHAVE MUDA TUDO', 'INVESTIGUE OS PADROES', 'O SEGREDO ESTA NO CAMINHO', 'MATEMATICA E CRIATIVIDADE', 'EXPLIQUE SEU RACIOCINIO', 'TENTE OUTRA ESTRATEGIA', 'DECIFRE ESTA MENSAGEM', 'COMPARTILHE O CONHECIMENTO', 'O LABORATORIO E DA TURMA']
};
const practiceKeys = ['SOL', 'LUA', 'MAR', 'REDE', 'CHAVE', 'LIVRO', 'CIENCIA', 'EQUIPE'];
const pickPractice = (values, random) => values[Math.min(values.length-1, Math.floor(random()*values.length))];

// Pure question generation also makes the answer key independently testable.
export function createPractice(method, {operation='encrypt', difficulty='guiado', random=Math.random}={}) {
  if (!['atbash','rail','vigenere','affine','rsa'].includes(method)) throw Error('Método de treino inválido.');
  if (!practiceWords[difficulty]) throw Error('Etapa de treino inválida.');
  if (!['encrypt','decrypt'].includes(operation)) throw Error('Operação de treino inválida.');
  const isDecrypt = operation === 'decrypt';
  const verb = isDecrypt ? 'Decifre' : 'Cifre';
  let plain = normalize(pickPractice(practiceWords[difficulty], random)), cipher, parameters={}, hint, explanation, key;
  if (method === 'atbash') {
    cipher=atbash(plain); key='Espelho A ↔ Z, B ↔ Y, …';
    hint='Escreva A–Z e, abaixo, Z–A. Encontre o par de cada letra; a regra é a mesma na volta.';
    const source=isDecrypt?cipher:plain, target=isDecrypt?plain:cipher;
    explanation=[...source].slice(0,8).map((c,i)=>`${c}→${target[i]}`).join(' · ')+'. Cada letra usa o alfabeto espelhado.';
  }
  if (method === 'rail') {
    parameters.rails=pickPractice(difficulty==='guiado'?[2]:difficulty==='pratica'?[2,3]:[3,4,5,6], random);
    const result=railFence(plain,parameters.rails); cipher=result.result; key=`${parameters.rails} trilhos`;
    hint=`Desenhe ${plain.length} casas no caminho em zigue-zague, começando no trilho 1. Conte as casas de cada linha antes de preencher.`;
    explanation=`Trilhos de cima para baixo: ${result.rows.map(row=>row.join('')||'(vazio)').join(' | ')}. ${isDecrypt?'Preencha as linhas com esses blocos e leia pelo zigue-zague.':'Junte os blocos nessa ordem.'}`;
  }
  if (method === 'vigenere') {
    parameters.key=pickPractice(difficulty==='guiado'?['SOL','LUA']:practiceKeys, random);
    const result=vigenere(plain,parameters.key); cipher=result.result; key=`Palavra-chave: ${parameters.key}`;
    const source=isDecrypt?cipher:plain, target=isDecrypt?plain:cipher;
    hint=`Repita ${parameters.key} até cobrir o texto. ${isDecrypt?'Subtraia':'Some'} o valor da chave em cada posição; use A=0 e Z=25.`;
    explanation=result.trace.slice(0,6).map((t,i)=>`${source[i]}(${alphabet.indexOf(source[i])}) ${isDecrypt?'−':'+'} ${t.key}(${t.shift}) ≡ ${alphabet.indexOf(target[i])} → ${target[i]}`).join(' · ')+'. Todos os restos ficam entre 0 e 25.';
  }
  if (method === 'affine') {
    parameters.a=pickPractice(difficulty==='guiado'?[3,5]:multipliers.filter(n=>n!==1),random);
    parameters.b=pickPractice(difficulty==='guiado'?[1,4,8]:Array.from({length:26},(_,i)=>i),random);
    const result=affine(plain,parameters.a,parameters.b); cipher=result.result;
    key=`a=${parameters.a} · b=${parameters.b} · inverso de a=${result.inverse}`;
    hint=isDecrypt?`Use x=${result.inverse}×(y−${parameters.b}) mod 26. Se o cálculo der negativo, some múltiplos de 26 até obter 0–25.`:`Use y=(${parameters.a}×x+${parameters.b}) mod 26. Converta a letra em número e calcule o resto por 26.`;
    const source=isDecrypt?cipher:plain, target=isDecrypt?plain:cipher;
    explanation=`${parameters.a}×${result.inverse} mod 26=1. `+[...source].slice(0,5).map((c,i)=>`${c}(${alphabet.indexOf(c)}) → ${target[i]}(${alphabet.indexOf(target[i])})`).join(' · ')+'. '+hint;
  }
  if (method === 'rsa') {
    plain=String(pickPractice(difficulty==='guiado'?[2,3,4,5,6,7,8]:Array.from({length:31},(_,i)=>i+2),random));
    cipher=String(rsa(Number(plain))); key='n=33 · e=3 · d=7 (didático)';
    hint=isDecrypt?'Calcule c⁷ mod 33. Use 7=4+2+1 e reduza as potências intermediárias módulo 33.':'Calcule m³ e encontre o resto da divisão por 33.';
    explanation=isDecrypt?`${cipher}² mod 33=${Number(BigInt(cipher)**2n%33n)}; ${cipher}⁴ mod 33=${Number(BigInt(cipher)**4n%33n)}. Multiplique os restos das potências 4, 2 e 1 e reduza por 33: ${plain}.`:`${plain}³=${Number(plain)**3}; ${Number(plain)**3}=${Math.floor(Number(plain)**3/33)}×33+${cipher}. O resto é ${cipher}.`;
  }
  const input=isDecrypt?cipher:plain, answer=isDecrypt?plain:cipher;
  return {method,operation,difficulty,input,answer,plain,cipher,parameters,key,hint,
    prompt:`${verb} ${input}.`, solution:`Resposta: ${answer}. ${explanation}`,
    signature:JSON.stringify([method,operation,difficulty,input,parameters])};
}
