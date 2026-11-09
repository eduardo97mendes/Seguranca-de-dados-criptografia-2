const files={'Professor Carvalho':'oak-waving','Equipe Rocket':'meowth','Pikachu':'pikachu','Squirtle':'squirtle','Bulbasaur':'bulbasaur','Charmander':'charmander','Mewtwo':'mewtwo','Eevee':'eevee','Mew':'mew'};
export function portrait(name, className='character-portrait') {
 const filename=files[name];
 return filename ? '<img class="'+className+'" src="assets/characters/'+filename+'.png" alt="'+(name==='Professor Carvalho'?'Professor Carvalho acenando':name)+'" width="80" height="80" decoding="async">' : '';
}
export function characterText(text) {
 return String(text).replace(/\b(Professor Carvalho|Equipe Rocket|Charmander|Bulbasaur|Pikachu|Squirtle|Mewtwo|Eevee|Mew)\b/g,name=>'<span class="named-character">'+portrait(name,'inline-character')+'<span>'+name+'</span></span>');
}
