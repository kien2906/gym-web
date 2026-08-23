import { Link } from "react-router-dom";

import React from "react";

function Breadcrumb({ name }) {
  return (
    <div className="bg-slate-950 py-14 text-center relative overflow-hidden select-none border-b border-slate-800">
      {/* Decorative clean background line grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10"></div>
      <div className="relative z-10 flex justify-center gap-4 text-xs font-medium uppercase tracking-wider items-center">
        <Link
          to="/"
          className="text-teal-400 hover:text-teal-300 transition-colors"
        >
          Home
        </Link>
        <span className="text-slate-600 font-light">/</span>
        <span className="text-slate-400">{name}</span>
      </div>
    </div>
  );
}

export default Breadcrumb;
