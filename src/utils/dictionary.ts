type TrieNode = { [key: string]: TrieNode } | { _?: 1 };
type TrieImports = Record<string, () => Promise<{ default: TrieNode }>>;

const rawTrieImports = import.meta.glob("../assets/tries/*.ts") as TrieImports;
const trieImports: TrieImports = {};
for (const path in rawTrieImports) {
  const normalizedPath = path
    .replace("../assets/tries/", "")
    .replace(".ts", "");
  trieImports[normalizedPath] = rawTrieImports[path];
}

export async function checkWord(word: string): Promise<boolean> {
  const [firstLetter, ...rest] = word.toUpperCase();
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
