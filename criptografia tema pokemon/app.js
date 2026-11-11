import {portrait,characterText} from './characters.js?v=guided-6';
import {missions} from './pokemon.js';
import {alphabet,normalize,atbash,railFence,vigenere,affine,rsa,multipliers} from './ciphers.js';
import {lessons} from './lessons.js?v=guided-6';
import {createPractice} from './practice.js';
import {createProgression,sanitizeProgress,getProgressState,canOpenLesson,canAnswerActivity,recordCorrect} from './progression.js';
import {normalizeActivityAnswer,verifyActivityAnswer} from './grading.js';
import {buildStudentReport} from './student-report.js';

const progression=createProgression(lessons), totalActivities=progression.length;
const storageKey='criptolab-guided-student-v3';
const practiceState=new Map(), drafts=new Map();
const $=selector=>document.querySelector(selector);
const escape=text=>String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
lessons.forEach((lesson,index)=>{lesson.mission=missions[index];});
let solvedIds=[],answers={},notes={},attempts={},canSaveProgress=true,sessionRevision=0;
try {
 const saved=JSON.parse(localStorage.getItem(storageKey)||'{}');
 solvedIds=sanitizeProgress(saved?.completed,progression);
 for(const [field,limit] of [['answers',100],['notes',2000]]) {
  const clean={};
  for(const activity of progression)if(typeof saved?.[field]?.[activity.id]==='string')clean[activity.id]=saved[field][activity.id].slice(0,limit);
  if(field==='answers')answers=clean;else notes=clean;
 }
 for(const activity of progression){const value=saved?.attempts?.[activity.id];if(Number.isInteger(value)&&value>=0)attempts[activity.id]=Math.min(value,10000);}
}catch{canSaveProgress=false;}
const state=()=>getProgressState(solvedIds,progression);
const initialHash=location.hash.slice(1), initialState=state();
let current=lessons.find(lesson=>lesson.id===initialHash&&canOpenLesson(lesson.id,solvedIds,progression))||lessons.find(lesson=>lesson.id===initialState.nextLessonId)||lessons[0];
let tab='learn',activeActivityId=null;
if(lessons.some(lesson=>lesson.id===initialHash)&&!canOpenLesson(initialHash,solvedIds,progression)){
 history.replaceState(null,'',`#${current.id}`);
 $('#learning-status').textContent='Esse ginásio será liberado após as atividades anteriores. Continue pela etapa disponível.';
}

function saveProgress(){
 try{localStorage.setItem(storageKey,JSON.stringify({completed:solvedIds,answers,notes,attempts}));}catch{canSaveProgress=false;}
 updateProgress();
}
function dots(n){return `<span class="level-dots" aria-label="Dificuldade ${n} de 5">${Array.from({length:5},(_,i)=>`<i class="${i<n?'filled':''}"></i>`).join('')}</span>`;}
function updateProgress(){
 const progress=state();
 $('#progress-count').textContent=`${progress.completed} / ${totalActivities}`;
 $('#progress-bar').max=totalActivities;$('#progress-bar').value=progress.completed;$('#progress-bar').textContent=`${progress.completed} de ${totalActivities}`;
 $('#progress-storage').textContent=canSaveProgress?'Respostas, rascunho e progresso salvos neste navegador.':'Armazenamento bloqueado: mantenha esta aba aberta. O progresso vale apenas nesta sessão.';
 $('#current-goal').textContent=progress.complete?'Trilha concluída! Laboratório e treino livre liberados.':`Próxima etapa: ${lessons.find(lesson=>lesson.id===progress.nextLessonId).name} · atividade ${lessons.find(lesson=>lesson.id===progress.nextLessonId).activities.findIndex(activity=>activity.id===progress.nextActivityId)+1} de 6.`;
 $('#roadmap').innerHTML=`<div class="route-card completed"><small>SEU PONTO DE PARTIDA</small><span class="route-number">00 ✓</span><h3>César</h3><p>Revisão anterior</p><span>Um deslocamento fixo</span></div>`+lessons.map(lesson=>{
  const unlocked=canOpenLesson(lesson.id,solvedIds,progression),count=lesson.activities.filter(activity=>solvedIds.includes(activity.id)).length;
  return `<button type="button" class="route-card ${lesson.id===current.id?'active':''} ${unlocked?'':'locked'}" data-method="${lesson.id}" ${unlocked?'':'disabled'}><small>${unlocked?lesson.level.toUpperCase():'BLOQUEADO'}</small><span class="route-number">${lesson.number} <span>${count===6?'✓':unlocked?'↗':'🔒'}</span></span><h3>${lesson.short||lesson.name}</h3><span class="pokemon-guide">${portrait(lesson.mission.pokemon,'route-pokemon')}<span>${lesson.mission.pokemon}</span></span><p>${unlocked?`${count} / 6 atividades`:'Conclua o ginásio anterior'}</p>${dots(lesson.difficulty)}</button>`;
 }).join('');
 $('#method-nav').innerHTML=lessons.map(lesson=>{
  const unlocked=canOpenLesson(lesson.id,solvedIds,progression);
  return `<button type="button" class="method-link ${lesson.id===current.id?'active':''}" data-method="${lesson.id}" aria-current="${lesson.id===current.id?'page':'false'}" ${unlocked?'':'disabled'}>${portrait(lesson.mission.pokemon,'menu-pokemon')}<span><strong>${lesson.name}</strong><small class="method-meta">${unlocked?lesson.level:'🔒 Conclua o ginásio anterior'}</small></span></button>`;
 }).join('');
 document.querySelectorAll('[data-method]').forEach(button=>button.onclick=()=>selectMethod(button.dataset.method));
 document.querySelectorAll('[data-tab]').forEach(button=>{const locked=['lab','practice'].includes(button.dataset.tab)&&!progress.complete;button.disabled=locked;button.title=locked?`Conclua as ${totalActivities} atividades para liberar.`:'';});
}
$('#alphabet-mini').innerHTML=`<div class="alphabet-mini">${[...alphabet].map((letter,index)=>`<span>${letter}<small>${index}</small></span>`).join('')}</div>`;
$('#alphabet-toggle').onclick=()=>{const el=$('#alphabet-mini');el.hidden=!el.hidden;$('#alphabet-toggle').setAttribute('aria-expanded',String(!el.hidden));};

