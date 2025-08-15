document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const isMobile = window.innerWidth <= 768;
    
    // Add loading class initially
    body.classList.add('loading');
    
    // After animation completes, remove loading and add loaded
    setTimeout(() => {
        body.classList.remove('loading');
        body.classList.add('loaded');
        
        // On mobile, show about section after loading but don't override the title
        if (isMobile) {
            const aboutSection = document.querySelector('#about');
            if (aboutSection && !document.querySelector('.section.active')) {
                aboutSection.classList.add('active');
                const mobileSectionTitle = document.querySelector('.mobile-section-title');
                if (mobileSectionTitle) {
                    mobileSectionTitle.textContent = '[ ABOUT ]';
                }
                // Set initial mobile nav brackets for about
                setTimeout(() => {
                    updateMobileNavBrackets('about');
                }, 100);
            }
        }
    }, 5000);
    
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // Function to update nav link opacities
    const updateNavOpacity = (activeLink) => {
        navLinks.forEach(link => {
            if (link === activeLink) {
                link.classList.remove('inactive');
                link.classList.add('active');
            } else {
                link.classList.remove('active');
                link.classList.add('inactive');
            }
        });
        console.log('Updated nav opacity - active link:', activeLink.textContent);
    };

    // Function to update mobile nav brackets
    const updateMobileNavBrackets = (activeSection) => {
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            const href = link.getAttribute('href');
            const sectionId = href ? href.replace('#', '') : '';
            const originalText = link.textContent.replace(/^\[ /, '').replace(/ \]$/, '');
            
            if (sectionId === activeSection) {
                link.textContent = `[ ${originalText} ]`;
            } else {
                link.textContent = originalText;
            }
        });
    };
    
    // Function to show specific section
    const showSection = (targetId) => {
        sections.forEach(section => {
            if (section.id === targetId) {
                section.classList.add('active');
                
                // Mobile animations
                if (window.innerWidth <= 768) {
                    // About section animation
                    if (targetId === 'about') {
                        const aboutContent = section.querySelector('.about-content');
                        const aboutContentBottom = section.querySelector('.about-content-bottom');
                        
                        // Reset animations
                        if (aboutContent) {
                            aboutContent.style.opacity = '0';
                            aboutContent.style.transform = 'translateY(20px)';
                        }
                        if (aboutContentBottom) {
                            aboutContentBottom.style.opacity = '0';
                            aboutContentBottom.style.transform = 'translateY(20px)';
                        }
                        
                        // Trigger animations with delay
                        setTimeout(() => {
                            if (aboutContent) {
                                aboutContent.style.transition = 'all 0.6s ease';
                                aboutContent.style.opacity = '1';
                                aboutContent.style.transform = 'translateY(0)';
                            }
                            if (aboutContentBottom) {
                                setTimeout(() => {
                                    aboutContentBottom.style.transition = 'all 0.6s ease';
                                    aboutContentBottom.style.opacity = '1';
                                    aboutContentBottom.style.transform = 'translateY(0)';
                                }, 200);
                            }
                        }, 300);
                    }
                    
                    // Studies section animation
                    if (targetId === 'studies') {
                        const studiesContent = section.querySelector('.studies-content');
                        const educationCards = section.querySelectorAll('.education-card');
                        
                        // Reset animations
                        if (studiesContent) {
                            studiesContent.classList.remove('visible');
                        }
                        educationCards.forEach(card => {
                            card.classList.remove('visible');
                        });
                        
                        // Trigger animations with delay
                        setTimeout(() => {
                            educationCards.forEach((card, index) => {
                                setTimeout(() => {
                                    card.classList.add('visible');
                                }, 100 + (index * 150));
                            });
                            // Show paragraph after cards
                            if (studiesContent) {
                                setTimeout(() => {
                                    studiesContent.classList.add('visible');
                                }, 400);
                            }
                        }, 300);
                    }
                } else {
                    // Desktop animation for Studies
                    if (targetId === 'studies') {
                        const cards = section.querySelectorAll('.education-card');
                        cards.forEach((card, index) => {
                            card.style.animation = 'none';
                            setTimeout(() => {
                                card.style.animation = '';
                            }, 10);
                        });
                    }
                }
            } else {
                section.classList.remove('active');
            }
        });
        
        // Update mobile nav brackets
        updateMobileNavBrackets(targetId);
    };
    
    // Don't show any section by default on desktop - wait for user click
    // No nav links are active initially on desktop
    
    // Mobile menu functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const mobileSectionTitle = document.querySelector('.mobile-section-title');
    
    if (menuToggle && mobileMenuOverlay) {
        menuToggle.addEventListener('click', () => {
            mobileMenuOverlay.classList.add('active');
            body.classList.add('menu-open');
        });
    }
    
    if (menuClose && mobileMenuOverlay) {
        menuClose.addEventListener('click', () => {
            mobileMenuOverlay.classList.remove('active');
            body.classList.remove('menu-open');
        });
    }
    
    // Mobile nav links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            mobileMenuOverlay.classList.remove('active');
            body.classList.remove('menu-open');
            
            const target = link.getAttribute('href');
            if (target && target !== '#') {
                const targetId = target.replace('#', '');
                showSection(targetId);
                
                // Update mobile section title
                if (mobileSectionTitle) {
                    const sectionName = link.textContent.replace('[', '').replace(']', '').trim();
                    mobileSectionTitle.textContent = `[ ${sectionName} ]`;
                }
            }
        });
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update opacity states
            updateNavOpacity(link);
            
            // Get target section and show it
            const target = link.getAttribute('href');
            if (target && target !== '#') {
                const targetId = target.replace('#', '');
                showSection(targetId);
                
                // Update mobile section title if on mobile
                if (mobileSectionTitle && window.innerWidth <= 768) {
                    const sectionName = link.textContent.replace('[', '').replace(']', '').trim();
                    mobileSectionTitle.textContent = `[ ${sectionName} ]`;
                }
            }
        });
    });
    
    // Don't show any section automatically on desktop - user must click
    
    // Mobile swipe navigation
    if (isMobile) {
        const sectionIds = ['about', 'studies', 'experience', 'work'];
        let currentSectionIndex = 0;
        
        // Show About section initially on mobile
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            aboutSection.classList.add('active');
        }
        
        // Function to change section
        const changeSection = (newIndex) => {
            if (newIndex < 0 || newIndex >= sectionIds.length) return;
            
            // Hide current section
            const currentSection = document.querySelector(`#${sectionIds[currentSectionIndex]}`);
            if (currentSection) {
                currentSection.classList.remove('active');
            }
            
            // Show new section
            currentSectionIndex = newIndex;
            const newSection = document.querySelector(`#${sectionIds[currentSectionIndex]}`);
            if (newSection) {
                newSection.classList.add('active');
                
                // Update mobile section title
                if (mobileSectionTitle) {
                    const titles = {
                        'about': '[ ABOUT ]',
                        'studies': '[ STUDIES ]',
                        'experience': '[ EXPERIENCE ]',
                        'work': '[ WORK ]'
                    };
                    mobileSectionTitle.textContent = titles[sectionIds[currentSectionIndex]] || '';
                }
                
                // Update mobile nav brackets
                updateMobileNavBrackets(sectionIds[currentSectionIndex]);
                
                // Trigger animations for About section
                if (sectionIds[currentSectionIndex] === 'about') {
                    const aboutContent = newSection.querySelector('.about-content');
                    const aboutContentBottom = newSection.querySelector('.about-content-bottom');
                    
                    // Reset animations
                    if (aboutContent) {
                        aboutContent.style.opacity = '0';
                        aboutContent.style.transform = 'translateY(20px)';
                    }
                    if (aboutContentBottom) {
                        aboutContentBottom.style.opacity = '0';
                        aboutContentBottom.style.transform = 'translateY(20px)';
                    }
                    
                    // Trigger animations with delay
                    setTimeout(() => {
                        if (aboutContent) {
                            aboutContent.style.transition = 'all 0.6s ease';
                            aboutContent.style.opacity = '1';
                            aboutContent.style.transform = 'translateY(0)';
                        }
                        if (aboutContentBottom) {
                            setTimeout(() => {
                                aboutContentBottom.style.transition = 'all 0.6s ease';
                                aboutContentBottom.style.opacity = '1';
                                aboutContentBottom.style.transform = 'translateY(0)';
                            }, 200);
                        }
                    }, 300);
                }
                
                // Trigger animations for Studies section
                if (sectionIds[currentSectionIndex] === 'studies') {
                    const studiesContent = newSection.querySelector('.studies-content');
                    const educationCards = newSection.querySelectorAll('.education-card');
                    
                    // Reset animations
                    if (studiesContent) {
                        studiesContent.classList.remove('visible');
                    }
                    educationCards.forEach(card => {
                        card.classList.remove('visible');
                    });
                    
                    // Trigger animations with delay
                    setTimeout(() => {
                        educationCards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('visible');
                            }, 100 + (index * 150));
                        });
                        // Show paragraph after cards
                        if (studiesContent) {
                            setTimeout(() => {
                                studiesContent.classList.add('visible');
                                console.log('Studies paragraph made visible:', studiesContent);
                            }, 400);
                        } else {
                            console.log('Studies content not found!');
                        }
                    }, 300);
                }
                
                // Add fade-in for Experience cards on mobile
                if (sectionId === 'experience' && window.innerWidth <= 768) {
                    const experienceCards = section.querySelectorAll('.experience-card');
                    experienceCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100 + (index * 100));
                    });
                }
            }
        };
        
        // Touch handling for swipe
        let touchStartY = 0;
        let touchEndY = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartY = e.changedTouches[0].screenY;
        });
        
        document.addEventListener('touchend', (e) => {
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        });
        
        const handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartY - touchEndY;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swiped up - go to next section
                    changeSection(currentSectionIndex + 1);
                } else {
                    // Swiped down - go to previous section
                    changeSection(currentSectionIndex - 1);
                }
            }
        };
        
        // Also handle wheel events for testing on desktop browser
        let scrollTimeout;
        document.addEventListener('wheel', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    if (e.deltaY > 0) {
                        changeSection(currentSectionIndex + 1);
                    } else {
                        changeSection(currentSectionIndex - 1);
                    }
                }, 100);
            }
        }, { passive: false });
    }
});