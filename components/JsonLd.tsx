interface JsonLdProps {
  data: object
}

/**
 * Renders schema.org structured data as a <script type="application/ld+json">
 * block. `dangerouslySetInnerHTML` avoids JSON.stringify's escaping of quotes,
 * which is required for valid JSON-LD.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
