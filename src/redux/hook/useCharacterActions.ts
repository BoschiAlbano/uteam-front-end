import { CreateCharacter } from "../../schemas/characters";
import {
	updateCharacter,
	deleteCharacterById,
	createNewCharacter,
} from "../store/slices/characters";

import { useAppDispatch } from "./useStore";

export const useCharacterActions = () => {
	const dispatch = useAppDispatch();

	const removeCharacter = (id: number) => {
		dispatch(deleteCharacterById(id));
	};

	const addNewUser = (character: CreateCharacter) => {
		dispatch(createNewCharacter(character));
	};

	const modifyCharacter = (character: CreateCharacter) => {
		dispatch(updateCharacter(character));
	};

	return { removeCharacter, addNewUser, modifyCharacter };
};
