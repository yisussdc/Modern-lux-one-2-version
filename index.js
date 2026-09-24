/**
 * Modern Lux One - Client-Side Interactive Script
 * Features: Left Drawer Nav, Accordion, Hero Slider, Scrollspy, B/A Sliders, Form Validation
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. Left Sidebar Drawer Navigation
       ========================================================================== */
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const openSidebarBtn = document.getElementById('openSidebarBtn');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    const sidebarNavLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
    const dropdownLinks = document.querySelectorAll('.dropdown-link');
    
    // Toggle Sidebar
    function toggleSidebar(state) {
        if (state === 'open') {
            sidebar.classList.add('active');
            sidebarOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling background
        } else {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    openSidebarBtn.addEventListener('click', () => toggleSidebar('open'));
    closeSidebarBtn.addEventListener('click', () => toggleSidebar('close'));
    sidebarOverlay.addEventListener('click', () => toggleSidebar('close'));
    
    // Close sidebar on link click
    sidebarNavLinks.forEach(link => {
        link.addEventListener('click', () => toggleSidebar('close'));
    });
    dropdownLinks.forEach(link => {
        link.addEventListener('click', () => toggleSidebar('close'));
    });
    
    // Accordion for Services Dropdown in Sidebar
    const servicesDropdownToggle = document.getElementById('servicesDropdownToggle');
    const hasDropdownLi = servicesDropdownToggle.closest('.has-dropdown');
    
    servicesDropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        hasDropdownLi.classList.toggle('open');
    });


    /* ==========================================================================
       2. Sticky Header Scroll Effect
       ========================================================================== */
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    /* ==========================================================================
       3. Hero Slideshow Background Slider
       ========================================================================== */
    const heroSlides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    const slideIntervalTime = 5000; // 5 seconds
    
    function nextHeroSlide() {
        heroSlides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % heroSlides.length;
        heroSlides[currentSlide].classList.add('active');
    }
    
    // Initialize slideshow if elements exist
    if (heroSlides.length > 0) {
        setInterval(nextHeroSlide, slideIntervalTime);
    }


    /* ==========================================================================
       4. Active Navigation Highlight on Scroll (Scrollspy)
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; // offset for sticky header
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });


    /* ==========================================================================
       5. Interactive Before / Después Comparison Sliders
       ========================================================================== */
    
    // Set up comparison slider logic
    function initBeforeAfterSlider(containerId, handleId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const handle = container.querySelector('.slider-handle');
        const afterImage = container.querySelector('.image-after');
        let isDragging = false;

        function updateSlider(clientX) {
            const rect = container.getBoundingClientRect();
            // Get position relative to container
            let x = clientX - rect.left;
            
            // Clamp position within boundaries
            if (x < 0) x = 0;
            if (x > rect.width) x = rect.width;
            
            // Calculate percentage
            const percentage = (x / rect.width) * 100;
            
            // Set styles
            handle.style.left = `${percentage}%`;
            afterImage.style.width = `${percentage}%`;
        }

        // Mouse Events
        handle.addEventListener('mousedown', (e) => {
            isDragging = true;
            e.preventDefault();
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            updateSlider(e.clientX);
        });

        // Touch Events (Mobile Support)
        handle.addEventListener('touchstart', (e) => {
            isDragging = true;
        });

        window.addEventListener('touchend', () => {
            isDragging = false;
        });

        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            if (e.touches.length > 0) {
                updateSlider(e.touches[0].clientX);
            }
        });

        // Click on slider to jump to position
        container.addEventListener('click', (e) => {
            // Only jump if we didn't click the handle button directly to avoid double triggers
            if (e.target.closest('.handle-button')) return;
            updateSlider(e.clientX);
        });
    }

    // Initialize both sliders
    initBeforeAfterSlider('project-roofing', 'sliderHandleRoof');
    initBeforeAfterSlider('project-kitchen', 'sliderHandleKitchen');

    // Tab Switching Logic
    const tabRoofing = document.getElementById('tabRoofing');
    const tabKitchen = document.getElementById('tabKitchen');
    const projectRoofing = document.getElementById('project-roofing');
    const projectKitchen = document.getElementById('project-kitchen');

    function switchProject(projectType) {
        if (projectType === 'roofing') {
            tabRoofing.classList.add('active');
            tabKitchen.classList.remove('active');
            projectRoofing.classList.add('active');
            projectKitchen.classList.remove('active');
            
            // Reset sliding state to center
            const handle = projectRoofing.querySelector('.slider-handle');
            const afterImg = projectRoofing.querySelector('.image-after');
            if (handle && afterImg) {
                handle.style.left = '50%';
                afterImg.style.width = '50%';
            }
        } else {
            tabRoofing.classList.remove('active');
            tabKitchen.classList.add('active');
            projectRoofing.classList.remove('active');
            projectKitchen.classList.add('active');
            
            // Reset sliding state to center
            const handle = projectKitchen.querySelector('.slider-handle');
            const afterImg = projectKitchen.querySelector('.image-after');
            if (handle && afterImg) {
                handle.style.left = '50%';
                afterImg.style.width = '50%';
            }
        }
    }

    if (tabRoofing && tabKitchen) {
        tabRoofing.addEventListener('click', () => switchProject('roofing'));
        tabKitchen.addEventListener('click', () => switchProject('kitchen'));
    }


    /* ==========================================================================
       6. Timeline Completion Highlight on Scroll
       ========================================================================== */
    const timelineSteps = document.querySelectorAll('.timeline-step');
    
    function checkTimelineScroll() {
        const triggerBottom = window.innerHeight * 0.85;
        
        timelineSteps.forEach(step => {
            const stepTop = step.getBoundingClientRect().top;
            
            if (stepTop < triggerBottom) {
                step.classList.add('completed');
            } else {
                step.classList.remove('completed');
            }
        });
    }
    
    window.addEventListener('scroll', checkTimelineScroll);
    checkTimelineScroll(); // Run once initially

