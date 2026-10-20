const INVISIBLE_OR_SPACE = /[\s\p{Cf}]/gu;

export function isBlank(text: string): boolean {
  return text.replace(INVISIBLE_OR_SPACE, "").length === 0;
}
