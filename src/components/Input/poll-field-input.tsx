import { Accessor, Show, splitProps } from "solid-js";
import { TextField, TextFieldInput, TextFieldLabel } from "../ui/text-field";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";

interface TextInputProps {
	class?: string;
	value: Accessor<string>;
	label?: string;
	placeholder?: string;
	index: number;
	type?: "text" | "email" | "password";
	hideRemove?: boolean;
	onChange: (index: number, value: string) => void;
	onRemove: (index: number) => void;
}

export function PollOptionInput(props: TextInputProps) {

	return (
		<TextField
			class={cn("relative", props.class)}
		>
			<Show when={props.label}>
				{(label) => (
					<TextFieldLabel>
						{label()}
					</TextFieldLabel>
				)}
			</Show>
			<TextFieldInput
				type={props.type ?? "text"}
				value={props.value()}
				onInput={(event) => props.onChange(props.index, event.currentTarget.value)}
				placeholder={props.placeholder}
			/>
			<div class={cn("absolute right-0 top-0 p-1", props.hideRemove && "hidden")}>
				<Button class="size-8 p-2.5" variant="ghost" onClick={() => props.onRemove(props.index)}>
					<span class="mdi mdi-close"></span>
				</Button>
			</div>
		</TextField>
	);
}