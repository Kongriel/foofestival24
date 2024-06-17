import { useRef, useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";

const FollowButton = ({ onClick }) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    const hamburger = hamburgerRef.current;

    const handleMouseEnter = () => {
      gsap.to(container, { duration: 0.3, scale: 1.1 });
      gsap.to(content, { duration: 0.3, scale: 1.1 });
    };

    const handleMouseLeave = () => {
      gsap.to(container, { duration: 0.3, scale: 1 });
      gsap.to(content, { duration: 0.3, scale: 1, x: 0, y: 0 });
      gsap.to(hamburger, { duration: 0.3, scale: 1, x: 0, y: 0 });
    };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;

      const moveX = ((relX - rect.width / 2) / rect.width) * 40;
      let moveY = ((relY - rect.height / 2) / rect.height) * 40; // scale adjusted to limit the movement up to 200px
      moveY = Math.max(Math.min(moveY, 40), -40);
      gsap.to(content, {
        duration: 0.3,
        x: moveX / 2,
        y: moveY / 2,
      });
      gsap.to(hamburger, {
        duration: 0.3,
        x: moveX / 1,
        y: moveY / 1,
      });
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <Link href="/bands" passHref>
      <button className="flex justify-center items-center text-center px-4 text-nowrap relative w-72 h-20 sm:w-96 sm:h-20 cursor-pointer">
        <div ref={containerRef} onClick={onClick} className="absolute cursor-pointer inset-0 flex justify-center items-center">
          <div ref={contentRef} className="absolute bg-knap-10 cursor-pointer flex justify-center items-center h-20 w-80 sm:w-96 text-sm rounded-xl border-2 hover:border-blue-600 border-gray-500"></div>
          <div ref={hamburgerRef} className="text-bono-10 cursor-pointer absolute hover:border-blue-600 text-base sm:text-2xl">
            Se Flere Fede Artister Her
          </div>
        </div>
      </button>
    </Link>
  );
};

export default FollowButton;
