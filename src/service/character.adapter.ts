import { CreateCharacter } from "../schemas/characters";

export function adapterCharacter(datos: any): Promise<CreateCharacter[]> {
	return datos.map(
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
}
