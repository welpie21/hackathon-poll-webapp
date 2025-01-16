import { Accessor, createContext, createSignal, ParentProps } from "solid-js";
import { getSystemTheme } from "../utils";

type Theme = "light" | "dark";

interface ThemeProviderProps extends ParentProps {
	/**
	 * The initial theme to use. Defaults to the user's system preference.
	 */
	theme?: Theme;
}

interface ThemeProviderState {
	theme: Accessor<Theme>;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeProviderState>();

export function ThemeProvider(props: ThemeProviderProps) {
	const [theme, setTheme] = createSignal<Theme>(props.theme ?? getSystemTheme());

	const toggleTheme = () => {
		setTheme((prev) => prev === "light" ? "dark" : "light");
	};

	const providerValue = {
		theme,
		toggleTheme
	} satisfies ThemeProviderState;

	return (
		<ThemeContext.Provider value={providerValue}>
			{props.children}
		</ThemeContext.Provider>
	);
}