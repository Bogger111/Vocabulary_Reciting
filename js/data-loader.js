const DEFAULT_WORD_BOOK_ID = "cet4";

const WORD_BOOKS = [
  {
    id: "cet4",
    label: "CET-4",
    title: "CET-4 Vocabulary",
    headline: "大学英语四级前缀词库",
    description: "自动读取 data/cet4.json，按前缀分类学习，支持搜索、收藏、已学统计和分页加载。",
    dataUrl: "data/cet4.json",
    enabled: true
  },
  {
    id: "cet6",
    label: "CET-6",
    title: "CET-6 Vocabulary",
    headline: "大学英语六级词库",
    description: "自动读取 data/cet6.json，按前缀分类学习，支持搜索、收藏、已学统计和分页加载。",
    dataUrl: "data/cet6.json",
    enabled: true
  },
  {
    id: "ielts",
    label: "IELTS",
    title: "IELTS Vocabulary",
    headline: "雅思词库",
    description: "预留 IELTS 词库入口。添加 data/ielts.json 并启用配置后即可加载。",
    dataUrl: "data/ielts.json",
    enabled: false
  }
];

function getWordBook(wordBookId) {
  return WORD_BOOKS.find((wordBook) => wordBook.id === wordBookId) || WORD_BOOKS[0];
}

function getSelectableWordBooks() {
  return WORD_BOOKS;
}

function getInitialWordBookId(preferredWordBookId) {
  const preferredWordBook = getWordBook(preferredWordBookId);
  return preferredWordBook.enabled === false ? DEFAULT_WORD_BOOK_ID : preferredWordBook.id;
}

function createWordId(wordBookId, word, index) {
  const normalizedWord = String(word).trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return `${wordBookId}-${normalizedWord}-${index}`;
}

function normalizeWordBookItem(item, index, wordBook) {
  const word = String(item.word || "").trim();
  const prefix = String(item.prefix || word.charAt(0) || "#").trim().toLowerCase();

  return {
    id: createWordId(wordBook.id, word, index),
    wordBookId: wordBook.id,
    word,
    phonetic: String(item.phonetic || "").trim(),
    meaning: String(item.meaning || "").trim(),
    prefix,
    example: String(item.example || "").trim(),
    tags: Array.isArray(item.tags) ? item.tags : []
  };
}

async function loadWordBookWords(wordBookId = DEFAULT_WORD_BOOK_ID) {
  const wordBook = getWordBook(wordBookId);

  if (wordBook.enabled === false) {
    throw new Error(`${wordBook.label} 词库尚未启用。请先添加 ${wordBook.dataUrl} 并在 WORD_BOOKS 中设置 enabled: true。`);
  }

  const response = await fetch(wordBook.dataUrl, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`${wordBook.label} 词库读取失败：${response.status}`);
  }

  const rawWords = await response.json();

  if (!Array.isArray(rawWords)) {
    throw new Error(`${wordBook.label} 词库格式错误：根节点必须是数组。`);
  }

  const words = rawWords
    .map((item, index) => normalizeWordBookItem(item, index, wordBook))
    .filter((word) => word.word && word.meaning);

  return {
    wordBook,
    words
  };
}

async function loadCet4Words() {
  const result = await loadWordBookWords("cet4");
  return result.words;
}
