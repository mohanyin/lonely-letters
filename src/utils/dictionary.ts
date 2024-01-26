type TrieNode = { [key: string]: TrieNode } | { _?: 1 };

const rawTrieImports = import.meta.glob<false, string, { default: TrieNode }>(
  "../assets/tries/*.ts",
);
const trieImports: typeof rawTrieImports = {};
for (const path in rawTrieImports) {
  const normalizedPath = path
    .replace("../assets/tries/", "")
    .replace(".ts", "");
  trieImports[normalizedPath] = rawTrieImports[path];
}

export async function checkWord(word: string): Promise<boolean> {
  const [firstLetter, ...rest] = word.toUpperCase();

  if (!trieImports[firstLetter]) {
    return false;
  }

  const trie: TrieNode = (await trieImports[firstLetter]()).default;
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
