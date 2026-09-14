const SCRIPT_UNSAFE_CHARACTERS = /[<\u2028\u2029]/g;

const JSON_LD_ESCAPE: Record<string, string> = {
  "<": "\\u003c",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029",
};

/**
 * Serializes structured data without allowing JSON text to terminate its script element.
 */
export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(
    SCRIPT_UNSAFE_CHARACTERS,
    (character) => JSON_LD_ESCAPE[character] || character
  );
}
