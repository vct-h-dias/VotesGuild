const login = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("pass").value;

    const hex = randomRegex();

    const hash = await hash256(password + hex);

    const body = {
        email: email,
        password: hash,
        salt: hex
    }

    console.log(body);
    console.log(body.password.length);
    console.log(body.salt.length);

    console.log('Hello World');
    console.log('Hello World');
}
