const track = document.getElementById("track");
const items = document.querySelectorAll(".project");
const leftBtn = document.querySelector(".arrow.left");
const rightBtn = document.querySelector(".arrow.right");
const carousel = document.querySelector(".carousel");
const viewport = document.querySelector(".viewport");


document.getElementById("year").textContent = new Date().getFullYear();

let index = 3;
let allow = true;

function update() {
    items.forEach(item => item.classList.remove("enabled"));

    const active = items[index];
    if (!active) return;
    active.classList.add("enabled");

    // Get stable structural geometry sizes
    const viewportWidth = viewport.offsetWidth;
    const activeWidth = active.offsetWidth;
    
    // Find the relative distance of the active item from the start of the track
    const activeLeftInTrack = active.offsetLeft;

    // MATH: Find the exact pixel point where the item sits dead center in the viewport
    const offset = (viewportWidth / 2) - (activeLeftInTrack + activeWidth / 2);

    // Apply the transition smoothly without zeroing out the track first
    track.style.transition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
    track.style.transform = `translateX(${offset}px)`;
}

function move(dir) {
    if (!allow) return;
    allow = false;

    index += dir;

    if (index < 0) index = items.length - 1;
    if (index >= items.length) index = 0;

    update();

    setTimeout(() => {
        allow = true;
    }, 600);
}

rightBtn.onclick = () => move(1);
leftBtn.onclick = () => move(-1);

window.addEventListener("resize", update);

// Make sure everything is calculated once fonts/styles finish rendering
window.addEventListener("load", () => {
    // Prevent browser scroll restoration from messing with your viewport layout
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    
    setTimeout(update, 100);
});

/* ==========================================
   ROLE SWAPPER & ANIMATIONS SECTION (UNCHANGED)
   ========================================== */
document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.getElementById("roleWrapper");
    const textElement = document.getElementById("roleText");

    const roles = ["Software Developer", "Game Developer", "Web Designer", "Graphics Designer"];
    let currentIndex = 0;

    function setWidthToText() {
        if (textElement && wrapper) {
            wrapper.style.width = `${textElement.offsetWidth}px`;
        }
    }

    setWidthToText();

    textElement.addEventListener("animationiteration", () => {
        currentIndex = (currentIndex + 1) % roles.length;

        setTimeout(() => {
            const currentWidth = wrapper.offsetWidth;
            wrapper.style.width = `${currentWidth}px`;

            textElement.textContent = roles[currentIndex];

            const newWidth = textElement.offsetWidth;
            wrapper.offsetHeight; // Force reflow

            wrapper.style.width = `${newWidth}px`;
        }, 1200);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const el = entry.target;
            const anim = el.dataset.anim;

            if (entry.isIntersecting) {
                el.classList.remove(anim);
                void el.offsetWidth; 
                el.classList.add(anim);
            } else {
                el.classList.remove(anim);
            }
        });
    }, {
        threshold: 0.2
    });

    elements.forEach(el => observer.observe(el));
});