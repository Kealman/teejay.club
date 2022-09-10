import sanitize from "sanitize-html";

export const sanitizeHtml = (html: string, isSummary) =>
  sanitize(html, {
    allowedTags: ["a", "b", "i"].filter((tag) => {
      if (!isSummary) {
        return tag;
      }
      return tag !== "a";
    }),
    allowedAttributes: { a: ["href", "target"] },
    allowedSchemes: ["http", "https"],
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          target: "_blank",
        },
      }),
    },
  });