function selectMethod(id,view='learn',activityId=null,scroll=true){
 const lesson=lessons.find(item=>item.id===id);
 if(!lesson||!canOpenLesson(id,solvedIds,progression)){
  $('#learning-status').textContent='Ginásio bloqueado. Acerte as atividades anteriores para liberar esta etapa.';
  history.replaceState(null,'',`#${current.id}`);return false;
 }
 current=lesson;tab=['lab','practice'].includes(view)&&!state().complete?'activities':view;
 activeActivityId=activityId;history.replaceState(null,'',`#${id}`);renderLesson();
 if(scroll){$('#conteudo').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});$('#lesson-title').focus({preventScroll:true});}
 return true;
}
window.addEventListener('hashchange',()=>{const id=location.hash.slice(1);if(lessons.some(lesson=>lesson.id===id)&&id!==current.id)selectMethod(id);});
function renderLesson(){
 if(!canOpenLesson(current.id,solvedIds,progression))current=lessons.find(lesson=>lesson.id===state().nextLessonId)||lessons[0];
 const lesson=current,complete=state().complete;
 $('#lesson').innerHTML=`<div class="lesson-top"><span class="badge">GINÁSIO ${lesson.number} / ${lesson.tag}</span><span class="lesson-time">◷ ${lesson.time}</span></div><h2 id="lesson-title" tabindex="-1">${lesson.name}</h2><p class="lesson-subtitle">${lesson.subtitle}</p><div class="lesson-level">${dots(lesson.difficulty)}<span>${lesson.level}</span></div><div class="lesson-tabs" role="tablist" aria-label="Conteúdo da aula"><button role="tab" id="tab-learn" aria-controls="lesson-panel" data-tab="learn">01 <span>Entenda</span></button><button role="tab" id="tab-activities" aria-controls="lesson-panel" data-tab="activities">02 <span>Atividades</span></button><button role="tab" id="tab-lab" aria-controls="lesson-panel" data-tab="lab" ${complete?'':'disabled'}>03 <span>${complete?'':'🔒 '}Laboratório</span></button><button role="tab" id="tab-practice" aria-controls="lesson-panel" data-tab="practice" ${complete?'':'disabled'}>04 <span>${complete?'':'🔒 '}Treino livre</span></button></div>${complete?'':`<p class="lab-lock-note">🔒 Laboratório e treino livre serão liberados ao concluir as ${totalActivities} atividades. Use a explicação, a tabela de letras e seu rascunho para resolver.</p>`}<div id="lesson-panel" class="panel" role="tabpanel"></div>`;
 document.querySelectorAll('[data-tab]').forEach(button=>{
  button.onclick=()=>{if(button.disabled)return;tab=button.dataset.tab;renderPanel();};
  button.onkeydown=event=>{
   if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
   event.preventDefault();const order=[...document.querySelectorAll('[data-tab]')].filter(item=>!item.disabled).map(item=>item.dataset.tab);let index=order.indexOf(tab);
   index=event.key==='Home'?0:event.key==='End'?order.length-1:(index+(event.key==='ArrowRight'?1:order.length-1))%order.length;
   tab=order[index];renderPanel();$(`#tab-${tab}`).focus();
  };
 });renderPanel();updateProgress();
}
function renderPanel(){
 if(!canOpenLesson(current.id,solvedIds,progression)){selectMethod(state().nextLessonId||lessons[0].id);return;}
 if(['lab','practice'].includes(tab)&&!state().complete)tab='activities';
 document.querySelectorAll('[data-tab]').forEach(button=>{const selected=button.dataset.tab===tab;button.setAttribute('aria-selected',String(selected));button.tabIndex=selected?0:-1;button.classList.toggle('active',selected);});
 $('#lesson-panel').setAttribute('aria-labelledby',`tab-${tab}`);
 if(tab==='learn')renderLearn();else if(tab==='lab')renderLab();else if(tab==='practice')renderPractice();else renderActivities();
}

