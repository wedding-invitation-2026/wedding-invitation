const envelopeContainer = document.getElementById('envelopeContainer');
const introVideo = document.getElementById('introVideo');
const bgMusic = document.getElementById('bgMusic');

let hasStarted = false;

function startExperience(event) {
    // Prevent the event from firing twice (e.g., both touch and click)
    if (hasStarted) return;
    hasStarted = true;

    // 1. Play the background music first
    bgMusic.volume = 1.0;
    bgMusic.play().catch(err => console.log('Audio blocked:', err));

    // 2. Play the silent intro video
    introVideo.play().catch(err => console.log('Video blocked:', err));
}

// Apple prefers 'touchend' to verify a complete tap
document.addEventListener('touchend', startExperience, { once: true });
document.addEventListener('click', startExperience, { once: true });

// When video ends, open invitation
introVideo.onended = function () {
    envelopeContainer.classList.add('open');
    document.body.style.overflow = 'auto';
};

// --- Eastern Arabic Numerals Converter ---
// Converts standard numbers (0-9) to Eastern Arabic numbers (٠-٩)
function toArabicNumerals(num) {
    const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num.toString().replace(/\d/g, d => arabicNumbers[d]);
}

// Ensure numbers always have two digits (e.g., 04 instead of 4)
function padNumber(num) {
    return num < 10 ? '0' + num : num;
}

// --- Countdown Timer Logic ---
// Set your exact wedding date and time here (Year, Month, Day, Hours, Minutes, Seconds)
// Note: June is represented by 'June', '20', '2026'
const weddingDate = new Date("June 20, 2026 20:00:00").getTime();

const timer = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    // Time calculations for days, hours, minutes, and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Apply the numbers to the HTML, padded and converted to Arabic numerals
    document.getElementById("days").innerText = toArabicNumerals(padNumber(days));
    document.getElementById("hours").innerText = toArabicNumerals(padNumber(hours));
    document.getElementById("minutes").innerText = toArabicNumerals(padNumber(minutes));
    document.getElementById("seconds").innerText = toArabicNumerals(padNumber(seconds));

    // If the countdown is finished
    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("days").innerText = "٠٠";
        document.getElementById("hours").innerText = "٠٠";
        document.getElementById("minutes").innerText = "٠٠";
        document.getElementById("seconds").innerText = "٠٠";
    }
}, 1000);