/* ==========================================================================
       7. Lead Form Validation & Dynamic Submission
       ========================================================================== */
    const leadForm = document.getElementById('leadForm');
    const formCard = document.getElementById('formCard');
    const formSuccessCard = document.getElementById('formSuccessCard');
    const btnSubmitForm = document.getElementById('btnSubmitForm');
    const btnResetForm = document.getElementById('btnResetForm');
    
    // Auto-format phone input: (XXX) XXX-XXXX
    const phoneInput = document.getElementById('clientPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let input = e.target.value.replace(/\D/g, ''); // strip non-digits
            if (input.length > 10) input = input.substring(0, 10);
            
            let formatted = '';
            if (input.length > 0) formatted += '(' + input.substring(0, 3);
            if (input.length > 3) formatted += ') ' + input.substring(3, 6);
            if (input.length > 6) formatted += '-' + input.substring(6, 10);
            
            e.target.value = formatted;
        });
    }

    // ZIP code digits only validation
    const zipInput = document.getElementById('clientZip');
    if (zipInput) {
        zipInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '').substring(0, 5);
        });
    }

    // Validation function
    function validateForm() {
        let isValid = true;
        
        // 1. Name
        const nameInput = document.getElementById('clientName');
        const nameGroup = nameInput.closest('.form-group');
        if (nameInput.value.trim().length < 3) {
            nameGroup.classList.add('has-error');
            isValid = false;
        } else {
            nameGroup.classList.remove('has-error');
        }
        
        // 2. Phone
        const phoneGroup = phoneInput.closest('.form-group');
        const rawPhone = phoneInput.value.replace(/\D/g, '');
        if (rawPhone.length !== 10) {
            phoneGroup.classList.add('has-error');
            isValid = false;
        } else {
            phoneGroup.classList.remove('has-error');
        }
        
        // 3. Zip Code (Florida ZIPs: 32xxx, 33xxx, 34xxx)
        const zipGroup = zipInput.closest('.form-group');
        const rawZip = zipInput.value.trim();
        const flZipRegex = /^(32|33|34)\d{3}$/;
        if (!flZipRegex.test(rawZip)) {
            zipGroup.classList.add('has-error');
            isValid = false;
        } else {
            zipGroup.classList.remove('has-error');
        }
        
        // 4. Property Owner Radio
        const ownerRadios = document.getElementsByName('propertyOwner');
        const ownerGroup = ownerRadios[0].closest('.form-group');
        let radioChecked = false;
        for (const radio of ownerRadios) {
            if (radio.checked) {
                radioChecked = true;
                break;
            }
        }
        if (!radioChecked) {
            ownerGroup.classList.add('has-error');
            isValid = false;
        } else {
            ownerGroup.classList.remove('has-error');
        }
        
        // 5. Damage Type Select
        const damageSelect = document.getElementById('damageType');
        const damageGroup = damageSelect.closest('.form-group');
        if (damageSelect.value === "") {
            damageGroup.classList.add('has-error');
            isValid = false;
        } else {
            damageGroup.classList.remove('has-error');
        }
        
        return isValid;
    }

    // Submit handler para la API de FastAPI / Python
    if (leadForm) {
        leadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!validateForm()) {
                const firstError = document.querySelector('.form-group.has-error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }
            
            btnSubmitForm.disabled = true;
            btnSubmitForm.classList.add('loading');
            
            // Mapeo de propietario
            const ownerRadio = document.querySelector('input[name="propertyOwner"]:checked');
            const propietarioValor = ownerRadio ? (ownerRadio.value === 'si' ? 'Sí, es propietario' : 'No es propietario') : 'No especificado';

            // Mapeo de antigüedad de techo
            const roofAgeSelect = document.getElementById('roofAge');
            const roofAgeValue = roofAgeSelect ? roofAgeSelect.options[roofAgeSelect.selectedIndex].text : 'No especificado';

            // Mapeo de tipo de necesidad
            const damageSelect = document.getElementById('damageType');
            const damageValue = damageSelect ? damageSelect.options[damageSelect.selectedIndex].text : 'No especificado';

            // Construir el JSON exacto que espera tu main.py
            const datosFormulario = {
                nombre: document.getElementById('clientName').value.trim(),
                telefono: document.getElementById('clientPhone').value,
                codigo_postal: document.getElementById('clientZip').value.trim(),
                propietario: propietarioValor,
                necesidad: damageValue,
                antiguedad_techo: roofAgeValue,
                detalles_caso: document.getElementById('description').value.trim() || 'Sin detalles adicionales',
                acepto_terminos: true
            };

            try {
                // Petición a tu API local
                const response = await fetch('https://backend-inspecciones-72xj.onrender.com/api/solicitar-inspeccion', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(datosFormulario)
                });

                const result = await response.json();

                if (response.ok) {
                    const randomCase = 'ML1-' + Math.floor(1000 + Math.random() * 9000);
                    const summaryCaseEl = document.getElementById('summaryCaseNo');
                    if (summaryCaseEl) summaryCaseEl.textContent = randomCase;
                    
                    formCard.style.display = 'none';
                    formSuccessCard.classList.add('active');
                    document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
                } else {
                    alert('Error del servidor: ' + (result.detail || 'No se pudo procesar la solicitud.'));
                }
            } catch (error) {
                console.error('Error de red/conexión:', error);
                alert('No se pudo conectar con el servidor de Python. Asegúrate de que uvicorn esté corriendo en el puerto 8000.');
            } finally {
                btnSubmitForm.disabled = false;
                btnSubmitForm.classList.remove('loading');
            }
        });
    }
    
    // Reset form handler
    if (btnResetForm) {
        btnResetForm.addEventListener('click', () => {
            leadForm.reset();
            formSuccessCard.classList.remove('active');
            formCard.style.display = 'block';
            
            const errorGroups = document.querySelectorAll('.form-group.has-error');
            errorGroups.forEach(group => group.classList.remove('has-error'));
        });
    }
})
