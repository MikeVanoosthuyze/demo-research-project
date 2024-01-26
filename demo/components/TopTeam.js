import Link from "next/link.js";

export default function TopTeam({
  rank,
  team_name,
  abbreviation_name,
  abbreviation_nationality,
  jersey_url,
  flag_url,
  nationality,
  points,
  teamClass,
  index,
}) {
  const style = { viewTransitionName: `team-${index}` };

  return (
    <Link href={`/teams/${abbreviation_name}`}>
      <div className="p-4 w-80 rounded-3xl hover:scale-110 transition-all duration-200 ">
        <h2 className="font-bold text-xl mb-4 text-center">
          {rank} {team_name}
        </h2>
        <img className="w-40 h-40 m-auto" src={jersey_url} alt="" />
        <div>
          <div className="flex justify-center">
            <div className="w-5 flex items-center mr-2">
              <img className="w-fit h-fit" src={flag_url} alt="" />
            </div>
            <p className="font-semibold text-base">{nationality}</p>
          </div>
          <p className="font-semibold text-base text-center">
            points: {points}
          </p>
        </div>
      </div>
    </Link>
  );
}
