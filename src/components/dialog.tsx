import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import {
	CharacterSchema,
	CreateCharacter,
	Operation,
} from "../schemas/characters";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Spinner from "./svg/spinner.svg";
import Add from "./svg/add.svg";
import { useCharacterActions } from "../redux/hook/useCharacterActions";
import Update from "./svg/update.svg";

export default function DialogSearch({
	data,
	operation,
	onItemSelected,
}: {
	data: CreateCharacter;
	operation: Operation;
	onItemSelected: () => void;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const { addNewUser, modifyCharacter } = useCharacterActions();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<CreateCharacter>({
		resolver: zodResolver(CharacterSchema),
		values: {
			...data,
		},
	});

	const Submit = async (data: CreateCharacter) => {
		setLoading(true);

		if (operation.type === "insert") {
			addNewUser(data);
		} else {
			modifyCharacter(data);
		}
		reset();
		setLoading(false);
		setIsOpen(false);
		onItemSelected();
	};

	return (
		<Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
			<Dialog.Trigger asChild>
				{operation.type === "insert" ? (
					<div className="w-full flex flex-row hover:bg-gray-200 p-1 cursor-pointer justify-center items-center">
						<h1 className="p-2 font-semibold truncate w-full text-start ">
							{data.name}
						</h1>
						<div className="w-[15px] h-full flex justify-center items-center">
							<Add className="w-[15px] h-[15px]" />
						</div>
					</div>
				) : (
					<Update className="w-[25px] h-[25px] cursor-pointer" />
				)}
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
				<Dialog.Content className="z-[99] bg-white border-gray-300 border-2 fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray1 p-[25px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow">
					<Dialog.Title className="m-0 pb-5 text-[17px] font-medium text-mauve12">
						{operation.type === "insert"
							? "Crear un nuevo personaje"
							: "Actualizar un personaje"}
					</Dialog.Title>

					<form className="" onSubmit={handleSubmit(Submit)}>
						<div>
							<label className="text-gray-500 text-sm font-semibold">id</label>
							<input
								type="text"
								id="id"
								className="border-gray-300 border-2 rounded-md p-2 w-full"
								placeholder="id"
								disabled
								{...register("id")}
							/>

							{errors.id && (
								<span className="text-red-500 text-sm">
									{errors.id.message}
								</span>
							)}
						</div>

						<div>
							<label
								htmlFor="name"
								className="text-gray-500 text-sm font-semibold"
							>
								name
							</label>
							<input
								type="text"
								id="name"
								className="border-gray-300 border-2 rounded-md p-2 w-full"
								placeholder="Name"
								{...register("name")}
							/>

							{errors.name && (
								<span className="text-red-500 text-sm">
									{errors.name.message}
								</span>
							)}
						</div>

						<div>
							<label
								htmlFor="descripcion"
								className="text-gray-500 text-sm font-semibold"
							>
								descripcion
							</label>
							<textarea
								id="descripcion"
								className="border-gray-300 border-2 rounded-md p-2 w-full"
								placeholder="descripcion"
								rows={5}
								{...register("description")}
							/>

							{errors.description && (
								<span className="text-red-500 text-sm">
									{errors.description.message}
								</span>
							)}
						</div>

						<div>
							<label
								htmlFor="thumbnail"
								className="text-gray-500 text-sm font-semibold"
							>
								Imagen
							</label>

							<input
								type="text"
								id="thumbnail"
								className="border-gray-300 border-2 rounded-md p-2 w-full"
								placeholder="thumbnail"
								{...register("thumbnail")}
							/>

							{errors.thumbnail && (
								<span className="text-red-500 text-sm">
									{errors.thumbnail.message}
								</span>
							)}
						</div>

						<div className=" w-full flex flex-row gap-2 items-center justify-end mt-4">
							<button
								className=" bg-blue-200 rounded-xl font-semibold px-2 py-1 text-black cursor-pointer"
								onClick={() => {
									setIsOpen(false);
								}}
							>
								Cancel
							</button>

							<button className=" bg-blue-400 rounded-xl font-semibold px-2 py-1 text-black cursor-pointer flex flex-row justify-center  items-center gap-2">
								{operation.type === "insert" ? "Crear" : "Actualizar"}
								{loading && <Spinner />}
							</button>
						</div>
					</form>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
