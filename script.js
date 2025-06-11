$(document).ready(function () {
  // Start reaction time on page load
  let startTime = new Date().getTime();

  // Show/Hide password toggle
  $('#togglePassword').on('change', function () {
    const passwordInput = $('#password');
    passwordInput.attr('type', this.checked ? 'text' : 'password');
  });

  // Email validation regex
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Password validation (min 8 chars, uppercase, lowercase, number)
  function isValidPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  }

  // Display message helper
  function showMessage(message, isError) {
    const box = $('#messageBox');
    box.removeClass('error success').addClass(isError ? 'error' : 'success');
    box.text(message);
    box.show();
  }

  // Validate form inputs
  $('#userForm').on('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    // Clear previous messages
    $('#messageBox').hide();

    const email = $('#email').val().trim();
    const phone = $('#phone').val().trim();
    const password = $('#password').val();

    // Validate required fields
    if (!email || !phone || !password) {
      showMessage('Please fill in all required fields.', true);
      return;
    }

    // Validate email format
    if (!isValidEmail(email)) {
      showMessage('Please enter a valid email address.', true);
      return;
    }

    // Validate phone: exactly 10 digits
    if (!/^\d{10}$/.test(phone)) {
      showMessage('Phone number must be exactly 10 digits.', true);
      return;
    }

    // Validate password format
    if (!isValidPassword(password)) {
      showMessage('Password must be at least 8 characters and include uppercase, lowercase, and a number.', true);
      return;
    }

    // Calculate reaction time
    const reactionTime = (new Date().getTime() - startTime) / 1000;

    showMessage(`Success! Form submitted in ${reactionTime.toFixed(2)} seconds.`, false);

    // Optionally, reset form & timer
    // this.reset();
    // startTime = new Date().getTime();
  });
});
