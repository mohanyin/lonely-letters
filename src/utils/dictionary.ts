import { decompressFromUTF16 } from "lz-string";

type TrieNode = { [key: string]: TrieNode } | { _?: 1 };

const rawTrieImports = import.meta.glob<false, string, string>(
  "../assets/tries/*",
  { as: "raw" },
);
const trieImports: typeof rawTrieImports = {};
for (const path in rawTrieImports) {
  const normalizedPath = path.replace("../assets/tries/", "");
  trieImports[normalizedPath] = rawTrieImports[path];
}

export async function checkWord(word: string): Promise<boolean> {
  const [firstLetter, ...rest] = word.toUpperCase();

  if (!trieImports[firstLetter]) {
    return false;
  }

  const compressedTrie = await trieImports[firstLetter]();
  const trie: TrieNode = JSON.parse(decompressFromUTF16(compressedTrie));
  let node = trie;
  for (const letter of rest) {
    const nextNode = node[letter as keyof TrieNode] as TrieNode | undefined;
    if (!nextNode) {
      return false;
    }
    node = nextNode;
  }
  return node._ === 1;
}
