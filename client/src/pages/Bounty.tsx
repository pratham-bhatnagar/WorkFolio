import { useRoute } from "wouter";
import supabase from "../services/supabase";
import { useEffect, useState } from "react";
import ReactMarkdown, { Options } from "react-markdown";
import gfm from "remark-gfm";

// title,
// prize,
// //todo use account address
// creator: "0x01cAbA23321325b4AdC62b37194cB3d367d8D5b5",
// applicants: [],
// descriptionMarkdown: value,
// applicants: [],
// winner: null,
// imageBase64: Base64Image,

function Bounty() {
  const [match, params] = useRoute("/bounty/:id");
  const [Bounty, setBounty] = useState<any>(null);
  const fetchBounty = async () => {
    const { data, error } = await supabase
      .from("Bounties")
      .select("*")
      .eq("id", params!.id);
    console.log({ error, data });
    setBounty(data?.[0]);
  };
  useEffect(() => {
    fetchBounty();
  }, []);
  return (
    <div className="text-white max-w-[80vw] mx-auto">
      {!Bounty ? (
        <h1 className="text-brandGreen text-center m-5">
          Fetching bounty details...
        </h1>
      ) : (
        <>
          <div className="flex flex-row items-center gap-4">
            <img
              src={Bounty.imageBase64}
              alt=""
              height={20}
              className="h-[50px]"
            />{" "}
            <h1 className="cal-font text-[40px]">{Bounty.title}</h1>
          </div>
          <div className="max-w-[50vw] mt-4">
            <ReactMarkdown
              remarkPlugins={[gfm]}
              components={{
                h1({ node, inline, className, children, ...props }: any) {
                  return (
                    <h1
                      className={"text-[40px] font-semibold cal-font" + className}
                      {...props}
                    >
                      {children}
                    </h1>
                  );
                },
                h2({ node, inline, className, children, ...props }: any) {
                  return (
                    <h1
                      className={"text-[30px] font-semibold cal-font" + className}
                      {...props}
                    >
                      {children}
                    </h1>
                  );
                },
                h3({ node, inline, className, children, ...props }: any) {
                  return (
                    <h1
                      className={"text-[25px] font-semibold cal-font" + className}
                      {...props}
                    >
                      {children}
                    </h1>
                  );
                },
                h4({ node, inline, className, children, ...props }: any) {
                  return (
                    <h1
                      className={"text-[20px] font-semibold cal-font" + className}
                      {...props}
                    >
                      {children}
                    </h1>
                  );
                },
              }}
            >
              {Bounty.descriptionMarkdown}
            </ReactMarkdown>
          </div>
        </>
      )}
    </div>
  );
}

export default Bounty;
