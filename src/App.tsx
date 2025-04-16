import "./App.css";
import List from "./components/list";
import Search from "./components/search";

function App() {
	return (
		<section className=" w-full min-h-screen flex flex-col items-center justify-start gap-5">
			{/* search */}
			<Search />

			<List />
		</section>
	);
}

export default App;
