import { z } from "zod";

export const CharacterSchema = z.object({
	id: z.number(),
	name: z.string().min(1, { message: "Name is required" }),
	description: z.string().min(1, { message: "Description is required" }),
	thumbnail: z.string().url(),
});

export const TextSchema = z.object({
	text: z.string().min(1, { message: "Text is required" }),
});

export type SearchText = z.infer<typeof CharacterSchema>;

export type CreateCharacter = z.infer<typeof CharacterSchema>;

export interface Operation {
	type: "update" | "insert";
}
