const storageKeys = {
  favorites: "wordroot_favorites",
  learned: "wordroot_learned",
  wordBook: "wordroot_word_book",
  theme: "wordroot_theme"
};

function readList(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return Array.isArray(value) ? value : [];
  } catch (error) {
    return [];
  }
}

function writeList(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

const wordRootStore = {
  getFavorites() {
    return readList(storageKeys.favorites);
  },

  isFavorite(wordId) {
    return this.getFavorites().includes(wordId);
  },

  toggleFavorite(wordId) {
    const favorites = new Set(this.getFavorites());

    if (favorites.has(wordId)) {
      favorites.delete(wordId);
    } else {
      favorites.add(wordId);
    }

    writeList(storageKeys.favorites, Array.from(favorites));
  },

  getLearned() {
    return readList(storageKeys.learned);
  },

  isLearned(wordId) {
    return this.getLearned().includes(wordId);
  },

  toggleLearned(wordId) {
    const learned = new Set(this.getLearned());

    if (learned.has(wordId)) {
      learned.delete(wordId);
    } else {
      learned.add(wordId);
    }

    writeList(storageKeys.learned, Array.from(learned));
  },

  getWordBook() {
    return localStorage.getItem(storageKeys.wordBook) || "";
  },

  setWordBook(wordBookId) {
    localStorage.setItem(storageKeys.wordBook, wordBookId);
  },

  getTheme() {
    return localStorage.getItem(storageKeys.theme) || "light";
  },

  setTheme(theme) {
    localStorage.setItem(storageKeys.theme, theme);
  }
};
