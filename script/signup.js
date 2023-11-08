const validForm = {
    email: false,
    password: false
}

const submitButton = document.getElementById('sign-up');
const validateForm = () => {
    console.log(validForm)
    if (!!validForm.email && !!validForm.password) {
        submitButton.removeAttribute("disabled");
    } else {
        submitButton.setAttribute("disabled", "disabled");
    }
}

const emailInput = document.getElementById('email');
emailInput.addEventListener('input', (e) => {
    const email = e.target.value;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const validEmailError = document.getElementById('valid-email');
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

const signup = () => {
    window.location.href = "./votes.html"
}