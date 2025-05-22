"use client";
import React, { useState } from "react";
import { AlignLeft, X } from "lucide-react";

const Navbar = () => {
  const [menuClosed, setMenuClosed] = useState(true);
  const navItems = ["About Us", "Clap for Me", "Projects", "Pricing"];
  return (
    <nav className="fixed z-[999] top-0 py-4 w-full backdrop-blur-lg">
      <div className="flex items-center justify-between mx-auto max-w-[80%]">
        <div>
          <h2>ForgePanel</h2>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {navItems.map((item, i) => {
            return <div key={i}>{item}</div>;
          })}
        </div>

        <div className="text-white md:hidden">
          {menuClosed ? (
            <AlignLeft onClick={() => setMenuClosed(false)} />
          ) : (
            <X onClick={() => setMenuClosed(true)} />
          )}
        </div>

        {/* Mobile Navbar */}
        <div
          className={`absolute top-full left-4 ${
            menuClosed ? "max-h-0" : " max-h-[15rem]"
          } overflow-hidden transition-all duration-300`}
        >
          <div className="flex md:hidden flex-col items-center gap-4 p-4 bg-white text-black/90 min-w-[50vw]">
            {navItems.map((item, i) => {
              return (
                <div key={i} className="w-full">
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
