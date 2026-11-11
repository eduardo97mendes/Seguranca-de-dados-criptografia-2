// Ordered learning gates. This is browser-local progress, not exam security.
export function createProgression(lessons) {
  if (!Array.isArray(lessons) || !lessons.length) throw Error('A trilha precisa de aulas.');
  const activityIds=new Set(), lessonIds=new Set(), result=[];
  for (const lesson of lessons) {
    if (!lesson.id || lessonIds.has(lesson.id) || !Array.isArray(lesson.activities) || !lesson.activities.length) throw Error('Aula inválida ou repetida.');
    lessonIds.add(lesson.id);
    for (const activity of lesson.activities) {
      if (!activity.id || activityIds.has(activity.id)) throw Error('Atividade inválida ou repetida.');
      activityIds.add(activity.id);
      result.push({id:activity.id,lessonId:lesson.id,index:result.length});
    }
  }
  return result;
}

export function sanitizeProgress(ids, progression) {
  const saved=new Set(Array.isArray(ids)?ids.filter(id=>typeof id==='string'):[]), prefix=[];
  for (const activity of progression) {
    if (!saved.has(activity.id)) break;
    prefix.push(activity.id);
  }
  return prefix;
}

export function getProgressState(ids, progression) {
  const saved=sanitizeProgress(ids,progression), next=progression[saved.length]||null;
  return {completed:saved.length,total:progression.length,nextActivityId:next?.id||null,nextLessonId:next?.lessonId||null,
    complete:saved.length===progression.length,
    unlockedLessonIds:[...new Set(progression.slice(0,Math.min(saved.length+1,progression.length)).map(activity=>activity.lessonId))]};
}

export function canOpenLesson(lessonId, ids, progression) {
  return getProgressState(ids,progression).unlockedLessonIds.includes(lessonId);
}

export function canAnswerActivity(activityId, ids, progression) {
  if (typeof activityId!=='string') return false;
  const saved=sanitizeProgress(ids,progression);
  return saved.includes(activityId) || getProgressState(saved,progression).nextActivityId===activityId;
}

export function recordCorrect(activityId, ids, progression) {
  const saved=sanitizeProgress(ids,progression);
  if (typeof activityId!=='string') return saved;
  return getProgressState(saved,progression).nextActivityId===activityId?[...saved,activityId]:saved;
}
