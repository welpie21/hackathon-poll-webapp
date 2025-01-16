import { useContext, createContext, JSX, Accessor, onMount, Show } from "solid-js";
import Surreal from "surrealdb";
import { createStore } from "solid-js/store";

interface SurrealProviderProps {
	children: JSX.Element;
	/** The database endpoint URL */
	endpoint: string;
	/** Optional existing Surreal client */
	client?: Surreal;
	/* Optional connection parameters */
	params?: Parameters<Surreal["connect"]>[1];
	/** Auto connect on component mount, defaults to true */
	autoConnect?: boolean;
}

interface SurrealProviderState {
	/** The Surreal instance */
	client: Accessor<Surreal>;
	/** Whether the connection is pending */
	isConnecting: Accessor<boolean>;
	/** Whether the connection was successfully established */
	isSuccess: Accessor<boolean>;
	/** Connect to the Surreal instance */
	connect: () => Promise<true>;
	/** Close the Surreal instance */
	close: () => Promise<true>;
}

interface SurrealProviderStore {
	instance: Surreal;
	status: "connecting" | "connected" | "disconnected" | undefined;
}

const SurrealContext = createContext<SurrealProviderState>();

export function SurrealProvider(props: SurrealProviderProps) {

	const [store, setStore] = createStore<SurrealProviderStore>({ 
		instance: props.client ?? new Surreal(),
		status: undefined
	});

	onMount(async () => {

		store.instance.emitter.subscribe("connected", () => {
			setStore("status", "connected");
		});

		store.instance.emitter.subscribe("disconnected", () => {
			setStore("status", "disconnected");
		});

		store.instance.emitter.subscribe("connecting", () => {
			setStore("status", "connecting");
		});

		if(props.autoConnect) {
			await store.instance.connect(props.endpoint, props.params);
		}
	});

	const providerValue: SurrealProviderState = {
		client: () => store.instance,
		close: () => store.instance.close(),
		connect: () => store.instance.connect(props.endpoint, props.params),
		isConnecting: () => store.status === "connecting",
		isSuccess: () => store.status === "connected"
	};

	return (
		<SurrealContext.Provider value={providerValue}>
			<Show when={store.status}>
				{props.children}
			</Show>
		</SurrealContext.Provider>
	);
}

export function useSurreal(): SurrealProviderState {
	const context = useContext(SurrealContext);
	
	if(!context) {
		throw new Error("useSurreal must be used within a SurrealProvider");
	}

	return context;
}