import React, { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { getUP } from "../lib/lukso";
import { ProfilePic } from "../components/ProfilePic";

function POW() {
  const [match, params] = useRoute("/pow/:id");
  const [UP, setUp] = useState<any>();
  const fetchProfile = async () => {
    const profile = await getUP(params?.id);
    setUp(profile);
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <>
      <div className="text-white max-w-[80vw] h-[90vh] overflow-y-scroll  mx-auto  p-2 rounded">
        <div className="bg-zinc-800 rounded p-8">
          <div className="flex items-center gap-10">
            <ProfilePic UP={UP} size={150} className="rounded-full" />
            <div className="flex flex-col items-baseline gap-4">
              <h1 className="text-brandGreen text-3xl">@{UP.name}</h1>
              <h2 className="text-gray-500 roboto">{UP.description}</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default POW;
