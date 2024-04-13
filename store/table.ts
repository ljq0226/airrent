import { create } from "zustand";

interface TableState {
  listingTableRefresh:boolean
  setListingTableRefresh: (value: boolean) => void;
  updateListingData:any
  setUpdateListingData: (value: any) => void; 

}
const TableStore = create<TableState>((set) => ({
  listingTableRefresh:false,
  setListingTableRefresh: (value) => set({ listingTableRefresh: value }),
  updateListingData:{},
  setUpdateListingData: (value) => set({ updateListingData: value }),
}));
export default TableStore
