import React from "react";
import { getOnboardedUsers } from "../lib/utils";
import { ProfilePic } from "../components/ProfilePic";
import { Link } from "wouter";

function Hire(props: any) {
  const [data, setData] = React.useState<any>([]);
  const fetchUsers = async () => {
    const data = await getOnboardedUsers();
    setData(data);
  };
  React.useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="max-w-[80vw] mx-auto text-3xl">
      <h1>
        <span className="text-brandGreen">Hire</span> and find verifiably
        skilled people
      </h1>
      {data.length < 1 ? (
        <h1 className="text-brandGreen text-center m-5">
          Fetching Proof Of Work profiles...
        </h1>
      ) : (
        <>
          {" "}
          <p className="text-[18px] text-gray-500">
            {data.length} proof Of work profiles
          </p>
          <div className="grid grid-cols-3 mt-4 gap-5 max-h-[75vh] scrollbar-hide overflow-y-scroll">
            {data.map((profile: any) => {
              const { address, UP } = profile;
              const universalProfile = JSON.parse(UP);
              //   console.log({ universalProfile });
              return (
                <Link href={`/pow/${address}`}>
                  <div className="bg-zinc-800 cursor-pointer flex-col p-2 flex justify-center rounded">
                    <ProfilePic address={address} UP={universalProfile} />
                    <h1 className="text-[24px] pt-2 text-brandGreen">
                      @{universalProfile?.name}
                    </h1>
                    <h2 className="text-[14px] text-gray-400 roboto font-medium text-ellipsis ">
                      {universalProfile?.description}
                    </h2>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default Hire;
