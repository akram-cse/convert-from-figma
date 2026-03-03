  document.addEventListener('DOMContentLoaded', () => {
            const sectionOne = document.querySelector('.hero-banner');
            const sectionTwo = document.querySelector('.hero-banner-2');
            const buttons = document.querySelectorAll('.size-btn, .size-btn-2');

            function scrollToSection(target) {
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }

            buttons.forEach((btn) => {
                btn.addEventListener('click', () => {
                    const label = btn.textContent.trim();
                    const isSecondGroup = btn.classList.contains('size-btn-2');
                    const groupSelector = isSecondGroup ? '.size-btn-2' : '.size-btn';
                    const activeClass = isSecondGroup ? 'size-btn--active-2' : 'size-btn--active';

                    document.querySelectorAll(groupSelector).forEach((b) => b.classList.remove(activeClass));
                    btn.classList.add(activeClass);

                    if (label === '500') {
                        scrollToSection(sectionOne);
                    } else if (label === '200' || label === '250') {
                        scrollToSection(sectionTwo);
                    }
                });
            });
        });