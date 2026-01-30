// Moved from HTML <script> block
// Language Toggle Functionality
const langEnBtn = document.getElementById('langEn');
const langNpBtn = document.getElementById('langNp');

function setLanguage(lang) {
    const englishElements = document.querySelectorAll('.en-text');
    const nepaliElements = document.querySelectorAll('.np-text');
    
    if (lang === 'en') {
        englishElements.forEach(el => el.style.display = 'inline');
        nepaliElements.forEach(el => el.style.display = 'none');
        document.body.classList.remove('nepali');
        langEnBtn.classList.add('active');
        langNpBtn.classList.remove('active');
    } else {
        englishElements.forEach(el => el.style.display = 'none');
        nepaliElements.forEach(el => el.style.display = 'inline');
        document.body.classList.add('nepali');
        langEnBtn.classList.remove('active');
        langNpBtn.classList.add('active');
    }
    
    // Update input placeholders
    if (lang === 'en') {
        document.getElementById('problemSearch').style.display = 'block';
        document.getElementById('problemSearchNp').style.display = 'none';
        document.getElementById('problemDescription').style.display = 'block';
        document.getElementById('problemDescriptionNp').style.display = 'none';
    } else {
        document.getElementById('problemSearch').style.display = 'none';
        document.getElementById('problemSearchNp').style.display = 'block';
        document.getElementById('problemDescription').style.display = 'none';
        document.getElementById('problemDescriptionNp').style.display = 'block';
    }
    
    // Save language preference
    localStorage.setItem('sagarAutoLanguage', lang);
}

langEnBtn.addEventListener('click', () => setLanguage('en'));
langNpBtn.addEventListener('click', () => setLanguage('np'));

// Check saved language preference
const savedLang = localStorage.getItem('sagarAutoLanguage') || 'en';
setLanguage(savedLang);

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');

mobileMenuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (mainNav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a, .mobile-book-btn').forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
    });
});

// Vehicle Slideshow
const slides = document.querySelectorAll('.vehicle-slide');
let currentSlide = 0;

function showNextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

setInterval(showNextSlide, 5000);

// Tab functionality
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        button.classList.add('active');
        const tabId = button.getAttribute('data-tab') + '-tab';
        document.getElementById(tabId).classList.add('active');
    });
});

// Accordion functionality
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const icon = header.querySelector('.accordion-icon i');
        
        content.classList.toggle('active');
        
        if (content.classList.contains('active')) {
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        } else {
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        }
    });
});

// Problem Search Functionality
const problemSearch = document.getElementById('problemSearch');
const problemSearchNp = document.getElementById('problemSearchNp');
const searchResults = document.getElementById('searchResults');

function performSearch(searchTerm) {
    if (searchTerm.length < 2) {
        searchResults.style.display = 'none';
        return;
    }
    
    const results = [];
    const searchTermLower = searchTerm.toLowerCase();
    
    // Search in all accordions
    document.querySelectorAll('.problem-accordion').forEach(accordion => {
        const title = accordion.querySelector('.accordion-header h4').textContent.toLowerCase();
        const content = accordion.querySelector('.accordion-content').textContent.toLowerCase();
        
        if (title.includes(searchTermLower) || content.includes(searchTermLower)) {
            results.push({
                title: accordion.querySelector('.accordion-header h4').textContent,
                element: accordion
            });
        }
    });
    
    // Display results
    if (results.length > 0) {
        const isNepali = document.body.classList.contains('nepali');
        searchResults.innerHTML = `
            <h4>${isNepali ? 'फेला पर्यो' : 'Found'} ${results.length} ${isNepali ? 'नतिजा' : 'results'}:</h4>
            <ul style="margin-top: 10px; padding-left: 20px;">
                ${results.map(result => `<li style="margin-bottom: 8px; cursor: pointer; color: var(--nepali-red);" onclick="scrollToProblem('${result.title}')">${result.title}</li>`).join('')}
            </ul>
        `;
        searchResults.style.display = 'block';
    } else {
        const isNepali = document.body.classList.contains('nepali');
        searchResults.innerHTML = `<p>${isNepali ? 'कुनै मिल्ने समस्या फेला परेन। फरक कीवर्ड प्रयास गर्नुहोस्।' : 'No matching problems found. Try different keywords.'}</p>`;
        searchResults.style.display = 'block';
    }
}

