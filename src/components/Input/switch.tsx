import { Show, ValidComponent } from "solid-js";
import {
	Switch as SolidSwitch,
	SwitchControl,
	SwitchLabel,
	SwitchThumb
} from "../ui/switch";
import { PolymorphicProps } from "@kobalte/core/polymorphic";
import { SwitchRootProps } from "@kobalte/core/switch";
import { cn } from "~/lib/utils";

type SwitchProps<T extends ValidComponent = "div"> = PolymorphicProps<T, SwitchRootProps<T>> & {
	label: string;
	labelPosition?: "left" | "right";
};

export function Switch(props: SwitchProps) {

	return (
		<SolidSwitch
			{...props}
			class={cn("flex items-center space-x-2", props.class)}
		>
			<Show when={props.labelPosition === "left" || !props.labelPosition}>
				<SwitchLabel>{props.label}</SwitchLabel>
			</Show>
			<SwitchControl>
				<SwitchThumb />
			</SwitchControl>
			<Show when={props.labelPosition === "right"}>
				<SwitchLabel>{props.label}</SwitchLabel>
			</Show>
		</SolidSwitch>
	);
}