import Link from "next/link.js";
import ranking_teams from "@/data/ranking_teams";

export default function RankingTeams() {
//   const style = { viewTransitionName: `team-${index}` };
  return (
    <div className="bg-gray-200 w-6/12 p-8 rounded-xl">
      <h2 className="font-semibold text-2xl mb-4">Teams</h2>
      {/* Table */}
      <table className="w-full">
        <thead>
          <tr className="">
            {/* <th></th> */}
            <th className="text-left font-medium">Jersey</th>
            <th className="py-1 px-3 font-medium text-base text-center">
              Rank
            </th>
            <th className="py-1 px-3 font-medium text-base text-left">
              Points
            </th>
            <th className="py-1 px-3 font-medium text-base text-left">Team</th>
          </tr>
        </thead>
        {ranking_teams.map((team, index) => (
          <tbody>
            <tr key={index} className="hover:shadow-md hover:scale-105 cursor-pointer transition-all duration-200 rounded-md">
              {/* <td className="px-3 py-1 flex justify-center mt-2">
                <Link href={`/team/${team.abbreviation_name}`}>
                  <img className="w-5" src={team.flag_url} alt="" />
                </Link>
              </td> */}

              <td className="px-3 py-1">
                <Link href={`/team/${team.abbreviation_name}`}>
                  <img className="w-10" src={team.jersey_url} alt="" />
                </Link>
              </td>

              <td className="px-3 py-1 text-sm text-center">
                <Link href={`/team/${team.abbreviation_name}`}>{team.rank}</Link>
              </td>
              <td className="px-3 py-1 text-sm">
                <Link href={`/team/${team.abbreviation_name}`}>{team.points}</Link>
              </td>

              <td className="px-3 py-1 text-sm">
                {" "}
                <Link href={`/team/${team.abbreviation_name}`}> {team.team_name}</Link>
              </td>
            </tr>
          </tbody>
        ))}
      </table>

      {/* End Table */}
    </div>
  );
}
