import React from "react";
import { PiHandWavingFill } from "react-icons/pi";
import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";

function WelcomeUser() {
  const { user } = useUser();
  const { data: trainingCount } = api.user.getTrainingsCount.useQuery();

  return (
    <div className={" mt-10"}>
      <div className="my-8 flex items-center gap-2">
        <PiHandWavingFill color={"orange"} size={25} />
        <h2 className=" text-xl opacity-60">Good Morning!</h2>
      </div>
      <p className={"text-4xl font-bold"}>{user?.firstName}</p>

      <p className="mt-6 font-bold">
        {trainingCount ? "You have trainined" : "Start your first training !"}
        {trainingCount && (
          <>
            <span className="text-primary"> {trainingCount}</span> times
            already!
          </>
        )}
      </p>
    </div>
  );
}

export default WelcomeUser;
