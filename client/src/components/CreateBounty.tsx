import React, { useState } from "react";
import MDEditor, { selectWord } from "@uiw/react-md-editor";
import { Card } from "./ui/Card";
import Button from "./Button";
import toast from "react-hot-toast";
import supabase from "../services/supabase";
import { CreateBounty } from "../lib/lukso";

function CreateBountyModal(props: any) {
  const [value, setValue] = React.useState<string>();
  const [title, setTitle] = useState<string>();
  const [prize, setPrize] = useState<number>(0);
  const [Base64Image, setBase64Image] = useState<string | undefined>();

  const submitHandler = async (wallet: any) => {
    console.log("yes");
    if (!title || !value || !Base64Image || !prize) {
      console.log("error incomplete fileds");
      toast.error("Please fill all fields to create bounty");
    }
    const bounty_data = {
      title,
      prize,
      //todo use account address
      creator: "0x01cAbA23321325b4AdC62b37194cB3d367d8D5b5",
      applicants: [],
      descriptionMarkdown: value,
      submissions: [],
      winner: null,
      imageBase64: Base64Image,
    };
    const { data, error } = await supabase
      .from("Bounties")
      .insert([{ ...bounty_data }]);
    if (error) {
      console.log("Error creating event", error);
      toast.error("Something went wrong!");
    }
    CreateBounty(wallet, title!, title!);
    toast.success("Bounty Created!");
    props?.closeModal();
  };
  return (
    <Card className="bg-[#1c1c1c] border w-[80vw] border-gray-600 rounded-xl p-4 py-6">
      <form className="container">
        <div className="grid gap-6 mb-6 ">
          <h1 className="text-[#EDEDED] text-2xl ">Create Bounty</h1>
          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-lg font-medium  pl-2 text-white"
            >
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              id="title"
              className="bg-neutral-800 border border-gray-600 text-white text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Bounty Title"
              required
            />
          </div>
          <div data-color-mode="light">
            <label
              htmlFor="description"
              className="block mb-2 text-lg font-medium  pl-2 text-white"
            >
              Bounty Description
            </label>
            <MDEditor
              height={500}
              value={value}
              onChange={(e) => setValue(e)}
            />
          </div>
          <div className="">
            <label
              className="block mb-2 text-lg font-medium  pl-2 text-white"
              htmlFor="file_input"
            >
              Add Product logo
            </label>
            <input
              className="block w-full text-sm bg-neutral-800 border border-gray-600 text-white rounded-lg cursor-pointer p-2.5  dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              accept=""
              onChange={(e) => {
                //@ts-ignore
                const b_file = e?.target?.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(b_file);
                reader.onloadend = () => {
                  //@ts-ignore
                  setBase64Image(reader?.result);
                };
              }}
              type="file"
            />
          </div>
        </div>
        <div className="w-full">
          <label
            htmlFor="title"
            className="block mb-2 text-lg font-medium  pl-2 text-white"
          >
            Bounty Amount (in LYX)
          </label>
          <div className="flex w-full">
            <input
              value={title}
              onChange={(e) => setPrize(parseInt(e.target.value))}
              type="number"
              id="title"
              className="bg-neutral-800 border rounded-r-none border-r-0 border-gray-600 text-white text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="2"
              required
            />

            <Button
              type="button"
              mode="green"
              className="rounded-l-none"
              onClick={() => submitHandler(props.wallet)}
            >
              <div className="flex flex-row gap-[10px] items-center ">
                <p className="text-brandGrey font-semibold ">Mint Bounty</p>
              </div>
            </Button>
          </div>
        </div>
      </form>{" "}
    </Card>
  );
}

export default CreateBountyModal;
