// Import React if you want to use it later for any UI integration
//import React from 'react';

function Validator(options) {
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {};

    // Hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(
            options.errorSelector
        );
        var errorMessage;

        // Lấy ra các rules của selector
        var rules = selectorRules[rule.selector];

        // Lặp qua từng rule & kiểm tra
        // Nếu có lỗi thì dừng việc kiểm
        for (var i = 0; i < rules.length; ++i) {
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    );
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
            }
            if (errorMessage) break;
        }

        if (errorMessage) {
            errorElement.innerText = `* ${errorMessage} *`;
            getParent(inputElement, options.formGroupSelector).classList.add('invalid');
        } else {
            errorElement.innerText = '';
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
        }

        return !errorMessage;
    }

    // Lấy element của form cần validate
    var formElement = document.querySelector(options.form);
    if (formElement) {
        // Khi submit form
        formElement.onsubmit = function (e) {
            e.preventDefault();

            var isFormValid = true;

            // Lặp qua từng rules và validate
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });

            // Thay thế đoạn này
            if (isFormValid) {
                // Lấy tất cả các input trong form
                var enableInputs = formElement.querySelectorAll('[name]');

                // Tạo object để lưu giá trị input
                var formValues = Array.from(enableInputs).reduce(function (values, input) {
                    switch (input.type) {
                        case 'radio':
                            values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                            break;
                        case 'checkbox':
                            if (!input.matches(':checked')) {
                                values[input.name] = '';
                                return values;
                            }
                            if (!Array.isArray(values[input.name])) {
                                values[input.name] = [];
                            }
                            values[input.name].push(input.value);
                            break;
                        case 'file':
                            values[input.name] = input.files;
                            break;
                        default:
                            values[input.name] = input.value;
                    }
                    return values;
                }, {});

                // Chuyển object thành JSON
                // var jsonData = JSON.stringify(formValues);
                // console.log("Json data: ", jsonData);

                // Nếu có options.onSubmit, gọi hàm này với dữ liệu JSON
                if (typeof options.onSubmit === 'function') {
                    options.onSubmit(formValues); // Gửi formValues thay vì jsonData để dễ xử lý trong React
                }

                // Nếu muốn submit form theo cách mặc định, có thể uncomment dòng này
                // formElement.submit();
            }

        }

        // Lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input, ...)
        options.rules.forEach(function (rule) {

            // Lưu lại các rules cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElements = formElement.querySelectorAll(rule.selector);

            Array.from(inputElements).forEach(function (inputElement) {
                // Xử lý trường hợp blur khỏi input
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }

                // Xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput = function () {
                    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                }
            });
        });
    }
}

// Validator rules as before
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined : message || 'Please enter this field';
        }
    };
};

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Invalid email';
        }
    };
};

Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : message || `At least ${min} characters`;
        }
    };
};

Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message || 'The value entered is incorrect';
        }
    };
};

Validator.isValidDate = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            if (!value) {
                return message || 'Invalid date';
            }

            const selectedDate = new Date(value);
            const today = new Date();

            today.setHours(0, 0, 0, 0);
            selectedDate.setHours(0, 0, 0, 0);

            const minYear = 1900;
            const selectedYear = selectedDate.getFullYear();
            const currentYear = today.getFullYear();

            if (selectedYear < minYear || selectedYear > currentYear) {
                return message || `Year must be within range ${minYear}-${currentYear}`;
            }

            if (selectedDate > today) {
                return message || 'Date cannot be in the future';
            }

            return undefined;
        }
    };
};

Validator.isPhoneNumber = function (selector, message, totalDigits) {
    return {
        selector: selector,
        test: function (value) {
            if (value.charAt(0) !== '0') {
                return 'Must start at 0';
            }
            const phoneRegex = new RegExp(`^0\\d{${totalDigits - 1}}$`);
            return phoneRegex.test(value) ? undefined : message || `Must have ${totalDigits} digits`;
        }
    };
};
// Validator.isConfirmed = function (selector, getConfirmValue, message) {
//     return {
//         selector: selector,
//         test: function (value) {
//             return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
//         }
//     }
// }

export default Validator;
