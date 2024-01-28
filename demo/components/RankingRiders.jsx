import Link from "next/link.js";
import ranking_riders from "@/data/ranking_riders";
import { useState, useEffect } from "react";
import { useRef } from "react";

export default function RankingRiders() {
  //   const style = { viewTransitionName: `team-${index}` };

  const tableRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const table = tableRef.current;
      const headerRow = table.querySelector("thead tr");
      const bodyRow = table.querySelector("tbody tr");

      if (bodyRow) {
        const bodyCells = bodyRow.children;
        Array.from(bodyCells).forEach((cell, index) => {
          const width = cell.offsetWidth;
          headerRow.children[index].style.width = `${width}px`;
        });
      }
    };

    // Attach resize event listener when component mounts
    window.addEventListener("resize", handleResize);

    // Trigger resize handler on component mount
    handleResize();

    // Detach resize event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-6/12">
      <h2 className="font-semibold text-3xl mb-20">Ranking riders</h2>
      {/* Table */}
      <div>
        <table className="table_riders" ref={tableRef}>
          <thead className="rounded-lg">
            <tr className="">
              <th className="rounded-tl-xl"></th>
              <th className="py-3 px-3 font-medium text-base text-center">
                Rank
              </th>
              <th className="py-3 px-3 font-medium text-base text-left">
                Points
              </th>
              <th className="py-3 px-3 font-medium text-base text-left">
                Name
              </th>
              <th className="py-3 px-3 font-medium text-base text-left rounded-tr-xl">
                Team
              </th>
            </tr>
          </thead>

          <tbody>
            {ranking_riders.map((rider, index) => (
              <tr
                key={index}
                className="hover:shadow-md hover:scale-105 cursor-pointer transition-all duration-200 rounded-md"
              >
                <td className="px-3 py-4 text-sm">
                  <div className="flex justify-center">
                    <Link href={`/riders/${rider.id}`}>
                      <img
                        src={rider.photo_url}
                        alt=""
                        className="rounded-full object-cover object-top w-10 h-10"
                      />
                    </Link>
                  </div>
                </td>

                <td className="px-3 text-sm text-center">
                  <Link href={`/riders/${rider.id}`}>{rider.rank}</Link>
                </td>

                <td className="px-3 text-sm">
                  <Link href={`/riders/${rider.id}`}>{rider.points}</Link>
                </td>
                <td className="px-3 text-sm">
                  <Link href={`/riders/${rider.id}`}>{rider.rider_name}</Link>
                </td>

                <td className="px-3 py-1 text-sm">
                  <Link href={`/riders/${rider.id}`}>{rider.team_name}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* End Table */}
    </div>
  );
}
