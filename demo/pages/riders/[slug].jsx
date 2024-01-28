import Head from "next/head";
import Link from "next/link";
import riders from "@/data/riders.json";
import teams from "@/data/teams.json";

import ranking_riders from "../../data/ranking_riders.json";
import { useEffect, useState } from "react";
import CustomChart from "@/components/CustomChart";

export default function Riders({
  index,
  rank,
  rider_name,
  id,
  team_name,
  photo_url,
  nationality,
  points,
}) {
  // const style = { viewTransitionName: `team-${index}` };

  const [riderData, setRiderData] = useState(null);
  const [teamData, setTeamData] = useState(null);

  useEffect(() => {
    const foundRider = riders.find((rider) => rider.id === id);
    const foundTeam = teams.find((team) => team.name === team_name);

    if (foundRider) {
      setRiderData(foundRider);
      setTeamData(foundTeam);
    } else {
      // Handle the case when the team is not found, e.g., redirect to an error page
      console.error(`Team with abbreviation ${params.teamId} not found.`);
    }
  }, []);

  // useEffect(() => {
  //   console.log(riderData);
  // }, [riderData]);

  useEffect(() => {
    console.log(teamData);
  }, [teamData]);

  if (riderData === null && teamData === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-10/12 m-auto mt-8">
      <Link href="/">
        <div className="mt-6 w-fit px-4 py-1 rounded-md text-light bg-darkGrey">
          Back
        </div>
      </Link>
      <div className="mt-8 bg-darkGrey rounded-3xl px-10 content-riderpage">
        <div className="flex gap-14 bg-gray-200 rounded-lg rounded-xl">
          <img className="w-64 rounded-l-xl" src={`/${photo_url}`} alt="" />
          {/* Titel */}
          {/* <div> */}
          <div className="flex items-center">
            <div>
              <div className="">
                <h1 className="whitespace-nowrap font-semibold text-3xl">
                  {" "}
                  {rider_name}{" "}
                </h1>

                <h2 className="whitespace-nowrap text-lg mt-2">
                  #<span className="font-semibold text-xl">{rank} ranked</span>
                </h2>
              </div>

              <section className="mt-6 flex flex-col gap-2">
                {/* <span className="font-medium">Team:</span>  */}
                <div className="flex items-center">
                  <img className="w-8 mr-4" src={`/${teamData.jersey_url}`} alt="" />
                  <p> {team_name}</p>
                </div>
                <p>
                  <span className="font-medium">Height:</span>{" "}
                  {riderData.height} m{" "}
                  <span className="font-medium">Weight:</span>{" "}
                  {riderData.weight} kg
                </p>
                <p>
                  <span className="font-medium">Birthdate:</span>{" "}
                  {riderData.birthdate}
                </p>
                <p>
                  <span className="font-medium">Place of birth:</span>{" "}
                  {riderData.place_of_birth}
                </p>
              </section>
            </div>

            <section className="ml-32">
              <h2 className="font-semibold text-2xl">Points per speciality</h2>
              <div className="flex mt-4 gap-6">
                <section>
                  <div className="flex flex-col gap-1 mb-3">
                    {" "}
                    <p className="font-medium">one day races:</p>{" "}
                    <p>{riderData.points_per_speciality.one_day_races}</p>
                    <CustomChart
                      value={riderData.points_per_speciality.one_day_races}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    {" "}
                    <p className="font-medium">Time trail:</p>{" "}
                    <p>{riderData.points_per_speciality.time_trial}</p>
                    <CustomChart
                      value={riderData.points_per_speciality.time_trial}
                    />
                  </div>
                </section>

                <section>
                  <div className="flex flex-col gap-1 mb-3">
                    {" "}
                    <p className="font-medium">Sprint:</p>{" "}
                    <p>{riderData.points_per_speciality.sprint}</p>
                    <CustomChart
                      value={riderData.points_per_speciality.sprint}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    {" "}
                    <p className="font-medium">Climber:</p>{" "}
                    <p>{riderData.points_per_speciality.climber}</p>
                    <CustomChart
                      value={riderData.points_per_speciality.climber}
                    />
                  </div>
                </section>

                <section>
                  <div className="flex flex-col gap-1">
                    {" "}
                    <p className="font-medium">multi-stage races:</p>{" "}
                    <p>{riderData.points_per_speciality.gc}</p>
                    <CustomChart value={riderData.points_per_speciality.gc} />
                  </div>
                </section>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const index = ranking_riders.findIndex((rider) => rider.id === params.slug);
  const rider = ranking_riders[index];
  rider.index = index;

  return {
    props: rider,
  };
}

export async function getStaticPaths() {
  return {
    paths: ranking_riders.map((rider) => {
      return {
        params: {
          slug: rider.id,
        },
      };
    }),
    fallback: false,
  };
}