problemSearch.addEventListener('input', function() {
    performSearch(this.value);
});

problemSearchNp.addEventListener('input', function() {
    performSearch(this.value);
});

// Close search results when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.problem-search')) {
        searchResults.style.display = 'none';
    }
});

// Comprehensive Solutions Database
const solutionsDB = {
    car: {
        engine: [
            {
                title: {en: "Engine Overheating", np: "इन्जिन ओभरहिटिङ"},
                causes: {en: ["Low coolant level", "Faulty thermostat", "Radiator blockage", "Water pump failure"], np: ["कम कूलेंट स्तर", "गलत थर्मोस्ट्याट", "रेडिएटर ब्लकेज", "पानी पम्प असफलता"]},
                solution: {en: "1. Turn off AC, turn heater to max\n2. Pull over safely and turn off engine\n3. Wait 30+ minutes before checking coolant\n4. Add coolant if low\n5. Visit workshop for pressure test", np: "१. AC बन्द गर्नुहोस्, हिटर अधिकतममा खोल्नुहोस्\n२. सुरक्षित ठाउँमा रोक्नुहोस् र इन्जिन बन्द गर्नुहोस्\n३. कूलेंट जाँच गर्नु अघि ३०+ मिनेट पर्खनुहोस्\n४. कम भएमा कूलेंट थप्नुहोस्\n५. प्रेशर टेस्टको लागि वर्कशप भ्रमण गर्नुहोस्"},
                urgency: {en: "High - Can cause engine damage", np: "उच्च - इन्जिन क्षति हुन सक्छ"}
            }
        ],
        electrical: [
            {
                title: {en: "Battery Dead/Weak", np: "ब्याट्री मृत/कमजोर"},
                causes: {en: ["Old battery", "Parasitic drain", "Alternator failure"], np: ["पुरानो ब्याट्री", "परजीवी ड्रेन", "अल्टरनेटर असफलता"]},
                solution: {en: "1. Jump start if possible\n2. Clean battery terminals\n3. Test alternator output\n4. Replace battery if >3 years old", np: "१. सम्भव भएमा जम्प स्टार्ट गर्नुहोस्\n२. ब्याट्री टर्मिनल सफा गर्नुहोस्\n३. अल्टरनेटर आउटपुट टेस्ट गर्नुहोस्\n४. ब्याट्री ३ वर्षभन्दा पुरानो भए प्रतिस्थापन गर्नुहोस्"},
                urgency: {en: "Medium", np: "मध्यम"}
            }
        ]
    },
    bus: {
        transmission: [
            {
                title: {en: "Gear Slipping", np: "गियर स्लिपिङ"},
                causes: {en: ["Low transmission fluid", "Worn clutch", "Solenoid issues"], np: ["कम ट्रान्समिसन फ्लुइड", "घाटिएको क्लच", "सोलेनोइड समस्या"]},
                solution: {en: "1. Check fluid level and condition\n2. Avoid heavy loads temporarily\n3. Professional diagnosis needed", np: "१. फ्लुइड स्तर र अवस्था जाँच गर्नुहोस्\n२. अस्थायी रूपमा भारी बोझबाट टाढा रहनुहोस्\n३. पेशेवर डायग्नोसिस आवश्यक"},
                urgency: {en: "High", np: "उच्च"}
            }
        ]
    },
    bike: {
        starting: [
            {
                title: {en: "Won't Start", np: "स्टार्ट हुँदैन"},
                causes: {en: ["Dead battery", "Bad spark plug", "Fuel issues"], np: ["मृत ब्याट्री", "खराब स्पार्क प्लग", "इन्धन समस्या"]},
                solution: {en: "1. Check battery voltage (12.6V+)\n2. Inspect spark plug\n3. Check fuel flow\n4. Clean carburetor", np: "१. ब्याट्री भोल्टेज जाँच गर्नुहोस् (१२.६V+)\n२. स्पार्क प्लग निरीक्षण गर्नुहोस्\n३. इन्धन प्रवाह जाँच गर्नुहोस्\n४. कार्बुरेटर सफा गर्नुहोस्"},
                urgency: {en: "Medium", np: "मध्यम"}
            }
        ]
    }
};



