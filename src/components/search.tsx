import React, { useEffect, useState } from "react";
import SearchSVG from "./svg/search";
import { debounce } from "ts-debounce";
import Spinner from "./svg/spinner.svg";
import { searchCharacter } from "../service/marvel.api";
import { CreateCharacter } from "../schemas/characters";
import Eye from "./svg/eye.svg";

export default function Search() {
	const [text, setText] = useState<string>("");

	const [loading, setLoading] = useState<boolean>(false);

	const [data, setdata] = useState<CreateCharacter[]>([]);

	const handleDebounce = debounce((buscar: string) => {
		setText(buscar);
	}, 800);

	useEffect(() => {
		async function search() {
			setLoading(true);
			try {
				// Buscar en api
				const res = await searchCharacter(text);
				setdata(res);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}

		if (text.length !== 0) {
			search();
			return;
		}

		setdata([]);
	}, [text]);

	return (
		<form>
			<div className="flex justify-center items-center border-2 border-gray-300 rounded-lg p-2 relative">
				<input
					onChange={(e) => handleDebounce(e.target.value)}
					type="text"
					placeholder="Search Character..."
					className="outline-0"
				/>

				<button type="submit">
					{loading ? <Spinner /> : <SearchSVG className=" h-[20px] w-[20px]" />}
				</button>

				{data && (
					<section className=" absolute w-[100%] h-[300px] top-0 left-0 overflow-y-auto translate-y-[50px]">
						{data.map((item) => {
							return (
								<section
									key={item.id}
									className="flex flex-row hover:bg-gray-200 p-1 cursor-pointer"
								>
									<h1 className="p-2 font-semibold truncate w-full text-start ">
										{item.name}
									</h1>
									<Eye className="w-[20px]" />
								</section>
							);
						})}
					</section>
				)}
			</div>
		</form>
	);
}
