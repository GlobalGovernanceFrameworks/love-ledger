export function simpleMarkdownToHTML(text) {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}