// Get Quick Solution Function
function getQuickSolution() {
    const vehicleType = document.getElementById('vehicleType').value;
    const problemType = document.getElementById('problemType').value;
    const isNepali = document.body.classList.contains('nepali');
    const description = isNepali ? 
        document.getElementById('problemDescriptionNp').value.toLowerCase() : 
        document.getElementById('problemDescription').value.toLowerCase();
    
    const resultDiv = document.getElementById('solutionResult');
    const contentDiv = document.getElementById('solutionContent');
    
    // Clear previous results
    contentDiv.innerHTML = '';
    
    // Get matching solutions
    let matchingSolutions = [];
    
    if (solutionsDB[vehicleType] && solutionsDB[vehicleType][problemType]) {
        matchingSolutions = solutionsDB[vehicleType][problemType];
    }
    
    if (matchingSolutions.length > 0) {
        matchingSolutions.forEach((solution, index) => {
            const solutionItem = document.createElement('div');
            solutionItem.className = 'solution-item';
            const title = isNepali ? solution.title.np : solution.title.en;
            const causes = isNepali ? solution.causes.np.join(', ') : solution.causes.en.join(', ');
            const solutionText = isNepali ? solution.solution.np : solution.solution.en;
            const urgency = isNepali ? solution.urgency.np : solution.urgency.en;
            
            solutionItem.innerHTML = `
                <h5><i class="fas fa-wrench"></i> ${title}</h5>
                <p><strong><i class="fas fa-exclamation-circle"></i> ${isNepali ? 'साधारण कारणहरू:' : 'Common Causes:'}</strong> ${causes}</p>
                <p><strong><i class="fas fa-lightbulb"></i> ${isNepali ? 'समाधान चरणहरू:' : 'Solution Steps:'}</strong></p>
                <div style="background: rgba(0,0,0,0.1); padding: 10px; border-radius: 5px; margin: 10px 0; white-space: pre-line;">
                    ${solutionText}
                </div>
                <p><strong><i class="fas fa-clock"></i> ${isNepali ? 'आवश्यकता:' : 'Urgency:'}</strong> 
                    <span style="color: #e74c3c; font-weight: bold;">
                        ${urgency}
                    </span>
                </p>
            `;
            contentDiv.appendChild(solutionItem);
        });
        
        // Add emergency contact
        const emergencyItem = document.createElement('div');
        emergencyItem.className = 'solution-item';
        emergencyItem.style.borderLeftColor = 'var(--accent-red)';
        emergencyItem.innerHTML = `
            <h5><i class="fas fa-ambulance"></i> ${isNepali ? 'आपतकालीन सहायता' : 'Emergency Assistance'}</h5>
            <p>${isNepali ? 'यदि तपाईंको समस्यालाई तत्काल ध्यान चाहिन्छ वा DIY समाधानबारे अनिश्चित हुनुहुन्छ:' : 'If your problem requires immediate attention or you\'re unsure about DIY solutions:'}</p>
            <div style="display: flex; gap: 15px; margin-top: 15px; flex-wrap: wrap;">
                <button class="cta-button" onclick="showContactOptions()" style="background-color: var(--accent-red);">
                    <i class="fas fa-phone"></i> ${isNepali ? 'अहिले कल गर्नुहोस्:' : 'Call Now:'} 9862790956
                </button>
                <button class="cta-button" onclick="window.open('https://wa.me/9779862790956?text=${isNepali ? 'नमस्ते सागर अटो केयर, मलाई मेरो सवारीसँग मद्दत चाहिएको छ...' : 'Hello Sagar Auto Care, I need help with my vehicle...'}', '_blank')">
                    <i class="fab fa-whatsapp"></i> WhatsApp
                </button>
            </div>
        `;
        contentDiv.appendChild(emergencyItem);
        
        resultDiv.style.display = 'block';
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        const noMatchText = isNepali ? 
            'आफ्नो विवरणको आधारमा, हामी सिफारिश गर्छौं:' : 
            'Based on your description, we recommend:';
        const basicChecks = isNepali ? 'आधारभूत जाँचहरू:' : 'Basic Checks:';
        const basicList = isNepali ? 
            ['सबै फ्लुइड स्तर जाँच गर्नुहोस् (तेल, कूलेंट, ब्रेक फ्लुइड)', 'टायर प्रेशर जाँच गर्नुहोस्', 'सवारीमुनि दृश्यात्मक लिकहरू हेर्नुहोस्', 'ब्याट्री कनेक्सन जाँच गर्नुहोस्'] :
            ['Check all fluid levels (oil, coolant, brake fluid)', 'Check tire pressure', 'Look for visible leaks under vehicle', 'Check battery connections'];
        const professionalText = isNepali ? 
            'केही समस्याहरूले सही डायग्नोसिसको लागि विशेष उपकरणहरू आवश्यक पार्छन्।' : 
            'Some problems require specialized equipment for accurate diagnosis.';
        const scheduleText = isNepali ? 'डायग्नोस्टिक अपोइन्टमेन्ट तालिका बनाउनुहोस्' : 'Schedule Diagnostic Appointment';
        
        contentDiv.innerHTML = `
            <div class="solution-item">
                <h5><i class="fas fa-info-circle"></i> ${isNepali ? 'कुनै सटीक मिल्ने फेला परेन' : 'No Exact Match Found'}</h5>
                <p>${noMatchText}</p>
                <div style="background: rgba(0,0,0,0.1); padding: 15px; border-radius: 5px; margin: 15px 0;">
                    <p><strong>${basicChecks}</strong></p>
                    <ul style="padding-left: 20px; margin-bottom: 15px;">
                        ${basicList.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                    
                    <p><strong>${isNepali ? 'पेशेवर डायग्नोसिस:' : 'Professional Diagnosis:'}</strong></p>
                    <p>${professionalText}</p>
                </div>
                <button class="cta-button book-cta" onclick="openAppointmentModal()">
                    <i class="fas fa-phone"></i> ${scheduleText}
                </button>
            </div>
        `;
        resultDiv.style.display = 'block';
    }
}

