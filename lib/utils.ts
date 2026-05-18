import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatUSDCE(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function shortenAddress(addr: string, n = 4): string {
  if (addr.length <= n * 2 + 2) return addr;
  return `${addr.slice(0, n + 2)}...${addr.slice(-n)}`;
}
