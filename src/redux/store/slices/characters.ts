import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { CreateCharacter } from "../../../schemas/characters";
import { toast } from "sonner";

const INITIAL_STATE_DEFAULT: CreateCharacter[] = [];

const initialState: CreateCharacter[] = (() => {
	const persistedState = localStorage.getItem("___Redux__State___");
	if (persistedState) return JSON.parse(persistedState)?.characters;

	return INITIAL_STATE_DEFAULT;
})();

export const characterSlice = createSlice({
	name: "characters",
	initialState,
	reducers: {
		deleteCharacterById: (state, action: PayloadAction<number>) => {
			const id = action.payload;
			return state.filter((character) => character.id !== id);
		},
		createNewCharacter: (state, action: PayloadAction<CreateCharacter>) => {
			console.log(JSON.stringify(state));

			const index = state.findIndex((x) => x.id === action.payload.id);
			if (index !== -1) {
				toast.error("Error, the character already exists");
				return;
			}

			toast.success("character add");

			return [...state, { ...action.payload }];
		},
		updateCharacter: (state, action: PayloadAction<CreateCharacter>) => {
			const index = state.findIndex((x) => x.id === action.payload.id);

			if (index === -1) {
				toast.error("Error, character not update.");
			}

			state[index] = action.payload;
		},
	},
});

export default characterSlice.reducer;

export const { createNewCharacter, deleteCharacterById, updateCharacter } =
	characterSlice.actions;
