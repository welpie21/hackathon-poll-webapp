import Surreal, { RecordId } from "surrealdb";
import { Poll, PollPayload } from "~/types/poll";
import { createPollQuestions } from "./pollQuestion";
import { relatePollToQuestions } from "./pollHasQuestion";
import { PollQuestion } from "~/types/pollQuestion";
import { POLL_TABLE } from "../tables";

export async function createPoll(
	db: Surreal,
	data: PollPayload
): Promise<Poll> {

	const payload = data.closesAt ?
		{ title: data.title, closesAt: data.closesAt } :
		{ title: data.title };

	const [poll] = await db.create<Poll, Pick<Poll, "title">>(POLL_TABLE, payload);

	for await (const question of createPollQuestions(db, data.questions)) {
		await relatePollToQuestions(db, poll, question.id);
	}

	return poll;
}

export async function deletePoll(
	db: Surreal,
	id: RecordId<"poll">
): Promise<Poll> {
	const poll = await db.delete(id);
	return poll as Poll;
}

type FetchPollQuestionResponse = Omit<Poll, "creator"> &
{ questions: PollQuestion[]; };

export async function fetchPoll(
	db: Surreal,
	id: RecordId<"poll">
): Promise<FetchPollQuestionResponse> {
	const [questions] = await db.query(`
		SELECT id, title, closesAt, ->pollHasQuestion->pollQuestion as questions
		FROM ONLY $id
		FETCH questions
	`, { id }) as [FetchPollQuestionResponse];

	console.log(questions);

	return questions;
}

export async function isPollValid(
	db: Surreal,
	id: RecordId<"poll">
): Promise<boolean> {
	const [valid] = await db.query(`
		SELECT VALUE closesAt > time::now()
		FROM ONLY $id
	`, { id }) as [boolean];

	return valid;
}