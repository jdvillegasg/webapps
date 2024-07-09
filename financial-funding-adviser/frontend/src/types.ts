import { z } from "zod";

export type CustomChangeEvent = React.ChangeEvent<HTMLInputElement>;

type Dataset = {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
  borderWidth: number;
};

export type BarPlotOpts = {
  labels: string[];
  datasets: Dataset[];
};

export type Fund = {
  name: string;
  maxdebt: number;
  interestrate: number;
};

export type OptAdvise = {
  fundingsource: string;
  optval: number;
};

export type Store = {
  fundingsource: Fund[];
  advise: OptAdvise[];
  addFund: (newFund: Fund) => void;
  setAdvise: (advise: OptAdvise[]) => void;
  deleteFund: (sourcename: string) => void;
};

export type PostSchema = {
  valuetopay: number;
  funding: Fund[];
};

export const fundingSchema = z.object({
  fundingname: z
    .string()
    .min(3, { message: "Title must have at least 3 characters" })
    .max(100, { message: "Title can't have more than 100 characters" }),
  amount: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Should be positive numbers" }), // Positive numbers
  interestrate: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Should be positive numbers" }), // Positive numbers
  valuetopay: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Should be positive numbers" }), // Positive numbers
});
