export const truncateText = (
  text: string,
  maxWords: number,
  maxChars: number,
  omittedTextIndicator = " (...)"
) => {
  const wordArray = text.split(" ");
  if (wordArray.length <= 20 && text.length <= maxChars) {
    return text;
  }

  let newText = wordArray.slice(0, maxWords).join(" ");
  if (newText.length > maxChars) {
    newText = newText.substring(0, maxChars);
  }
  newText += omittedTextIndicator;

  return newText;
};
