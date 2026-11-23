// Passo 4 — Vetor, matriz, função e procedimento ilustrados com as cifras.
// Só usa palavras e casos prontos (sem campo livre) para não virar calculadora das atividades.
import {alphabet, railFence} from './ciphers.js';

const $ = s => document.querySelector(s);
const colors = ['#e94f4f', '#f39a2b', '#f2c230', '#3daa5c', '#3b7be0', '#8a5cd6'];
const railColors = ['#e94f4f', '#3b7be0', '#3daa5c', '#8a5cd6'];
const words = ['PIKACHU', 'EEVEE', 'MEWTWO', 'PSYDUCK', 'ONIX'];
const keys = ['SOL', 'ASH'];
const val = c => alphabet.indexOf(c);

const pillars = [
  {id: 'vetor', name: 'Vetor', img: 'pikachu', color: '#f2c230',
   big: 'Vetor é uma <mark>fila de caixinhas numeradas</mark>.',
   where: 'Na cifra, cada letra da mensagem ocupa uma caixinha. A numeração começa no <b>0</b>.'},
  {id: 'matriz', name: 'Matriz', img: 'squirtle', color: '#3b7be0',
   big: 'Matriz é uma <mark>tabela de linhas e colunas</mark>.',
   where: 'Na transposição em trilhos, cada <b>linha</b> é um trilho e cada <b>coluna</b> é a posição da letra.'},
  {id: 'funcao', name: 'Função', img: 'bulbasaur', color: '#3daa5c',
   big: 'Função é uma <mark>máquina que recebe e devolve</mark> um valor.',
   where: 'Em Vigenère, a máquina recebe a letra e a chave, faz a conta e <b>devolve</b> a nova letra.'},
  {id: 'procedimento', name: 'Procedimento', img: 'charmander', color: '#e94f4f',
   big: 'Procedimento é um <mark>roteiro de passos</mark> que executa, mas não devolve nada.',
   where: 'Ele percorre a mensagem, chama a função em cada letra e <b>escreve</b> o resultado na tela.'}
];

const codes = {
  vetor: `mensagem ← ["P","I","K","A","C","H","U"]
valor[0] ← 15        // P
escreva mensagem[3]  // mostra A`,
  matriz: `grade[linha][coluna] ← letra
grade[0][0] ← "P"
para cada linha: escreva a linha inteira`,
  funcao: `função cifrar_letra(x, k)
    soma ← x + k
    se soma ≥ 26 então
        soma ← soma − 26
    retorne soma
fim`,
  procedimento: `procedimento mostrar_cifra(msg, chave)
    para i ← 0 até tamanho(msg) − 1 faça
        k ← chave[i mod tamanho(chave)]
        escreva msg[i], " → ", cifrar_letra(msg[i], k)
    fim
fim`
};

const state = {step: 0, word: 'PIKACHU', pick: 0, rails: 3, fcase: 1, pword: 'EEVEE', pkey: 'SOL', pi: 0};

const select = (id, list, value, label) => `<label class="lp-select"><span>${label}</span><select id="${id}">${list.map(v => `<option ${v == value ? 'selected' : ''}>${v}</option>`).join('')}</select></label>`;

function frame(p, body) {
  return `<div class="lp" style="--pc:${p.color}">
  <div class="lp-intro"><img src="assets/characters/${p.img}.png" alt="${p.img}" width="88" height="88"><div><span class="lp-num">${state.step + 1} de 4</span><h3>${p.big}</h3><p>${p.where}</p></div></div>
  <div class="lp-part"><span class="part-tag see">1 · VEJA COMO FUNCIONA</span></div>
  ${body}
  ${exercise(p)}
  <details class="lp-code"><summary>Ver o pseudocódigo</summary><pre>${codes[p.id]}</pre></details></div>`;
}

