import Surreal, { RecordId, Table } from "surrealdb";
import { Poll, PollPayload } from "~/types/poll";

export async function createPoll(
	db: Surreal,
	data: PollPayload
): Promise<Poll> {
	const [poll] = await db.create("poll", data);
	return poll as Poll;
}

export async function deletePoll(
	db: Surreal,
	id: RecordId<"poll">
): Promise<Poll> {
	const poll = await db.delete(id);
	return poll as Poll;
}

export async function getPoll(
	db: Surreal,
	id: RecordId<"poll">
): Promise<Poll> {
	const poll = await db.select(id);
	return poll as Poll;
}