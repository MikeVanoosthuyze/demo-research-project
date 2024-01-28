import Head from "next/head";
import { useEffect, useState } from "react";
import { useRef } from "react";
import Link from "next/link";
import teams from "@/data/teams.json";
import ranking_teams from "../../data/ranking_teams.json";

// import Footer from "@/components/Footer";

export default function Team({
  index,
  rank,
  team_name,
  abbreviation_name,
  abbreviation_nationality,
  jersey_url,
  flag_url,
  nationality,
  points,
  teamClass,
}) {
  // const style = { viewTransitionName: `team-${index}` };
  const tableRef = useRef(null);
  const [teamData, setTeamData] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const table = tableRef.current;

      if (table) {
        const headerRow = table.querySelector("thead tr");
        const bodyRow = table.querySelector("tbody tr");

        if (bodyRow) {
          const bodyCells = bodyRow.children;
          Array.from(bodyCells).forEach((cell, index) => {
            const width = cell.offsetWidth;
            headerRow.children[index].style.width = `${width}px`;
          });
        }
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

  useEffect(() => {
    const foundTeam = teams.find(
      (team) => team.abbreviation === abbreviation_name
    );

    if (foundTeam) {
      setTeamData(foundTeam);
    } else {
      // Handle the case when the team is not found, e.g., redirect to an error page
      console.error(`Team with abbreviation ${params.teamId} not found.`);
    }
  }, [abbreviation_name]);

  useEffect(() => {
    console.log(teamData);
  }, [teamData]);

  if (teamData === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-10/12 m-auto mt-8">
      <Link href="/">
        <div className="mt-6 w-fit px-4 py-1 rounded-md text-light bg-darkGrey">
          Back
        </div>
      </Link>

      <div className="mt-8 content-teampage">
        <div className="flex gap-14">
          <img className="w-80 h-80" src={`/${jersey_url}`} alt="" />
          {/* Titel */}
          <div>
            <div className="flex gap-4 h-fit mt-10">
              <h1 className="whitespace-nowrap font-semibold text-3xl">
                {team_name}
              </h1>
              <img className="w-8" src={`/${flag_url}`} alt="" />
            </div>

            {/* Section 1*/}
            <section className="flex gap-10">
              {/* Team ranking */}
              <div className=" w-fit mt-6 rounded-lg">
                <p className="font-semibold text-lg">UCI ranking</p>
                <p className="font-medium text-base">
                  {teamData.uci_ranking_position}
                </p>
              </div>

              {/* Team wins */}
              <div className="w-fit mt-6 rounded-lg">
                <p className="font-semibold text-lg">wins</p>
                <p className="font-medium text-base">{teamData.wins_count}</p>
              </div>

              {/* Team points */}
              <div className="w-fit mt-6 rounded-lg">
                <p className="font-semibold text-lg">points</p>
                <p className="font-medium text-base">{teamData.pcs_points}</p>
              </div>
            </section>

            {/* Section 2*/}
            <section>
              <p>Bike brand</p>
              <p>{teamData.bike}</p>
              {teamData.status === "WT" ? (
                <p>UCI WorldTeam</p>
              ) : (
                <p>UCI ProTeam</p>
              )}
            </section>
          </div>
        </div>

        <div className="mt-6">
          <div className="bg-gray-200 p-10 rounded-xl">
            <h2 className="font-semibold text-2xl mb-4">Riders</h2>

            <table className="table_detailRiders" ref={tableRef}>
              <thead className="rounded-lg">
                <tr>
                  <th className=""></th>
                  <th className="py-3 font-semibold text-left text-base">
                    Name
                  </th>
                  <th className="py-1 font-semibold text-left text-base">
                    Age
                  </th>
                  <th className="py-1 font-semibold text-left text-base">
                    Career points
                  </th>
                </tr>
              </thead>

              <tbody>
                {teamData &&
                  teamData.riders.map((rider, index) => (
                    <tr
                      key={index}
                      className="hover:shadow-md hover:scale-105 cursor-pointer transition-all duration-200 rounded-md"
                    >
                      <td className="py-4">
                        <div className="ml-10">
                          {" "}
                          <img
                            src={`/${rider.photo_url}`}
                            alt=""
                            className="rounded-full object-cover object-top w-14 h-14"
                          />
                        </div>
                      </td>
                      <td className="text-base">{rider.rider_name}</td>
                      <td className=" text-base"> {rider.age}</td>
                      <td className=" text-base">
                        {""}
                        {rider.career_points}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const index = ranking_teams.findIndex(
    (team) => team.abbreviation_name === params.slug
  );
  const team = ranking_teams[index];
  team.index = index;

  return {
    props: team,
  };
}

export async function getStaticPaths() {
  return {
    paths: ranking_teams.map((team) => {
      return {
        params: {
          slug: team.abbreviation_name,
        },
      };
    }),
    fallback: false,
  };
}
