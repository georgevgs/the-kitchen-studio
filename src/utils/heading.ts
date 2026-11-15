/**
 * Splits a page title so the last word can be set in the italic display face.
 */
export function splitHeading(title: string): { before: string; emphasis: string } {
  const words = title.split(" ");

  return {
    before: words.slice(0, -1).join(" "),
    emphasis: words[words.length - 1],
  };
}
