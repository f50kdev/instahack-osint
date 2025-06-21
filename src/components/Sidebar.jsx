import React, { useState } from "react";

const Sidebar = ({ onSectionChange, activeSection }) => {
  const [open, setOpen] = useState(false);
  const sections = [
    { label: "Dashboard", key: "dashboard" },
    { label: "Instagram Scraper", key: "instagram" },
    { label: "Domain Analysis", key: "domain" },
    { label: "Geolocation", key: "geo" },
    { label: "Email Finder", key: "email" },
    { label: "Phone Lookup", key: "phone" },
  ];

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-900 text-orange-400 p-2 rounded shadow-lg focus:outline-none"
        onClick={() => setOpen(true)}
        aria-label="Abrir menu"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>
      {/* Sidebar Desktop */}
      <aside className="bg-gray-900 text-gray-100 w-64 min-h-screen flex-col shadow-lg fixed hidden md:flex">
        <div className="p-6 text-2xl font-bold tracking-wide border-b border-gray-800">
          <span className="text-orange-400">F50</span>HACK
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section.key}>
                <button
                  className={`w-full text-left px-4 py-2 rounded transition-colors duration-200 hover:bg-gray-800 focus:outline-none ${activeSection === section.key ? "bg-gray-800 font-semibold" : ""}`}
                  onClick={() => onSectionChange(section.key)}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <div className="text-xs text-gray-500 text-center">
            OSINT Dashboard v1.0
          </div>
        </div>
      </aside>
      {/* Sidebar Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-40 flex">
          <div className="bg-gray-900 text-gray-100 w-64 min-h-screen flex flex-col shadow-lg animate-slideInLeft">
            <div className="p-6 text-2xl font-bold tracking-wide border-b border-gray-800 flex items-center justify-between">
              <span><span className="text-orange-400">F50</span>HACK</span>
              <button className="ml-2 text-gray-400 hover:text-orange-400" onClick={() => setOpen(false)} aria-label="Fechar menu">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.key}>
                    <button
                      className={`w-full text-left px-4 py-2 rounded transition-colors duration-200 hover:bg-gray-800 focus:outline-none ${activeSection === section.key ? "bg-gray-800 font-semibold" : ""}`}
                      onClick={() => { onSectionChange(section.key); setOpen(false); }}
                    >
                      {section.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="p-4 border-t border-gray-800">
              <div className="text-xs text-gray-500 text-center">
                OSINT Dashboard v1.0
              </div>
            </div>
          </div>
          {/* Overlay */}
          <div className="flex-1 bg-black bg-opacity-40" onClick={() => setOpen(false)}></div>
        </div>
      )}
    </>
  );
};

export default Sidebar; 