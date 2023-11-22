import Button from "../components/Button";
import { GrTicket } from "react-icons/gr";
import { FaPeopleGroup } from "react-icons/fa6";

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center  p-24 `}>
      <div className="w-[50vw]  p-2 flex flex-col justify-center items-center mb-[5rem]">
        <span className=" text-neutral-700 font-semibold border border-brandGreen bg-brandGreen cursor-pointer rounded-full text-[12px] px-3">
          Check out our SDK to interact with Protocol Data or Verify POAPs.
        </span>
        <h1 className="mt-[2rem]">
          <img src="./logo.png" alt="" className="w-full mx-auto" />
        </h1>
        <p className="text-[#EDEDED] text-[25px] text-center mx-4 mt-[2rem]">
          Organize in-person or virtual events with NFT ticketing, Attendance,
          Swag distribution and Proof of Attendance support
        </p>
        <div className="flex justify-around mt-[4rem] flex-row w-[20vw] mx-auto">
          <Button type="button" mode="green">
            <div className="flex flex-row gap-[10px] items-center ">
              <GrTicket className="text-brandGrey h-[16px]" height={16} />{" "}
              <h1 className="text-brandGrey font-semibold ">Buy Tickets</h1>
            </div>
          </Button>
          <Button type="button" mode="dark">
            <div className="flex flex-row gap-[10px] items-center ">
              <FaPeopleGroup className="text-[#EDEDED] h-[16px]" />
              <h1 className="text-[#EDEDED] font-semibold">Host Event</h1>
            </div>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 max-w-[55vw] gap-[3rem]">
        <div className="bg-neutral-800 text-lightBrandGrey border border-zinc-600 rounded-lg p-3 px-4">
          <h1 className="text-[20px] text-brandGreen pb-[5px]">
            NFT Ticketing
          </h1>
          <p className="text-[14px] text-[#EDEDED]">
            Create ticketing with dynamic NFTs using LSP8 protocol and NFT 2.0
            and Universal profiles
          </p>
        </div>

        <div className="bg-neutral-800 text-lightBrandGrey border border-zinc-600 rounded-lg p-3 px-4 ">
          <h1 className="text-[20px] text-brandGreen pb-[5px]">
            Attendance Tracking
          </h1>
          <p className="text-[14px] text-[#EDEDED]">
            Keep track of Universal Profile attendance for in person and virtual
            events
          </p>
        </div>

        <div className="bg-neutral-800 text-lightBrandGrey border border-zinc-600 rounded-lg p-3 px-4">
          <h1 className="text-[20px] text-brandGreen pb-[5px]">
            Proof of Attendance
          </h1>
          <p className="text-[14px] text-[#EDEDED]">
            Convert Tickets to POAPs using dynamic NFTs to provide verifiable
            proof of attendance
          </p>
        </div>

        <div className="bg-neutral-800 text-lightBrandGrey border border-zinc-600 rounded-lg p-3 px-4">
          <h1 className="text-[20px] text-brandGreen pb-[5px]">
            Swag Distribution
          </h1>
          <p className="text-[14px] text-[#EDEDED]">
            Distribute swags and rewards to attenders with ease and keeping
            stock track in sync.
          </p>
        </div>

        <div className="bg-neutral-800 text-lightBrandGrey border border-zinc-600 rounded-lg p-3 px-4">
          <h1 className="text-[20px] text-brandGreen pb-[5px]">SDK Support</h1>
          <p className="text-[14px] text-[#EDEDED]">
            TypeScript supported package to verify status of Universal profiles
            for events , verify POAPs and oher utilities.
          </p>
        </div>

        <div className="bg-neutral-800 text-lightBrandGrey border border-zinc-600 rounded-lg p-3 px-4">
          <h1 className="text-[20px] text-brandGreen pb-[5px]">
            Loyalty Support
          </h1>
          <p className="text-[14px] text-[#EDEDED]">
            Use proof of attendance to help in future community outreach,
            airdrops or loyalty programs
          </p>
        </div>
      </div>
    </main>
  );
}
