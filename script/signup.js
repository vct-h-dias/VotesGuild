const validForm = {
    email: false,
    password: false,
    name: false
}

const submitButton = document.getElementById('sign-up');
const validateForm = () => {
    // console.log(validForm)
    if (!!validForm.email && !!validForm.password && !!validForm.name) {
        submitButton.removeAttribute("disabled");
    } else {
        submitButton.setAttribute("disabled", "disabled");
    }
}

const nameInput = document.getElementById('name');
nameInput.addEventListener('input', (e) => {
    const name = e.target.value;

    const validNameError = document.getElementById('valid-name');
    if (name.length < 3) {
        nameInput.style.borderColor = "red";
        validNameError.style.opacity = 1;
        validNameError.style.marginTop = "0";
        validForm.name = false;
    } else {
        nameInput.style.borderColor = "#68F554";
        validNameError.style.opacity = 0;
        validNameError.style.marginTop = "-20px";
        validForm.name = true;
    }
    validateForm();
})

const foundEmail = document.getElementById('found-email');
const emailInput = document.getElementById('email');
emailInput.addEventListener('input', (e) => {
    const email = e.target.value;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const validEmailError = document.getElementById('valid-email');

    foundEmail.style.opacity = 0;
    foundEmail.style.marginTop = "-20px";

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

passwordConfirmInput = document.getElementById('pass-confirm');
passwordInput = document.getElementById('pass');

passwordInput.addEventListener('input', (e) => {
    const password = e.target.value;

    const validPasswordError = document.getElementById('valid-pass');
    if (password.length < 8) {
        passwordInput.style.borderColor = "red";
        validPasswordError.style.opacity = 1;
        validPasswordError.style.marginTop = "0";
    } else {
        passwordInput.style.borderColor = "#68F554";
        validPasswordError.style.opacity = 0;
        validPasswordError.style.marginTop = "-20px";
    }
    confirmPassword(passwordConfirmInput.value)
})

passwordConfirmInput.addEventListener('input', (e) => {
    confirmPassword(e.target.value)
})


const confirmPassword = (password) => {
    const validPasswordError = document.getElementById('valid-password-confirm');
    if (password != passwordInput.value || !password.length) {
        passwordConfirmInput.style.borderColor = "red";
        validPasswordError.style.opacity = 1;
        validPasswordError.style.marginTop = "0";
        validForm.password = false;
    } else {
        passwordConfirmInput.style.borderColor = "#68F554";
        validPasswordError.style.opacity = 0;
        validPasswordError.style.marginTop = "-20px";
        validForm.password = true;
    }
    validateForm();
}

const signup = async () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;

    const hashPass = await hash256(password);

    const body = {
        name: name,
        email: email,
        password: hashPass
    }


    const data = await fetch('http://localhost:5000/php/student.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    const json = await data.json()

    if(data.status == 409){        
        emailInput.style.borderColor = "red";
        foundEmail.style.opacity = 1;
        foundEmail.style.marginTop = "0";
        validForm.email = false;
        validateForm()
    }

    if(data.status == 200){
        localStorage.setItem('userData', JSON.stringify(json.data));
        window.location.href = './votes.html'
    }
}
