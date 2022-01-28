import fs from "fs";

const words = JSON.parse(fs.readFileSync("words.json"));
const probs = JSON.parse(fs.readFileSync("allprobs.json"));

words.forEach(w => {w.word = w.word.toLowerCase()});

const wordsIndexed = words.reduce((acc, w) => {
  acc[w.word] = acc[w.word] || [];
  acc[w.word].push(w);
  return acc;
}, Object.create(null));


const probsIndexed = probs.reduce((acc, w) => {
  acc[w.word] = w;
  return acc;
});

let wordsWithProbs = Object.values(wordsIndexed)
    .filter(w => w.length === 1)
    .map(w => w[0])
    .map(w => ({...w, ...(probsIndexed[w.word] || {p: 0})}))
    .filter(w => w.phonemes.length === 5 && w.p > 0.5);

console.log(JSON.stringify(wordsWithProbs, null, 2));
