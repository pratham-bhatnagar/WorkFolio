//@ts-ignore
import React, { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { getIPFSPublic, getUP } from "../lib/lukso";
import { ProfilePic } from "../components/ProfilePic";
import GithubPow from "../components/GithubPow";
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Button from "../components/Button";
import { MdAttachMoney } from "react-icons/md";
import Web3 from "web3";
//@ts-ignore
const web3 = new Web3(window.lukso);
function POW() {
  const [match, params] = useRoute("/pow/:id");
  const [UP, setUp] = useState<any>();
  const fetchProfile = async () => {
    const profile = await getUP(params?.id);
    console.log(profile);
    setUp(profile);
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <div className="text-white max-w-[80vw] scrollbar-hide h-[90vh] overflow-y-scroll  mx-auto  p-2 rounded">
        {!UP ? (
          <h1 className="text-brandGreen text-xl">Fetching proof of work...</h1>
        ) : (
          <div className="flex flex-col gap-1">
            <div className="bg-zinc-800 rounded p-1 flex items-center justify-center">
              {UP.backgroundImage[0].url && (
                <img
                  src={getIPFSPublic(UP.backgroundImage[0].url)}
                  alt="cover"
                  className="h-[300px]"
                />
              )}
            </div>
            <div className="bg-zinc-800 rounded p-8">
              <div className="flex items-center gap-10">
                <ProfilePic UP={UP} size={150} className="rounded-full" />
                <div className="flex flex-col items-baseline gap-4">
                  <div className="flex flex-row gap-8 items-center">
                    <h1 className="text-brandGreen text-3xl ">@{UP?.name}</h1>{" "}
                    {UP?.tags.map((tag: any) => (
                      <span className="border-brandGreen rounded-full p-1 font-semibold bg-brandGreen text-zinc-800 roboto  px-2">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-zinc-400 roboto font-semibold">
                    {UP?.description}
                  </h2>
                  <div className="flex flex-row gap-2">
                    <Button type="button" mode="dark">
                      <div className="flex flex-row gap-[10px] items-center ">
                        <FaGithub
                          className="text-brandGreen h-[16px]"
                          height={16}
                        />{" "}
                        <p className="text-brandGreen font-semibold cal-font">
                          lakshya-dhariwal
                        </p>
                      </div>
                    </Button>

                    <Button type="button" mode="dark">
                      <div className="flex flex-row gap-[10px] items-center ">
                        <FaTwitter
                          className="text-brandGreen h-[16px]"
                          height={16}
                        />{" "}
                        <p className="text-brandGreen font-semibold cal-font">
                          lakshyastwt
                        </p>
                      </div>
                    </Button>
                    <Button type="button" mode="dark">
                      <div className="flex flex-row gap-[10px] items-center ">
                        <FaLinkedin
                          className="text-brandGreen h-[16px]"
                          height={16}
                        />{" "}
                        <p className="text-brandGreen font-semibold cal-font">
                          lakshya-dhariwal
                        </p>
                      </div>
                    </Button>

                    <Button type="button" mode="green">
                      <div className="flex flex-row gap-[10px] items-center ">
                        <div className="text-brandGrey"> $</div>
                        <h1 className="text-brandGrey font-semibold ">
                          Sponsor {UP?.name}
                        </h1>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-800 p-8 px-2 w-full  flex flex-col mx-auto items-center justify-center">
              <GithubPow username={"lakshya-dhariwal"} />

              <div className="flex gap-3 m-3"> 
                <div className="relative   sm:max-w-xl sm:mx-auto">
                  <a
                    href="https://reclaimprotocol.org/"
                    target="_blank"
                    rel="norefferer noreoppener"
                  >
                    <div className="flex flex-col items-center justify-center gap-2  text-[#6c4426] backdrop-opacity-10 font-bold bg-white shadow-xl rounded-2xl sm:p-6 bg-clip-padding bg-opacity-60 border border-gray-200 ">
                      <p className="text-2xl">Karma Score</p>
                      <img className="rounded-full w-[80px] h-[80px]" src="https://cdn.dribbble.com/users/2142686/screenshots/14141363/attachments/1520713/Attachment_1?resize=400x300&vertical=center"/>
                      <p className="text-2xl">69</p>
                    </div>
                  </a>
                </div>

                <div className="relative   sm:max-w-xl sm:mx-auto">
                  <a
                    href="https://reclaimprotocol.org/"
                    target="_blank"
                    rel="norefferer noreoppener"
                  >
                    <div className="flex flex-col items-center justify-center gap-2  text-[#6c4426] backdrop-opacity-10 font-bold bg-white shadow-xl rounded-2xl sm:p-6 bg-clip-padding bg-opacity-60 border border-gray-200 ">
                      <p className="text-2xl">Twitter</p>
                    <img className="rounded-full w-[80px] h-[80px]" src="https://cdn-icons-png.flaticon.com/512/2496/2496110.png"/>
                      <p className="text-2xl">@prrthamm</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

        )}
      </div>
    </>
  );
}

export default POW;
