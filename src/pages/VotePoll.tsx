import { createSignal, For, onMount, Show, type Component } from 'solid-js';
import { useParams } from '@solidjs/router';
import { useSurreal } from '~/lib/providers/surrealdb';
import { RecordId } from 'surrealdb';
import { Poll } from '~/types/poll';
import { PollQuestion } from '~/types/pollQuestion';
import { PollQuestionRow } from '~/components/Vote';
import { votePollQuestion } from '~/lib/repositories/pollVote';
import { useAuth } from '~/lib/providers/auth';
import { fetchPoll, isPollValid } from '~/lib/repositories/poll';

const VotePoll: Component = () => {

	const params = useParams();
	const { client } = useSurreal();
	const { user } = useAuth();

	const [poll, setPoll] = createSignal<Omit<Poll, "creator">>();
	const [questions, setQuestions] = createSignal<PollQuestion[]>();

	onMount(async () => {
		const db = client();
		await db.ready;

		const record = new RecordId("poll", params.id);
		const isValid = await isPollValid(db, record);

		if(isValid === false) {
			return;
		}

		const { questions, ...poll } = await fetchPoll(db, record);

		setPoll(poll);
		setQuestions(questions);
	});

	const onVoteQuestion = async (question: PollQuestion) => {
		const userRecord = user();
		const db = client();

		if(!userRecord) {
			return;
		}

		votePollQuestion(db, userRecord.id, question.id);
	};

	return (
		<div class="container mx-auto p-4">
			<h1 class="text-2xl font-bold mb-4">Vote on Poll</h1>
			<For each={questions()}>
				{(question) => 
					<PollQuestionRow question={question} onVote={onVoteQuestion} />
				}
			</For>
		</div>
	);
};

export default VotePoll;