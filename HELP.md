# Exploitation Steps

## Logging In

Logging in can be done via SQL injection through the username field. Authentication is done with the following SQL query:

    SELECT * FROM users WHERE username = '${username}' AND password = '${hashedPass}' LIMIT 1

No escaping is done, so we can perform SQL injection. If we know the username of a user, we can use the following query: `${knownUsername}'--`. If the username is not known, we can select the first user from the user list with: `' OR 1=1--`.