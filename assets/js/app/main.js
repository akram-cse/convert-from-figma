  document.addEventListener('DOMContentLoaded', () => {
            const sectionOne = document.querySelector('.hero-banner');
            const sectionTwo = document.querySelector('.hero-banner-2');
            const buttons = document.querySelectorAll('.size-btn, .size-btn-2');
            const activeClassMap = {
                'size-btn': 'size-btn--active',
                'size-btn-2': 'size-btn--active-2'
            };

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
                });
            });
        });
