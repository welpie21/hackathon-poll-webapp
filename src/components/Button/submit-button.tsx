import { splitProps, ValidComponent } from "solid-js";
import { Button, ButtonProps } from "../ui/button";
import { PolymorphicProps } from "@kobalte/core/polymorphic";
import { cn } from "~/lib/utils";

type SubmitButtonProps<T extends ValidComponent = "button"> = PolymorphicProps<T, ButtonProps<T>> & {
	submitting?: boolean;
};

export function SubmitButton(props: SubmitButtonProps<"button">) {

	const [local, others] = splitProps(props, ["submitting", "children"]);

	return (
		<Button
			type="submit"
			{...others}
			disabled={local.submitting || others.disabled}
			class={cn(
				"relative",
				local.submitting && "opacity-50 cursor-not-allowed", 
				props.class
			)}
		>
			{local.children}
			<span
				class={cn(
					"mdi mdi-loading",
					local.submitting ? "animate-spin" : "hidden",
				)}
			/>
		</Button>
	);
}