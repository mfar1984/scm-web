import React from 'react';

/**
 * Renders text with **double asterisk** segments wrapped in <span> for
 * brand-colour highlighting (matches the CMS convention used across pages).
 */
export function Highlight({ text }: { text?: string }) {
  if (!text) return null;
  const parts = text.split('**');
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i}>{part}</span>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
}
