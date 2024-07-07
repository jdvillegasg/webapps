import { create } from "zustand";
import { type Fund, type Store, type OptAdvise } from "../types";

export const useStore = create<Store>()((set, get) => ({
  fundingsource: [],
  advise: [],
  addFund: (newFund: Fund) => {
    const { fundingsource } = get();

    const updatedFundingSources = structuredClone(fundingsource);

    updatedFundingSources.push(newFund);

    set({ fundingsource: updatedFundingSources });
  },
  setAdvise: (advise: OptAdvise[]) => {
    set({ advise });
  },
  deleteFund: (sourcename: string) => {
    const { fundingsource } = get();
    const copyFundingSource = structuredClone(fundingsource);

    const updatedFundingSources = copyFundingSource.filter(
      (source) => source.name !== sourcename
    );

    set({ fundingsource: updatedFundingSources });
  },
}));
