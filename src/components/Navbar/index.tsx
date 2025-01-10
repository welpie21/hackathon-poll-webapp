import { useSurreal } from "~/lib/providers/surrealdb";
import { NavbarAvatar } from "./avatar";

export function Navbar() {

	const { client } = useSurreal();

	return (
		<header class="p-4 flex shadow-md">
			<NavbarAvatar />
		</header>
	)
}