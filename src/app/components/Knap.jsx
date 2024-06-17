import Link from "next/link";

const FollowButton = () => {
  return (
    <Link href="/booking" aria-label="Ticket" className="flex justify-center hover:scale-105 transition ease-in-out items-center relative w-40 h-20 cursor-pointer">
      <div className="absolute flex bg-bono-10 justify-center items-center h-16 w-40 text-sm rounded-xl border-2 hover:border-blue-600 border-gray-500"></div>
      <div className="absolute hover:border-blue-600 text-white text-m ">Køb billetter</div>
    </Link>
  );
};

export default FollowButton;
