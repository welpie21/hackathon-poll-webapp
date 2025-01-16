import { RouteSectionProps } from "@solidjs/router";
import { Navbar } from "../Navbar";
import { useAuth } from "~/lib/providers/auth";

export function AppLayout(props: RouteSectionProps) {

	return (
		<>
			<Navbar />
			<div class="pt-28 container">
				{props.children}
			</div>
		</>
	);
}