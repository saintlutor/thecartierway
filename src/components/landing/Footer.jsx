import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] py-12 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center mb-4">
          <span className="text-white font-semibold tracking-tight">
            The Apple Print
          </span>
        </div>
        <p className="text-white/25 text-xs font-light">
          © {new Date().getFullYear()} The Apple Print. All rights reserved.
        </p>
      </div>
    </footer>
  );
}