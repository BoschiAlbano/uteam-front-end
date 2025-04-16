import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { CharacterSchema, CreateCharacter } from "../schemas/characters";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Spinner from "./svg/spinner.svg";
import Add from "./svg/add.svg";

export default function DialogSearch({ data }: { data: CreateCharacter }) {
	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);

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
		setTimeout(() => {
			toast.success("Guaradar en redux: " + data);

			reset();
			setLoading(false);
			setIsOpen(false);
		}, 2000);
	};

	return (
		<Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
			<Dialog.Trigger asChild>
				<div className="w-full flex flex-row hover:bg-gray-200 p-1 cursor-pointer justify-center items-center">
					<h1 className="p-2 font-semibold truncate w-full text-start ">
						{data.name}
					</h1>
					<div className="w-[15px] h-full flex justify-center items-center">
						<Add className="w-[15px] h-[15px]" />
					</div>
				</div>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
				<Dialog.Content className="z-[99] bg-white border-2 fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray1 p-[25px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow">
					<Dialog.Title className="m-0 text-[17px] font-medium text-mauve12">
						Edit link
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
							<input
								type="text"
								id="descripcion"
								className="border-gray-300 border-2 rounded-md p-2 w-full"
								placeholder="descripcion"
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
								className=" bg-gray-400 rounded-xl font-semibold px-2 py-1 text-black cursor-pointer"
								onClick={() => setIsOpen(false)}
							>
								Cancel
							</button>

							<button className=" bg-gray-400 rounded-xl font-semibold px-2 py-1 text-black cursor-pointer flex flex-row justify-center  items-center gap-2">
								Update
								{loading && <Spinner />}
							</button>
						</div>
					</form>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
