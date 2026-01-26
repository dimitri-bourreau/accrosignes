"use client";

import { useEffect, useState } from "react";

interface HtmlContentProps {
  html: string;
  className?: string;
}

const ALLOWED_TAGS = ["h1", "h2", "h3", "p", "a", "strong", "em", "ul", "ol", "li", "br"];
const ALLOWED_ATTR = ["href", "target", "rel"];

export default function HtmlContent({ html, className = "" }: HtmlContentProps) {
  const [sanitizedHtml, setSanitizedHtml] = useState("");

  useEffect(() => {
    import("dompurify").then((DOMPurify) => {
      const clean = DOMPurify.default.sanitize(html, {
        ALLOWED_TAGS,
        ALLOWED_ATTR,
      });
      setSanitizedHtml(clean);
    });
  }, [html]);

  const baseStyles = `
    max-w-none
    [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:text-gray-900 dark:[&_h2]:text-gray-100
    [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:text-gray-900 dark:[&_h3]:text-gray-100
    [&_p]:mb-4 [&_p]:leading-relaxed
    [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4
    [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4
    [&_li]:mb-1
    [&_a]:text-teal-600 [&_a]:underline [&_a]:hover:text-teal-700
    [&_strong]:font-semibold
    [&_em]:italic
  `;

  if (!sanitizedHtml) {
    return <div className={`${baseStyles} ${className}`} />;
  }

  return (
    <div
      className={`${baseStyles} ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
