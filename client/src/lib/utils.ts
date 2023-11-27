import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import supabase from "../services/supabase";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function removeIpfsPrefix(input: string): string {
  const ipfsPrefix = "ipfs://";

  if (input.startsWith(ipfsPrefix)) {
    return input.slice(ipfsPrefix.length);
  } else {
    // String doesn't start with 'ipfs://', return it unchanged
    return input;
  }
}

export const onBoardUser = async (address: any, UP: any) => {
  const { data, error } = await supabase
    .from("OnboardedUsers")
    .upsert({ address, UP: JSON.stringify(UP) })
    .select();
  console.log(data, error);
};

export const getOnboardedUsers = async () => {
  const { data, error } = await supabase.from("OnboardedUsers").select("*");

  console.log(data, error);
  return data;
};

export const getBounties = async (id: any) => {
  const { data, error } = await supabase
    .from("Bounties")
    .select("*")
    .eq("id", id);
  console.log({ error, data });
  return data;
};
