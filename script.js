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

    // Form Submission (Prevent default and post to webhook)
    if (leadForm) {
        leadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Show loading state on button
            const submitBtn = leadForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            // Collect form data
            const formData = new FormData(leadForm);
            console.log('Form Submitted Data:', Object.fromEntries(formData.entries()));
            
            // Convert FormData to URLSearchParams for better webhook parsing without CORS preflight
            const urlEncodedData = new URLSearchParams(formData).toString();
            
            const webhookUrl = 'https://connect.pabbly.com/webhook-listener/webhook/IjU3NjIwNTY1MDYzZTA0MzY1MjZiNTUzMyI_3D_pc/IjU3NjcwNTZlMDYzNjA0M2Q1MjZkNTUzMTUxMzYi_pc';
            
            try {
                // Send data to Pabbly Webhook
                await fetch(webhookUrl, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: urlEncodedData
                });
                
                // Show Success Message
                alert('Thank you! Your personalized Numerology Report will be sent to your email shortly.');
                
                // Reset form and close modal
                leadForm.reset();
                closeModalFunc();
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('There was an error submitting your request. Please try again.');
            } finally {
                // Restore button state
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
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
