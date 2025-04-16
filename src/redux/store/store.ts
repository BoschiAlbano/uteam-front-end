import { configureStore, Middleware } from "@reduxjs/toolkit";
import CharacterReducer from "../store/slices/characters";

const persistedLocalStorage: Middleware = (store) => (next) => (action) => {
	next(action);
	localStorage.setItem("___Redux__State___", JSON.stringify(store.getState()));
};

export const store = configureStore({
	reducer: {
		characters: CharacterReducer,
	},
	//@ts-ignore
	middleware: () => [persistedLocalStorage],
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
