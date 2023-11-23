import Modal from "../components/Modal";
import Button from "..//components/Button";
import { Card, CardTitle } from "../components/ui/Card";
import React, { useEffect, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";
import CreateBounty from "../components/CreateBounty";
import Avvvatars from "avvvatars-react";
import supabase from "../services/supabase";

function BountiesPage() {
  const [bountyModal, setBountyModal] = useState(false);
  const [bounties, setBounties] = useState([]);
  const fetchBounties = async () => {
    const { data, error } = await supabase.from("Bounties").select("*");
    console.log({ error, data });
    if (data) {
      setBounties(data as []);
    }
  };
  useEffect(() => {
    fetchBounties();
  }, []);
  return (
    <div className="max-w-[80vw] mx-auto">
      {bountyModal && (
        <Modal
          closeOnOutsideClick={true}
          closeModal={() => setBountyModal(false)}
        >
          <CreateBounty closeModal={() => setBountyModal(false)} />
        </Modal>
      )}
      <div className="flex flex-row justify-between">
        <div className="">
          <h1 className="flex  items-center text-brandGreen text-2xl gap-3">
            {" "}
            <GrMoney /> <span className="text-[#EDEDED]">Bounties</span>
          </h1>
          <h2 className="text-gray-400">
            Apply to a bounty using your Universal profile based Proof Of Work
            profile, to earn money and enhance POW.
          </h2>
        </div>
        <div className="flex items-center justify-center">
          <Button
            type="button"
            mode="green"
            onClick={() => setBountyModal(true)}
          >
            <div className="flex flex-row gap-[10px] items-center text-brandGrey">
              <FaCirclePlus />
              <p className=" font-semibold ">Create Bounty</p>
            </div>
          </Button>
        </div>
      </div>
      <div className="grid gap-4 mt-[3rem]">
        {bounties.length ? (
          <>
            {bounties.map((bounty, i) => (
              <BountyCard bounty={bounty} key={i} />
            ))}
          </>
        ) : (
          "Loading data"
        )}
      </div>
    </div>
  );
}

const BountyCard = (props: any) => {
  const { bounty } = props;
  return (
    <div className=" bg-transparent border rounded border-brandGrey p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img
          className="h-12 w-12"
          src={bounty.imageBase64}
          alt="SEO Optimization"
        />
        <div className="ml-4">
          <h3 className="font-semibold text-white">{bounty.title}</h3>
          <p className="text-gray-500">Project | Rolling Deadline</p>
        </div>
      </div>
      <div className="text-white">
        {!bounty.applicants.length ? (
          "No applicants"
        ) : (
          <>
            {" "}
            {bounty.applicants.length > 1 ? (
              <>
                <span className="flex gap-1 items-center">
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
      <span className="font-bold text-green-500">{bounty.prize} LYX</span>
    </div>
  );
};

// title,
// prize,
// //todo use account address
// creator: "0x01cAbA23321325b4AdC62b37194cB3d367d8D5b5",
// applicants: [],
// descriptionMarkdown: value,
// applicants: [],
// winner: null,
// imageBase64: Base64Image,

export default BountiesPage;
