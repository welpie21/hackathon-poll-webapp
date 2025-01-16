import { RecordId } from "surrealdb";

export type PollQuestion = {
	id: RecordId<"pollQuestion">;
	question: string;
}