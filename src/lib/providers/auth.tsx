import { Accessor, createContext, ParentProps } from "solid-js";
import { createStore } from "solid-js/store";
import { UserRecord } from "~/types/user";
import { useSurreal } from "./surrealdb";

interface AuthProviderState {
	user: Accessor<UserRecord | undefined>;
	login: (email: string, password: string) => Promise<void>;
	register: (data: Omit<UserRecord, "id">) => Promise<void>;
	logout: () => Promise<void>;
}

interface AuthProviderStore {
	user: UserRecord | undefined;
}

const AuthContext = createContext<AuthProviderState>();

function AuthProvider(props: ParentProps) {

	const { client } = useSurreal();

	const [store, setStore] = createStore<AuthProviderStore>({
		user: undefined
	});

	const login = async (email: string, password: string) => {
		
		

	};

	const register = async (data: Omit<UserRecord, "id">) => {

	};

	const logout = async () => {

	};

	const providerValue: AuthProviderState = {
		user: () => store.user,
		login,
		register,
		logout
	};

	return (
		<AuthContext.Provider value={providerValue}>
			{props.children}
		</AuthContext.Provider>
	);
}