import fs from "fs";

const file = JSON.parse(fs.readFileSync("words.json"));

let phonemesSorted = Array.from(new Set(file.flatMap(w => w.phonemes)));
phonemesSorted.sort();
console.log(phonemesSorted)