function renderLearn(){const l=current;$('#lesson-panel').innerHTML=`<section class="mission-brief"><div class="mission-guide">${portrait(l.mission.pokemon,'mission-pokemon')}<div><span class="eyebrow">${l.mission.pokemon} · ${l.mission.title}</span><h3>Sua missão de treinador</h3></div></div><p>${l.mission.story}</p></section><section class="pokemon-walkthrough paper"><span class="eyebrow">PRIMEIRO, VAMOS FAZER JUNTOS</span><div class="example-code">${l.mission.plain} → ${l.mission.result}</div><ol class="steps">${l.mission.steps.map(s=>`<li>${s}</li>`).join('')}</ol><p class="mission-recap"><strong>Agora você:</strong> resolva a atividade liberada. Você pode digitar a resposta e registrar as contas no rascunho da tela.</p></section><details class="glossary"><summary>Palavras que ajudam nesta aula</summary><dl><dt>Cifrar e decifrar</dt><dd>Cifrar transforma a mensagem; decifrar recupera o texto preparado, usando a regra e a chave corretas.</dd><dt>Chave</dt><dd>É o parâmetro da regra: por exemplo, 3 trilhos ou a palavra SOL. Atbash usa um espelho fixo.</dd><dt>mod (módulo)</dt><dd>É o resto da divisão. 29 mod 26 = 3, pois 29 = 1×26 + 3. Para −3 mod 26, some 26: o resultado é 23.</dd><dt>Texto preparado</dt><dd>Usamos apenas A–Z: “Olá, turma!” vira OLATURMA. A volta recupera essas letras; os espaços e acentos removidos não retornam.</dd></dl></details><p class="panel-intro">${l.intro}</p><div class="paper concept"><span class="eyebrow">A IDEIA POR TRÁS</span><h3>${l.id==='rail'?'Reorganizar também é cifrar.':l.id==='rsa'?'Duas chaves que se completam.':'Uma regra para cada transformação.'}</h3><p>${l.concept}</p><div class="prereq"><strong>Antes de começar</strong><span>${l.prereq}</span></div></div><div class="concept-grid"><section class="paper"><span class="step-label">→ IDA</span><h3>Como cifrar</h3><ol class="steps">${l.encrypt.map(s=>`<li>${s}</li>`).join('')}</ol></section><section class="paper"><span class="step-label">← VOLTA</span><h3>Como decifrar</h3><ol class="steps">${l.decrypt.map(s=>`<li>${s}</li>`).join('')}</ol></section></div><div class="example"><small>UM EXEMPLO COMPLETO</small><div class="example-code">${l.example}</div><p>${l.detail}</p></div><div class="formula">${l.formula}</div><div class="reflection">${portrait(l.mission.pokemon,'reflection-pokemon')}<div><strong>Pare e investigue</strong><p>${l.question}</p><small>${l.limit}</small></div></div><button class="btn primary" id="go-lab">Responder a atividade liberada <span aria-hidden="true">↗</span></button>`;$('#go-lab').onclick=()=>{tab='activities';renderPanel();$('#student-answer')?.focus();};}

