import { useRef, useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";

const FollowButton = ({ onClick }) => {
  const containerRef = useRef(null);
  const circleRef = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = circleRef.current;
    const hamburger = hamburgerRef.current;

    const handleMouseEnter = () => {
      gsap.to(container, { duration: 0.3, width: 200, height: 100 });
      gsap.to(content, { duration: 0.3, scale: 1.1 });
    };

    const handleMouseLeave = () => {
      gsap.to(container, { duration: 0.3, width: 150, height: 50 });
      gsap.to([content, hamburger], { duration: 0.3, scale: 1, x: 0, y: 0 });
    };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      const moveX = ((relX - rect.width / 2) / rect.width) * 40;
      let moveY = ((relY - rect.height / 2) / rect.height) * 40;
      moveY = Math.max(Math.min(moveY, 70), -70);

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
    <Link href="/booking">
      <button ref={containerRef} onClick={onClick} aria-label="Ticket" className=" flex justify-center items-center relative w-40 h-20 cursor-pointer">
        <div ref={circleRef} className="absolute flex bg-knap-10 justify-center items-center h-16 w-40 text-sm rounded-xl border-2 hover:border-blue-600 border-gray-500"></div>
        <div ref={hamburgerRef} className="absolute  hover:border-blue-600 text-xl">
          {" "}
          Tickets
        </div>
      </button>
    </Link>
  );
};

export default FollowButton;
