import { useRoute } from "wouter";
import supabase from "../services/supabase";
import { useEffect, useState } from "react";
import ReactMarkdown, { Options } from "react-markdown";
import gfm from "remark-gfm";
import Avvvatars from "avvvatars-react";
import Button from "../components/Button";
import { GiReceiveMoney } from "react-icons/gi";
import { FaUserPlus } from "react-icons/fa6";
import MDEditor from "@uiw/react-md-editor";
import React from "react";
import { getBounties, setBountiesForUser, setBountyWinner } from "../lib/utils";
import { ClaimWinnerNFT, getUP } from "../lib/lukso";

// title,
// prize,
// //todo use account address
// creator: "0x01cAbA23321325b4AdC62b37194cB3d367d8D5b5",
// applicants: [],
// descriptionMarkdown: submissionmarkdown,
// applicants: [],
// winner: null,
// imageBase64: Base64Image,

function Bounty(props: any) {
  const [match, params] = useRoute("/bounty/:id");
  const [bounty, setBounty] = useState<any>(null);
  const [winner, setWinner] = useState<any>(null);
  const [winner2, setWinner2] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const fetchbounty = async () => {
    const data = await getBounties(params!.id);
    setBounty(data?.[0]);
  };
  const winnerLogic = async () => {
    if (bounty?.winner) {
      const data = await getUP(bounty?.winner);
      setWinner(data);
    }
  };
  const submitHandler = () => {
    setBountyWinner(winner2, bounty?.id);
  };
  useEffect(() => {
    fetchbounty();
  }, []);
  useEffect(() => {
    winnerLogic();
  }, [bounty]);
  const [submissionMarkdown, setSubmissionMarkdown] = React.useState<string>();
  //todo fetch UP username here -> for creator
  return (
    <div className="text-white max-w-[80vw] h-[90vh] overflow-y-scroll  mx-auto bg-zinc-800 p-2 rounded">
      {!bounty ? (
        <h1 className="text-brandGreen text-center m-5">
          Fetching bounty details...
        </h1>
      ) : (
        <>
          <div className="flex flex-row justify-between items-center gap-4 mx-4 border-b-[1px] border-gray-700 p-3">
            <div className="flex flex-row gap-4 items-center">
              <img
                src={bounty.imageBase64}
                alt=""
                height={20}
                className="h-[50px]"
              />{" "}
              <div className="flex flex-col">
                <h1 className=" text-[40px]">{bounty.title}</h1>
                <p className="roboto font-semibold text-gray-500">
                  by {bounty.creator}
                </p>
              </div>
            </div>
            {/* <div className=" border-brandGreen text-2xl text-brandGreen rounded-full flex items-center justify-center">
              {bounty?.prize} LYX
            </div> */}
          </div>

          <div className=" mt-2 mx-4 max-h-[50vh] overflow-y-scroll border-b-[1px] border-gray-700 pb-4">
            <ReactMarkdown
              className={"roboto"}
              remarkPlugins={[gfm]}
              components={{
                h1({ node, inline, className, children, ...props }: any) {
                  return (
                    <h1
                      className={"text-[40px] font-semibold roboto" + className}
                      {...props}
                    >
                      {children}
                    </h1>
                  );
                },
                h2({ node, inline, className, children, ...props }: any) {
                  return (
                    <h1
                      className={"text-[30px] font-semibold roboto" + className}
                      {...props}
                    >
                      {children}
                    </h1>
                  );
                },
                h3({ node, inline, className, children, ...props }: any) {
                  return (
                    <h1
                      className={"text-[25px] font-semibold roboto" + className}
                      {...props}
                    >
                      {children}
                    </h1>
                  );
                },
                h4({ node, inline, className, children, ...props }: any) {
                  return (
                    <h1
                      className={"text-[20px] font-semibold roboto" + className}
                      {...props}
                    >
                      {children}
                    </h1>
                  );
                },
              }}
            >
              {bounty.descriptionMarkdown}
            </ReactMarkdown>
          </div>
          {/* todo if winner address is user address show claim otherwise just show winners */}
          {bounty?.winner ? (
            <div className="winner w-[30vw] mx-auto my-3 p-5 rounded-3xl">
              <h1 className="font-bold text-zinc-800 text-2xl  ">
                🎉 Winners Announced
              </h1>
              <div className="flex gap-4 justify-center items-center mt-4">
                <Avvvatars value={`bounty?.winner`} size={50} />{" "}
                <h1 className="text-zinc-800 text-xl">
                  {props.address === bounty?.winner ? "You" : winner?.name} won{" "}
                  {bounty?.prize} LYX
                </h1>
              </div>
              {/* {props.address}
              {bounty.winner} */}
              {props.address === bounty?.winner && (
                <div className=" flex justify-around my-2 mt-8">
                  <Button
                    type="button"
                    mode="dark"
                    onClick={async () => {
                      console.log("here");
                      setLoading(true);
                      // ClaimWinnerNFT(props.wallet, `Winner of ${bounty.name}`);
                      setLoading(false);
                      setBountiesForUser(bounty, props.address);
                    }}
                  >
                    <div className="flex flex-row gap-[10px] items-center ">
                      <GiReceiveMoney
                        className="text-brandGreen h-[16px]"
                        height={16}
                      />{" "}
                      <p className="text-brandGreen font-semibold cal-font">
                        {loading
                          ? "Adding to POW profile.."
                          : "Claim Bounty NFT"}
                      </p>
                    </div>
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="mx-4">
              {" "}
              <div data-color-mode="light">
                <div className="flex justify-between mr-8 flex-row mb-2 text-2xl my-4 mt-8 font-medium  pl-2 text-white">
                  <span> Add your submission </span>

                  <span>
                    {" "}
                    <div className=" roboto text-[16px] text-gray-500">
                      {!bounty.applicants.length ? (
                        "No applicants"
                      ) : (
                        <>
                          {" "}
                          {bounty.applicants.length > 1 ? (
                            <>
                              <span className="flex items-center gap-1">
                                <div className="flex items-center -space-x-2 pointer-events-none">
                                  <Avvvatars
                                    value={`${bounty.applicants?.[0]}random`}
                                    style={"shape"}
                                    size={25}
                                  />{" "}
                                  <Avvvatars
                                    value={`${bounty.applicants?.[0]}addr`}
                                    style={"shape"}
                                    size={25}
                                  />
                                  <a
                                    className="flex items-center justify-center w-[30px] h-[30px] text-lg font-medium text-white bg-brandGreen rounded-full "
                                    href="#"
                                  >
                                    {bounty.applicants.length + 1}
                                  </a>
                                </div>{" "}
                                Submissions
                              </span>
                            </>
                          ) : (
                            "1 Submission"
                          )}
                        </>
                      )}
                    </div>
                  </span>
                </div>
                <div className=" mt-4">
                  <MDEditor
                    height={300}
                    value={submissionMarkdown}
                    onChange={(e) => setSubmissionMarkdown(e)}
                  />
                </div>
                <div className="mt-5">
                  {" "}
                  <Button type="button" mode="green" className="rounded-l-none">
                    <div className="flex flex-row gap-[10px] items-center ">
                      <p className="text-brandGrey font-semibold ">
                        Apply using your Proof of Work
                      </p>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* submisison ui */}
          {props.address === bounty?.creator && (
            <>
              <div className="flex w-full">
                <input
                  value={winner}
                  onChange={(e) => setWinner2(e.target.value)}
                  type="text"
                  id="title"
                  className="bg-neutral-800 border rounded-r-none border-r-0 border-gray-600 text-white text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Winner address"
                  required
                />
                <Button
                  type="button"
                  mode="green"
                  className="rounded-l-none"
                  onClick={() => submitHandler()}
                >
                  <div className="flex flex-row gap-[10px] items-center ">
                    <p className="text-brandGrey font-semibold ">Mint Bounty</p>
                  </div>
                </Button>
              </div>
              <></>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Bounty;