// 1. VETOR -------------------------------------------------------------
function vetor(p) {
  const w = state.word, i = Math.min(state.pick, w.length - 1);
  const boxes = [...w].map((c, k) => `<button type="button" class="vbox ${k === i ? 'sel' : ''}" data-pick="${k}" style="--bc:${colors[k % colors.length]}"><span class="vbox-top"></span><strong>${c}</strong><small>valor ${val(c)}</small><em>[${k}]</em></button>`).join('');
  return frame(p, `<div class="lp-try">${select('v-word', words, w, 'Palavra')}<span class="lp-tip">Clique em uma caixinha ↓</span></div>
  <div class="vrow-wrap"><span class="callout">começa no 0!</span><div class="vrow">${boxes}</div><div class="vlabels">O número embaixo de cada caixinha é o <b>índice</b> (a posição).</div></div>
  <div class="readout"><code>mensagem[${i}]</code> = <b class="chip" style="--bc:${colors[i % colors.length]}">${w[i]}</b> <span class="arrow">→</span> <code>valor[${i}]</code> = <b class="chip num">${val(w[i])}</b><small>A posição ${i} é a ${i + 1}ª letra.</small></div>`);
}

// 2. MATRIZ ------------------------------------------------------------
function matriz(p) {
  const w = state.word, r = railFence(w, state.rails), cell = 46, left = 70, top = 34;
  const W = left + w.length * cell + 10, H = top + state.rails * cell + 10;
  let svg = `<svg viewBox="0 0 ${W} ${H}" class="msvg" role="img" aria-label="Matriz de ${state.rails} trilhos para ${w}">`;
  for (let c = 0; c < w.length; c++) svg += `<text x="${left + c * cell + cell / 2}" y="22" class="mhead">${c}</text>`;
  for (let row = 0; row < state.rails; row++) {
    svg += `<text x="8" y="${top + row * cell + cell / 2 + 5}" class="mlab" fill="${railColors[row]}">linha ${row}</text>`;
    for (let c = 0; c < w.length; c++) {
      const on = r.path[c] === row, x = left + c * cell, y = top + row * cell;
      svg += `<rect x="${x + 3}" y="${y + 3}" width="${cell - 6}" height="${cell - 6}" rx="9" fill="${on ? railColors[row] : '#eef1f6'}"/>`;
      if (!on) svg += `<circle cx="${x + cell / 2}" cy="${y + cell / 2}" r="2.5" fill="#c3cad6"/>`;
    }
  }
  const pts = r.path.map((row, c) => `${left + c * cell + cell / 2},${top + row * cell + cell / 2}`).join(' ');
  svg += `<polyline points="${pts}" class="mpath"/>`;
  r.path.forEach((row, c) => { svg += `<text x="${left + c * cell + cell / 2}" y="${top + row * cell + cell / 2 + 7}" class="mletter">${w[c]}</text>`; });
  svg += `</svg>`;
  const reading = r.rows.map((row, k) => `<span class="rchip" style="--bc:${railColors[k]}">linha ${k}: <b>${row.join('') || '—'}</b></span>`).join('<span class="plus">+</span>');
  return frame(p, `<div class="lp-try">${select('m-word', words, w, 'Palavra')}${select('m-rails', [2, 3, 4], state.rails, 'Trilhos (linhas)')}<span class="lp-tip">A linha tracejada é o caminho em zigue-zague.</span></div>
  <div class="mscroll">${svg}</div>
  <div class="readout wrap-row">Leia linha por linha: ${reading}<span class="arrow">=</span><b class="chip out">${r.result}</b></div>
  <p class="lp-note">Exemplo: <code>grade[1][1]</code> é a linha 1, coluna 1 = <b>${r.path[1] === 1 ? w[1] : '·'}</b>. As letras são as mesmas; só mudou o lugar.</p>`);
}

