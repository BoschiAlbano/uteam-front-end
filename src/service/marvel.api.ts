import CryptoJS from "crypto-js";
import { CreateCharacter } from "../schemas/characters";

const BASE_URL = import.meta.env.VITE_MARVEL_API;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;
const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY;

const ts = Date.now().toString(); // timestamp

// Generate hash using ts, private key, and public key
const generateHash = () => {
	return CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
};

// buscar personaje por nombre
export const searchCharacter = async (
	name: string
): Promise<CreateCharacter[]> => {
	const hash = generateHash();
	const url = `${BASE_URL}/characters?nameStartsWith=${name}&ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;
	const response = await fetch(url);
	const data = await response.json();

	// mapear los resultados

	return data.data.results.map(
		(
			character: CreateCharacter & {
				thumbnail: { path: string; extension: string };
			}
		) => {
			return {
				id: character.id,
				name: character.name,
				description: character.description,
				thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,
			};
		}
	);
};
