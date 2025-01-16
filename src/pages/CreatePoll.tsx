import { useNavigate } from '@solidjs/router';
import { Index, type Component } from 'solid-js';
import { createStore } from 'solid-js/store';
import { SubmitButton } from '~/components/Button/submit-button';
import { PollOptionInput } from '~/components/Input/poll-field-input';
import { Switch } from '~/components/Input/switch';
import { TextInput } from '~/components/Input/text-field';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { showToast } from '~/components/ui/toast';
import { useActionAsync } from '~/lib/primitives/use-action';
import { useSurreal } from '~/lib/providers/surrealdb';
import { createPoll } from '~/lib/repositories/poll';
import { sleep } from '~/lib/utils';

interface CreatePollStore {
	title: string;
	questions: string[];
	closesAt?: Date;
}

const CreatePoll: Component = () => {

	const { client } = useSurreal();
	const navigate = useNavigate();

	const [store, setStore] = createStore<CreatePollStore>({
		title: "",
		questions: ["", ""],
		closesAt: undefined
	});

	const createPollMutation = useActionAsync(async () => {
		const db = client();

		const poll = await createPoll(db, store);
		await sleep(1000);

		showToast({
			title: "Poll Created",
			description: "Your poll has been created successfully.",
		});

		navigate(`/poll/${poll.id}/results`);
	});

	const addQuestion = () => {
		setStore("questions", (questions) => [...questions, ""]);
	};

	const updateQuestion = (index: number, value: string) => {
		setStore("questions", index, value);
	};

	const deleteQuestion = (index: number) => {
		setStore("questions", store.questions.filter((_, i) => i !== index));
	};

	const updateTitle = (value: string) => {
		setStore("title", value);
	};

	return (
		<div class="container mx-auto p-4">
			<h1 class="text-5xl font-bold text-center mb-2">Create a Poll</h1>
			<p class="text-center text-gray-400">Complete the below fields to create your poll.</p>
			<Card class="border-t-4 border-t-accent mt-12 max-w-2xl mx-auto">
				<CardContent class='pt-8 flex flex-col gap-y-8'>
					<TextInput
						label='Title'
						placeholder='Type your question here'
						value={store.title}
						onChange={updateTitle}
					/>
					<div>
						<label>Answer options</label>
						<div class='flex flex-col gap-y-3 mt-3'>
							<Index each={store.questions}>
								{(question, index) => (
									<PollOptionInput
										placeholder={`Option ${index + 1}`}
										value={question}
										onChange={updateQuestion}
										onRemove={deleteQuestion}
										index={index}
										hideRemove={store.questions.length <= 1}
									/>
								)}
							</Index>
						</div>
						<Button class='mt-4' variant="outline" onClick={addQuestion}>
							Add option
						</Button>
					</div>
					<div class='flex gap-x-4 items-end'>
						<TextInput
							class="w-full [&>div]:w-full"
							label='Closes at'
							placeholder='Choose a time to close the poll'
							type='datetime-local'
							value={store.closesAt?.toISOString().slice(0, 16) ?? ""}
							onChange={(value) => setStore("closesAt", new Date(value))}
						/>
						<Button title='reset' variant='ghost' onClick={() => setStore("closesAt", undefined)}>
							<span class="mdi mdi-refresh"></span>
						</Button>
					</div>
					<Switch label="Public poll" />
					<SubmitButton
						variant="accent"
						submitting={createPollMutation.loading()}
						onClick={createPollMutation}
						disabled={store.title.length === 0 || store.questions.some(q => q.length === 0)}
					>
						Create Poll
					</SubmitButton>
				</CardContent>
			</Card>
		</div>
	);
};

export default CreatePoll;