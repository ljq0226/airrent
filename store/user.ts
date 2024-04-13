import { create } from "zustand";

interface UserStore {
  user: any;
  setUser: (user: any) => void;
}

const userStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
export default userStore
