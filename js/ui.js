// js/ui.js

/**
 * Toggles the visibility of project cards based on the selected filter.
 * @param {string} filter - The data-filter value (e.g., 'MySQL', 'all').
 */
const filterProjects = (filter) => {
    const projectItems = document.querySelectorAll('.portfolio-item');
    
    // Loop through all project items using ES6 forEach
    projectItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        // Remove old classes
        item.classList.remove('hidden', 'animate-fade-in'); 

        // Check if the item should be displayed
        if (filter === 'all' || itemCategory === filter) {
            // Apply Tailwind class for display and animation
            item.classList.add('animate-fade-in'); 
        } else {
            // Hide the item using the Tailwind utility class
            item.classList.add('hidden');
        }
    });
};

/**
 * Updates the visual active state of the filter buttons.
 * @param {HTMLElement} activeBtn - The button that was clicked.
 */
const updateFilterButtons = (activeBtn) => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const activeClass = 'bg-blue-600 text-white';
    const inactiveClass = 'bg-gray-200 text-gray-700';

    filterButtons.forEach(btn => {
        if (btn === activeBtn) {
            // Use spread operator for clean class addition/removal
            btn.classList.add(...activeClass.split(' '));
            btn.classList.remove(...inactiveClass.split(' '));
        } else {
            btn.classList.add(...inactiveClass.split(' '));
            btn.classList.remove(...activeClass.split(' '));
        }
    });
};

// Export functions to be used in main.js
export { filterProjects, updateFilterButtons };