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
  ${body}
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

function render(focus = false) {
  const p = pillars[state.step];
  $('#logic-tabs').innerHTML = pillars.map((q, i) => `<button type="button" role="tab" aria-selected="${i === state.step}" class="ltab ${i === state.step ? 'on' : ''} ${i < state.step ? 'seen' : ''}" data-step="${i}" style="--pc:${q.color}"><span>${i + 1}</span>${q.name}</button>`).join('<span class="ltab-arrow" aria-hidden="true">→</span>');
  $('#logic-panel').innerHTML = renderers[p.id](p);
  $('#logic-pos').textContent = `${state.step + 1} de 4 · ${p.name}`;
  $('#logic-prev').disabled = state.step === 0;
  $('#logic-next').textContent = state.step === 3 ? 'Ir para o desafio ↓' : `Próximo: ${pillars[state.step + 1].name} →`;
  bind();
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
}

$('#logic-prev').onclick = () => { if (state.step > 0) { state.step--; render(true); } };
$('#logic-next').onclick = () => {
  if (state.step < 3) { state.step++; render(true); } else $('.logic-practice').scrollIntoView({behavior: 'smooth'});
};
render();
