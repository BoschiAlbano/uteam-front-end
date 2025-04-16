import CryptoJS from "crypto-js";
import { CreateCharacter } from "../schemas/characters";
import { adapterCharacter } from "./character.adapter";

const BASE_URL = import.meta.env.VITE_MARVEL_API;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;
const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY;

const ts = Date.now().toString();

const generateHash = () => {
	return CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
};

// buscar personaje por nombre
export const searchCharacter = async (
	name: string,
	signal?: AbortSignal
): Promise<CreateCharacter[]> => {
	const hash = generateHash();
	const url = `${BASE_URL}/characters?nameStartsWith=${name}&ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;
	const response = await fetch(url, { signal });
	const data = await response.json();

	return adapterCharacter(data.data.results);
};
