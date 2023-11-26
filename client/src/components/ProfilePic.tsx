import Avvvatars from "avvvatars-react";
import { removeIpfsPrefix } from "../lib/utils";

export const ProfilePic = (props: any) => {
  console.log("Pfp ", props.UP);
  return (
    <>
      {props.UP?.profileImage ? (
        <img
          //@ts-ignore
          src={`https://api.universalprofile.cloud/ipfs/${removeIpfsPrefix(
            props.UP?.profileImage[0].url
          )}`}
          className={props.className}
          height={props?.size}
          width={props?.size}
          alt=""
        />
      ) : (
        <div className={props.className}>
          <Avvvatars value={`${props.UP?.name}`} size={props.size} />
        </div>
      )}
    </>
  );
};
