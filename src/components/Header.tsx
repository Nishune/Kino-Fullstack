"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Button from "./Button";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="mr-3 ml-3 mb-3 mt-1 rounded-sm sticky top-0 z-50 bg-kino-darkred">
      <nav className="rounded-lg overflow-hidden p-1 mx-auto w-full max-w-screen-xl">
        <div className="flex justify-between items-center">
          <Link href="/" className="block p-1 transition-transform duration-200 hover:scale-105">
            <Image
              src="/kinoLogo.png"
              alt="Kino Logo"
              width={66}
              height={40}
              className="w-auto h-auto"
            />
          </Link>
          <Link
            href="/"
            className={`text-sm ml-2 mr-2 block py-1  hover:text-kino-darkgrey ${
              isActive("/") ? "font-bold" : ""
            }`}
          >
            KINO CINEMA
          </Link>

          <hr className="ml-1 mr-1.5 hidden border-t-0 border-secondary-dark lg:block" />

          <div className="hidden lg:block">
            <ul className="flex gap-6">
              {[
                { href: "/current-movies", text: "Current Movies" },
                { href: "/upcoming-movies", text: "Upcoming Movies" },
                { href: "/cinema-experiences", text: "Cinema Experiences" },
                { href: "/kids-party", text: "Kids Party" },
                { href: "/member", text: "Member" },
                { href: "/about", text: "About us" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-sm flex items-center gap-x-2 p-1 hover:text-kino-darkgrey ${
                      isActive(item.href) ? "font-bold" : ""
                    }`}
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Button
            type="button"
            onClick={() => console.log("Sign In clicked")}
            className="hidden sm:hidden md:hidden lg:inline-block ml-auto border border-kino-white hover:text-kino-darkgrey"
          >
            Sign In
          </Button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden bg-transparent border-transparent text-color-kino-white hover:bg-kino-red p-2 rounded-md ml-auto"
          >
            <svg
              width="1.5em"
              height="1.5em"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="currentColor"
              className="h-4 w-4"
            >
              <path
                d="M3 5H21"
                stroke="currentColor"
                strokeLinejoin="round"
              ></path>
              <path
                d="M3 12H21"
                stroke="currentColor"
                strokeLinejoin="round"
              ></path>
              <path
                d="M3 19H21"
                stroke="currentColor"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-screen" : "max-h-0"
          } lg:hidden`}
        >
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isOpen ? "max-h-screen" : "max-h-0"
            } lg:hidden`}
          ></div>

          <ul className="flex flex-col gap-y-1.5 mt-4">
            {[
              { href: "/current-movies", text: "Current Movies" },
              { href: "/upcoming-movies", text: "Upcoming Movies" },
              { href: "/cinema-experiences", text: "Cinema Experience" },
              { href: "/kids-party", text: "Kids Party" },
              { href: "/member", text: "Member" },
              { href: "/about", text: "About us" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`font-sans antialiased text-sm flex items-center gap-x-2 p-1 hover:text-primary ${
                    isActive(item.href) ? "font-bold" : ""
                  }`}
                >
                  {item.text}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Button
                type="button"
                onClick={() => console.log("Sign In clicked")}
                className= "border border-kino-white"
              >
                Sign In
              </Button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
