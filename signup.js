document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const messageBox = document.getElementById('messageBoxContainer');
    const message = document.getElementById('messageBox');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting

        // Clear previous messages
        message.textContent = '';
        messageBox.style.display = 'none';

        // Validate the form
        let hasError = false;
        if (!form.username.value.match(/^[A-Za-z][A-Za-z0-9-_]{2,19}$/)) {
            message.textContent += 'Check the Username.\n';
            hasError = true;
        }
        // Check if password meets the criteria
        if (!form.password.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/)) {
            message.textContent += 'Password does not meet the criteria.\n';
            hasError = true;
        }
        if (form.password.value !== form.confirmPassword.value) {
            message.textContent += 'Passwords does not match.\n';
            hasError = true;
        }
        // Email validity check
        if (!form.email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            message.textContent += 'Check the Email.\n';
            hasError = true;
        }

        if (hasError) {
            messageBox.style.display = 'block';
        } else {
            message.textContent = 'Signup successful!';
            messageBox.style.display = 'block';
        }
    });
});
