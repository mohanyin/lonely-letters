import fs from "fs";

import lzString from "lz-string";

const { compressToUTF16 } = lzString;

class Trie {
  constructor() {
    this.root = {};
  }

  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node[char]) {
        node[char] = {};
      }
      node = node[char];
    }
    // Mark the end of the word
    node._ = 1;
  }

  toJSON(node = this.root) {
    return JSON.stringify(node);
  }
}

const sowpodsPath = new URL("sowpods.txt", import.meta.url);
const sowpodsData = fs.readFileSync(sowpodsPath, "utf8");
const words = sowpodsData.split("\n");

const trie = new Trie();
words.forEach((word) => {
  trie.insert(word);
});

for (const firstLetter in trie.root) {
  const triePath = new URL(
    `../src/assets/tries/${firstLetter}`,
    import.meta.url,
  );
  const trieJSON = trie.toJSON(trie.root[firstLetter]);
  fs.writeFileSync(triePath, compressToUTF16(trieJSON));
}
