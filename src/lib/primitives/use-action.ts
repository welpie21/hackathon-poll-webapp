import { createSignal } from "solid-js";

export function useActionAsync(
	cb: () => Promise<void>
) {
	const [loading, setLoading] = createSignal(false);
	const [error, setError] = createSignal<Error | null>(null);

	const action = async () => {
		setLoading(true);
		setError(null);

		try {
			await cb();
		} catch (e) {
			setError(e as Error);
		} finally {
			setLoading(false);
		}
	};

	action.loading = loading;
	action.error = error;

	return action;
}