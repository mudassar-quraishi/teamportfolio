// js/main.js

import { validateForm } from './validation.js';
import { filterProjects, updateFilterButtons } from './ui.js';

// --- Form Validation and Submission Logic ---
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    // Use an ES6 arrow function for the event listener
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // 1. Client-Side Validation (Functional Features)
        if (!validateForm(contactForm)) {
            formStatus.textContent = 'Please correct the errors above.';
            formStatus.className = 'mt-4 text-center font-semibold text-red-600';
            return;
        }

        // 2. Submission (Backend/API Setup - Formspree)
        formStatus.textContent = 'Sending message...';
        formStatus.className = 'mt-4 text-center font-semibold text-blue-600';

        try {
            // Use ES6 Fetch API with async/await
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formStatus.textContent = 'Thank you for your message! We will get back to you soon.';
                formStatus.className = 'mt-4 text-center font-semibold text-green-600';
                contactForm.reset(); // Clear the form
            } else {
                formStatus.textContent = 'Oops! There was an issue submitting your form.';
                formStatus.className = 'mt-4 text-center font-semibold text-red-600';
            }
        } catch (error) {
            formStatus.textContent = 'An error occurred. Please try again later.';
            formStatus.className = 'mt-4 text-center font-semibold text-red-600';
            console.error('Submission Error:', error);
        }
    });

    // Clear errors on input
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => input.addEventListener('input', () => validateForm(contactForm)));
}


// --- Project Filtering Logic (JavaScript Interactivity) ---
const filterContainer = document.getElementById('filter-buttons');

if (filterContainer) {
    // Use ES6 destructuring and event delegation
    filterContainer.addEventListener('click', (e) => {
        const clickedBtn = e.target.closest('.filter-btn');
        if (clickedBtn) {
            const filterValue = clickedBtn.getAttribute('data-filter');
            filterProjects(filterValue);
            updateFilterButtons(clickedBtn);
        }
    });

    // Initialize: Filter all projects on page load
    const initialFilterBtn = filterContainer.querySelector('[data-filter="all"]');
    if(initialFilterBtn) {
        filterProjects('all');
        updateFilterButtons(initialFilterBtn);
    }
}