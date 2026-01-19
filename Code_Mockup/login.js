const form = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');

form.addEventListener('submit', function(e) {
    console.log("validation start")
    e.preventDefault(); 

    let errors = [];
    const value = emailInput.value.trim(); 
    console.log(value)

    if (value === '') {
            console.log("empty inputs")
            errors.push('Email or username is required.');
        } else {
            console.log("validation should run")
            // Detect email by presence of '@' and '.'
            let isEmailValid = value.includes('@') && value.includes('.');
            console.log(isEmailValid)
            if (isEmailValid) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    errors.push('Please enter a valid email address.');
                }
            } else {
                // Validate username: letters, numbers, underscore, 3-20 chars
                const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
                if (!usernameRegex.test(value)) {
                    errors.push('Username must be 3-20 characters and contain only letters, numbers, or underscores.');
                }
            }
        }


    // Validate password
    if (passwordInput.value.trim() === '') {
        errors.push('Password is required.');
    } else if (passwordInput.value.length < 6) {
        errors.push('Password must be at least 6 characters.');
    }

    if (errors.length > 0) {
        errorMessage.innerHTML = errors.join('<br>');
    } else {
        errorMessage.innerHTML = '';
        alert('Form submitted successfully!');
        
    }
});



 // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 //                if (!emailRegex.test(value)) {
 //                    errors.push('Please enter a valid email address.');
 //                }