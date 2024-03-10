document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const messageBoxContainer = document.getElementById("messageBoxContainer");
    const messageBox = document.getElementById("messageBox");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission to avoid page reload

        // Get username and password values from the form
        const usernameInput = document.getElementById("username").value;
        const passwordInput = document.getElementById("password").value;

        // Make API call to fetch user data
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Unable to fetch user data");
                }
                return response.json();
            })
            .then((userData) => {
                // Validate user input against fetched data
                const matchingUser = userData.find(
                    (user) => user.username === usernameInput && user.email === passwordInput
                );

                // Display result message in the message box
                displayMessage(matchingUser);
            })
            .catch((error) => {
                // Display error message in case of API call failure
                alert("API call unsuccessful. Please try again later.");
            });
    });

    function displayMessage(matchingUser) {
        // Create or clear the message box content
        messageBox.textContent = matchingUser
            ? `Login Successful!`
            : "Invalid username or password. Please try again!";

        // Set the appropriate class for styling
        messageBox.className = matchingUser ? "success-message" : "error-message";

        // Display the message box
        messageBoxContainer.style.display = "block";
    }
});
