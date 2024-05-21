// Data
import ranking_teams from "@/data/ranking_teams";
import ranking_riders from "@/data/ranking_riders";
// Components
import TopTeam from "@/components/TopTeam";
import RankingTeams from "@/components/RankingTeams";
import RankingRiders from "@/components/RankingRiders";
import Link from "next/link";

export default function Home() {
  const handleClick = (e) => {
    e.preventDefault();
    const element = document.querySelector("#stats");
    element.scrollIntoView({ behavior: "smooth" });
  };
  return (
      <main className="container-index">
        <div className="relative">
          <img
            src="tourbritain.jpg"
            alt="classic"
            className="h-screen w-screen object-cover object-top"
          />
          <h1 className="absolute top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-light text-4xl font-semibold bg-darkGrey/50 p-10 rounded-2xl">
            View Transitions Api - demo
          </h1>

          <Link
            className="text-light bg-darkBlue font-medium text-lg rounded-lg px-4 py-1 absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:bg-dark hover:scale-110 transition-all ease-out"
            href="#stats"
            onClick={handleClick}
          >
            Start
          </Link>
        </div>

        <div className="opacity-0" id="stats">
          Stats
        </div>

        <div className="w-10/12 m-auto mt-28">
          <h1 className="font-semibold text-3xl mb-20">Top 3 teams</h1>
          <div className="flex justify-center gap-16">
            {ranking_teams.slice(0, 3).map((team, index) => (
              <TopTeam {...team} index={index} key={team.abbreviation_name} />
            ))}
          </div>

          <div className="mt-28 flex gap-12 justify-center">
            {/* Table for ranking teams*/}
            <RankingTeams />
            {/* Table for ranking riders*/}
            <RankingRiders />
          </div>
        </div>
      </main>
  );
}
