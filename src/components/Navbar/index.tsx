import { useSurreal } from "~/lib/providers/surrealdb";
import { NavbarAvatar } from "./avatar";
import { A } from "@solidjs/router";
import { Spacer } from "../ui/spacer";
import { useAuth } from "~/lib/providers/auth";
import { Button, buttonVariants } from "../ui/button";
import { Show } from "solid-js";

export function Navbar() {

	const { } = useSurreal();
	const { user, logout } = useAuth();

	return (
		<header class="px-8 py-6 bg-navbar border-b border-border">
			<div class="container flex gap-x-12 items-center bg-navbar">
				<A href="/">
					<h1 class="text-2xl">Surreal Poll</h1>
				</A>
				<nav class="flex items-center gap-x-4 flex-1">
					<A href="/create">Create Poll</A>
					<Spacer />
					<Show
						when={user()}
						fallback={
							<>
								<A href="/signin">Login</A>
								<A class={buttonVariants({ variant: "accent" })} href="/signup">
									Signup
								</A>
							</>
						}
					>
						<Button variant="accent" onClick={logout}>
							Signout
						</Button>
					</Show>
				</nav>
			</div>
		</header>
	);
}