// 3. FUNÇÃO ------------------------------------------------------------
const cases = [
  {label: 'Soma pequena', x: 'A', k: 'O', dec: false},
  {label: 'Passou de 25', x: 'M', k: 'S', dec: false},
  {label: 'Deu exatamente 26', x: 'Z', k: 'B', dec: false},
  {label: 'Negativo (decifrar)', x: 'D', k: 'S', dec: true}
];
function funcao(p) {
  const c = cases[state.fcase], x = val(c.x), k = val(c.k);
  const raw = c.dec ? x - k : x + k;
  const fix = c.dec ? raw < 0 : raw >= 26;
  const out = c.dec ? (fix ? raw + 26 : raw) : (fix ? raw - 26 : raw);
  const q = c.dec ? `${raw} < 0 ?` : `${raw} ≥ 26 ?`;
  const fixText = c.dec ? `${raw} + 26 = ${out}` : `${raw} − 26 = ${out}`;
  const name = c.dec ? 'decifrar_letra' : 'cifrar_letra';
  return frame(p, `<div class="lp-try case-row">${cases.map((cs, i) => `<button type="button" class="case-btn ${i === state.fcase ? 'on' : ''}" data-case="${i}">${cs.label}</button>`).join('')}</div>
  <div class="machine-row">
    <div class="m-inputs"><span class="in-chip a">letra<b>${c.x} = ${x}</b></span><span class="in-chip b">chave<b>${c.k} = ${k}</b></span></div>
    <div class="m-arrow">➜</div>
    <div class="machine"><div class="m-title"><i></i><i></i><i></i> ${name}(${x}, ${k})</div>
      <div class="m-step">1. ${c.dec ? 'diferença' : 'soma'} ← ${x} ${c.dec ? '−' : '+'} ${k} = <b>${raw}</b></div>
      <div class="m-decide"><span class="diamond">${q}</span><span class="branch ${fix ? 'on' : ''}">SIM → ${fixText}</span><span class="branch ${fix ? '' : 'on'}">NÃO → fica ${raw}</span></div>
      <div class="m-step ret">2. retorne <b>${out}</b></div>
    </div>
    <div class="m-arrow">➜</div>
    <div class="m-output"><small>devolveu</small><b>${out}</b><span>= ${alphabet[out]}</span></div>
  </div>
  <p class="lp-note">A <b>função</b> sempre termina com <code>retorne</code>: o valor volta para quem chamou.</p>`);
}

// 4. PROCEDIMENTO ------------------------------------------------------
function procedimento(p) {
  const w = state.pword, key = state.pkey, n = w.length, i = state.pi;
  const k = j => key[j % key.length];
  const outs = [...w].map((c, j) => alphabet[(val(c) + val(k(j))) % 26]);
  const cells = [...w].map((c, j) => `<span class="pcell ${j < i ? 'done' : ''} ${j === i ? 'now' : ''}" style="--bc:${colors[j % colors.length]}"><b>${c}</b><small>+${k(j)}</small><em>[${j}]</em></span>`).join('');
  const lines = outs.slice(0, i).map((o, j) => `<div>${w[j]} + ${k(j)} → <b>${o}</b></div>`).join('') || '<div class="dim">(a tela ainda está vazia)</div>';
  const cur = i < n ? `i = ${i} · chama <code>cifrar_letra(${val(w[i])}, ${val(k(i))})</code>` : 'Fim do <code>para</code>: todas as letras foram escritas.';
  return frame(p, `<div class="lp-try">${select('p-word', words, w, 'Palavra')}${select('p-key', keys, key, 'Chave')}
    <button type="button" class="btn primary small" id="p-step" ${i >= n ? 'disabled' : ''}>▶ Próximo passo</button><button type="button" class="btn secondary small" id="p-all" ${i >= n ? 'disabled' : ''}>Executar tudo</button><button type="button" class="text-link" id="p-reset">↺ Recomeçar</button></div>
  <div class="proc">
    <div class="proc-loop"><span class="loop-tag">para i ← 0 até ${n - 1}</span><div class="prow">${cells}</div><p class="proc-now">${cur}</p></div>
    <div class="screen"><div class="screen-bar"><i></i><i></i><i></i> tela (escreva)</div>${lines}</div>
  </div>
  <div class="compare"><div class="cmp f"><b>Função</b><span>calcula UMA letra e <u>devolve</u></span></div><div class="cmp p"><b>Procedimento</b><span>repete os passos e só <u>escreve</u> na tela</span></div></div>`);
}

const renderers = {vetor, matriz, funcao, procedimento};

// ===== EXERCÍCIOS "AGORA É SUA VEZ" =====
const pick = list => list[Math.floor(Math.random() * list.length)];
const rand = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const clean = v => String(v).normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().replace(/[^A-Z0-9-]/g, '');
const exWords = ['PIKACHU', 'EEVEE', 'MEWTWO', 'PSYDUCK', 'ONIX', 'TOGEPI', 'GENGAR', 'ZUBAT', 'ABRA'];
const store = 'criptolab-logica';
let done = (() => { try { return JSON.parse(localStorage.getItem(store)) || []; } catch { return []; } })();
const saveDone = () => { try { localStorage.setItem(store, JSON.stringify(done)); } catch {} };
const unlocked = () => { let n = 0; while (n < 4 && done.includes(pillars[n].id)) n++; return n; };

