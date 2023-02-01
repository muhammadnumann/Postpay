export default function bold(text) {
  const bold = /\*\*(.*?)\*\*/gm;
  const html = text.replace(bold, "<strong>$1</strong>");
  return html;
}
