"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import FollowButton from "./FollowButton";
import Knap from "./Knap";
import Image from "next/image";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const navRef = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const currentScrollTop = window.scrollY;
      if (currentScrollTop > lastScrollTop) {
        // Scrolling down
        setIsScrollingUp(false);
      } else {
        // Scrolling up
        setIsScrollingUp(true);
      }
      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  useEffect(() => {
    const mainContent = document.getElementById("main-content");

    if (isOpen) {
      mainContent.classList.add("blur");
    } else {
      mainContent.classList.remove("blur");
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target) && hamburgerRef.current && !hamburgerRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [navRef, hamburgerRef]);

  const handleNavItemKeyDown = (e, href) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      closeMenu();
      window.location.href = href;
    }
  };

  return (
    <header className={` bg-gradient-to-b from-gray-300 to-transparent fixed top-0 left-0 right-0 flex justify-between rounded-xl  items-center px-2 h-16 sm:h-20 md:h-24 z-50 text-bono-10 transition-transform duration-300 ${isScrollingUp ? "" : "-translate-y-full"}`}>
      {/* Welcome Text */}
      <div className="text-xs sm:text-sm md:text-lg text-wrap">Velkommen til FooFest '24</div>

      {/* Foofest Logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Link href="/" passHref>
          <Image src="/Foofest-logo-2.png" alt="Foofest Logo" width={50} height={50} className="sm:w-20 sm:h-20 md:w-24 md:h-24" />
        </Link>
      </div>

      {/* Hamburger Icon */}
      <div className="flex items-center md:-mr-7 -mr-10 space-x-3">
        <div className="hidden md:block mr-6">
          <Knap className="hidden md:block" /> {/* Hide on tablet size */}
        </div>
        {/* Empty Heart Icon */}
        <div className="hidden md:block hover:scale-110">
          <Link href="/favorites">
            <Image src="/heart-empty.svg" alt="Favorite" width={38} height={38} />
          </Link>
        </div>
        <div ref={hamburgerRef}>
          <FollowButton isOpen={isOpen} toggleMenu={toggleMenu} tabIndex={0} role="Open-menu" aria-label="Menu" />
        </div>
      </div>

      {/* Navigation Menu */}
      <div ref={navRef} className={`fixed top-0 right-0 z-20 bg-bono-10 h-full transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"} md:w-10/12 w-full`} style={{ clipPath: "ellipse(70% 100% at 100% 50%)" }}>
        <div className="flex flex-col items-end justify-center h-full text-center pr-10">
          <div onClick={() => (window.location.href = "/booking")} onKeyDown={(e) => handleNavItemKeyDown(e, "/booking")} className="mt-4 mb-2 text-taupe-10 text-4xl cursor-pointer" tabIndex={0} role="link" aria-label="Booking">
            Billetter
          </div>
          <div onClick={() => (window.location.href = "/bands")} onKeyDown={(e) => handleNavItemKeyDown(e, "/bands")} className="my-2 text-taupe-10 text-4xl cursor-pointer" tabIndex={0} role="link" aria-label="Line-up">
            Line-up
          </div>
          <div onClick={() => (window.location.href = "/faq")} onKeyDown={(e) => handleNavItemKeyDown(e, "/faq")} className="my-2 text-taupe-10 text-4xl cursor-pointer" tabIndex={0} role="link" aria-label="FAQ">
            FAQ
          </div>
          <div onClick={() => (window.location.href = "/Live")} onKeyDown={(e) => handleNavItemKeyDown(e, "/Live")} className="my-2 text-taupe-10 text-4xl cursor-pointer" tabIndex={0} role="link" aria-label="Live Now">
            Live Now
          </div>
          <div onClick={() => (window.location.href = "/favorites")} onKeyDown={(e) => handleNavItemKeyDown(e, "/favorites")} className="my-2 text-taupe-10 mt-8  text-4xl cursor-pointer" tabIndex={0} role="link" aria-label="Live Now">
            Favorites
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
