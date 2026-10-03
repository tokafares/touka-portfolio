/** Renders "Some *word* here" with the starred part emphasised (italic serif in English, accent color in Arabic). */
export function Emphasis({ text }: { text: string }) {
  const parts = text.split('*')
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <em key={index} className="emph">
            {part}
          </em>
        ) : (
          part
        ),
      )}
    </>
  )
}
