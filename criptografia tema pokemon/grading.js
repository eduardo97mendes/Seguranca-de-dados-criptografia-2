import {normalize} from './ciphers.js';

export function normalizeActivityAnswer(activity, value) {
  if (typeof value!=='string' || !value.trim()) return null;
  if (activity.kind==='text') return normalize(value)||null;
  if (activity.kind==='number') {
    const number=Number(value);
    return Number.isInteger(number)&&number>=0&&number<=32?String(number):null;
  }
  if (activity.kind==='choice') {
    const number=Number(value);
    return /^\d+$/.test(value)&&Number.isInteger(number)&&number>=0&&number<activity.options.length?String(number):null;
  }
  return null;
}

export async function verifyActivityAnswer(activity, value) {
  const canonical=normalizeActivityAnswer(activity,value);
  if (canonical===null || !activity.salt || !activity.check) return false;
  if (!globalThis.crypto?.subtle) throw Error('A verificação precisa de um navegador atualizado. Abra a atividade pelo endereço HTTPS publicado.');
  const input=new TextEncoder().encode(`${activity.id}|${activity.salt}|${canonical}`);
  const digest=await globalThis.crypto.subtle.digest('SHA-256',input);
  const check=[...new Uint8Array(digest)].map(byte=>byte.toString(16).padStart(2,'0')).join('');
  return check===activity.check;
}
