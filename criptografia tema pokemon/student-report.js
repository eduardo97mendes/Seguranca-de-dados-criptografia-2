import {canAnswerActivity,getProgressState,sanitizeProgress} from './progression.js';

const reportEscape=value=>String(value).replace(/[&<>"']/g,character=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));

// Only the student's own work and already available prompts belong in this report.
export function buildStudentReport(lessons,progression,{completed,answers={},notes={},attempts={}}={}) {
  const reportCompleted=sanitizeProgress(completed,progression);
  const reportProgress=getProgressState(reportCompleted,progression);
  const reportPermitted=progression.filter(item=>canAnswerActivity(item.id,reportCompleted,progression));
  const reportHeader=`<h1>CriptoLab · Minhas resoluções</h1><p>Nome: __________________________________ Turma: __________ Data: __________</p><p>${reportProgress.completed} de ${reportProgress.total} atividades concluídas. Esta folha reúne somente as etapas já liberadas.</p>`;
  return reportHeader+reportPermitted.map(item=>{
    const reportLesson=lessons.find(lesson=>lesson.id===item.lessonId);
    const reportActivity=reportLesson?.activities.find(activity=>activity.id===item.id);
    if(!reportActivity)return '';
    const reportValue=typeof answers?.[item.id]==='string'?answers[item.id]:'';
    let reportAnswer=reportValue;
    if(reportActivity.kind==='choice'){
      const reportIndex=Number(reportValue);
      reportAnswer=/^\d+$/.test(reportValue)&&Number.isInteger(reportIndex)&&reportIndex>=0&&reportIndex<reportActivity.options.length?reportActivity.options[reportIndex]:'';
    }
    const reportNotes=typeof notes?.[item.id]==='string'?notes[item.id]:'';
    const reportAttemptValue=attempts?.[item.id];
    const reportAttempts=Number.isInteger(reportAttemptValue)&&reportAttemptValue>=0?Math.min(reportAttemptValue,10000):0;
    return `<section class="print-lesson" data-report-activity="${reportEscape(item.id)}"><h2>${item.index+1}. ${reportEscape(reportLesson.name)} · ${reportEscape(reportActivity.type)}</h2><p>${reportEscape(reportActivity.prompt)}</p>${reportActivity.options?`<p>${reportActivity.options.map((option,index)=>`${String.fromCharCode(65+index)}) ${reportEscape(option)}`).join(' · ')}</p>`:''}<p><strong>Minha resposta:</strong> ${reportEscape(reportAnswer)||'_________________________________________________'}</p><p><strong>Meu raciocínio:</strong></p><p class="printed-notes">${reportEscape(reportNotes)||'________________________________________________________________'}</p><p>Status: ${reportCompleted.includes(item.id)?'concluída':'em andamento'} · Tentativas: ${reportAttempts}</p></section>`;
  }).join('');
}
