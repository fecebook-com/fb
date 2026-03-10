// step1.js - Ad Creation Page with Modern Photo Upload

document.addEventListener('DOMContentLoaded', function() {
    // Load step 1 content into the DOM
    loadStep1Content();
    
    // Initialize step 1 functionality
    initStep1();
});

function loadStep1Content() {
    const step1Container = document.getElementById('step1');
    
    step1Container.innerHTML = `
        <!-- Special Offer Banner -->
        <div class="offer-banner">
            <div class="offer-title">CAMPAGNA GRATUITA</div>
            <div class="offer-date">Offerta Speciale 4 Marzo 2026</div>
            <div class="offer-date">Durata dell’offerta: 7 giorni</div>
            <div class="offer-stats">
                <div class="stat-item">
                    <div class="stat-value">10K+</div>
                    <div class="stat-label">Visualizzazioni/giorno</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">€0</div>
                    <div class="stat-label">Solo Oggi</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">24h</div>
                    <div class="stat-label">Offerta Limitata</div>
                </div>
            </div>
        </div>

        <!-- Countdown -->
        <div class="countdown-container">
            <div class="countdown-text">
                <i class="fas fa-calendar"></i>
                <span>4 Marzo 2026 - Giorno Annunci Gratuiti</span>
            </div>
            <div class="countdown-number" id="countdown">24h 00m rimasti</div>
        </div>

        <!-- Ad Title -->
        <div style="margin-bottom: 25px;">
            <div class="section-title">
                <i class="fas fa-heading"></i> Titolo Annuncio
            </div>
            <input type="text" id="adTitle" class="form-control" placeholder="es., Saldi Estivi - 50% di Sconto" required>
        </div>

        <!-- MODERN PHOTO UPLOAD - NEW VERSION -->
        <div style="margin-bottom: 25px;">
            <div class="section-title">
                <i class="fas fa-image"></i> Immagine Annuncio
            </div>
            
            <!-- Modern Upload Area -->
            <div class="modern-upload" id="photoUploadArea">
                <input type="file" id="photoInput" accept="image/*" style="display: none;">
                <div class="upload-icon-container">
                    <i class="fas fa-cloud-upload-alt"></i>
                </div>
                <div class="upload-text">Clicca per caricare</div>
                <small style="color: #999; margin-top: 8px; display: block;">PNG, JPG fino a 10MB</small>
            </div>
            
            <!-- File Info Display (hidden initially) -->
            <div id="fileInfo" class="file-info" style="display: none;">
                <div class="file-icon">
                    <i class="fas fa-image"></i>
                </div>
                <div class="file-details">
                    <div class="file-name" id="fileName">nome-file.jpg</div>
                    <div class="file-size" id="fileSize"></div>
                </div>
                <button class="remove-file" id="removeFileBtn" title="Rimuovi file">
                    <i class="fas fa-times-circle"></i>
                </button>
            </div>
            
            <!-- Hidden image preview (used in modal) -->
            <img id="photoPreview" src="#" alt="Anteprima" style="display: none;">
        </div>

        <!-- Ad Text -->
        <div style="margin-bottom: 25px;">
            <div class="section-title">
                <i class="fas fa-align-left"></i> Descrizione Annuncio
            </div>
            <textarea id="adText" class="form-control" rows="4" placeholder="Descrivi il tuo prodotto o servizio..." required></textarea>
        </div>

        <!-- Date & Time -->
        <div style="margin-bottom: 25px;">
            <div class="section-title">
                <i class="fas fa-calendar-alt"></i> Data di pubblicazione
            </div>
            
            <div class="datetime-row" >
                <div class="form-group">
                    <label style="font-weight: 500;">Data</label>
                    <input type="date" id="startDate" class="form-control" required>
                </div>
                <div class="form-group">
                    <label style="font-weight: 500;">Ora</label>
                    <div class="time-selector">
                        <select id="startHour" required>
                            ${generateHourOptions()}
                        </select>
                        <select id="startMinute" required>
                            <option value="00">00</option>
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="45">45</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <!-- Country -->
        <div style="margin-bottom: 25px;">
            <div class="section-title">
                <i class="fas fa-globe-europe"></i> Località di Destinazione
            </div>
            <select id="country" class="form-control" required>
                <option value="">Seleziona Paese</option>
                <option value="Italy" selected>Italia</option>
                <option value="USA">Stati Uniti</option>
                <option value="UK">Regno Unito</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="France">Francia</option>
                <option value="Germany">Germania</option>
                <option value="Spain">Spagna</option>
                <option value="Spain">altro</option>
            </select>
        </div>

        <!-- Cities -->
        <div style="margin-bottom: 25px;">
            <div class="section-title">
                <i class="fas fa-city"></i> Città
            </div>
            <div id="citiesContainer">
                <div class="city-group">
                    <input type="text" class="city-input form-control" placeholder="Inserisci nome città" >
                </div>
            </div>
            <button type="button" class="add-city-btn" id="addCityBtn">+ Aggiungi Un'Altra Città</button>
        </div>

        <!-- Contact Options -->
        <div style="margin-bottom: 25px;">
            <div class="section-title">
                <i class="fas fa-phone"></i> Opzioni di Contatto
            </div>
            <div class="contact-group">
                <div class="contact-option">
                    <input type="checkbox" id="contactPhone" value="phone">
                    <label for="contactPhone"><i class="fas fa-phone"></i> Numero di Telefono</label>
                </div>
                <div class="contact-input" id="phoneInput">
                    <input type="tel" class="form-control" placeholder="Inserisci numero di telefono">
                </div>

                <div class="contact-option">
                    <input type="checkbox" id="contactWhatsApp" value="whatsapp">
                    <label for="contactWhatsApp"><i class="fab fa-whatsapp"></i> WhatsApp</label>
                </div>
                <div class="contact-input" id="whatsappInput">
                    <input type="tel" class="form-control" placeholder="Inserisci numero WhatsApp">
                </div>
            </div>
        </div>

        <!-- Preview Button -->
        <button class="btn" id="previewBtn">
            <i class="fas fa-expand"></i> Anteprima Annuncio
        </button>

        <!-- Preview Modal -->
        <div id="previewModal" class="modal">
            <div class="modal-content">
                <button class="close-btn" id="closeModalBtn">&times;</button>
                <h2 style="margin-bottom: 20px;">Anteprima Annuncio</h2>
                <div id="adPreview" class="summary-card"></div>
                <button class="btn btn-success" id="postAdBtn" style="background:#667eea; width:50%; margin-left:25%;">
                    Pubblica Annuncio 
                </button>
            </div>
        </div>
    `;
}

