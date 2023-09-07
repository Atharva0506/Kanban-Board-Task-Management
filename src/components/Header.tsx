"use client";
import { useState } from "react";
import Quote from "@/components/Quote"

import { MagnifyingGlassIcon, UserCircleIcon} from "@heroicons/react/24/solid";
import Image from "next/image";
import logo from "../../public/assets/logo.svg";
import Link from "next/link";
import { useBordStore } from "@/store/boardStore";

 function Navbar() {
  const [searchString,setSearchString]= useBordStore((state)=>[
    state.searchString,
    state.setSearchString
  ])

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
  <div className="flex items-center space-x-5 flex-1 justify-center w-full">
    <div className="flex items-center space-x-5 flex-1">
      <Image
        className="h-20 w-44"
        width={300}
        height={300}
        src={logo}
        alt="Logo"
      />
    </div>
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
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
      <button type="submit" hidden>
        Search
      </button>
    </form>
    <div className="flex items-center space-x-2">
      <UserCircleIcon className="inline-block h-10 w-10 text-gray-400 cursor-pointer" /> {/* Replace with your user icon */}
      {/* You can also add user-related content here */}
    </div>
  </div>
</div>

<Quote  />
<div>
  <br />
</div>

 
  </header>
  
  );
}

export default Navbar;