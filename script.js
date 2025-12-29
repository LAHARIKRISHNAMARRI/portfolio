document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    // Mobile Menu Toggle
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');

        // Animate hamburger to X
        const bars = menuToggle.querySelectorAll('.bar');
        if (menuToggle.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');

            // Reset hamburger
            const bars = menuToggle.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 5, 5, 0.95)';
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(5, 5, 5, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll('.section-title, .about-text, .skill-card, .project-card, .hero-content > *, .stat-item');

    animateElements.forEach((el, index) => {
        el.classList.add('fade-up');
        el.style.transitionDelay = `${index % 3 * 0.15}s`; // Stagger effect
        observer.observe(el);
    });

    // --- Modal Logic ---
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-description');
    const modalTags = document.getElementById('modal-tags');
    const modalFeatures = document.getElementById('modal-features');
    const closeModal = document.querySelector('.close-modal');

    // Data for Projects & Publication
    const projectData = {
        student: {
            title: "Student Project & Portfolio Platform",
            description: "A comprehensive Java-based web application designed to bridge the gap between students and faculty. It allows students to showcase their academic portfolios and projects while enabling teachers to review, grade, and provide feedback in a centralized environment.",
            technologies: ["Java", "JSP/Servlets", "MySQL", "HTML5/CSS3", "Bootstrap", "Apache Tomcat"],
            features: [
                "Role-Based Access Control (RBAC): Separate dashboards for Admin (Teachers) and Users (Students).",
                "Project Submission & Review: Streamlined workflow for uploading project files and receiving faculty feedback.",
                "Portfolio Management: Students can build and edit their dynamic portfolios.",
                "Media Management: Secure upload and retrieval of images and documents."
            ]
        },
        water: {
            title: "Real-Time Water Safety Monitoring",
            description: "An IoT-based solution addressing water quality and safety. This system uses a network of sensors to monitor water parameters in real-time and transmits data to the cloud, triggering alerts when safety thresholds are breached.",
            technologies: ["IoT", "Arduino/NodeMCU", "Cloud Platform", "Water Quality Sensors", "C++"],
            features: [
                "Real-time Monitoring: Continuous tracking of pH, turbidity, and water levels.",
                "Cloud Integration: Seamless data logging and remote accessibility via cloud services.",
                "Alert System: Automated SMS/Email notifications for critical water safety warnings.",
                "Data Visualization: Graphical representation of water quality trends over time."
            ]
        },
        railway: {
            title: "Automatic Railway Gate Control",
            description: "A safety-critical embedded system designed to prevent railway crossing accidents. By automating the gate operation using sensor fusion, it eliminates human error and ensures timely gate closure upon train detection.",
            technologies: ["Arduino Uno", "C++", "IR Sensors", "Servo Motors"],
            features: [
                "Automated Control: Sensors detect train arrival and departure to control gate motors automatically.",
                "Collision Prevention: Reduces manual reliance, significantly lowering accident risks.",
                "Cost-Effective: Built using accessible components like Arduino and IR sensors.",
                "Protoype Design: Fully functional scale model demonstrating the core safety logic."
            ]
        },
        publication: {
            title: "Machine Learning Based Booklet Status Detection",
            description: "Research paper presented at the 1st International Conference on Microstructure, VLSI, Robotics, Communication, Electrical Emerging Technologies (ICMVRCET 2025). This research focuses on automating the tracking of exam booklet status in educational institutions using Computer Vision and Machine Learning.",
            technologies: ["Machine Learning", "Python", "Computer Vision", "Supervised Learning"],
            features: [
                "Paper ID: 191 (Taylor & Francis Association).",
                "Automated Detection: Replaces manual counting and verification of booklets.",
                "Real-time Monitoring: Utilizes camera feeds to track booklet movement/submission.",
                "Error Reduction: Minimizes administrative errors in large-scale examinations."
            ]
        }
    };

    // Open Modal
    document.querySelectorAll('[data-project]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = button.getAttribute('data-project');
            const data = projectData[projectId];

            if (data) {
                // Populate Modal
                modalTitle.textContent = data.title;
                modalDesc.textContent = data.description;

                // Clear and Populate Tags
                modalTags.innerHTML = '';
                data.technologies.forEach(tech => {
                    const tag = document.createElement('span');
                    tag.classList.add('tech-tag');
                    tag.textContent = tech;
                    modalTags.appendChild(tag);
                });

                // Clear and Populate Features
                modalFeatures.innerHTML = '';
                if (data.features && data.features.length > 0) {
                    data.features.forEach(feat => {
                        const li = document.createElement('li');
                        li.textContent = feat;
                        modalFeatures.appendChild(li);
                    });
                    document.querySelector('.modal-subtitle').style.display = 'block';
                } else {
                    document.querySelector('.modal-subtitle').style.display = 'none';
                }

                // Show Modal
                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    // Close Modal Logic
    const hideModal = () => {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto'; // Restore scrolling
    };

    closeModal.addEventListener('click', hideModal);

    // Close on click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            hideModal();
        }
    });
});
