# Local devlopment

Linux: php -S localhost:5000
Windows: C://xampp/php/php -S localhost:5000

Open *index.html* in other port

Changes credencials *./php/connections.php*
(use the data of *database.sql*)

API Security:
Basically, the API generates a random hexadecimal salt with 16 characters. In its request, the password is hashed with SHA-256. Before insertion into the database, the API hashes the result of SHA-256(password + salt). The database stores both the salt and the final hash. During authentication, the system retrieves the salt for the user, hashes the entered password with the stored salt, and compares it with the saved hash.