const gens = {
  vetor() { const w = pick(exWords.filter(x => x !== state.word)); return {w, i: rand(1, w.length - 1), clicked: null, okA: false, okB: false, msg: ''}; },
  matriz() { const w = pick(exWords.filter(x => x.length >= 5)), t = pick([2, 3]); return {w, t, r: railFence(w, t), placed: 0, okRead: false, msg: '', bad: null}; },
  funcao() {
    const dec = Math.random() < 0.5; let x, k, raw;
    do { x = rand(0, 25); k = rand(1, 25); raw = dec ? x - k : x + k; } while (raw === 0);
    return {dec, x, k, raw, fix: dec ? raw < 0 : raw >= 26, stage: 0, msg: ''};
  },
  procedimento() { return {w: pick(['ONIX', 'ABRA', 'ZUBAT', 'EEVEE', 'MEW']), key: pick(['SOL', 'ASH']), i: 0, msg: ''}; }
};
const ex = {};
const getEx = id => (ex[id] ||= gens[id]());

function exercise(p) {
  const e = getEx(p.id), isDone = done.includes(p.id);
  const body = {vetor: exVetor, matriz: exMatriz, funcao: exFuncao, procedimento: exProc}[p.id](e);
  const fb = e.msg ? `<p class="ex-msg ${e.msgOk ? 'ok' : 'err'}" role="status">${e.msg}</p>` : '';
  return `<div class="exercise ${isDone ? 'is-done' : ''}"><div class="ex-head"><span class="part-tag do">2 · AGORA É SUA VEZ</span>${isDone ? '<span class="ex-badge">✓ Exercício concluído</span>' : '<span class="ex-lock">Termine para liberar o próximo pilar</span>'}<button type="button" class="text-link" data-newex>↻ Novo exercício</button></div>${body}${fb}</div>`;
}
function finish(id, text) {
  const e = getEx(id); e.msg = text; e.msgOk = true;
  if (!done.includes(id)) { done.push(id); saveDone(); }
}
const ask = (id, label, ph = '') => `<label class="ex-ask"><span>${label}</span><input id="${id}" autocomplete="off" placeholder="${ph}" data-autofocus></label><button type="button" class="btn primary small" data-check="${id}">Conferir</button>`;