// Utility Functions
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToProblem(problemTitle) {
    const allAccordions = document.querySelectorAll('.problem-accordion');
    allAccordions.forEach(accordion => {
        const title = accordion.querySelector('.accordion-header h4').textContent;
        if (title === problemTitle) {
            // Open the accordion
            const content = accordion.querySelector('.accordion-content');
            const icon = accordion.querySelector('.accordion-icon i');
            content.classList.add('active');
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
            
            // Scroll to it
            accordion.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Highlight briefly
            accordion.style.boxShadow = '0 0 0 3px var(--nepali-red)';
            setTimeout(() => {
                accordion.style.boxShadow = '';
            }, 2000);
        }
    });
    searchResults.style.display = 'none';
}

// Appointment Modal Functions
const appointmentModal = document.getElementById('appointmentModal');
const closeModal = document.getElementById('closeModal');
const appointmentForm = document.getElementById('appointmentForm');

function openAppointmentModal() {
    appointmentModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAppointmentModal() {
    appointmentModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Add event listeners to all book appointment buttons
document.querySelectorAll('.book-appointment-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        openAppointmentModal();
    });
});

closeModal.addEventListener('click', closeAppointmentModal);

// Close modal when clicking outside
appointmentModal.addEventListener('click', (e) => {
    if (e.target === appointmentModal) {
        closeAppointmentModal();
    }
});

// Form submission
appointmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // ... (kept unchanged)
});

// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
document.getElementById('appointmentDate').min = today;

// Contact Options
function showContactOptions() {
    const isNepali = document.body.classList.contains('nepali');
    const optionsHTML = `...`;
    document.body.insertAdjacentHTML('beforeend', optionsHTML);
}

// Google Maps Integration
function initMap() { /* ... */ }
function openGoogleMaps() { window.open('https://maps.googleapis.com'); }

// Load Google Maps API
function loadGoogleMaps() { /* ... */ }

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.7)';
    } else {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.5)';
    }
});

// Initialize with first accordion open
document.addEventListener('DOMContentLoaded', function() {
    const firstAccordion = document.querySelector('.accordion-content');
    if (firstAccordion) {
        firstAccordion.classList.add('active');
        const firstIcon = document.querySelector('.accordion-icon i');
        if (firstIcon) {
            firstIcon.classList.remove('fa-chevron-down');
            firstIcon.classList.add('fa-chevron-up');
        }
    }
    
    // Load Google Maps
    loadGoogleMaps();
    
    // Set today's date as default for appointment
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    document.getElementById('appointmentDate').value = tomorrowStr;
});
