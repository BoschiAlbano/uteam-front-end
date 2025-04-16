import { useEffect, useState } from "react";
import SearchSVG from "./svg/search";
import { debounce } from "ts-debounce";
import Spinner from "./svg/spinner.svg";
import { searchCharacter } from "../service/marvel.api";
import { CreateCharacter } from "../schemas/characters";
import DialogSearch from "./dialog";

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
			<div className="z-50 flex justify-center items-center border-2 border-gray-300 rounded-lg p-2 relative">
				<input
					onChange={(e) => handleDebounce(e.target.value)}
					type="text"
					placeholder="Search Character..."
					className="outline-0"
				/>

				<button type="submit">
					{loading ? <Spinner /> : <SearchSVG className=" h-[20px] w-[20px]" />}
				</button>

				{data.length !== 0 && (
					<section className=" bg-white absolute w-[100%] max-h-[300px] top-0 left-0 overflow-y-auto translate-y-[50px]">
						{data.map((item) => {
							return (
								<section
									key={item.id}
									className=" flex flex-row hover:bg-gray-200 p-1 cursor-pointer justify-center items-center"
								>
									<DialogSearch data={item} />
								</section>
							);
						})}
					</section>
				)}
			</div>
		</form>
	);
}
