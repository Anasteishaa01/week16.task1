const form = document.forms.formRegistration;
const {name, email, age, password, checkbox} = form.elements; 
const formInput = document.querySelectorAll('.form_input');

form.addEventListener('submit', function(evt) {
    evt.preventDefault();

    validateName(name);
    validateEmail(email);
    validateAge(age);
    validatePassword(password);
    validateCheckbox(checkbox);
    
})

function openElementError (input, message) {
    const parentElement = input.parentElement;
    const errorElement = parentElement.querySelector('.err');
    errorElement.textContent = message;
    errorElement.classList.remove('none')
}

function closeElementError (input) {
    const parentElement = input.parentElement;
    const errorElement = parentElement.querySelector('.err');
    errorElement.textContent = '';
    errorElement.classList.add('none')
}

function validateName (input) {
    const correctInputValue = input.value.trim();
    const namePattern = /[A-Za-zА-Яа-яЁё]+/;
    if(correctInputValue === '') {
        openElementError(input, 'Введите ваше имя')
        return;
    }
    if(namePattern.test(correctInputValue) === false) {
        openElementError(input, 'Поле имени может содержать только буквы и пробелы')
        return;
    }
    if(correctInputValue.length < 2) {
        openElementError(input, 'Поле имени не может быть короче, чем 2 символа');
        return;
    }
    if(correctInputValue.length > 20) {
        openElementError(input, 'Поле имени не может быть длиннее, чем 20 символов');
        return;
    }
    closeElementError(input);
}

function validateEmail(input) {
    const correctInputValue = input.value.trim();
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    if(correctInputValue === '') {
        openElementError(input, 'Введите электронную почту')
        return;
    }
    if(emailPattern.test(correctInputValue) === false) {
        openElementError(input, 'Электронная почта введена некорректно')
        return;
    }
    closeElementError(input);
}

function validateAge (input) {
    const correctInputValue = input.value;
    if(correctInputValue === ''){
        openElementError(input, 'Введите возраст');
        return;
    }
    closeElementError(input);
}

function validatePassword(input) {
    const correctInputValue = input.value.trim();
    const passwordPattern = /^(?=.*[A-Z].*[A-Z])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/
    if(correctInputValue === '') {
        openElementError(input, 'Введите пароль');
        return;
    }
    if(correctInputValue.length < 8) {
        openElementError(input, 'Пароль должен иметь не менее 8 символов');
        return;
    }
    if(passwordPattern.test(correctInputValue) === false) {
        openElementError(input, 'Пароль должен содержать как минимум одну заглавную букву, одну строчную букву и одну цифру');
        return;
    }
    closeElementError(input);
}

function validateCheckbox(input) {
    const checkboxForm = form.elements.checkbox; 
    if(!checkboxForm.checked) {
        openElementError(input, 'Нужно дать согласие на обработку персональных данных');
        return;
    }
    closeElementError(input);
}

function buttonValidate(arrInputs) {
    const inputError = arrInputs.filter((input) => input.value.trim() === '');
    if(inputError.length === 0) {
        button.disabled = false;
        return;
    }
    button.disabled = true;
}

name.addEventListener('input', () => buttonValidate([name, email, age, password, checkbox, submit]));
email.addEventListener('input', () => buttonValidate([name, email, age, password, checkbox]));
age.addEventListener('input', () => buttonValidate([name, email, age, password, checkbox]));
password.addEventListener('input', () => buttonValidate([name, email, age, password, checkbox]));
checkbox.addEventListener('input', () => buttonValidate([name, email, age, password, checkbox]));

formInput.forEach(function(input){
    input.addEventListener('focus', function () {
        input.style.border = '1px solid #4CAF50'
    });

    input.addEventListener('blur', function () {
        input.style.border = '';
    });
})