"use client";
import { useState } from "react";


import { MagnifyingGlassIcon, UserCircleIcon} from "@heroicons/react/24/solid";
import Image from "next/image";
import logo from "../../public/assets/vercel.svg";
import Link from "next/link";

 function Navbar() {
  

  return (
    <header>
    <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/5 rounded-b-2xl">
      <div
        className="
          absolute
          top-0
          left-0
          w-full
          h-96
          bg-gradient-to-br
          from-pink-400
          to-[#0055D1]
          rounded-md
          filter
          blur-3xl
          opacity-50
          -z-50"
      />
      <Image
        className="h-8 w-44"
        width={300}
        height={300}
        src={logo}
        alt="Logo"
      />
      <div className="flex items-center space-x-5 flex-1 justify-center w-full">
        <form
          action=""
          className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial"
        >
          <MagnifyingGlassIcon className="h-6 text-gray-400" />
          <input
            type="text"
            className="outline-none flex-grow"
            placeholder="Search"
            name=""
            id=""
          />
          <button type="submit" hidden>
            Search
          </button>
        </form>
        <div>Avatar</div>
      </div>
    </div>
    <div className="flex items-center px-5 justify-center md:py-5">
      <p className="flex items-center text-sm shadow-xl pr-5 bg-white italic mx-w-3xl p-5">
        <UserCircleIcon className="inline-block h-10 w-10 mr-1" />
        GPT is Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
    </div>
  </header>
  
  );
}

export default Navbar;