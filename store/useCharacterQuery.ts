import { create } from "zustand";

interface Query {
    query: string;
    setQuery: (query: string) => void;
}

export const useCharacterQuery = create<Query>((set) => ({
    query: "",
    setQuery: (query) => set({ query }),
}));




