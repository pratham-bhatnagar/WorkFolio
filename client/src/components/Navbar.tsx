import { IoWallet } from "react-icons/io5";
import Button from "./Button";
import { GrMoney } from "react-icons/gr";
import { MdWorkspacePremium } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { Link, useRoute } from "wouter";

export const ActiveLink = (props: any) => {
  const [isActive] = useRoute(props.href);
  return (
    <Link {...props}>
      <a className={isActive ? "text-brandGreen" : ""}>{props.children}</a>
    </Link>
  );
};

function Nav(props: any) {
  return (
    <header className="absolute top-0 w-[100vw] h-[64px] px-[100px] flex flex-row items-center justify-between  text-white border-b-[1px] border-slate-700 z-50">
      <div className="flex">
        <a href="/#">
          {" "}
          <img
            src="/images/logo.svg"
            alt=""
            height={25}
            className="mr-[10px] h-[30px] sm:visible"
          />{" "}
        </a>
        <h1 className=" gradient marginlogo text-2xl text-brandGreen font-semibold">
          LaunchPad
        </h1>{" "}
      </div>
      <div className=""></div>
      <div className=""></div>
      <ul className="flex gap-10">
        <ActiveLink href="/bounty">
          <li className="cursor-pointer hover:text-brandGreen flex gap-2 text-lg items-center">
            <GrMoney /> Bounties
          </li>
        </ActiveLink>
        <ActiveLink href="/pow">
          <li className="cursor-pointer hover:text-brandGreen flex gap-2 text-lg items-center">
            <MdWorkspacePremium /> Proof Of Work
          </li>
        </ActiveLink>
        {!props.wallet && (
          <ActiveLink href={`/pow/profile-address-here`}>
            <li className="cursor-pointer hover:text-brandGreen flex gap-2 text-lg items-center">
              <CgProfile /> Your POW Profile
            </li>
          </ActiveLink>
        )}
      </ul>
      <Button
        type="button"
        mode="green"
        disabled={props.connecting}
        onClick={props.connectWalletOnClick}
      >
        <div className="flex flex-row gap-[10px] items-center ">
          <IoWallet className="text-brandGrey h-[16px]" height={16} />{" "}
          <p className="text-brandGrey font-semibold ">
            {props.connecting
              ? "Connecting"
              : props.wallet
              ? "Disconnect"
              : "Connect"}
          </p>
        </div>
      </Button>
    </header>
  );
}

export default Nav;
