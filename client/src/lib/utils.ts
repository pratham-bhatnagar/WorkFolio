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

  const { error: error2 } = await supabase
    .from("OnboardedUsers")
    .update({ UP: JSON.stringify(UP) })
    .eq("address", address);
  console.log(data, error, error2);
};

export const getOnboardedUsers = async () => {
  const { data, error } = await supabase.from("OnboardedUsers").select("*");

  console.log(data, error);
  return data;
};

export const getOnboardedUser = async (address: any) => {
  const { data, error } = await supabase
    .from("OnboardedUsers")
    .select("*")
    .eq("address", address);
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

export const setBountiesForUser = async (boutny: any, address: any) => {
  const { data, error } = await supabase
    .from("OnboardedUsers")
    .select("*")
    .eq("address", address);
  if (data) {
    const { error: error2 } = await supabase
      .from("OnboardedUsers")
      .update({ bounties: [...data, JSON.stringify(boutny)] })
      .eq("address", address);
  }
};

export const setBountyWinner = async (winner: any, id: any) => {
  const { data, error } = await supabase
    .from("Bounties")
    .update({ winner })
    .eq("id", id);
};
