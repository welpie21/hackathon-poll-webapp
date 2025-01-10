DEFINE TABLE poll SCHEMAFULL
	PERMISSIONS FOR update, delete
		WHERE creator = $auth.id;

-- Title of the poll
DEFINE FIELD title ON poll TYPE string;

-- The creator of the poll (if any)
DEFINE FIELD creator ON poll TYPE option<record<user>>
	VALUE $auth.id;