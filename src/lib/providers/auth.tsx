import { Accessor, createContext, onMount, ParentProps, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { UserRecord } from "~/types/user";
import { useSurreal } from "./surrealdb";
import Surreal from "surrealdb";

interface AuthProviderState {
	user: Accessor<UserRecord | undefined>;
	login: (email: string, password: string) => Promise<void>;
	register: (data: Omit<UserRecord, "id">) => Promise<void>;
	logout: () => Promise<void>;
}

interface AuthProviderStore {
	user: UserRecord | undefined;
	status: "idle" | "signing-in" | "signing-up" | "signing-out" | "signed-in" | "signed-up" | "signed-out";
}

const AuthContext = createContext<AuthProviderState>();

export function AuthProvider(props: ParentProps) {

	const {
		client,
		close,
		connect
	} = useSurreal();

	const [store, setStore] = createStore<AuthProviderStore>({
		user: undefined,
		status: "idle"
	});

	const setUserDetails = async (db: Surreal) => {
		const user = await db.info();

		if (user) {
			setStore("user", user as unknown as UserRecord);
			setStore("status", "signed-up");
		} else {
			setStore("status", "signed-out");
		}
	};

	onMount(async () => {
		const db = client();
		await db.ready;
		
		const token = localStorage.getItem("token");

		if (!token) {
			setStore("status", "signed-out");
			return;
		}
		
		await db.ready;
		const authenticated = await db.authenticate(token)
			.catch(() => false);

		if (!authenticated) {
			setStore("status", "signed-out");
			return;
		}

		setUserDetails(db);
	});

	const login = async (email: string, password: string) => {
		const db = client();

		setStore("status", "signing-in");

		const token = await db.signin({
			access: "user",
			namespace: "surrealdb",
			database: "pollwebapp",
			variables: {
				email,
				pass: password
			}
		});

		
		localStorage.setItem("token", token);
		setUserDetails(db);
	};

	const register = async (data: Omit<UserRecord, "id">) => {
		const db = client();

		setStore("status", "signing-up");

		await db.signup({
			access: "user",
			namespace: "surrealdb",
			database: "pollwebapp",
			variables: data
		});

		setStore("status", "signed-up");
	};

	const logout = async () => {

		setStore("status", "signing-out");

		await close();
		await connect();

		localStorage.removeItem("token");
		
		setStore("user", undefined);
		setStore("status", "signed-out");
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

export function useAuth(): AuthProviderState {
	const ctx = useContext(AuthContext);

	if (!ctx) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return ctx;
}