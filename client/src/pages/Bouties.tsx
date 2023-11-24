import Modal from "../components/Modal";
import Button from "..//components/Button";
import { Card, CardTitle } from "../components/ui/Card";
import React, { useEffect, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";
import CreateBounty from "../components/CreateBounty";
import Avvvatars from "avvvatars-react";
import supabase from "../services/supabase";
import { Link } from "wouter";

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
          <h1 className="text-brandGreen cal-font flex items-center gap-3 text-2xl">
            {" "}
            <GrMoney /> <span className="text-[#EDEDED]">Bounties</span>
          </h1>
          <p className="cal-font text-gray-400">
            Apply to a bounty using your Universal profile based Proof Of Work
            profile, to earn money and enhance POW.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <Button
            type="button"
            mode="green"
            onClick={() => setBountyModal(true)}
          >
            <div className="flex flex-row gap-[10px] items-center text-brandGrey">
              <FaCirclePlus />
              <p className=" cal-font font-semibold">Create Bounty</p>
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
    <Link href={`/bounty/${bounty.id}`}>
      <div className=" border-brandGrey flex items-center justify-between p-4 bg-transparent border rounded cursor-pointer">
        <div className="flex items-center">
          <img
            className="w-12 h-12"
            src={bounty.imageBase64}
            alt="SEO Optimization"
          />
          <div className="ml-4">
            <h3 className="cal-font font-semibold text-white">
              {bounty.title}
            </h3>
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
        <span className="font-bold text-brandGreen">{bounty.prize} LYX</span>
      </div>
    </Link>
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
