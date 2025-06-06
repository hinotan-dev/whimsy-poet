export function capitalizeFirstLetter(string) {

  // Capitalize the first letter of a string
  // Used in keyword list

  if (typeof string !== 'string' || string.length === 0) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getFirstChar(poem) {

  // Get the first character of the first real word from the poem
  // For display on the book cover

  const stopWords = new Set([
    'a', 'an', 'the', 'and', 'but', 'or', 'nor', 'so',
    'yet', 'for', 'in', 'on', 'at', 'by', 'with', 'about',
    'against', 'between', 'into', 'through', 'during', 'before',
    'after', 'above', 'below', 'to', 'from', 'up', 'down', 'of'
  ]);
  const words = poem.replace(/^#/, '').trim().split(/\s+/);

  const firstRealWord = words.find(word => {
    const cleaned = word.toLowerCase().replace(/[^a-z]/gi, ''); // Remove punctuation
    return cleaned && !stopWords.has(cleaned);
  });

  return firstRealWord ? firstRealWord.charAt(0).toUpperCase() : '?';
}

export function getRandomItem(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}