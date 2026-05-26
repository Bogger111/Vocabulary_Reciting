function calculateStats(words) {
  const total = words.length;
  const learned = words.filter((word) => wordRootStore.isLearned(word.id)).length;
  const favorites = words.filter((word) => wordRootStore.isFavorite(word.id)).length;
  const completionRate = total ? Math.round((learned / total) * 100) : 0;

  return {
    total,
    learned,
    favorites,
    completionRate
  };
}
