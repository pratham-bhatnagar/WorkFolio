import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function removeIpfsPrefix(input: string): string {
  const ipfsPrefix = 'ipfs://';
  
  if (input.startsWith(ipfsPrefix)) {
      return input.slice(ipfsPrefix.length);
  } else {
      // String doesn't start with 'ipfs://', return it unchanged
      return input;
  }
}