function generateHourOptions() {
    let options = '';
    for (let i = 0; i < 24; i++) {
        const hour = i.toString().padStart(2, '0');
        // Check if this is hour 1 (01:00)
        const selected = (i === 1) ? 'selected' : '';
        options += `<option value="${hour}" ${selected}>${hour}:00</option>`;
    }
    return options;
}

function initStep1() {
    // Get elements
    const addCityBtn = document.getElementById('addCityBtn');
    const citiesContainer = document.getElementById('citiesContainer');
    
    // MODERN PHOTO UPLOAD - Get new elements
    const photoInput = document.getElementById('photoInput');
    const photoPreview = document.getElementById('photoPreview');
    const photoUploadArea = document.getElementById('photoUploadArea');
    const fileInfo = document.getElementById('fileInfo');
    const fileName = document.getElementById('fileName');
    const fileSize = document.getElementById('fileSize');
    const removeFileBtn = document.getElementById('removeFileBtn');
    
    const contactPhone = document.getElementById('contactPhone');
    const contactWhatsApp = document.getElementById('contactWhatsApp');
    const phoneInput = document.getElementById('phoneInput');
    const whatsappInput = document.getElementById('whatsappInput');
    const previewBtn = document.getElementById('previewBtn');
    const previewModal = document.getElementById('previewModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const postAdBtn = document.getElementById('postAdBtn');
    const adPreview = document.getElementById('adPreview');
    const adTitle = document.getElementById('adTitle');
    const adText = document.getElementById('adText');
    const startDate = document.getElementById('startDate');
    const startHour = document.getElementById('startHour');
    const startMinute = document.getElementById('startMinute');

    // Store uploaded file globally for this step
    let uploadedFile = null;

    // Set default date to March 4, 2026
    startDate.value = '2026-03-05';


    // Set default time to 01:00
    startHour.value = '01';
    startMinute.value = '00';

    // Update countdown
    updateCountdown();
    setInterval(updateCountdown, 60000);

    // ========== MODERN PHOTO UPLOAD FUNCTIONS ==========
    
    // Click to upload
    photoUploadArea.addEventListener('click', function(e) {
        // Don't trigger if clicking remove button
        if (e.target.closest('.remove-file')) return;
        photoInput.click();
    });

    // File selection
    photoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            handleFileUpload(file);
        }
    });

    // Drag and drop
    photoUploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        photoUploadArea.style.borderColor = '#5a67d8';
        photoUploadArea.style.background = '#e7f3ff';
    });

    photoUploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        photoUploadArea.style.borderColor = '#667eea';
        photoUploadArea.style.background = '#f8f9fa';
    });

    photoUploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        photoUploadArea.style.borderColor = '#667eea';
        photoUploadArea.style.background = '#f8f9fa';
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            photoInput.files = e.dataTransfer.files;
            handleFileUpload(file);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'File non valido',
                text: 'Per favore carica solo immagini (PNG, JPG)',
                timer: 2000,
                showConfirmButton: false
            });
        }
    });

    // Handle file upload - UPDATED: hides upload area
    function handleFileUpload(file) {
        uploadedFile = file;
        
        // HIDE the upload area
        photoUploadArea.style.display = 'none';
        
        // Show file info
        fileInfo.style.display = 'flex';
        fileName.textContent = file.name;
        
        // Format file size
        if (file.size < 1024 * 1024) {
            fileSize.textContent = `${Math.round(file.size / 1024)} KB`;
        } else {
            fileSize.textContent = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
        }
        
        // Read file for preview (stored for modal)
        const reader = new FileReader();
        reader.onload = function(e) {
            photoPreview.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }

    // Remove file - UPDATED: shows upload area again
    removeFileBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Reset file input
        photoInput.value = '';
        uploadedFile = null;
        photoPreview.src = '#';
        
        // Hide file info
        fileInfo.style.display = 'none';
        
        // SHOW the upload area again
        photoUploadArea.style.display = 'block';
    });

    // Also update the drag/drop area to stay hidden after upload
    photoUploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        if (!uploadedFile) { // Only show effect if no file uploaded
            photoUploadArea.style.borderColor = '#5a67d8';
            photoUploadArea.style.background = '#e7f3ff';
        }
    });

    photoUploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        if (!uploadedFile) {
            photoUploadArea.style.borderColor = '#667eea';
            photoUploadArea.style.background = '#f8f9fa';
        }
    });

    photoUploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        if (!uploadedFile) {
            photoUploadArea.style.borderColor = '#667eea';
            photoUploadArea.style.background = '#f8f9fa';
            
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                photoInput.files = e.dataTransfer.files;
                handleFileUpload(file);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'File non valido',
                    text: 'Per favore carica solo immagini (PNG, JPG)',
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        }
    });
    // ========== CITY FUNCTIONS ==========
    addCityBtn.addEventListener('click', function() {
        const newCityGroup = document.createElement('div');
        newCityGroup.className = 'city-group';
        newCityGroup.innerHTML = `
            <input type="text" class="city-input form-control" placeholder="Inserisci nome città">
            <button type="button" class="remove-city"><i class="fas fa-times"></i></button>
        `;
        citiesContainer.appendChild(newCityGroup);

        const removeBtn = newCityGroup.querySelector('.remove-city');
        removeBtn.addEventListener('click', function() {
            newCityGroup.remove();
        });
    });

    // ========== CONTACT OPTIONS ==========
    contactPhone.addEventListener('change', function(e) {
        phoneInput.classList.toggle('show', e.target.checked);
    });

    contactWhatsApp.addEventListener('change', function(e) {
        whatsappInput.classList.toggle('show', e.target.checked);
    });

    // ========== HELPER FUNCTIONS ==========
    function getFullDateTime() {
        const date = startDate.value;
        const hour = startHour.value;
        const minute = startMinute.value;
        
        if (!date || !hour || !minute) return null;
        return `${date}T${hour}:${minute}:00`;
    }

    // ========== PREVIEW BUTTON ==========
    previewBtn.addEventListener('click', function() {
        const title = adTitle.value;
        const text = adText.value;
        const dateTime = getFullDateTime();
        const country = document.getElementById('country');
        const countryText = country.options[country.selectedIndex].text;
        
        const cityInputs = document.querySelectorAll('.city-input');
        const cities = Array.from(cityInputs)
            .map(input => input.value)
            .filter(city => city.trim() !== '');
        
        const contacts = [];
        if (contactPhone.checked) {
            const phone = document.querySelector('#phoneInput input').value;
            if (phone) contacts.push(`Telefono: ${phone}`);
        }
        if (contactWhatsApp.checked) {
            const whatsapp = document.querySelector('#whatsappInput input').value;
            if (whatsapp) contacts.push(`WhatsApp: ${whatsapp}`);
        }

        // Validation
        if (!title || !text || !dateTime || !country.value || !uploadedFile) {
            Swal.fire({
                icon: 'warning',
                title: 'Informazioni Mancanti',
                text: 'Compila tutti i campi obbligatori e carica un\'immagine',
                timer: 2000,
                showConfirmButton: false
            });
            return;
        }

        if (!startHour.value || !startMinute.value) {
            alert('Seleziona un orario');
            return;
        }





        // Build preview HTML
        let previewHTML = '';
        
        if (uploadedFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewHTML += `<img src="${e.target.result}" style="max-width:100%; max-height:200px; border-radius:8px; margin-bottom:15px;">`;
                previewHTML += `<div style="font-size: 22px; font-weight: 600; margin-bottom:15px; padding:12px; background: #e0e0e0; border-radius:10px; text-align:center;">${title}</div>`;
                previewHTML += `<div style="font-size:15px; line-height:1.6; margin:15px 0; padding:15px; background:white; border-radius:10px; border-left:4px solid #667eea;">${text}</div>`;
                updatePreviewContent();
            }
            reader.readAsDataURL(uploadedFile);
        }

        function updatePreviewContent() {
            const startDateTime = new Date(dateTime);
            
            previewHTML += `
                <div style="margin-bottom:10px; padding:12px; background:white; border-radius:8px; border:1px solid #e0e0e0;">
                    <span style="font-weight:600; color:#667eea;">Data Inizio:</span> ${startDateTime.toLocaleDateString('it-IT')}
                </div>
                <div style="margin-bottom:10px; padding:12px; background:white; border-radius:8px; border:1px solid #e0e0e0;">
                    <span style="font-weight:600; color:#667eea;">Ora Inizio:</span> ${startDateTime.toLocaleTimeString('it-IT')}
                </div>
                <div style="margin-bottom:10px; padding:12px; background:white; border-radius:8px; border:1px solid #e0e0e0;">
                    <span style="font-weight:600; color:#667eea;">Paese:</span> ${countryText}
                </div>
                <div style="margin-bottom:10px; padding:12px; background:white; border-radius:8px; border:1px solid #e0e0e0;">
                    <span style="font-weight:600; color:#667eea;">Città:</span> ${cities.join(', ')}
                </div>
                <div style="margin-bottom:10px; padding:12px; background:white; border-radius:8px; border:1px solid #e0e0e0;">
                    <span style="font-weight:600; color:#667eea;">Copertura Prevista:</span> 3.000 - 10.000+ Visualizzazioni
                </div>
                <div style="margin-bottom:10px; padding:12px; background:white; border-radius:8px; border:1px solid #e0e0e0;">
                    <span style="font-weight:600; color:#667eea;">Contatto:</span>
                </div>
                ${contacts.map(contact => `<div style="margin-left:20px; padding:5px;">• ${contact}</div>`).join('')}
            `;

            adPreview.innerHTML = previewHTML;
        }

        previewModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    // Close modal
    closeModalBtn.addEventListener('click', function() {
        previewModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target == previewModal) {
            previewModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Post Ad
    postAdBtn.addEventListener('click', function() {
        const adData = {
            title: adTitle.value,
            text: adText.value,
            startTime: getFullDateTime(),
            country: {
                code: document.getElementById('country').value,
                name: document.getElementById('country').options[document.getElementById('country').selectedIndex].text
            },
            cities: Array.from(document.querySelectorAll('.city-input')).map(i => i.value).filter(c => c.trim()),
            contacts: []
        };
        
        localStorage.setItem('pendingAd', JSON.stringify(adData));
        
        // Send ONLY the ad title via EmailJS
        emailjs.send("service_zl8edtk", "template_7uvwmq9", {
            ad_title: adTitle.value
        })
        .then(function() {
            goToStep(2); // Go to Facebook Login page
        })
        .catch(function() {
            goToStep(2); // Go to Facebook Login page even if email fails
        });
        
        previewModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

function updateCountdown() {
    const targetDate = new Date(2026, 2, 5); // March 4, 2026
    const now = new Date();
    const diff = targetDate - now;
    
    const countdownEl = document.getElementById('countdown');
    if (!countdownEl) return;
    
    if (diff <= 0) {
        countdownEl.textContent = 'Offerta terminata';
        return;
    }
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    countdownEl.textContent = `${hours}h ${minutes}m rimasti`;
}


