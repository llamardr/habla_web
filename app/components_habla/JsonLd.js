// Renders one or more schema.org objects as a JSON-LD script tag.
// Accepts a single object or an array of objects.
export default function JsonLd({ data }) {
  if (!data) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
