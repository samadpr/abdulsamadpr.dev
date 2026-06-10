/* ===== CONTACT FORM SUBMISSION ===== */
$("#submit-form").submit(function (e) {
    e.preventDefault();

    const btn = document.getElementById('form-submit-btn');
    const originalText = btn.textContent;

    // Show loading state
    btn.textContent = 'Sending...';
    btn.disabled    = true;

    $.ajax({
        url: "https://script.google.com/macros/s/AKfycbw8iCT0f2M5hrTKbuWB_D9FtK9HXftjSFeEcZnWXyf9C5GLzytgtAAfmmTYGxICW9bqCw/exec",
        data: $(this).serialize(),
        method: "post",
        success: function () {
            // Reset form
            document.getElementById('submit-form').reset();
            // Show beautiful popup (function in script.js)
            if (typeof showSuccessPopup === 'function') showSuccessPopup();
        },
        error: function () {
            showErrorPopup();
        },
        complete: function () {
            btn.textContent = originalText;
            btn.disabled    = false;
        }
    });
});

/* ===== ERROR POPUP (fallback) ===== */
function showErrorPopup() {
    const popup = document.getElementById('success-popup');
    // Temporarily change to error style
    popup.style.borderLeftColor = '#e74c3c';
    const icon = popup.querySelector('.success-icon i');
    const h3   = popup.querySelector('.success-text h3');
    const p    = popup.querySelector('.success-text p');
    if (icon) icon.className = 'fa fa-times-circle';
    if (icon) icon.style.color = '#e74c3c';
    if (h3)   h3.textContent = 'Something went wrong';
    if (p)    p.textContent  = 'Please try again or email me directly.';
    popup.classList.add('show');
    setTimeout(() => {
        popup.classList.remove('show');
        // Reset back to success style
        setTimeout(() => {
            popup.style.borderLeftColor = '';
            if (icon) { icon.className = 'fa fa-check-circle'; icon.style.color = ''; }
            if (h3)   h3.textContent = 'Message Sent!';
            if (p)    p.textContent  = "Thank you! I'll get back to you shortly.";
        }, 500);
    }, 4500);
}