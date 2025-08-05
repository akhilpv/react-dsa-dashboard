class TrieNode {
  children: Record<string, TrieNode> = {};
  isEnd = false;
}

export class Trie {
  root = new TrieNode();

  insert(word: string) {
    let node = this.root;
    for (const ch of word.toLowerCase()) {
      if (!node.children[ch]) node.children[ch] = new TrieNode();
      node = node.children[ch];
    }
    node.isEnd = true;
  }

  getSuggestions(prefix: string): string[] {
    const result: string[] = [];
    let node = this.root;

    for (const ch of prefix.toLowerCase()) {
      if (!node.children[ch]) return result;
      node = node.children[ch];
    }

    const dfs = (curr: TrieNode, path: string) => {
      if (curr.isEnd) result.push(path);
      for (const ch in curr.children) dfs(curr.children[ch], path + ch);
    };

    dfs(node, prefix.toLowerCase());
    return result;
  }

  clear() {
    this.root = new TrieNode(); 
  }
}
