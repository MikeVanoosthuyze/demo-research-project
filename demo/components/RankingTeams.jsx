import Link from "next/link.js";
import ranking_teams from "@/data/ranking_teams";
import { useState, useEffect } from "react";
import { useRef } from "react";

export default function RankingTeams() {
  // const style = { viewTransitionName: `team-${index}` };

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
    <div className="w-5/12">
      <h2 className="font-semibold text-2xl mb-8">Teams</h2>
      {/* Table */}
      <div>
        <table className="table_teams" ref={tableRef}>
          <thead className="bg-accent-red rounded-lg">
            <tr>
              <th className="text-center font-medium px-3">Jersey</th>
              <th className="py-3  font-medium text-base text-center">Rank</th>
              <th className="font-medium text-base text-left">Points</th>
              <th className="font-medium text-base text-left px-3">Team</th>
            </tr>
          </thead>
          <tbody>
            {ranking_teams.map((team, index) => (
              <tr
                key={index}
                className="hover:shadow-md hover:scale-105 cursor-pointer transition-all duration-200 rounded-md"
              >
                <td className="py-4">
                  <div className="flex justify-center">
                    <Link href={`/teams/${team.abbreviation_name}`}>
                      <img className="w-10" src={team.jersey_url} alt="" />
                    </Link>
                  </div>
                </td>
                <td className="text-sm text-center">
                  <Link href={`/teams/${team.abbreviation_name}`}>
                    {team.rank}
                  </Link>
                </td>
                <td className="text-sm ">
                  <Link href={`/teams/${team.abbreviation_name}`}>
                    {team.points}
                  </Link>
                </td>
                <td className=" text-sm px-3">
                  {" "}
                  <Link href={`/teams/${team.abbreviation_name}`}>
                    {" "}
                    {team.team_name}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
