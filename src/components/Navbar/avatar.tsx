import { Avatar, AvatarFallback } from "../ui/avatar";
import { useAuth } from "~/lib/providers/auth";
import { For, Show } from "solid-js";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { A } from "@solidjs/router";

export function NavbarAvatar() {

	// const { client } = useSurreal();
	const { user } = useAuth();

	return (
		<DropdownMenu placement="left-start">
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarFallback>
						{(user()?.name ?? "U").slice(0, 1).toUpperCase()}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent class="w-48">
				<DropdownMenuItem>
					<A class="w-full" href="/signin">Signin</A>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<A class="w-full" href="/signup">Signup</A>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}