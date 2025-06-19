$(document).ready(function () {

  // Show/Hide password toggle
  $('.toggle-password').click(function () {
    const passwordField = $('#password');
    const type = passwordField.attr('type') === 'password' ? 'text' : 'password';
    passwordField.attr('type', type);
    $(this).text(type === 'password' ? 'Show' : 'Hide');
  });

  // Allow only digits in phone number
  $('#phone').on('input', function () {
    this.value = this.value.replace(/\D/g, '');
  });

  // Form validation
  $('#registration-form').submit(function (e) {
    e.preventDefault();
    $('#message-box').html(''); // Clear old messages

    const fullname = $('#fullname').val().trim();
    const email = $('#email').val().trim();
    const phone = $('#phone').val().trim();
    const password = $('#password').val();
    const confirmPassword = $('#confirm-password').val();

    let errors = [];

    // Basic required validation
    if (!fullname || !email || !phone || !password || !confirmPassword) {
      errors.push("All fields are required.");
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      errors.push("Invalid email format.");
    }

    // Phone validation
    if (phone && phone.length !== 10) {
      errors.push("Phone number must be exactly 10 digits.");
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (password && !passwordRegex.test(password)) {
      errors.push("Password must be at least 8 characters, include upper/lowercase letters and a number.");
    }

    // Confirm password
    if (password && confirmPassword && password !== confirmPassword) {
      errors.push("Passwords do not match.");
    }

    // Display errors or success
    if (errors.length > 0) {
      errors.forEach(error => {
        $('#message-box').append(`<div class="error-message">${error}</div>`);
      });
    } else {
      $('#message-box').html(`<div class="success-message">Registration successful!</div>`);
      $('#registration-form')[0].reset(); // Optional: reset form
    }
  });

});
