import { JSX } from "solid-js";
import { cn } from "~/lib/utils";

export function Spacer(props: Omit<JSX.HTMLAttributes<HTMLDivElement>, "children">) {
	return (
		<div class={cn("flex-grow", props.class)} />
	);
}