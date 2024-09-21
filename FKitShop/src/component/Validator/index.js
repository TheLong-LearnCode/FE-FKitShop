
//chưa sửa
Validator({
    form: '#form-1',
    formGroupSelector: '.form-group',
    errorSelector: '.form-message',

    rules: [
        Validator.isRequired('#fullname', 'Please enter your full name'),
        // Validator.isRequired('#email', 'Please enter your email'),
        Validator.isEmail('#email'),
        // Validator.isRequired('#password', 'Please enter your password'),
        Validator.minLength('#password', 6),
        
        Validator.isRequired('#password_confirmation'),
        Validator.isRequired('input[name="gender"]'),
        Validator.isConfirmed('#password_confirmation', function () {
            return document.querySelector('#form-1 #password').value;
        }, 'password reinput not correct')
    ],
    onSubmit: function (data) {
        //callAPI
        console.log(data);
    }

});