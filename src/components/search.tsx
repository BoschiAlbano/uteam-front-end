import { useState, useRef, useEffect, useMemo } from "react";
import SearchSVG from "./svg/search";
import { debounce } from "ts-debounce";
import Spinner from "./svg/spinner.svg";
import { searchCharacter } from "../service/marvel.api";
import { CreateCharacter } from "../schemas/characters";
import DialogSearch from "./dialog";

export default function Search() {
	const [loading, setLoading] = useState<boolean>(false);
	const [data, setData] = useState<CreateCharacter[]>([]);
	const [inputValue, setInputValue] = useState<string>("");
	const inputRef = useRef<HTMLInputElement>(null);
	const abortControllerRef = useRef<AbortController | null>(null);

	const debouncedSearch = useMemo(() => {
		return debounce(async (buscar: string) => {
			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
			}

			abortControllerRef.current = new AbortController();
			await search(buscar, abortControllerRef.current.signal);
		}, 800);
	}, []);

	async function search(buscar: string, signal?: AbortSignal) {
		if (!buscar.trim()) {
			setData([]);
			return;
		}

		setLoading(true);
		try {
			const res = await searchCharacter(buscar, signal);
			setData(res);
		} catch (error) {
			//@ts-ignore
			if (error.name !== "AbortError") {
				console.error(error);
			}
		} finally {
			setLoading(false);
		}
	}

	const handleItemSelected = () => {
		setInputValue("");
		setData([]);
		debouncedSearch.cancel();
		inputRef.current?.focus();
	};

	useEffect(() => {
		return () => {
			debouncedSearch.cancel();
			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
			}
		};
	}, [debouncedSearch]);

	return (
		<section>
			<div className="z-50 bg-white shadow-2xl shadow-white flex justify-center items-center border-2 border-gray-300 rounded-lg p-2 relative">
				<input
					ref={inputRef}
					value={inputValue}
					onChange={(e) => {
						setInputValue(e.target.value);
						debouncedSearch(e.target.value);
					}}
					type="text"
					autoFocus
					placeholder="Search Character..."
					className="outline-0 sm:min-w-[350px] w-[300px]"
				/>

				<button type="submit">
					{loading ? <Spinner /> : <SearchSVG className="h-[20px] w-[20px]" />}
				</button>

				{data.length > 0 && (
					<section className=" absolute rounded-lg w-[100%] max-h-[300px] top-0 left-0 overflow-y-auto translate-y-[50px] flex flex-col gap-2 bg-white p-2">
						{data.map((item) => (
							<section
								key={item.id}
								className="flex flex-row hover:bg-gray-200 p-1 cursor-pointer justify-center items-center rounded-2xl bg-[#ffff]"
							>
								<DialogSearch
									data={item}
									operation={{ type: "insert" }}
									onItemSelected={handleItemSelected}
								/>
							</section>
						))}
					</section>
				)}
			</div>
		</section>
	);
}
