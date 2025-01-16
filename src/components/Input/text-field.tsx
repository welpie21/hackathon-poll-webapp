import { Show, splitProps } from "solid-js";
import { TextField, TextFieldInput, TextFieldInputProps, TextFieldLabel } from "../ui/text-field";

interface TextInputProps {
	class?: string;
	value: string;
	label?: string;
	placeholder?: string;
	onChange: (value: string) => void;
	type?: TextFieldInputProps<"input">["type"]
}

export function TextInput(props: TextInputProps) {

	const [root, local, input] = splitProps(
		props, 
		["value", "onChange", "class"], 
		["label"], 
		["type", "placeholder"]
	);

	return (
		<TextField {...root}>
			<Show when={local.label}>
				{(label) => (
					<TextFieldLabel>
						{label()}
					</TextFieldLabel>
				)}
			</Show>
			<TextFieldInput
				{...input}
				type={input.type ?? "text"}
			/>
		</TextField>
	);
}