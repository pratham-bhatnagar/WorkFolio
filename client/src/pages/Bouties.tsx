import Modal from "../components/Modal";
import Button from "..//components/Button";
import { Card, CardTitle } from "../components/ui/Card";
import React, { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";
import CreateBounty from "../components/CreateBounty";

function Bouties() {
  const [bountyModal, setBountyModal] = useState(false);
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
        <div className=" bg-transparent border rounded border-brandGrey p-4 flex justify-between items-center">
          <div className="flex items-center">
            <img
              className="h-12 w-12"
              src="https://via.placeholder.com/150"
              alt="SEO Optimization"
            />
            <div className="ml-4">
              <h3 className="font-semibold text-white">
                SEO Optimization for Superteam Earn
              </h3>
              <p className="text-gray-600">Project | Rolling Deadline</p>
            </div>
          </div>
          <span className="font-bold text-green-500">500 USDC</span>
        </div>
      </div>
    </div>
  );
}

export default Bouties;
