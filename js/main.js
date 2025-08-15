document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const isMobile = window.innerWidth <= 768;
    
    // Register GSAP ScrollTrigger plugin
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    
    // GSAP Logo Animation
    if (typeof gsap !== 'undefined') {
        // Set initial state for logo
        const logoText = document.querySelector('.logo-text-outline');
        if (logoText) {
            // Create a timeline for the logo animation
            const logoTl = gsap.timeline({
                onComplete: () => {
                    console.log('Logo animation complete');
                    // Remove loading class after logo animation
                    setTimeout(() => {
                        body.classList.remove('loading');
                        body.classList.add('loaded');
                        // Don't show any section automatically on desktop
                    }, 300);
                }
            });
            
            // Set initial state
            gsap.set(logoText, {
                opacity: 0,
                strokeDasharray: 1500,
                strokeDashoffset: 1500,
                fill: 'transparent'
            });
            
            // Animate the stroke drawing
            logoTl.to(logoText, {
                duration: 2.5,
                strokeDashoffset: 0,
                opacity: 1,
                ease: "power2.inOut"
            })
            // Then fill in the text
            .to(logoText, {
                duration: 1,
                fill: '#504545',
                ease: "power2.out"
            }, "-=0.8"); // Start fill slightly before stroke completes
            
            // Add a subtle float animation after load
            gsap.to('.site-logo', {
                y: -5,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 3.5
            });
        }
    }
    
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
                if (typeof gsap !== 'undefined') {
                    // Use GSAP for smoother section transition
                    gsap.set(section, { visibility: 'visible' });
                    gsap.fromTo(section, 
                        { opacity: 0 },
                        { 
                            opacity: 1, 
                            duration: 0.5, 
                            ease: "power2.inOut",
                            onComplete: () => {
                                section.classList.add('active');
                            }
                        }
                    );
                } else {
                    section.classList.add('active');
                }
                
                // Mobile animations
                if (window.innerWidth <= 768) {
                    // About section animation with GSAP
                    if (targetId === 'about' && typeof gsap !== 'undefined') {
                        const aboutContent = section.querySelector('.about-content');
                        const aboutContentBottom = section.querySelector('.about-content-bottom');
                        
                        // Create GSAP timeline for About animations
                        const aboutTl = gsap.timeline({ delay: 0.3 });
                        
                        if (aboutContent) {
                            gsap.set(aboutContent, { opacity: 0, y: 20 });
                            aboutTl.to(aboutContent, {
                                opacity: 1,
                                y: 0,
                                duration: 0.6,
                                ease: "power2.out"
                            });
                        }
                        
                        if (aboutContentBottom) {
                            gsap.set(aboutContentBottom, { opacity: 0, y: 20 });
                            aboutTl.to(aboutContentBottom, {
                                opacity: 1,
                                y: 0,
                                duration: 0.6,
                                ease: "power2.out"
                            }, "-=0.4"); // Start slightly before previous animation ends
                        }
                    } else if (targetId === 'about') {
                        // Fallback for non-GSAP
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
                    
                    // Studies section animation with GSAP
                    if (targetId === 'studies' && typeof gsap !== 'undefined') {
                        const studiesContent = section.querySelector('.studies-content');
                        const educationCards = section.querySelectorAll('.education-card');
                        
                        // Create GSAP timeline for Studies animations
                        const studiesTl = gsap.timeline({ delay: 0.3 });
                        
                        // Animate education cards
                        if (educationCards.length > 0) {
                            gsap.set(educationCards, { opacity: 0, y: 20 });
                            studiesTl.to(educationCards, {
                                opacity: 1,
                                y: 0,
                                duration: 0.6,
                                stagger: 0.15,
                                ease: "power2.out"
                            });
                        }
                        
                        // Animate studies content paragraph
                        if (studiesContent) {
                            gsap.set(studiesContent, { opacity: 0 });
                            studiesTl.to(studiesContent, {
                                opacity: 1,
                                duration: 0.6,
                                ease: "power2.out"
                            }, "-=0.3"); // Start slightly before cards finish
                        }
                    } else if (targetId === 'studies') {
                        // Fallback for non-GSAP
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
                    
                    // Experience section animation - Mobile with GSAP
                    if (targetId === 'experience' && typeof gsap !== 'undefined') {
                        const experienceCards = section.querySelectorAll('.experience-card');
                        
                        // Use GSAP for mobile animations
                        gsap.fromTo(experienceCards, 
                            {
                                opacity: 0,
                                y: 20,
                                scale: 0.9
                            },
                            {
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                duration: 0.6,
                                stagger: 0.12,
                                ease: "power3.out",
                                delay: 0.2
                            }
                        );
                    } else if (targetId === 'experience') {
                        // Fallback for non-GSAP
                        const experienceCards = section.querySelectorAll('.experience-card');
                        experienceCards.forEach(card => {
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(20px)';
                            card.style.transition = 'none';
                        });
                        
                        setTimeout(() => {
                            experienceCards.forEach((card, index) => {
                                setTimeout(() => {
                                    card.style.transition = 'all 0.6s ease';
                                    card.style.opacity = '1';
                                    card.style.transform = 'translateY(0)';
                                }, 100 + (index * 150));
                            });
                        }, 100);
                    }
                } else {
                    // Desktop animation for Studies with GSAP
                    if (targetId === 'studies' && typeof gsap !== 'undefined') {
                        const cards = section.querySelectorAll('.education-card');
                        const studiesContent = section.querySelector('.studies-content');
                        
                        // Create GSAP timeline for desktop Studies animations
                        const studiesTl = gsap.timeline();
                        
                        if (cards.length > 0) {
                            gsap.set(cards, { opacity: 0, y: 20 });
                            studiesTl.to(cards, {
                                opacity: 1,
                                y: 0,
                                duration: 0.6,
                                stagger: 0.15,
                                ease: "power2.out"
                            });
                        }
                        
                        if (studiesContent) {
                            gsap.set(studiesContent, { opacity: 0 });
                            studiesTl.to(studiesContent, {
                                opacity: 1,
                                duration: 0.6,
                                ease: "power2.out"
                            }, "-=0.3");
                        }
                    } else if (targetId === 'studies') {
                        // Fallback for non-GSAP
                        const cards = section.querySelectorAll('.education-card');
                        cards.forEach((card, index) => {
                            card.style.animation = 'none';
                            setTimeout(() => {
                                card.style.animation = '';
                            }, 10);
                        });
                    }
                    
                    // Desktop animation for Experience with GSAP
                    if (targetId === 'experience' && typeof gsap !== 'undefined') {
                        const experienceCards = section.querySelectorAll('.experience-card');
                        
                        // Use GSAP for smoother animations
                        gsap.fromTo(experienceCards, 
                            {
                                opacity: 0,
                                y: 30,
                                scale: 0.95,
                                rotationY: -15
                            },
                            {
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                rotationY: 0,
                                duration: 0.8,
                                stagger: 0.15,
                                ease: "back.out(1.2)",
                                delay: 0.1
                            }
                        );
                    } else if (targetId === 'experience') {
                        // Fallback for non-GSAP
                        const experienceCards = section.querySelectorAll('.experience-card');
                        experienceCards.forEach(card => {
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(20px)';
                            card.style.transition = 'none';
                        });
                        
                        setTimeout(() => {
                            experienceCards.forEach((card, index) => {
                                setTimeout(() => {
                                    card.style.transition = 'all 0.6s ease';
                                    card.style.opacity = '1';
                                    card.style.transform = 'translateY(0)';
                                }, 100 + (index * 150));
                            });
                        }, 100);
                    }
                }
            } else {
                if (typeof gsap !== 'undefined') {
                    // Use GSAP for smoother section hiding
                    if (section.classList.contains('active')) {
                        gsap.to(section, {
                            opacity: 0,
                            duration: 0.3,
                            ease: "power2.in",
                            onComplete: () => {
                                section.classList.remove('active');
                                section.style.visibility = 'hidden';
                            }
                        });
                    }
                } else {
                    section.classList.remove('active');
                }
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
            if (typeof gsap !== 'undefined') {
                // Use GSAP for smoother menu animation
                gsap.set(mobileMenuOverlay, { visibility: 'visible' });
                gsap.to(mobileMenuOverlay, {
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out",
                    onStart: () => {
                        body.classList.add('menu-open');
                    }
                });
                
                // Animate menu links
                const mobileNavLinks = mobileMenuOverlay.querySelectorAll('.mobile-nav-link');
                gsap.fromTo(mobileNavLinks, 
                    {
                        opacity: 0,
                        x: 20
                    },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.4,
                        stagger: 0.08,
                        ease: "power2.out",
                        delay: 0.2
                    }
                );
            } else {
                // Fallback
                mobileMenuOverlay.classList.add('active');
                body.classList.add('menu-open');
            }
        });
    }
    
    if (menuClose && mobileMenuOverlay) {
        menuClose.addEventListener('click', () => {
            if (typeof gsap !== 'undefined') {
                // Use GSAP for smoother menu close animation
                gsap.to(mobileMenuOverlay, {
                    opacity: 0,
                    duration: 0.25,
                    ease: "power2.in",
                    onComplete: () => {
                        mobileMenuOverlay.style.visibility = 'hidden';
                        body.classList.remove('menu-open');
                    }
                });
            } else {
                // Fallback
                mobileMenuOverlay.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }
    
    // Mobile nav links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (typeof gsap !== 'undefined') {
                // Use GSAP for smoother menu close
                gsap.to(mobileMenuOverlay, {
                    opacity: 0,
                    duration: 0.25,
                    ease: "power2.in",
                    onComplete: () => {
                        mobileMenuOverlay.style.visibility = 'hidden';
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
                    }
                });
            } else {
                // Fallback
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
                
                // Trigger animations for About section with GSAP
                if (sectionIds[currentSectionIndex] === 'about' && typeof gsap !== 'undefined') {
                    const aboutContent = newSection.querySelector('.about-content');
                    const aboutContentBottom = newSection.querySelector('.about-content-bottom');
                    
                    // Create GSAP timeline for About animations
                    const aboutTl = gsap.timeline({ delay: 0.3 });
                    
                    if (aboutContent) {
                        gsap.set(aboutContent, { opacity: 0, y: 20 });
                        aboutTl.to(aboutContent, {
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                            ease: "power2.out"
                        });
                    }
                    
                    if (aboutContentBottom) {
                        gsap.set(aboutContentBottom, { opacity: 0, y: 20 });
                        aboutTl.to(aboutContentBottom, {
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                            ease: "power2.out"
                        }, "-=0.4");
                    }
                } else if (sectionIds[currentSectionIndex] === 'about') {
                    // Fallback for non-GSAP
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
                
                // Trigger animations for Studies section with GSAP
                if (sectionIds[currentSectionIndex] === 'studies' && typeof gsap !== 'undefined') {
                    const studiesContent = newSection.querySelector('.studies-content');
                    const educationCards = newSection.querySelectorAll('.education-card');
                    
                    // Create GSAP timeline for Studies animations
                    const studiesTl = gsap.timeline({ delay: 0.3 });
                    
                    if (educationCards.length > 0) {
                        gsap.set(educationCards, { opacity: 0, y: 20 });
                        studiesTl.to(educationCards, {
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                            stagger: 0.15,
                            ease: "power2.out"
                        });
                    }
                    
                    if (studiesContent) {
                        gsap.set(studiesContent, { opacity: 0 });
                        studiesTl.to(studiesContent, {
                            opacity: 1,
                            duration: 0.6,
                            ease: "power2.out"
                        }, "-=0.3");
                    }
                } else if (sectionIds[currentSectionIndex] === 'studies') {
                    // Fallback for non-GSAP
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
                
                // Add fade-in for Experience cards with GSAP
                if (sectionIds[currentSectionIndex] === 'experience' && typeof gsap !== 'undefined') {
                    const experienceCards = newSection.querySelectorAll('.experience-card');
                    
                    // Use GSAP for animations
                    gsap.fromTo(experienceCards, 
                        {
                            opacity: 0,
                            y: 20,
                            scale: 0.9
                        },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.6,
                            stagger: 0.12,
                            ease: "power3.out",
                            delay: 0.2
                        }
                    );
                } else if (sectionIds[currentSectionIndex] === 'experience') {
                    // Fallback for non-GSAP
                    const experienceCards = newSection.querySelectorAll('.experience-card');
                    
                    // Reset animations first
                    experienceCards.forEach(card => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                    });
                    
                    // Trigger animations with delay (same timing as Studies cards)
                    setTimeout(() => {
                        experienceCards.forEach((card, index) => {
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                                card.style.transition = 'all 0.6s ease';
                            }, 100 + (index * 150)); // Same timing as Studies cards
                        });
                    }, 100);
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