import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatDate = (date: string) => {
  const newDate = new Date(date);

  return {
    year: newDate.getFullYear(),
    month:
      newDate.getMonth() + 1 > 9
        ? newDate.getMonth() + 1
        : `0${newDate.getMonth() + 1}`,
    day: newDate.getDate() > 9 ? newDate.getDate() : `0${newDate.getDate()}`,
  };
};
