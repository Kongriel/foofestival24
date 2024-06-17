import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SlugLoading() {
  return (
    <SkeletonTheme baseColor="white" highlightColor="#ddeffe">
      <div className="flex flex-col mt-24 md:mt-44 items-center justify-center px-4 md:px-8 lg:px-12">
        <div className="flex flex-col items-center text-center relative w-full">
          <div className="flex flex-col items-center space-y-4 mb-4">
            <Skeleton height={60} width={600} />
            <Skeleton height={40} width={400} />
          </div>
          <Skeleton className="bg-green-500 text-white text-sm font-bold rounded-full px-4 py-1 mt-5" height={30} width={200} />
          <div className="mb-4 mt-8 w-64 h-64 md:w-96 md:h-96 relative">
            <Skeleton height="100%" width="100%" className="rounded-xl" />
            <div className="absolute top-2 right-2">
              <Skeleton circle height={32} width={32} />
            </div>
          </div>
          <Skeleton className="mt-4 w-full md:w-9/12 text-bono-10 font-bold px-4 text-left text-base md:text-lg font-montserrat" height={20} />
          <Skeleton className="mt-2 w-full md:w-9/12 text-bono-10 px-4 text-left text-base md:text-lg font-montserrat" height={100} />
          <div className="mt-6">
            <div className="mb-4">
              <ul>
                <li className=" text-bono-10 px-4 text-left text-base md:text-lg font-montserrat">
                  <Skeleton width="80%" />
                </li>
                <li className=" text-bono-10 px-4 text-left text-base md:text-lg font-montserrat">
                  <Skeleton width="80%" />
                </li>
                <li className=" text-bono-10 px-4 text-left text-base md:text-lg font-montserrat">
                  <Skeleton width="80%" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}

export default SlugLoading;
