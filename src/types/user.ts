import { RecordId } from "surrealdb";

export interface UserRecord {
	id: RecordId;
	name: string;
	email: string;
	password: string;
}