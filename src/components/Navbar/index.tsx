import { useSurreal } from "~/lib/providers/surrealdb";
import { NavbarAvatar } from "./avatar";

export function Navbar() {

	const { client } = useSurreal();

	return (
		<header>
			<NavbarAvatar />
		</header>
	)
}