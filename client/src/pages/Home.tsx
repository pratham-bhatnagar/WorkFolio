import Button from "../components/Button";
import { GrMoney, GrTicket } from "react-icons/gr";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdPersonSearch } from "react-icons/md";
import { Link } from "wouter";

export default function Home(props: any) {
  return (
    <main className={`flex min-h-screen flex-col items-center  p-24 pt-10 `}>
      <div className="w-[50vw]   flex flex-col justify-center items-center mb-[5rem]">
        {/* <span className=" text-neutral-700 font-semibold border border-brandGreen bg-brandGreen cursor-pointer rounded-full text-[12px] px-3">
          Check out our SDK to interact with Protocol Data or Verify POAPs.
        </span> */}
        <h1 className="">
          <img src="./logo.png" alt="" className="w-full mx-auto" />
        </h1>
        <h1 className="text-brandGreen  text-[40px] text-center mt-8 ">
          Resumes are broken
        </h1>{" "}
        <p className="text-[#EDEDED] text-[30px] text-center mx-4 mt-[30px]">
          Leverage
          <span className="text-brandGreen"> Proof of Work </span> Profiles to
          Secure <span className="text-brandGreen">Bounties</span> and Unlock
          Job Offers with Verifiable Skills !
        </p>
        <div className="flex justify-around mt-[4rem] flex-row w-[20vw] mx-auto">
          <Button type="button" mode="green">
            <div className="flex flex-row gap-[10px] items-center ">
              <GrMoney className="text-brandGrey h-[16px]" height={16} />{" "}
              <h1 className="text-brandGrey font-semibold ">Find Bounties</h1>
            </div>
          </Button>
          <Button type="button" mode="dark">
            <div className="flex flex-row gap-[10px] items-center ">
              <MdPersonSearch className="text-[#EDEDED] h-[16px]" />
              <h1 className="text-[#EDEDED] font-semibold">Hire Talent</h1>
            </div>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 max-w-[55vw] gap-[3rem]">
        <div className="bg-neutral-800 text-lightBrandGrey border border-zinc-600 rounded-lg p-3 px-4">
          <h1 className="text-[20px] text-brandGreen pb-[5px]">
            Build Your Proof of Work Profile
          </h1>
          <p className="text-[14px] text-[#EDEDED] roboto font-medium">
            Create a comprehensive Proof of Work profile, showcasing your
            skills, projects, and completed bounties to stand out in the job
            market.
          </p>
        </div>

        <div className="bg-neutral-800 text-lightBrandGrey border border-zinc-600 rounded-lg p-3 px-4 ">
          <h1 className="text-[20px] text-brandGreen pb-[5px]">
            Win Lucrative Bounties
          </h1>
          <p className="text-[14px] text-[#EDEDED] roboto font-medium">
            Compete and secure bounties by leveraging your verified Proof of
            Work profile, demonstrating your expertise and increasing your
            chances of success.
          </p>
        </div>

        <div className="bg-neutral-800 text-lightBrandGrey border border-zinc-600 rounded-lg p-3 px-4">
          <h1 className="text-[20px] text-brandGreen pb-[5px]">
            Apply with Proof of Work
          </h1>
          <p className="text-[14px] text-[#EDEDED] roboto font-medium">
            Streamline the application process by submitting your Proof of Work
            profile, offering potential employers an instant and credible
            overview of your skills.
          </p>
        </div>

        <div className="bg-neutral-800 text-lightBrandGrey border border-zinc-600 rounded-lg p-3 px-4">
          <h1 className="text-[20px] text-brandGreen pb-[5px]">
            Discover Verifiable Talent
          </h1>
          <p className="text-[14px] text-[#EDEDED] roboto font-medium">
            Easily find skilled individuals with validated capabilities by
            exploring Proof of Work profiles, ensuring a match for your project
            needs.
          </p>
        </div>

        <div className="bg-neutral-800 text-lightBrandGrey border border-zinc-600 rounded-lg p-3 px-4">
          <h1 className="text-[20px] text-brandGreen pb-[5px]">
            Sponsor People
          </h1>
          <p className="text-[14px] text-[#EDEDED] roboto font-medium">
            Facilitate direct monetary appreciation for exceptional work by
            enabling users to send tips through Proof of Work profiles.
          </p>
        </div>

        <div className="bg-neutral-800 text-lightBrandGrey border border-zinc-600 rounded-lg p-3 px-4">
          <h1 className="text-[20px] text-brandGreen pb-[5px]">
            Skill Recognition with Karma
          </h1>
          <p className="text-[14px] text-[#EDEDED] roboto font-medium">
            Move beyond traditional credentials with the Karma Engine, where
            community-driven endorsements offer authentic recognition of a
            skills.
          </p>
        </div>
      </div>
    </main>
  );
}
