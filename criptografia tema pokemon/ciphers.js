export const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const normalize = text => String(text).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().replace(/[^A-Z]/g, '');
export const mod = (n,m=26) => ((n % m) + m) % m;
export function atbash(text) { return [...normalize(text)].map(c=>alphabet[25-alphabet.indexOf(c)]).join(''); }
export function railPath(length, rails) {
  if (!Number.isInteger(rails) || rails < 2 || rails > 6) throw Error('Escolha de 2 a 6 trilhos.');
  const cycle = 2*(rails-1);
  return Array.from({length},(_,i)=>{const p=i%cycle;return p<rails?p:cycle-p;});
}
export function railFence(text, rails=3, decrypt=false) {
  const clean=normalize(text), path=railPath(clean.length,rails);
  const rows=Array.from({length:rails},()=>[]);
  if(!decrypt) { [...clean].forEach((c,i)=>rows[path[i]].push(c)); return {result:rows.flat().join(''),rows,path}; }
  let offset=0;
  for(let r=0;r<rails;r++) {const count=path.filter(p=>p===r).length;rows[r]=[...clean.slice(offset,offset+count)];offset+=count;}
  const cursor=Array(rails).fill(0);
  return {result:path.map(r=>rows[r][cursor[r]++]).join(''),rows,path};
}
export function vigenere(text,key,decrypt=false) {
  const clean=normalize(text), k=normalize(key);
  if(!k.length) throw Error('Digite uma chave com pelo menos uma letra de A a Z.');
  const trace=[...clean].map((c,i)=>{const x=alphabet.indexOf(c),shift=alphabet.indexOf(k[i%k.length]);const value=mod(x+(decrypt?-shift:shift));return {letter:c,key:k[i%k.length],x,shift,value,result:alphabet[value]};});
  return {result:trace.map(t=>t.result).join(''),trace};
}
export const multipliers=[1,3,5,7,9,11,15,17,19,21,23,25];
export function affine(text,a=5,b=8,decrypt=false) {
  if(!multipliers.includes(a)) throw Error('a precisa ter inverso módulo 26. Use um dos multiplicadores da lista.');
  if(!Number.isInteger(b) || b<0 || b>25) throw Error('b precisa ser um inteiro de 0 a 25.');
  const inverse=multipliers.find(n=>mod(n*a)===1);
  const trace=[...normalize(text)].map(c=>{const x=alphabet.indexOf(c);const value=mod(decrypt?inverse*(x-b):a*x+b);return {letter:c,x,value,result:alphabet[value]};});
  return {result:trace.map(t=>t.result).join(''),inverse,trace};
}
export function powerMod(base,exponent,modulus) {
  let b=BigInt(base),e=BigInt(exponent),m=BigInt(modulus),result=1n;
  while(e>0n) {if(e%2n) result=result*b%m;b=b*b%m;e/=2n;}
  return Number(result);
}
export function rsa(value,decrypt=false) {
  if(!Number.isInteger(value)||value<0||value>=33) throw Error('Digite um número inteiro de 0 a 32.');
  return powerMod(value,decrypt?7:3,33);
}
