import { create } from "zustand";

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;

}

interface CharacterStore {
  selectedCharacters: Character[];
  addCharacter: (character: Character) => void;
  removeCharacter: (characterId: number) => void;
  favorites: Character[];
  addFavorite: (character: Character) => void;
  removeFavorite: (characterId: number) => void;
}

export const useCharacterStore = create<CharacterStore>((set) => ({
  selectedCharacters: [],
  addCharacter: (character) =>
    set((state) => ({
      selectedCharacters: [...state.selectedCharacters, character],
    })),
  removeCharacter: (characterId) =>
    set((state) => ({
      selectedCharacters: state.selectedCharacters.filter(
        (character) => character.id !== characterId
      ),
    })),
  favorites: [],
  addFavorite: (character) =>
    set((state) => ({
      favorites: [...state.favorites, character],
    })),
  removeFavorite: (characterId) =>
    set((state) => ({
      favorites: state.favorites.filter(
        (character) => character.id !== characterId
      ),
    })),
}));
