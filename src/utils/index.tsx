export function getQuery(
  query: string[] | string | undefined,
  defaultValue: string
) {
  return Array.isArray(query) ? query[0] : query ?? defaultValue;
}

export function getPureTexFromMarkdown(markdownString: string) {
  return (
    markdownString
      // Remove images
      .replace(/!\[.*?\]\(.*?\)/g, "")
      // Remove links
      .replace(/\[.*?\]\(.*?\)/g, "")
      // Remove other markdown formatting elements
      .replace(/[*_`~]/g, "")
      // Remove remaining formatting characters
      .replace(/<.*?>/g, "")
      // Remove # characters used for headings
      .replace(/#/g, "")
      .trim()
  );
}
