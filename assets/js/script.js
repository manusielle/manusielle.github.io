'use strict';

// prevent right click
document.addEventListener('contextmenu', function(e) {
    // Prevent right-click context menu across the entire page
    e.preventDefault();
    
    // Show message for mouse right-click
    if (e.buttons !== undefined && e.button === 2) {
        showNotification('Right-click is disabled on this page!');
    }
});

// Detect common keyboard shortcuts for developer tools
document.addEventListener('keydown', function(e) {
    // Block Ctrl+Shift+I, F12, Ctrl+Shift+J, Ctrl+U
    if (
        e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J') ||
        e.key === 'F12' ||
        e.ctrlKey && e.key === 'U'
    ) {
        e.preventDefault();
        showNotification('Developer tools are disabled on this page!');
    }
});

// Custom notification function with animation and sky blue theme
function showNotification(message) {
  // Create notification container
  const notification = document.createElement('div');
  
  // Set styles for professional appearance
  notification.style.position = 'fixed';
  notification.style.top = '-100px'; // Start above viewport for animation
  notification.style.right = '20px';
  notification.style.padding = '15px 20px';
  notification.style.backgroundColor = '#3fc4ce86'; 
  notification.style.color = 'white';
  notification.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
  notification.style.borderRadius = '4px';
  notification.style.zIndex = '9999';
  notification.style.transition = 'all 0.5s ease-in-out';
  notification.style.fontFamily = 'Arial, sans-serif';
  notification.style.fontSize = '14px';
  notification.style.maxWidth = '300px';
  notification.style.display = 'flex';
  notification.style.alignItems = 'center';
  
  // Add icon 
  const icon = document.createElement('span');
  icon.innerHTML = '&#x2705;'; // Checkmark icon
  icon.style.marginRight = '10px';
  icon.style.fontSize = '18px';
  
  // Add text content
  const text = document.createElement('span');
  text.textContent = message || 'Operation successful!';
  
  // Add close button
  const closeBtn = document.createElement('span');
  closeBtn.innerHTML = '&times;';
  closeBtn.style.marginLeft = '15px';
  closeBtn.style.fontSize = '20px';
  closeBtn.style.cursor = 'pointer';
  closeBtn.style.opacity = '0.7';
  closeBtn.style.marginLeft = 'auto';
  closeBtn.addEventListener('mouseover', () => {
    closeBtn.style.opacity = '1';
  });
  closeBtn.addEventListener('mouseout', () => {
    closeBtn.style.opacity = '0.7';
  });
  closeBtn.addEventListener('click', () => {
    // Animate out and remove
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(-20px)';
    setTimeout(() => notification.remove(), 500);
  });
  
  // Append elements
  notification.appendChild(icon);
  notification.appendChild(text);
  notification.appendChild(closeBtn);
  
  // Add to DOM
  document.body.appendChild(notification);
  
  // Trigger animation
  setTimeout(() => {
    notification.style.top = '20px';
  }, 100);
  
  // Auto-dismiss after 5 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(-20px)';
    setTimeout(() => notification.remove(), 500);
  }, 5000);
}

// Example usage
// showNotification("Your message has been sent successfully!");

// Optional: Detect if DevTools is open (approximate, not foolproof)
let devToolsOpen = false;
const threshold = 160; // Approximate width/height difference when DevTools is open
setInterval(() => {
    if (
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold
    ) {
        if (!devToolsOpen) {
            devToolsOpen = true;
            showNotification('Developer tools detected! Please close them.');
        }
    } else {
        devToolsOpen = false;
    }
}, 1000);

// Element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// Testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// Modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// Modal toggle function
const testimonialsModalFunc = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
}

// Add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
        modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
        modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
        modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
        modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
        testimonialsModalFunc();
    });
}

// Add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// Custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// Add event in all select items
for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);
    });
}

// Filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
    for (let i = 0; i < filterItems.length; i++) {
        if (selectedValue === "all") {
            filterItems[i].classList.add("active");
        } else if (selectedValue === filterItems[i].dataset.category) {
            filterItems[i].classList.add("active");
        } else {
            filterItems[i].classList.remove("active");
        }
    }
}

// Add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);
        lastClickedBtn.classList.remove("active");
        this.classList.add("active");
        lastClickedBtn = this;
    });
}
// Contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
const successMessage = document.getElementById("success-message");

// Add event to all form input fields
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // Check form validity
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// Initialize EmailJS with your user ID (replace with your actual user ID)
// Uncomment and add your public key if you haven't initialized EmailJS elsewhere
// emailjs.init("YOUR_USER_ID_HERE");\



// EmailJS form submission
form.addEventListener("submit", function(event) {
  event.preventDefault();
  
  // Disable button and update text
  formBtn.disabled = true;
  formBtn.querySelector("span").textContent = "Sending...";
  
  // Format current date and time
  const now = new Date();
  const formattedDateTime = now.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  // Send email with EmailJS
  emailjs.send("Reviews", "contact_reviews", {
    fullname: this.fullname.value,
    email: this.email.value,
    message: this.message.value,
    time: formattedDateTime
  })
  .then(function(response) {
    console.log("SUCCESS!", response.status, response.text);
    
    // Show success message
    successMessage.classList.add("show");
    
    // Reset form and button
    form.reset();
    formBtn.querySelector("span").textContent = "Send Message";
    formBtn.disabled = true;
    
    // Hide success message after delay
    setTimeout(() => {
      successMessage.classList.remove("show");
    }, 3000);
  }, function(error) {
    console.log("FAILED...", error);
    alert("Failed to send message. Please try again.");
    
    // Reset button
    formBtn.querySelector("span").textContent = "Send Message";
    form.checkValidity() ? formBtn.removeAttribute("disabled") : formBtn.setAttribute("disabled", "");
  });
});

// Page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", function () {
        for (let i = 0; i < pages.length; i++) {
            if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
                pages[i].classList.add("active");
                navigationLinks[i].classList.add("active");
                window.scrollTo(0, 0);
            } else {
                pages[i].classList.remove("active");
                navigationLinks[i].classList.remove("active");
            }
        }
    });
}