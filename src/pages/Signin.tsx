import { useNavigate } from "@solidjs/router";
import { createSignal, JSX } from "solid-js";
import { TextInput } from "~/components/Input/text-field";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { TextField, TextFieldInput, TextFieldLabel } from "~/components/ui/text-field";
import { useAuth } from "~/lib/providers/auth";

export function Signin(): JSX.Element {

	const { login } = useAuth();
	const navigate = useNavigate();

	const [email, setEmail] = createSignal("");
	const [password, setPassword] = createSignal("");

	const handleSubmit = async () => {

		try {
			await login(email(), password());
			navigate("/");
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<Card class="max-w-lg mx-auto mt-24 border-t-4 border-t-accent">
			<CardHeader class="text-center mb-8">
				<CardTitle class="text-2xl">
					Signin to your account
				</CardTitle>
				<CardDescription>
					Enter your email and password to signin to your account.
				</CardDescription>
			</CardHeader>
			<CardContent class="flex flex-col gap-y-8">
				<TextInput
					label="Email"
					value={email()}
					onChange={setEmail}
				/>
				<TextField>
					<TextFieldLabel>
						Password
					</TextFieldLabel>
					<TextFieldInput
						value={password()}
						type="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</TextField>
				<Button variant="accent" onClick={handleSubmit}>
					Signin
				</Button>
			</CardContent>
		</Card>
	);
}