import { IoWallet } from "react-icons/io5";
import Button from "./Button";
import { NavigationMenu } from "./ui/navigation-menu";
function Nav(props: any) {
  console.log(props.connectWalletOnClick);
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
      <NavigationMenu />

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