function renderLab(){
 if(!state().complete){tab='activities';renderPanel();return;}
 const l=current;const saved=drafts.get(l.id)||{};
 const text=saved.text??l.mission.plain;
 $('#lesson-panel').innerHTML=`<div class="section-heading compact"><div><h3>Laboratório dos treinadores.</h3><p>Altere a mensagem e acompanhe o processo.</p></div><span class="tiny-label">TUDO ACONTECE NO SEU NAVEGADOR</span></div><div class="lab-grid"><form id="lab-form" class="paper lab-controls"><div class="mode-toggle" role="group" aria-label="Operação"><button type="button" id="mode-encrypt" class="active" aria-pressed="true">Cifrar →</button><button type="button" id="mode-decrypt" aria-pressed="false">← Decifrar</button></div><div class="field"><label for="lab-text">${l.id==='rsa'?'Número de entrada (0 a 32)':'Sua mensagem'}</label>${l.id==='rsa'?`<input id="lab-text" type="number" min="0" max="32" step="1" value="${escape(text)}" required>`:`<textarea id="lab-text" rows="3" maxlength="500" spellcheck="false" required>${escape(text)}</textarea>`}<small>${l.id==='rsa'?'Neste exemplo, trabalhamos com números, não com letras.':'Até 500 caracteres. Acentos, espaços e pontuação são removidos.'}</small></div>${l.id==='rail'?`<div class="field"><label for="lab-rails">Número de trilhos · a chave</label><select id="lab-rails">${[2,3,4,5,6].map(n=>`<option ${n===(saved.rails||2)?'selected':''}>${n}</option>`).join('')}</select></div>`:''}${l.id==='vigenere'?`<div class="field"><label for="lab-key">Palavra-chave</label><input id="lab-key" maxlength="100" value="${escape(saved.key||'SOL')}" spellcheck="false" required><small>A chave é repetida até o fim da mensagem.</small></div>`:''}${l.id==='affine'?`<div class="key-grid"><div class="field"><label for="lab-a">Multiplicador a</label><select id="lab-a">${multipliers.map(n=>`<option ${n===(saved.a||5)?'selected':''}>${n}</option>`).join('')}</select></div><div class="field"><label for="lab-b">Deslocamento b</label><input id="lab-b" type="number" min="0" max="25" step="1" value="${saved.b??8}" required></div></div>`:''}${l.id==='rsa'?`<div class="key-summary"><div><small>CHAVE PÚBLICA</small><strong>n = 33 · e = 3</strong></div><div><small>CHAVE PRIVADA DIDÁTICA</small><strong>n = 33 · d = 7</strong></div></div>`:''}${l.id==='atbash'?`<div class="feedback info">Atbash não precisa de chave. Cifrar e decifrar usam exatamente a mesma regra.</div>`:''}<button type="submit" class="btn primary">Transformar mensagem <span aria-hidden="true">↗</span></button><button type="button" id="use-result" class="text-link">Usar resultado e inverter operação ⇄</button></form><div class="result-panel"><div class="result-head"><span class="eyebrow">RESULTADO</span><span id="operation-label">MENSAGEM CIFRADA</span></div><output id="lab-output" class="result-output" aria-live="polite"></output><p id="normalization-note" class="result-note"></p><div id="lab-error" class="feedback error" role="alert" hidden></div><div class="trace" id="lab-trace"></div></div></div><div class="feedback info"><strong>O que observar:</strong> ${l.question} ${l.id==='rail'?'Compare também a quantidade de cada letra antes e depois.':''}</div><button class="btn secondary" id="go-activities">Ir para os desafios →</button>`;
 let decrypt=saved.decrypt??false,lastResult='';
 function setMode(value){decrypt=value;$('#mode-encrypt').classList.toggle('active',!value);$('#mode-decrypt').classList.toggle('active',value);$('#mode-encrypt').setAttribute('aria-pressed',String(!value));$('#mode-decrypt').setAttribute('aria-pressed',String(value));$('#operation-label').textContent=value?'MENSAGEM DECIFRADA':'MENSAGEM CIFRADA';}
 function transform(event){event?.preventDefault();if(!state().complete)return;$('#lab-error').hidden=true;try{
 const raw=$('#lab-text').value;if(l.id==='affine'&&!$('#lab-b').value.trim())throw Error('Digite o deslocamento b de 0 a 25.');const clean=normalize(raw);if(l.id!=='rsa'&&!clean)throw Error('Escreva pelo menos uma letra de A a Z.');if(l.id==='rsa'&&!raw.trim())throw Error('Digite um número inteiro de 0 a 32.');
 const draft={text:raw,decrypt,rails:Number($('#lab-rails')?.value),key:$('#lab-key')?.value,a:Number($('#lab-a')?.value),b:Number($('#lab-b')?.value)};drafts.set(l.id,draft);
 let output,trace='';
 if(l.id==='atbash'){output=atbash(raw);trace=`<h4>O espelho letra a letra</h4><div class="pair-grid">${[...clean].slice(0,36).map((c,i)=>`<span>${c}<small>↕</small><strong>${output[i]}</strong></span>`).join('')}</div>`;}
 if(l.id==='rail'){const r=railFence(raw,draft.rails,decrypt);output=r.result;const plain=decrypt?output:clean;trace=`<h4>${decrypt?'Reconstrução do':'Escrita em'} zigue-zague</h4><div class="rail-diagram" role="img" aria-label="${escape(r.rows.map((row,i)=>`Trilho ${i+1}: ${row.join('')}`).join('. '))}"><div class="rail-scroll">${r.rows.map((_,ri)=>`<div class="rail-row"><span class="rail-label">${ri+1}</span>${[...plain].slice(0,70).map((c,i)=>`<span class="rail-cell ${r.path[i]===ri?'on':''}">${r.path[i]===ri?c:'·'}</span>`).join('')}</div>`).join('')}</div></div><p class="trace-caption">Leitura por linha: ${r.rows.map(row=>escape(row.join(''))).join(' | ')}${plain.length>70?' · Diagrama limitado às 70 primeiras posições.':''}</p><p>${decrypt?'Preencha as linhas com o texto cifrado; depois leia pelo percurso em zigue-zague.':'O texto cifrado é a concatenação dos trilhos, de cima para baixo.'}</p>`;}
 if(l.id==='vigenere'){const r=vigenere(raw,draft.key,decrypt);output=r.result;trace=traceTable(['Letra','Chave','Cálculo mod 26','Saída'],r.trace.slice(0,30).map(t=>[t.letter,t.key,`${t.x} ${decrypt?'−':'+'} ${t.shift} → ${t.value}`,t.result]))+`<p>Chave repetida: <code>${escape(r.trace.slice(0,50).map(t=>t.key).join(''))}${r.trace.length>50?'…':''}</code></p>`;}
 if(l.id==='affine'){const r=affine(raw,draft.a,draft.b,decrypt);output=r.result;trace=`<p>Inverso de ${draft.a}: <strong>${r.inverse}</strong> · ${draft.a} × ${r.inverse} mod 26 = 1</p>`+traceTable(['Letra','Valor','Cálculo mod 26','Saída'],r.trace.slice(0,30).map(t=>[t.letter,t.x,`${decrypt?`${r.inverse}×(${t.x}−${draft.b})`:`${draft.a}×${t.x}+${draft.b}`} → ${t.value}`,t.result]));}
 if(l.id==='rsa'){const number=Number(raw);output=String(rsa(number,decrypt));trace=`<h4>${decrypt?'Desfazendo com a chave privada':'Cifrando com a chave pública'}</h4><div class="rsa-equation">${number}<sup>${decrypt?7:3}</sup> mod 33 = <strong>${output}</strong></div><p>${decrypt?'Expoente d=7, conhecido como a chave privada neste exemplo.':'Expoente e=3, que pode ser divulgado com n=33.'}</p><small>p=3 · q=11 · φ(n)=20 · e×d=21 ≡ 1 (mod 20)</small>`;}
 lastResult=output;$('#lab-output').textContent=output;$('#lab-trace').innerHTML=trace;$('#normalization-note').textContent=l.id==='rsa'?'Demonstração matemática com números pequenos.':`Texto preparado: ${clean.length>60?clean.slice(0,60)+'…':clean}${clean.length>30&&['vigenere','affine'].includes(l.id)?' · A tabela mostra as primeiras 30 letras.':''}`;
 }catch(error){lastResult='';$('#lab-output').textContent='—';$('#lab-trace').innerHTML='';$('#normalization-note').textContent='';$('#lab-error').textContent=error.message;$('#lab-error').hidden=false;}}
 $('#lab-form').onsubmit=transform;$('#mode-encrypt').onclick=()=>{setMode(false);transform();};$('#mode-decrypt').onclick=()=>{setMode(true);transform();};$('#use-result').onclick=()=>{if(!lastResult)return;$('#lab-text').value=lastResult;setMode(!decrypt);transform();};$('#go-activities').onclick=()=>{tab='activities';renderPanel();$('#student-answer')?.focus();};setMode(decrypt);transform();
}
function traceTable(headers,rows){return `<h4>Acompanhe cada transformação</h4><div class="table-scroll"><table><thead><tr>${headers.map(h=>`<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(c=>`<td>${escape(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;}

function renderActivities(){
 const lesson=current,progress=state();
 const available=lesson.activities.filter(activity=>canAnswerActivity(activity.id,solvedIds,progression));
 const requested=available.find(activity=>activity.id===activeActivityId);
 const activity=requested||available.find(item=>item.id===progress.nextActivityId)||available.at(-1);
 if(!activity){$('#lesson-panel').innerHTML='<p>Conclua as atividades anteriores para abrir este ginásio.</p>';return;}
 activeActivityId=activity.id;
 const completed=solvedIds.includes(activity.id),index=lesson.activities.indexOf(activity),globalIndex=progression.findIndex(item=>item.id===activity.id);
 const scratchHelp={atbash:'Anote os pares do alfabeto invertido.',rail:'Anote o percurso e as letras de cada trilho.',vigenere:'Alinhe a mensagem e a chave. Anote as somas ou subtrações.',affine:'Anote a fórmula, os valores das letras e os restos por 26.',rsa:'Anote as potências e os restos por 33.'}[lesson.id];
 $('#lesson-panel').innerHTML=`<div class="section-heading compact"><div><h3>Uma etapa de cada vez.</h3><p>Digite sua resposta e use o rascunho na tela. Cada acerto libera a próxima atividade. Você pode rever a explicação em “Entenda” e tentar novamente quantas vezes precisar.</p></div></div><nav class="activity-steps" aria-label="Etapas deste ginásio">${lesson.activities.map((item,i)=>{
  const open=canAnswerActivity(item.id,solvedIds,progression),done=solvedIds.includes(item.id);
  return `<button type="button" data-activity="${item.id}" ${open?'':'disabled'} aria-label="Atividade ${i+1}: ${done?'concluída':open?'disponível':'bloqueada'}" aria-current="${item.id===activity.id?'step':'false'}" class="activity-step ${done?'done':''}"><span>${done?'✓':open?i+1:'🔒'}</span><small>${item.level}</small></button>`;
 }).join('')}</nav><section class="paper student-activity" data-active-activity="${activity.id}" aria-labelledby="activity-title"><div class="activity-top"><span class="badge">${index+1} / 6 · ${activity.level}</span><span class="tiny-label">ETAPA ${globalIndex+1} / ${totalActivities}</span></div><div class="activity-guide">${portrait(lesson.mission.pokemon,'activity-pokemon')}<div><span class="tiny-label">${activity.type.toUpperCase()}</span><h4 id="activity-title">${characterText(activity.prompt)}</h4></div></div><form id="student-form"><div class="field"><label for="student-answer">Sua resposta final</label>${activity.kind==='choice'?`<select id="student-answer" required ${completed?'disabled':''}><option value="">Escolha uma resposta</option>${activity.options.map((option,i)=>`<option value="${i}">${escape(option)}</option>`).join('')}</select>`:`<input id="student-answer" ${activity.kind==='number'?'type="number" min="0" max="32" step="1"':'type="text" maxlength="100" spellcheck="false" autocomplete="off"'} ${completed?'readonly':''} required>`}<small>${activity.kind==='choice'?'Selecione uma das alternativas.':activity.kind==='number'?'Digite somente um número inteiro de 0 a 32.':'Maiúsculas, minúsculas e acentos são aceitos. Espaços e pontuação são ignorados.'}</small></div><div class="field"><label for="student-notes">Seu raciocínio (opcional)</label><textarea id="student-notes" rows="5" maxlength="2000" placeholder="${scratchHelp}"></textarea><small>Use este espaço como rascunho: anote contas, trilhos ou como pensou. A resposta final vai no campo acima.</small></div>${completed?'':`<button type="submit" class="btn primary" id="check-answer">Conferir e liberar a próxima →</button>`}</form><div id="activity-feedback" tabindex="-1" role="status" ${completed?'':'hidden'} class="feedback ${completed?'success':''}">${completed?'✓ Resposta correta. Esta atividade está concluída.':''}</div><div id="student-hint"></div>${completed?`<div class="completion-actions"><button type="button" class="btn primary" id="continue-activity">${progress.complete?'Trilha concluída · abrir laboratório →':'Continuar para a próxima atividade →'}</button><p>${progress.complete?'Você concluiu as 30 atividades e pode experimentar livremente.':'A próxima etapa já foi liberada. Sua resposta e seu rascunho continuam salvos.'}</p></div>`:''}<div class="student-support"><button type="button" class="text-link" id="review-explanation">Rever a explicação deste método</button><button type="button" class="text-link" id="activity-alphabet">Consultar alfabeto A–Z ↕</button></div><div id="activity-alphabet-table" hidden><div class="alphabet-mini">${[...alphabet].map((letter,i)=>`<span>${letter}<small>${i}</small></span>`).join('')}</div></div></section>`;
 const answerField=$('#student-answer'),noteField=$('#student-notes'),hintContainer=$('#student-hint');
 answerField.value=answers[activity.id]||'';noteField.value=notes[activity.id]||'';
 answerField.oninput=()=>{if(!solvedIds.includes(activity.id)){answers[activity.id]=answerField.value;saveProgress();}};
 noteField.oninput=()=>{notes[activity.id]=noteField.value;saveProgress();};
 function showHint(){
  if(hintContainer.isConnected&&!completed&&(attempts[activity.id]||0)>0)hintContainer.innerHTML=`<details class="hint"><summary>Preciso de uma pista</summary><p>${activity.hint}</p></details>`;
 }
 showHint();
 $('#student-form').onsubmit=async event=>{
  event.preventDefault();
  if(!canOpenLesson(lesson.id,solvedIds,progression)||!canAnswerActivity(activity.id,solvedIds,progression)||solvedIds.includes(activity.id))return;
  const value=answerField.value,feedback=$('#activity-feedback'),button=$('#check-answer');
  if(button.disabled)return;
  if(normalizeActivityAnswer(activity,value)===null){feedback.hidden=false;feedback.className='feedback error';feedback.textContent='Confira o formato da resposta indicado abaixo do campo.';return;}
  const revision=sessionRevision;button.disabled=true;button.textContent='Conferindo…';
  try{
   const correct=await verifyActivityAnswer(activity,value);
   if(revision!==sessionRevision)return;
   answers[activity.id]=value;notes[activity.id]=noteField.value;attempts[activity.id]=(attempts[activity.id]||0)+1;
   if(correct){
    solvedIds=recordCorrect(activity.id,solvedIds,progression);saveProgress();
    $('#learning-status').textContent=state().complete?'Parabéns! Trilha completa. Laboratório e treino livre liberados.':'Resposta correta! A próxima atividade foi liberada.';
    if(tab==='activities'&&current.id===lesson.id&&activeActivityId===activity.id){activeActivityId=activity.id;renderLesson();$('#activity-feedback')?.focus({preventScroll:true});}
   }else{
    saveProgress();feedback.hidden=false;feedback.className='feedback error';feedback.textContent='Ainda não. Confira a regra, a chave e a ordem das letras. Seu rascunho e os acertos anteriores foram mantidos. Você pode abrir uma pista abaixo e tentar de novo.';showHint();
   }
  }catch(error){feedback.hidden=false;feedback.className='feedback error';feedback.textContent=error.message;}
  finally{if(button.isConnected){button.disabled=false;button.textContent='Conferir e liberar a próxima →';}}
 };
 document.querySelectorAll('[data-activity]').forEach(button=>button.onclick=()=>{
  if(!canAnswerActivity(button.dataset.activity,solvedIds,progression))return;
  activeActivityId=button.dataset.activity;renderActivities();$('#activity-title').scrollIntoView({block:'nearest'});
 });
 $('#continue-activity')?.addEventListener('click',()=>{
  const next=state();
  if(next.complete){tab='lab';renderLesson();$('#mode-encrypt')?.focus();return;}
  selectMethod(next.nextLessonId,'activities',next.nextActivityId);
 });
 $('#review-explanation').onclick=()=>{tab='learn';renderPanel();$('#tab-learn').focus();};
 $('#activity-alphabet').onclick=()=>{const table=$('#activity-alphabet-table');table.hidden=!table.hidden;$('#activity-alphabet').setAttribute('aria-expanded',String(!table.hidden));};
}

function renderPractice(){
 if(!state().complete){tab='activities';renderPanel();return;}
 const l=current;
 let practiceData=practiceState.get(l.id)||{operation:'encrypt',difficulty:'guiado',question:null};
 practiceState.set(l.id,practiceData);
 $('#lesson-panel').innerHTML=`<div class="section-heading compact"><div><h3>Um novo desafio a cada rodada.</h3><p>Escolha uma etapa, resolva e confira. Novas rodadas variam mensagens e, quando o método permite, chaves.</p></div></div><div class="practice-settings paper"><div class="field"><label for="practice-operation">O que você quer fazer?</label><select id="practice-operation"><option value="encrypt">Cifrar →</option><option value="decrypt">← Decifrar</option></select></div><div class="field"><label for="practice-difficulty">Etapa do treino</label><select id="practice-difficulty"><option value="guiado">Guiado · palavras e contas curtas</option><option value="pratica">Prática · mais variedade</option><option value="desafio">Desafio · textos maiores ou outras chaves</option></select></div></div><section class="paper practice-card" aria-labelledby="practice-title"><span class="badge">${l.name.toUpperCase()}</span><h4 id="practice-title" tabindex="-1"></h4><p id="practice-key" class="practice-key"></p><form id="practice-form"><div class="field"><label for="practice-answer">Sua resposta</label><input id="practice-answer" ${l.id==='rsa'?'type="number" min="0" max="32" step="1"':'type="text" maxlength="100" autocomplete="off" spellcheck="false"'} required><small>${l.id==='rsa'?'Digite um número inteiro de 0 a 32.':'Use letras. Espaços, pontuação, acentos e diferenças de maiúsculas são ignorados.'}</small></div><div class="practice-actions"><button class="btn dark small" type="submit">Verificar resposta ↗</button><button class="btn secondary small" type="button" id="practice-new">Gerar outra rodada ⇄</button></div></form><p id="practice-feedback" class="feedback" role="status" hidden></p><details class="hint" id="practice-hint"><summary>Preciso de uma dica</summary><p></p></details><details class="hint answer-key" id="practice-solution"><summary>Ver solução explicada</summary><p></p></details></section><p class="practice-note">O treino livre permite repetir à vontade. Ele não altera a contagem das ${totalActivities} atividades da trilha. O progresso é individual neste navegador, sem cadastro.</p><button type="button" class="text-link" id="practice-to-activities">Voltar às 6 atividades deste ginásio →</button>`;
 $('#practice-operation').value=practiceData.operation;$('#practice-difficulty').value=practiceData.difficulty;
 function paintQuestion(){const q=practiceData.question;$('#practice-title').textContent=q.prompt;$('#practice-key').textContent=q.key;$('#practice-answer').value=practiceData.answer||'';$('#practice-feedback').hidden=true;$('#practice-hint').open=false;$('#practice-solution').open=false;$('#practice-hint p').textContent=q.hint;$('#practice-solution p').textContent=q.solution;}
 function newQuestion(focus=false){const previous=practiceData.question?.signature;practiceData.operation=$('#practice-operation').value;practiceData.difficulty=$('#practice-difficulty').value;let question;for(let i=0;i<20;i++){question=createPractice(l.id,practiceData);if(question.signature!==previous)break;}practiceData.question=question;practiceData.answer='';paintQuestion();if(focus)$('#practice-title').focus();}
 if(!practiceData.question)newQuestion();else paintQuestion();
 $('#practice-new').onclick=()=>newQuestion(true);$('#practice-operation').onchange=()=>newQuestion();$('#practice-difficulty').onchange=()=>newQuestion();$('#practice-answer').oninput=()=>{practiceData.answer=$('#practice-answer').value;};
 $('#practice-form').onsubmit=event=>{event.preventDefault();const value=$('#practice-answer').value;const q=practiceData.question;const correct=l.id==='rsa'?value.trim()!==''&&Number(value)===Number(q.answer):normalize(value)===q.answer;const feedback=$('#practice-feedback');feedback.hidden=false;feedback.className=`feedback ${correct?'success':'error'}`;feedback.textContent=correct?'✓ Correto! '+q.solution:'Ainda não. '+q.hint+' Revise sua resposta e tente de novo.';};
 $('#practice-to-activities').onclick=()=>{tab='activities';renderPanel();$('#student-answer')?.focus();};
}

$('#sources-open').onclick=()=>$('#sources-dialog').showModal();
$('#reset-open').onclick=()=>$('#reset-dialog').showModal();
document.querySelectorAll('[data-close]').forEach(button=>button.onclick=()=>button.closest('dialog').close());
document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}}));
$('#confirm-reset').onclick=()=>{
 sessionRevision++;solvedIds=[];answers={};notes={};attempts={};activeActivityId=null;practiceState.clear();drafts.clear();
 $('#reset-dialog').close();saveProgress();$('#learning-status').textContent='Nova jornada iniciada. Comece pela primeira atividade de Atbash.';
 selectMethod(lessons[0].id,'learn');
};
$('#print-student').onclick=()=>{
 $('#print-sheet').innerHTML=buildStudentReport(lessons,progression,{completed:solvedIds,answers,notes,attempts});
 document.body.classList.add('printing');window.print();
};
window.addEventListener('afterprint',()=>document.body.classList.remove('printing'));
renderLesson();
if(lessons.some(lesson=>lesson.id===location.hash.slice(1)))requestAnimationFrame(()=>$('#conteudo').scrollIntoView());
