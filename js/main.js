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
        
        // On mobile, set initial section title
        if (isMobile) {
            const mobileSectionTitle = document.querySelector('.mobile-section-title');
            if (mobileSectionTitle) {
                mobileSectionTitle.textContent = '[ ABOUT ]';
            }
            // Set initial mobile nav brackets for about
            setTimeout(() => {
                updateMobileNavBrackets('about');
            }, 100);
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
        // On mobile, just scroll to the section
        if (window.innerWidth <= 768) {
            const targetSection = document.querySelector(`#${targetId}`);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
            return;
        }
        
        // Desktop behavior - show/hide sections
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
                
                // Desktop animations
                if (window.innerWidth > 768) {
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
    
    // Mobile nav links - scroll to section instead of showing/hiding
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const target = link.getAttribute('href');
            if (target && target !== '#') {
                const targetSection = document.querySelector(target);
                
                if (typeof gsap !== 'undefined') {
                    // Use GSAP for smoother menu close
                    gsap.to(mobileMenuOverlay, {
                        opacity: 0,
                        duration: 0.25,
                        ease: "power2.in",
                        onComplete: () => {
                            mobileMenuOverlay.style.visibility = 'hidden';
                            body.classList.remove('menu-open');
                            
                            // Scroll to section
                            if (targetSection && window.innerWidth <= 768) {
                                targetSection.scrollIntoView({ behavior: 'smooth' });
                            }
                        }
                    });
                } else {
                    // Fallback
                    mobileMenuOverlay.classList.remove('active');
                    body.classList.remove('menu-open');
                    
                    // Scroll to section
                    if (targetSection && window.innerWidth <= 768) {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
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
    
    // Mobile scroll-based animations with ScrollTrigger
    if (isMobile && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        // Update mobile section title based on scroll position
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            ScrollTrigger.create({
                trigger: section,
                start: "top center",
                end: "bottom center",
                onEnter: () => {
                    // Update mobile section title
                    if (mobileSectionTitle) {
                        const sectionName = section.id.toUpperCase();
                        mobileSectionTitle.textContent = `[ ${sectionName} ]`;
                    }
                    // Update mobile nav brackets
                    updateMobileNavBrackets(section.id);
                },
                onEnterBack: () => {
                    // Update mobile section title when scrolling back
                    if (mobileSectionTitle) {
                        const sectionName = section.id.toUpperCase();
                        mobileSectionTitle.textContent = `[ ${sectionName} ]`;
                    }
                    // Update mobile nav brackets
                    updateMobileNavBrackets(section.id);
                }
            });
            
            // Animate About section on scroll
            if (section.id === 'about') {
                const aboutContent = section.querySelector('.about-content');
                const aboutContentBottom = section.querySelector('.about-content-bottom');
                
                if (aboutContent) {
                    gsap.fromTo(aboutContent,
                        { opacity: 0, y: 30 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: aboutContent,
                                start: "top 80%",
                                once: true
                            }
                        }
                    );
                }
                
                if (aboutContentBottom) {
                    gsap.fromTo(aboutContentBottom,
                        { opacity: 0, y: 30 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: aboutContentBottom,
                                start: "top 80%",
                                once: true
                            }
                        }
                    );
                }
            }
            
            // Animate Studies section on scroll
            if (section.id === 'studies') {
                const educationCards = section.querySelectorAll('.education-card');
                const studiesContent = section.querySelector('.studies-content');
                
                if (educationCards.length > 0) {
                    gsap.fromTo(educationCards,
                        { opacity: 0, y: 30 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            stagger: 0.2,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: section.querySelector('.education-cards'),
                                start: "top 80%",
                                once: true
                            }
                        }
                    );
                }
                
                if (studiesContent) {
                    gsap.fromTo(studiesContent,
                        { opacity: 0 },
                        {
                            opacity: 1,
                            duration: 0.8,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: studiesContent,
                                start: "top 90%",
                                once: true
                            }
                        }
                    );
                }
            }
            
            // Animate Experience section on scroll
            if (section.id === 'experience') {
                const experienceCards = section.querySelectorAll('.experience-card');
                
                if (experienceCards.length > 0) {
                    experienceCards.forEach((card, index) => {
                        gsap.fromTo(card,
                            { opacity: 0, y: 30, scale: 0.95 },
                            {
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                duration: 0.8,
                                delay: index * 0.1,
                                ease: "power2.out",
                                scrollTrigger: {
                                    trigger: card,
                                    start: "top 85%",
                                    once: true
                                }
                            }
                        );
                    });
                }
            }
        });
    }
});