function exVetor(e) {
  const boxes = [...e.w].map((c, k) => `<button type="button" class="vbox mystery ${e.okA && k === e.i ? 'sel' : ''} ${e.clicked === k && !e.okA ? 'wrong' : ''}" data-exbox="${k}" ${e.okA ? 'disabled' : ''} style="--bc:${colors[k % colors.length]}"><span class="vbox-top"></span><strong>${c}</strong><em>${e.okA ? `[${k}]` : '?'}</em></button>`).join('');
  return `<p class="ex-q"><b>a)</b> Os índices estão escondidos. Clique na caixinha <code>mensagem[${e.i}]</code>.</p>
  <div class="vrow ex-row">${boxes}</div>
  ${e.okA ? `<div class="ex-line"><b>b)</b>&nbsp;${e.okB ? `<code>valor[${e.i}]</code> = <b class="chip num">${val(e.w[e.i])}</b>` : ask('ex-v-b', `Quanto vale <code>valor[${e.i}]</code>? (A = 0)`, 'número')}</div>` : ''}`;
}
function exMatriz(e) {
  const {w, t, r} = e, cell = 44, left = 66, top = 30;
  const W = left + w.length * cell + 6, H = top + t * cell + 6;
  let svg = `<svg viewBox="0 0 ${W} ${H}" class="msvg ex-grid" role="img" aria-label="Grade para preencher">`;
  for (let c = 0; c < w.length; c++) svg += `<text x="${left + c * cell + cell / 2}" y="20" class="mhead">${c}</text>`;
  for (let row = 0; row < t; row++) {
    svg += `<text x="6" y="${top + row * cell + cell / 2 + 5}" class="mlab" fill="${railColors[row]}">linha ${row}</text>`;
    for (let c = 0; c < w.length; c++) {
      const x = left + c * cell, y = top + row * cell, filled = c < e.placed && r.path[c] === row;
      const active = c === e.placed, bad = e.bad && e.bad[0] === row && e.bad[1] === c;
      svg += `<rect x="${x + 3}" y="${y + 3}" width="${cell - 6}" height="${cell - 6}" rx="9" class="${active ? 'cell-active' : ''} ${bad ? 'cell-bad' : ''}" fill="${filled ? railColors[row] : active ? '#fff7d6' : '#eef1f6'}" ${active ? `data-cell="${row}"` : ''}/>`;
      if (filled) svg += `<text x="${x + cell / 2}" y="${y + cell / 2 + 7}" class="mletter">${w[c]}</text>`;
    }
  }
  svg += '</svg>';
  const next = e.placed < w.length;
  return `<p class="ex-q">Monte a matriz de <b>${t} trilhos</b> para <b>${w}</b>. A coluna amarela é a da vez: clique na linha certa.</p>
  ${next ? `<p class="ex-now">Letra da vez: <b class="chip" style="--bc:${colors[e.placed % colors.length]}">${w[e.placed]}</b> coluna ${e.placed}</p>` : ''}
  <div class="mscroll">${svg}</div>
  ${!next ? `<div class="ex-line">${e.okRead ? `Leitura: <b class="chip out">${r.result}</b>` : ask('ex-m-read', 'Agora leia linha por linha. Qual é o resultado?', 'letras')}</div>` : ''}`;
}
function exFuncao(e) {
  const L = alphabet, op = e.dec ? '−' : '+', name = e.dec ? 'decifrar_letra' : 'cifrar_letra';
  const q = e.dec ? `${e.raw} < 0 ?` : `${e.raw} ≥ 26 ?`;
  const out = e.dec ? (e.fix ? e.raw + 26 : e.raw) : (e.fix ? e.raw - 26 : e.raw);
  const rows = [];
  rows.push(e.stage > 0 ? `<div class="m-step">1. ${e.dec ? 'diferença' : 'soma'} ← ${e.x} ${op} ${e.k} = <b>${e.raw}</b></div>` : `<div class="m-step ask">1. ${e.dec ? 'diferença' : 'soma'} ← ${e.x} ${op} ${e.k} = ${ask('ex-f-1', '', '?')}</div>`);
  if (e.stage >= 1) rows.push(e.stage > 1 ? `<div class="m-decide"><span class="diamond">${q}</span><span class="branch on">${e.fix ? 'SIM' : 'NÃO'}</span></div>` : `<div class="m-decide"><span class="diamond">${q}</span><span class="yn"><button type="button" class="case-btn" data-yn="1">SIM</button><button type="button" class="case-btn" data-yn="0">NÃO</button></span></div>`);
  if (e.stage >= 2) rows.push(e.stage > 2 ? `<div class="m-step ret">2. retorne <b>${out}</b></div>` : `<div class="m-step ask">2. retorne ${ask('ex-f-3', '', '?')}</div>`);
  if (e.stage >= 3) rows.push(e.stage > 3 ? `<div class="m-step">3. ${out} = <b>${L[out]}</b></div>` : `<div class="m-step ask">3. ${out} vira qual letra? ${ask('ex-f-4', '', 'letra')}</div>`);
  return `<p class="ex-q">Você é a máquina! Calcule <code>${name}(${e.x}, ${e.k})</code>, passo a passo. A letra vale ${e.x} (= ${L[e.x]}) e a chave vale ${e.k} (= ${L[e.k]}).</p>
  <div class="machine ex-machine"><div class="m-title"><i></i><i></i><i></i> ${name}(${e.x}, ${e.k})</div>${rows.join('')}</div>`;
}
function exProc(e) {
  const k = j => e.key[j % e.key.length];
  const outs = [...e.w].map((c, j) => L26(val(c) + val(k(j))));
  const cells = [...e.w].map((c, j) => `<span class="pcell ${j < e.i ? 'done' : ''} ${j === e.i ? 'now' : ''}" style="--bc:${colors[j % colors.length]}"><b>${c}</b><small>+${k(j)}</small><em>[${j}]</em></span>`).join('');
  const lines = outs.slice(0, e.i).map((o, j) => `<div>${e.w[j]} + ${k(j)} → <b>${o}</b></div>`).join('') || '<div class="dim">(vazia: execute o primeiro passo)</div>';
  const cur = e.i < e.w.length ? `<div class="ex-line proc-ask"><span class="pa-text">i = ${e.i}: <b>${e.w[e.i]}</b> (${val(e.w[e.i])}) + <b>${k(e.i)}</b> (${val(k(e.i))}) =</span>${ask('ex-p', '', 'letra')}</div>` : '';
  return `<p class="ex-q">Você é o computador: execute <code>mostrar_cifra("${e.w}", "${e.key}")</code>. Em cada volta do <code>para</code>, escreva a letra na tela.</p>
  <div class="proc"><div class="proc-loop"><span class="loop-tag">para i ← 0 até ${e.w.length - 1}</span><div class="prow">${cells}</div>${cur}</div>
  <div class="screen"><div class="screen-bar"><i></i><i></i><i></i> tela (escreva)</div>${lines}</div></div>`;
}
const L26 = n => alphabet[((n % 26) + 26) % 26];

