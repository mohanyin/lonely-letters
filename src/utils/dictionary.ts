import sowpods from "@/assets/sowpods.txt?raw";

const dictionary = sowpods.split("\n");

export function checkWord(word: string): boolean {
  return dictionary.includes(word.toUpperCase());
}
