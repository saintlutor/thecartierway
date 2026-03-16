import React, { useEffect } from "react";

const FAVICON_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69ab42c08963ba746faca2a9/1b6967482_favicon_32.png";

export default function Layout({ children, currentPageName }) {
  useEffect(() => {
    // Set favicon
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = FAVICON_URL;

    // Set page title
    document.title = "CEO";
  }, []);

  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}