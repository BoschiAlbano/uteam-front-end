import { useCharacterActions } from "../redux/hook/useCharacterActions";
import { useAppSelector } from "../redux/hook/useStore";
import { CreateCharacter } from "../schemas/characters";
import DialogSearch from "./dialog";
import Delete from "./svg/delete.svg";

export default function List() {
	const data = useAppSelector((state) => state.characters);

	return (
		<section id="grilla" className="z-40">
			{data.map((item) => {
				return <Card key={item.id} {...item} />;
			})}
		</section>
	);
}
function Card(item: CreateCharacter) {
	const { removeCharacter } = useCharacterActions();

	return (
		<div className="group bg-white flex flex-col border-1 border-gray-300 rounded-2xl overflow-hidden relative hover:shadow-lg transition-all duration-300">
			<h1 className="absolute top-0 right-0 px-5 text-white font-bold z-10">
				{item.id}
			</h1>

			<div className="relative overflow-hidden">
				<img
					className="object-cover aspect-square group-hover:opacity-50 group-hover:scale-105 transition-all duration-300 w-full"
					src={item.thumbnail}
					alt={item.description}
				/>

				<div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>

				<div className="absolute inset-0 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
					<p className="text-white text-sm md:text-base line-clamp-5 text-center">
						{item.description}
					</p>
				</div>
			</div>

			<div className="flex flex-col justify-center items-center relative w-full h-full bg-white">
				<h1 className="text-xl w-full px-2 font-semibold text-black truncate">
					{item.name}
				</h1>
			</div>

			{/* Botones */}
			<div className="w-full flex flex-row justify-center items-center gap-2 my-2 bg-white">
				<DialogSearch
					onItemSelected={() => {}}
					data={item}
					operation={{ type: "update" }}
				/>

				<button onClick={() => removeCharacter(item.id)}>
					<Delete className="w-[25px] cursor-pointer" />
				</button>
			</div>
		</div>
	);
}
