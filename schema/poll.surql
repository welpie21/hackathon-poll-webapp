DEFINE TABLE poll SCHEMAFULL PERMISSIONS FULL;

-- Title of the poll
DEFINE FIELD title ON poll TYPE string;

-- The creator of the poll (if any)
DEFINE FIELD creator ON poll TYPE option<record<user>>
	VALUE $auth.id;

-- Till when the poll is open
DEFINE FIELD closesAt ON poll TYPE option<datetime>;

-- Is the poll public or private
-- The polls can be viewed on the home page if they are public.
DEFINE FIELD isPublic ON poll TYPE boolean;