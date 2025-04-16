import { Provider } from "react-redux";
import "./App.css";
import List from "./components/list";
import Search from "./components/search";
import { store } from "./redux/store/store";

function App() {
	return (
		<Provider store={store}>
			<section className=" w-full flex flex-col items-center justify-start gap-5">
				<Search />
				<List />
			</section>
		</Provider>
	);
}

export default App;
