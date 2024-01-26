import Head from "next/head";
// Data
import ranking_teams from "@/data/ranking_teams";
import ranking_riders from "@/data/ranking_riders";
// Components
import TopTeam from "@/components/TopTeam";
import RankingTeams from "@/components/RankingTeams";
import RankingRiders from "@/components/RankingRiders";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Cycling stats</title>
      </Head>
      <header></header>
      <main className="w-10/12 m-auto mt-6">
        <h1 className="font-semibold text-3xl mb-8">Top 3 teams</h1>
        <div className="flex gap-12">
          {ranking_teams.slice(0, 3).map((team, index) => (
            <TopTeam {...team} index={index} key={team.abbreviation_name} />
          ))}
        </div>

        <div className="mt-20 transitionTables flex gap-12 justify-center">
          {/* Table for ranking teams*/}
          <RankingTeams />
          {/* Table for ranking riders*/}
          <RankingRiders />
        </div>
      </main>

      <Footer />
    </>
  );
}
