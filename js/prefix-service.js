function getPrefixLabel(prefix) {
  return /^[a-z]+$/.test(prefix) && prefix.length > 1 ? `${prefix}-` : prefix.toUpperCase();
}

function groupWordsByPrefix(words) {
  const groups = new Map();

  words.forEach((word) => {
    const prefix = word.prefix || "#";

    if (!groups.has(prefix)) {
      groups.set(prefix, {
        id: prefix,
        prefix,
        label: getPrefixLabel(prefix),
        words: []
      });
    }

    groups.get(prefix).words.push(word);
  });

  return Array.from(groups.values()).sort((a, b) => a.prefix.localeCompare(b.prefix));
}

function matchesWord(word, query) {
  if (!query) {
    return true;
  }

  return [word.word, word.phonetic, word.meaning, word.prefix, word.example]
    .join(" ")
    .toLowerCase()
    .includes(query);
}

function filterWords(words, query) {
  const normalizedQuery = String(query || "").trim().toLowerCase();
  return words.filter((word) => matchesWord(word, normalizedQuery));
}

function filterGroups(groups, query) {
  const normalizedQuery = String(query || "").trim().toLowerCase();

  if (!normalizedQuery) {
    return groups;
  }

  return groups.filter((group) => {
    const groupText = [group.prefix, group.label].join(" ").toLowerCase();
    return groupText.includes(normalizedQuery) || group.words.some((word) => matchesWord(word, normalizedQuery));
  });
}
