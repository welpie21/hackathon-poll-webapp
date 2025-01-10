DEFINE ACCESS IF NOT EXISTS user ON DATABASE TYPE RECORD
	SIGNUP ( CREATE user SET email = $email, pass = crypto::argon2::generate($pass) )
	SIGNIN ( SELECT * FROM user WHERE email = $email AND crypto::argon2::compare(pass, $pass) )
	DURATION FOR TOKEN 15m, FOR SESSION 12h
	AUTHENTICATE (
		IF type::thing("token", $token.jti).revoked = true {
            THROW "This token has been revoked";
        };
        INSERT INTO token { id: $token.jti, exp: $token.exp, revoked: false };
        CREATE audit CONTENT { token: $token.jti, time: time::now() };
        RETURN $auth;
	)
;

DEFINE TABLE user SCHEMAFULL
	PERMISSIONS FOR select, update, delete, create
		WHERE $access = "users"
		AND id = $auth.id
;