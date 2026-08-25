/**
 * A schema.org `@graph` as an inline `application/ld+json` block.
 *
 * `<` is escaped rather than left as-is: a `</script>` sequence inside any translated
 * string would otherwise close the tag early and turn the rest of the payload into
 * markup. React does not escape inside `dangerouslySetInnerHTML`, so this has to.
 */
export const JsonLd = ({ data }: { data: unknown }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
  />
);
