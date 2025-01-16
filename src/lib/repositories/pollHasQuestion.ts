import Surreal, { RecordId } from "surrealdb";
import { Poll } from "~/types/poll";
import { PollHasQuestion } from "~/types/pollHasQuestion";
import { POLL_HAS_QUESTION_TABLE } from "../tables";

export async function relatePollToQuestions(
	db: Surreal,
	poll: Poll,
	question: RecordId<"pollQuestion">
): Promise<PollHasQuestion> {

	const [relation] = await db.relate<PollHasQuestion>(
		poll.id, 
		POLL_HAS_QUESTION_TABLE, 
		question
	);

	return relation;
}