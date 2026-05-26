const PAGE_SIZE = 50;

function getVisiblePageItems(items, visibleCount) {
  return items.slice(0, visibleCount);
}

function hasMoreItems(items, visibleCount) {
  return visibleCount < items.length;
}

function getNextVisibleCount(items, visibleCount) {
  return Math.min(items.length, visibleCount + PAGE_SIZE);
}
