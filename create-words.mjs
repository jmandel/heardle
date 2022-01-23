import fs from "fs";

const file = fs.readFileSync("cmudict-0.7b").toString();
const lines = file.split("\n");
const linesWords = lines.filter(l => !l.startsWith(";") && l.length > 0);

const linesPhonemes = linesWords.map(l => {
  let ls = l.split("  ");
  let word = ls[0];
  let variant = word.match(/\((?<variant>\d+)\)/) || 0;
  if (variant){
    variant = parseInt(variant.groups.variant);
    word = word.replace(/\(\d+\)/, "");
  }
  let phonemes = ls[1].trim().split(" ");
  let stress = phonemes.map(p => !!p.match(/1$/)).indexOf(true);
  phonemes = phonemes.map(p => p.replace(/\d/, ""));
  return {
    word, variant, phonemes, stress
  };
});

let linesFivePhonemes = linesPhonemes.filter(l => l.phonemes.length >= 2 && l.phonemes.length <= 10)
console.log(JSON.stringify(linesFivePhonemes) );
