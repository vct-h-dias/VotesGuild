const validForm = {
    email: false,
    password: false
}

const submitButton = document.getElementById('sign-in');
const validateForm = () => {
    // console.log(validForm)
    if (!!validForm.email && !!validForm.password) {
        submitButton.removeAttribute("disabled");
    } else {
        submitButton.setAttribute("disabled", "disabled");
    }
}
const emailOrPassError = document.getElementById('email-or-pass-error');
const emailInput = document.getElementById('email');
const notFoundEmail = document.getElementById('not-found-email');

emailInput.addEventListener('input', (e) => {
    const email = e.target.value;
    // console.log(email)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const validEmailError = document.getElementById('valid-email');

    notFoundEmail.style.opacity = 0;
    notFoundEmail.style.marginTop = "-20px";

    emailOrPassError.style.opacity = 0;
    emailOrPassError.style.marginTop = "-20px";

    if (!emailRegex.test(email)) {
        emailInput.style.borderColor = "red";
        validEmailError.style.opacity = 1;
        validEmailError.style.marginTop = "0";
        validForm.email = false;
    } else {
        emailInput.style.borderColor = "#68F554";
        validEmailError.style.opacity = 0;
        validEmailError.style.marginTop = "-20px";
        validForm.email = true;
    }
    validateForm();
})

passwordInput = document.getElementById('pass');
passwordInput.addEventListener('input', (e) => {
    const password = e.target.value;

    const validPasswordError = document.getElementById('valid-pass');
    if (password.length < 8) {
        passwordInput.style.borderColor = "red";
        validPasswordError.style.opacity = 1;
        validPasswordError.style.marginTop = "0";
        validForm.password = false;
    } else {
        passwordInput.style.borderColor = "#68F554";
        validPasswordError.style.opacity = 0;
        validPasswordError.style.marginTop = "-20px";
        validForm.password = true;
    }
    validateForm();
})

const goToSignUp = () => {
    window.location.href = './pages/signup.html'
}

const login = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("pass").value;

    const hashPass = await hash256(password);

    const body = {
        email: email,
        password: hashPass
    }


    const data = await fetch('http://localhost:5000/php/auth.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    const json = await data.json()

    if(data.status == 404){        
        emailInput.style.borderColor = "red";
        notFoundEmail.style.opacity = 1;
        notFoundEmail.style.marginTop = "0";
        validForm.email = false;
        validateForm()
    }


    if(data.status == 401){
        emailInput.style.borderColor = "red";
        passwordInput.style.borderColor = "red";
        emailOrPassError.style.opacity = 1;
        emailOrPassError.style.marginTop = "0";
        validForm.email = false;
        validForm.password = false;
        validateForm()
    }

    if(data.status == 200){
        localStorage.setItem('userData', JSON.stringify(json.data));
        window.location.href = './pages/votes.html'
    }
}
