// js/validation.js

/**
 * Checks if a string is a valid email format using a simple regex.
 * @param {string} email - The email string to validate.
 * @returns {boolean}
 */
const isValidEmail = (email) => {
    // Simple regex for basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Displays an error message for a given input element.
 * @param {HTMLElement} inputEl - The input element.
 * @param {string} message - The error message to display.
 */
const displayError = (inputEl, message) => {
    const errorSpan = inputEl.nextElementSibling;
    if (errorSpan && errorSpan.classList.contains('error-message')) {
        errorSpan.textContent = message;
        inputEl.classList.add('border-red-500');
        inputEl.classList.remove('border-gray-300');
    }
};

/**
 * Clears the error message for a given input element.
 * @param {HTMLElement} inputEl - The input element.
 */
const clearError = (inputEl) => {
    const errorSpan = inputEl.nextElementSibling;
    if (errorSpan && errorSpan.classList.contains('error-message')) {
        errorSpan.textContent = '';
        inputEl.classList.remove('border-red-500');
        inputEl.classList.add('border-gray-300');
    }
};

/**
 * Performs client-side validation on the contact form inputs.
 * @param {HTMLFormElement} form - The form element to validate.
 * @returns {boolean} - True if the form is valid, false otherwise.
 */
export const validateForm = (form) => {
    let isValid = true;
    
    // Select required fields using destructuring and querySelector
    const nameInput = form.querySelector('#name');
    const emailInput = form.querySelector('#email');
    const messageTextarea = form.querySelector('#message');

    // Array of fields to check
    const fields = [nameInput, emailInput, messageTextarea];

    // Clear previous errors first (using ES6 forEach)
    fields.forEach(field => clearError(field));

    // Name Validation
    if (!nameInput.value.trim()) {
        displayError(nameInput, 'Name is required.');
        isValid = false;
    }

    // Email Validation (Basic Validation & Data Format Validation)
    if (!emailInput.value.trim()) {
        displayError(emailInput, 'Email is required.');
        isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
        displayError(emailInput, 'Please enter a valid email address.');
        isValid = false;
    }

    // Message Validation
    if (!messageTextarea.value.trim()) {
        displayError(messageTextarea, 'Message is required.');
        isValid = false;
    }

    return isValid;
};