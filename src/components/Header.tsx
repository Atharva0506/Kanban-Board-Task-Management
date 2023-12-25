"use client";
import { useState } from "react";
import { Menu } from "@headlessui/react";
import {
  MagnifyingGlassIcon,
  UserCircleIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/solid";
import { useBordStore } from "@/store/boardStore";

function Navbar() {
  const [searchString, setSearchString] = useBordStore((state) => [
    state.searchString,
    state.setSearchString,
  ]);

  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/5 rounded-b-2xl ">
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
          <div className="flex items-center space-x-2 flex-1 cursor-pointer">
            <ClipboardDocumentCheckIcon className="text-[#cd5ff8] h-18 w-10" />
            <span className="text-xl md:text-2xl font-semibold text-white m-0 p-0">
              Trackify
            </span>
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
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-block h-10 w-10 text-[#cd5ff8] cursor-pointer">
                  <UserCircleIcon />
                </Menu.Button>
              </div>
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#profile"
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        } block px-4 py-2 text-base`}
                      >
                        GitHub
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
