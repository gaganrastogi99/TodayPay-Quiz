export function shuffle(arr){
  const a = [...arr];
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function decodeHTMLEntities(str){
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}

export function normalizeFromOpenTrivia(api){
  if(!api || !api.results) return [];
  return api.results.map(r => {
    const incorrect = r.incorrect_answers.map(decodeHTMLEntities);
    const correct = decodeHTMLEntities(r.correct_answer);
    const choices = shuffle([...incorrect, correct]);
    const correctIndex = choices.indexOf(correct);
    return {
      id: crypto.randomUUID(),
      question: decodeHTMLEntities(r.question),
      choices,
      correctIndex,
      difficulty: r.difficulty,
      category: r.category
    };
  });
}
