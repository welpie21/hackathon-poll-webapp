DEFINE ACCESS user ON DATABASE TYPE RECORD
	SIGNUP ( CREATE user SET email = $email, pass = crypto::argon2::generate($pass) )
	SIGNIN ( SELECT * FROM user WHERE email = $email AND crypto::argon2::compare(pass, $pass) )
	DURATION FOR TOKEN 15m, FOR SESSION 12h
;

DEFINE TABLE user SCHEMAFULL
	PERMISSIONS FOR select, update, delete, create
		WHERE $access = "users"
		AND id = $auth.id
;

-- Give the user table an email field. Store it in a string
DEFINE FIELD email ON TABLE user TYPE string
  -- Check if the value is a properly formatted email address
  ASSERT string::is::email($value)
  -- Make sure the email is unique
  VALUE string::lowercase($value);