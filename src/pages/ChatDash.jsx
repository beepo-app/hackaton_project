import Logo from "./../assets/logo.webp";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

export default function (props) {
  return (
    <div className="bg-[#E5E5E5] min-h-screen w-full">
      <main className="max-w-xl border-x border-black/10 shadow-xl min-h-screen bg-[#E5E5E5] mx-auto min-w-[100px]">
        <div className="flex flex-col justify-center items-center min-h-screen"></div>
      </main>
    </div>
  );
}
