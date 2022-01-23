import fs from "fs";
const words = JSON.parse(fs.readFileSync("words.json"));
const probs = JSON.parse(fs.readFileSync("allprobs.json"));

let wordsWithProbs = words.map(w => ({...w, ...(probs.find(p => p.word == w.word.toLowerCase()) || {p: 0})}));

let wordsToTarget = Object.values(wordsWithProbs.filter(w => w.p > .5).reduce((acc, w) => {
  acc[w.word] = acc[w.word] || [];
  acc[w.word].push(w);
  return acc;
}, {})).filter(w => w.length == 1).map(w => w[0]);



console.log(JSON.stringify(wordsToTarget, null, 2));