function checkAnswer(id) {
  const step = pillars[state.step].id, e = getEx(step), input = $('#' + id), v = clean(input?.value || '');
  if (!v) { e.msg = 'Digite uma resposta antes de conferir.'; e.msgOk = false; return; }
  const no = text => { e.msg = text; e.msgOk = false; };
  const yes = text => { e.msg = text; e.msgOk = true; };
  if (id === 'ex-v-b') {
    const want = val(e.w[e.i]);
    if (+v === want) { e.okB = true; finish('vetor', `Isso! ${e.w[e.i]} vale ${want}. Você usou índice e valor do vetor.`); }
    else no(`Ainda não. Ache ${e.w[e.i]} na tabela A=0, B=1, C=2… e conte até ela.`);
  }
  if (id === 'ex-m-read') {
    if (v === e.r.result) { e.okRead = true; finish('matriz', 'Perfeito! Você montou a matriz e leu linha por linha.'); }
    else no('Ainda não. Junte as letras da linha 0, depois da linha 1' + (e.t > 2 ? ', depois da linha 2.' : '.'));
  }
  if (id === 'ex-f-1') {
    if (+v === e.raw) { e.stage = 1; yes('Certo! Agora decida: precisa ajustar?'); }
    else no(`Refaça a conta: ${e.x} ${e.dec ? '−' : '+'} ${e.k}.`);
  }
  if (id === 'ex-f-3') {
    const out = e.dec ? (e.fix ? e.raw + 26 : e.raw) : (e.fix ? e.raw - 26 : e.raw);
    if (+v === out) { e.stage = 3; yes('Isso! Falta trocar o número pela letra.'); }
    else no(e.fix ? `Como precisou ajustar, faça ${e.raw} ${e.dec ? '+' : '−'} 26.` : `Não precisou ajustar: o valor continua ${e.raw}.`);
  }
  if (id === 'ex-f-4') {
    const out = e.dec ? (e.fix ? e.raw + 26 : e.raw) : (e.fix ? e.raw - 26 : e.raw);
    if (v === alphabet[out]) { e.stage = 4; finish('funcao', `Muito bem! A função devolveu ${out}, que é ${alphabet[out]}.`); }
    else no(`Conte na tabela: A=0, B=1, C=2… Qual letra vale ${out}?`);
  }
  if (id === 'ex-p') {
    const kk = e.key[e.i % e.key.length], want = L26(val(e.w[e.i]) + val(kk));
    if (v === want) {
      e.i++;
      if (e.i >= e.w.length) finish('procedimento', 'Fim do para! Você executou o procedimento inteiro. Ele não devolveu nada: só escreveu na tela.');
      else yes(`Certo! A tela recebeu ${want}. Próxima volta: i = ${e.i}.`);
    } else no(`Some ${val(e.w[e.i])} + ${val(kk)}. Se passar de 25, subtraia 26, e depois troque pela letra.`);
  }
}

function render(focus = false) {
  const p = pillars[state.step], open = unlocked();
  $('#logic-tabs').innerHTML = pillars.map((q, i) => `<button type="button" role="tab" aria-selected="${i === state.step}" class="ltab ${i === state.step ? 'on' : ''} ${done.includes(q.id) ? 'seen' : ''}" data-step="${i}" ${i > open ? 'disabled title="Termine o exercício anterior"' : ''} style="--pc:${q.color}"><span>${i > open ? '🔒' : i + 1}</span>${q.name}</button>`).join('<span class="ltab-arrow" aria-hidden="true">→</span>');
  $('#logic-panel').innerHTML = renderers[p.id](p);
  $('#logic-pos').textContent = `${state.step + 1} de 4 · ${p.name} · ${done.length}/4 exercícios feitos`;
  $('#logic-prev').disabled = state.step === 0;
  const ok = done.includes(p.id), next = $('#logic-next');
  next.disabled = !ok;
  next.textContent = !ok ? 'Faça o exercício para liberar →' : state.step === 3 ? 'Ir para o desafio ↓' : `Próximo: ${pillars[state.step + 1].name} →`;
  const end = $('#logic-done'); if (end) end.hidden = done.length < 4;
  bind();
  const af = document.querySelector('#logic-panel [data-autofocus]');
  if (af && !focus && document.activeElement?.closest?.('#logic-panel')) af.focus();
  if (focus) $('#pilares').scrollIntoView({behavior: 'smooth'});
}

