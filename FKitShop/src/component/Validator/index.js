function Validator(options) {
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }


}
    //-------------------------------------------------------------------------------------------
    //REQUIRED/CONSTRAINT/yêu cầu-ràng buộc khi nhập dữ liệu
    // document.addEventListener('DOMContentLoaded', function () {
    //     // Mong muốn của chúng ta

    //     Validator({
    //         form: '#form-sign-in',
    //         formGroupSelector: '.form-group',
    //         errorSelector: '.form-message',
    //         rules: [
    //             Validator.isRequired('#email', 'Please enter your email'),
    //             Validator.isEmail('#email'),

    //             Validator.isRequired('#password', 'Please enter your password'),
    //             Validator.minLength('#password', 6)
    //         ],
    //         onSubmit: function (data) {
    //             // Call API
    //             console.log(data);
    //         }
    //     });

    //     Validator({
    //         form: '#form-sign-up',
    //         formGroupSelector: '.form-group',
    //         errorSelector: '.form-message',
    //         rules: [
    //             Validator.isRequired('#fullname', 'Please enter your full name'),

    //             Validator.isRequired('#yob'),

    //             Validator.isRequired('#phone', 'Please enter your phone number'),

    //             Validator.isRequired('#email', 'Please enter your email'),
    //             Validator.isEmail('#email'),

    //             Validator.isRequired('#password', 'Please enter your password'),
    //             Validator.minLength('#password', 6),


    //             // Validator.isRequired('#password_confirmation'),
    //             // Validator.isRequired('input[name="gender"]'),
    //             // Validator.isConfirmed('#password_confirmation', function () {
    //             //     return document.querySelector('#form-1 #password').value;
    //             // }, 'Mật khẩu nhập lại không chính xác')
    //         ],
    //         onSubmit: function (data) {
    //             // Call API
    //             console.log(data);
    //         }
    //     });



    // });

    //-------------------------------------------------------------------------------------------


