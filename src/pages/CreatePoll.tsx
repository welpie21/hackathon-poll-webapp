import { createSignal, type Component } from 'solid-js';
import { Button } from '~/components/ui/button';
import { TextField, TextFieldInput, TextFieldLabel } from '~/components/ui/text-field';
import { showToast } from '~/components/ui/toast';
import { useSurreal } from '~/lib/providers/surrealdb';
import { createPoll } from '~/lib/repositories/poll';

const CreatePoll: Component = () => {

	const { client } = useSurreal();
	const [title, setTitle] = createSignal<string>("");

	const createPollMutation = async () => {
		const db = client();
		await createPoll(db, { title: title() });

		showToast({
			title: "Poll Created",
			description: "Your poll has been created successfully.",
		});
	};

	return (
		<div class="container mx-auto p-4">
			<h1 class="text-2xl font-bold mb-4">Create New Poll</h1>
			{/* Add poll creation form here */}
			<TextField>
				<TextFieldLabel>Title</TextFieldLabel>
				<TextFieldInput value={title()} onChange={(e) => setTitle(e.target.value)} />
			</TextField>
			<Button onClick={createPollMutation}>Create Poll</Button>
		</div>
	);
};

export default CreatePoll;