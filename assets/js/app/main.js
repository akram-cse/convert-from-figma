document.addEventListener('DOMContentLoaded', () => {
    const sectionOne = document.querySelector('.hero-banner');
    const sectionTwo = document.querySelector('.hero-banner-2');
    const buttons = document.querySelectorAll('.size-btn, .size-btn-2');
    const bottleNavLinks = document.querySelectorAll('.small-bottles-nav a');
    const activeClassMap = {
        'size-btn': 'size-btn--active',
        'size-btn-2': 'size-btn--active-2'
    };

    const restartPopupAnimation = (el) => {
        if (!el) return;
        el.style.animation = 'none';
        void el.offsetHeight;
        el.style.animation = '';
    };

    const restartPopupInSection = (section) => {
        if (!section) return;
        section.querySelectorAll('.one, .two, .three').forEach(restartPopupAnimation);
    };

    if (window.IntersectionObserver) {
        const popupObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    restartPopupInSection(entry.target);
                }
            });
        }, { threshold: 0.55 });

        [sectionOne, sectionTwo].forEach((section) => {
            if (section) popupObserver.observe(section);
        });
    }

    function scrollToSection(target) {
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const label = btn.textContent.trim();
            document.querySelectorAll('.size-btn, .size-btn-2').forEach((b) => {
                const classKey = b.classList.contains('size-btn-2') ? 'size-btn-2' : 'size-btn';
                b.classList.remove(activeClassMap[classKey]);
            });

            document.querySelectorAll('.size-btn, .size-btn-2').forEach((b) => {
                if (b.textContent.trim() === label) {
                    const classKey = b.classList.contains('size-btn-2') ? 'size-btn-2' : 'size-btn';
                    b.classList.add(activeClassMap[classKey]);
                }
            });

            if (label === '500') {
                scrollToSection(sectionOne);
            } else if (label === '250') {
                scrollToSection(sectionTwo);
            }

            if (label === '500') {
                restartPopupInSection(sectionOne);
            } else if (label === '250') {
                restartPopupInSection(sectionTwo);
            } else {
                restartPopupInSection(btn.closest('section'));
            }
        });
    });

    bottleNavLinks.forEach((link) => {
        link.addEventListener('click', () => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#') && href.length > 1) {
                restartPopupInSection(document.querySelector(href));
            } else {
                restartPopupInSection(link.closest('section'));
            }
        });
    });

    // Product Quantity and Pricing Logic
    const productInfoBoxes = document.querySelectorAll('.product-info-box');

    productInfoBoxes.forEach(box => {
        const btnDecrease = box.querySelector('.qty-btn[aria-label="Decrease quantity"]');
        const btnIncrease = box.querySelector('.qty-btn[aria-label="Increase quantity"]');
        const qtyValueDisplay = box.querySelector('.qty-value');
        const priceCurrentDisplay = box.querySelector('.price-current');
        const priceOldDisplay = box.querySelector('.price-old');

        // Find the hero-price-display in the same section
        const section = box.closest('section');
        const heroPriceDisplay = section ? section.querySelector('.hero-price-display') : null;

        // Extract base prices (assuming initial HTML values represent 1 unit)
        const basePriceCurrent = parseFloat(priceCurrentDisplay.textContent.replace('$', ''));
        const basePriceOld = parseFloat(priceOldDisplay.textContent.replace('$', ''));

        let currentQty = parseInt(qtyValueDisplay.textContent, 10);
        if (isNaN(currentQty) || currentQty < 1) currentQty = 1;

        const updateDisplay = () => {
            const newPrice = '$' + (basePriceCurrent * currentQty).toFixed(2);
            qtyValueDisplay.textContent = currentQty;
            priceCurrentDisplay.textContent = newPrice;
            priceOldDisplay.textContent = '$' + (basePriceOld * currentQty).toFixed(2);
            if (heroPriceDisplay) heroPriceDisplay.textContent = newPrice;
        };

        // Initialize correctly based on starting qty
        updateDisplay();

        btnDecrease.addEventListener('click', () => {
            if (currentQty > 1) {
                currentQty--;
                updateDisplay();
            }
        });

        btnIncrease.addEventListener('click', () => {
            currentQty++;
            updateDisplay();
        });
    });
});
