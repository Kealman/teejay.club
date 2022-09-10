import sanitize from "sanitize-html";

export const sanitizeHtml = (html: string) =>
  sanitize(html, {
    allowedTags: ["a", "b", "i"],
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