function bind() {
  document.querySelectorAll('[data-step]').forEach(b => b.onclick = () => { state.step = +b.dataset.step; render(); });
  document.querySelectorAll('[data-pick]').forEach(b => b.onclick = () => { state.pick = +b.dataset.pick; render(); });
  document.querySelectorAll('[data-case]').forEach(b => b.onclick = () => { state.fcase = +b.dataset.case; render(); });
  const on = (id, fn) => { const el = $(id); if (el) el.onchange = () => { fn(el.value); render(); }; };
  on('#v-word', v => { state.word = v; state.pick = 0; });
  on('#m-word', v => { state.word = v; });
  on('#m-rails', v => { state.rails = +v; });
  on('#p-word', v => { state.pword = v; state.pi = 0; });
  on('#p-key', v => { state.pkey = v; state.pi = 0; });
  $('#p-step')?.addEventListener('click', () => { state.pi++; render(); });
  $('#p-all')?.addEventListener('click', () => { state.pi = state.pword.length; render(); });
  $('#p-reset')?.addEventListener('click', () => { state.pi = 0; render(); });
  // exercícios
  const id = pillars[state.step].id, e = getEx(id);
  document.querySelector('[data-newex]')?.addEventListener('click', () => { ex[id] = gens[id](); render(); });
  document.querySelectorAll('[data-check]').forEach(b => {
    const go = () => { checkAnswer(b.dataset.check); render(); };
    b.onclick = go;
    const inp = $('#' + b.dataset.check); if (inp) inp.onkeydown = ev => { if (ev.key === 'Enter') { ev.preventDefault(); go(); } };
  });
  document.querySelectorAll('[data-exbox]').forEach(b => b.onclick = () => {
    const k = +b.dataset.exbox; e.clicked = k;
    if (k === e.i) { e.okA = true; e.msg = `Isso! A ${e.i + 1}ª caixinha é a posição ${e.i}, porque a contagem começa no 0.`; e.msgOk = true; }
    else { e.msg = `Você clicou na ${k + 1}ª caixinha, que é mensagem[${k}]. Conte de novo começando no 0.`; e.msgOk = false; }
    render(); $('#ex-v-b')?.focus();
  });
  document.querySelectorAll('[data-cell]').forEach(c => c.onclick = () => {
    const row = +c.dataset.cell;
    if (row === e.r.path[e.placed]) { e.placed++; e.bad = null; e.msg = e.placed < e.w.length ? 'Certo! Próxima letra.' : 'Grade completa! Agora leia o resultado.'; e.msgOk = true; }
    else { e.bad = [row, e.placed]; e.msg = 'Não é essa linha. O caminho desce até a última linha e depois sobe, sem pular linha.'; e.msgOk = false; }
    render(); $('#ex-m-read')?.focus();
  });
  document.querySelectorAll('[data-yn]').forEach(b => b.onclick = () => {
    const yes = b.dataset.yn === '1';
    if (yes === e.fix) { e.stage = 2; e.msg = e.fix ? `Isso: precisa ajustar, então ${e.dec ? 'some' : 'subtraia'} 26.` : 'Isso: já está entre 0 e 25, não precisa ajustar.'; e.msgOk = true; }
    else { e.msg = e.dec ? `Veja o sinal: ${e.raw} é ${e.raw < 0 ? 'menor' : 'maior'} que zero?` : `Compare: ${e.raw} é maior ou igual a 26?`; e.msgOk = false; }
    render(); $('#ex-f-3')?.focus();
  });
}

$('#logic-prev').onclick = () => { if (state.step > 0) { state.step--; render(true); } };
$('#logic-next').onclick = () => {
  if (!done.includes(pillars[state.step].id)) return;
  if (state.step < 3) { state.step++; render(true); } else $('.logic-practice').scrollIntoView({behavior: 'smooth'});
};
state.step = Math.min(unlocked(), 3);
render();
