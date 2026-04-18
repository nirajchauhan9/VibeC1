document.addEventListener('DOMContentLoaded', () => {
    // 1. Popup Modal Logic
    const modal = document.getElementById('leadModal');
    const closeBtn = document.getElementById('closeModal');
    const ctaTriggers = document.querySelectorAll('.cta-trigger');
    const leadForm = document.getElementById('leadForm');

    // Open Modal
    ctaTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close Modal Function
    const closeModalFunc = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Close via Button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModalFunc);
    }

    // Close via Overlay Click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunc();
        }
    });

    // Close via Escape Key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModalFunc();
        }
    });

    // Form Submission (Prevent default and show success for demo)
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Collect form data
            const formData = new FormData(leadForm);
            const data = Object.fromEntries(formData.entries());
            console.log('Form Submitted Data:', data);
            
            // In a real app, this would be an AJAX/fetch call to a backend
            
            // Show Success Message (Simple alert for demonstration)
            alert('Thank you! Your personalized Numerology Report will be sent to your email shortly.');
            
            // Reset form and close modal
            leadForm.reset();
            closeModalFunc();
        });
    }

    // 2. Scroll Animations (Intersection Observer)
    const slideElements = document.querySelectorAll('.slide-up');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible if you only want it to animate once
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    slideElements.forEach(el => {
        scrollObserver.observe(el);
    });
});
