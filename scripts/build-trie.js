import fs from "fs";

const sowpodsPath = new URL("sowpods.txt", import.meta.url);
const sowpodsData = fs.readFileSync(sowpodsPath, "utf8");
const words = sowpodsData.split("\n");

class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  toJSON() {
    return JSON.stringify(this.root, null, 2);
  }
}

const trie = new Trie();
words.forEach((word) => {
  trie.insert(word);
});

const triePath = new URL("../src/assets/trie.json", import.meta.url);
fs.writeFileSync(triePath, trie.toJSON());
