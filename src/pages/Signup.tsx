import { useNavigate } from "@solidjs/router";
import { createSignal, JSX } from "solid-js";
import { SubmitButton } from "~/components/Button/submit-button";
import { TextInput } from "~/components/Input/text-field";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { TextField, TextFieldInput, TextFieldLabel } from "~/components/ui/text-field";
import { useActionAsync } from "~/lib/primitives/use-action";
import { useAuth } from "~/lib/providers/auth";

export function Signup(): JSX.Element {

	const navigate = useNavigate();
	const { register } = useAuth();

	const [name, setName] = createSignal("");
	const [email, setEmail] = createSignal("");
	const [password, setPassword] = createSignal("");
	const [confirmPassword, setConfirmPassword] = createSignal("");
	const [error, setError] = createSignal<string>();

	const handleSubmit = useActionAsync(async () => {

		if(password() !== confirmPassword()) {
			setError("Passwords do not match");
			return;
		}

		await register({ 
			name: name(),
			email: email(),
			pass: password(),
		});

		navigate("/signin");
	});

	return (
		<Card class="max-w-lg mx-auto mt-24 border-t-4 border-t-accent">
			<CardHeader class="text-center mb-8">
				<CardTitle class="text-2xl">
					Signup for an account
				</CardTitle>
				<CardDescription>
					Enter your email and password to create an account
				</CardDescription>
			</CardHeader>
			<CardContent class="flex flex-col gap-y-8">
				<TextInput 
					label="Name"
					value={name()}
					onChange={setName}
				/>
				<TextInput 
					label="Email"
					value={email()}
					onChange={setEmail}
				/>
				<TextInput
					label="Password"
					value={password()}
					type="password"
					onChange={setPassword}
				/>
				<TextInput
					label="Confirm Password"
					value={confirmPassword()}
					type="password"
					onChange={setConfirmPassword}
				/>
				<SubmitButton 
					submitting={handleSubmit.loading()} 
					variant="accent" 
					onClick={handleSubmit}
				>
					Signup
				</SubmitButton>
			</CardContent>
		</Card>
	);
}