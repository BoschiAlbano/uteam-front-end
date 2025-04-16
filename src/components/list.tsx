import { CreateCharacter } from "../schemas/characters";
import Delete from "./svg/delete.svg";
import Update from "./svg/update.svg";

const mock: CreateCharacter[] = [
	{
		id: 1,
		description: "descripcion personaje",
		name: "nombre personaje",
		thumbnail:
			"https://definicion.de/wp-content/uploads/2012/01/imagen-vectorial.png",
	},
	{
		id: 2,
		description: "descripcion personaje",
		name: "nombre personaje",
		thumbnail:
			"https://definicion.de/wp-content/uploads/2012/01/imagen-vectorial.png",
	},
	{
		id: 3,
		description: "descripcion personaje",
		name: "nombre personaje",
		thumbnail:
			"https://definicion.de/wp-content/uploads/2012/01/imagen-vectorial.png",
	},
	{
		id: 1,
		description: "descripcion personaje",
		name: "nombre personaje",
		thumbnail:
			"https://definicion.de/wp-content/uploads/2012/01/imagen-vectorial.png",
	},
	{
		id: 2,
		description: "descripcion personaje",
		name: "nombre personaje",
		thumbnail:
			"https://definicion.de/wp-content/uploads/2012/01/imagen-vectorial.png",
	},
	{
		id: 3,
		description: "descripcion personaje",
		name: "nombre personaje",
		thumbnail:
			"https://definicion.de/wp-content/uploads/2012/01/imagen-vectorial.png",
	},
];

export default function List() {
	return (
		<section id="grilla" className="z-40">
			{mock.map((item) => {
				return <Card key={item.id} {...item} />;
			})}
		</section>
	);
}

function Card(item: CreateCharacter) {
	return (
		<div className=" flex flex-col  border-1 border-black rounded-2xl overflow-hidden p-2 relative">
			<h1 className=" absolute top-0 right-0 px-5">{item.id}</h1>
			<img className="p-10" src={item.thumbnail} alt={item.description} />

			<div className=" flex flex-col justify-center items-center relative w-full h-full">
				<h1 className=" text-xl font-semibold text-black">{item.name}</h1>

				<h1 className="text-lg font-extralight text-black">
					{item.description}
				</h1>
			</div>

			<div className=" w-full flex flex-row justify-center items-center gap-2 mt-4">
				<Update className=" w-[25px] cursor-pointer" />
				<Delete className=" w-[25px] cursor-pointer" />
			</div>
		</div>
	);
}
