import { GiApothecary } from "react-icons/gi";

export default function DetailRecipeSkeleton() {
  return (
    <div className="layout-center">
      <div className="flex">
        <div className="animate-pulse bg-slate-300 w-[550px] h-[350px] rounded-md mr-4 flex justify-center items-center">
          <GiApothecary className="h-20 w-20" />
        </div>
        <div className="flex-grow">
          <div className="animate-pulse bg-slate-300 w-4/5 h-14 rounded-md"></div>
          <div className="flex">
            <div className="w-14 h-6 mt-3 bg-slate-300 animate-pulse rounded-full mr-2"></div>
            <div className="w-14 h-6 mt-3 bg-slate-300 animate-pulse rounded-full"></div>
          </div>
          <div className="flex">
            <div className="w-14 h-6 mt-3 bg-slate-300 animate-pulse rounded-full mr-2"></div>
            <div className="w-14 h-6 mt-3 bg-slate-300 animate-pulse rounded-full"></div>
          </div>
          <div className="w-40 h-8 mt-3 bg-slate-300 animate-pulse rounded-xl mr-2"></div>
          <div className="w-40 h-8 mt-2 bg-slate-300 animate-pulse rounded-xl mr-2"></div>
          <div className="w-40 h-8 mt-2 bg-slate-300 animate-pulse rounded-xl mr-2"></div>
        </div>
      </div>
      <div className="mt-12 flex">
        <div className="w-1/2 mr-5">
          <div className="animate-pulse w-64 h-12 bg-slate-300"></div>
          <ul className="list-disc ml-4 text-lg">
            {Array.from(Array(10).keys()).map((_, index) => (
              <li
                key={index}
                className="animate-pulse w-3/5 bg-slate-300 h-6 mt-2"
              ></li>
            ))}
          </ul>
        </div>
        <div className="w-1/2 ml-5">
          <div className="animate-pulse w-60 h-12 bg-slate-300"></div>
          <ol className="list-decimal ml-4 text-lg">
            {Array.from(Array(10).keys()).map((_, index) => (
              <li
                key={index}
                className="animate-pulse w-3/5 bg-slate-300 h-6 mt-2"
              ></li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
