document.addEventListener('DOMContentLoaded', function() {
    let currentPage = 1;
    const totalPages = 5;
    let isAnimating = false;
    
    const pages = document.querySelectorAll('.page');
    const dots = document.querySelectorAll('.dot');
    
    function showPage(pageNum) {
        if (pageNum < 1 || pageNum > totalPages || isAnimating) return;
        
        isAnimating = true;
        
        pages.forEach(page => page.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        document.getElementById(`page${pageNum}`).classList.add('active');
        dots[pageNum - 1].classList.add('active');
        
        currentPage = pageNum;
        
        setTimeout(() => {
            isAnimating = false;
            triggerPageAnimations(pageNum);
        }, 600);
    }
    
    function triggerPageAnimations(pageNum) {
        const page = document.getElementById(`page${pageNum}`);
        
        if (pageNum === 2) {
            const items = page.querySelectorAll('.timeline-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('show');
                }, index * 300);
            });
        }
        
        if (pageNum === 3) {
            const cards = page.querySelectorAll('.story-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('show');
                }, index * 400);
            });
        }
    }
    
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    }, false);
    
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                showPage(currentPage + 1);
            } else {
                showPage(currentPage - 1);
            }
        }
    }
    
    document.addEventListener('wheel', function(e) {
        if (e.deltaY > 0) {
            showPage(currentPage + 1);
        } else {
            showPage(currentPage - 1);
        }
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showPage(index + 1);
        });
    });
    
    const storyNavBtns = document.querySelectorAll('.nav-btn');
    const userStories = document.querySelectorAll('.user-story');
    
    storyNavBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            userStories.forEach(story => story.classList.remove('active'));
            storyNavBtns.forEach(b => b.classList.remove('active'));
            
            userStories[index].classList.add('active');
            btn.classList.add('active');
        });
    });
    
    const rsvpForm = document.getElementById('rsvpForm');
    const successMessage = document.getElementById('successMessage');
    
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        
        if (name && phone) {
            successMessage.classList.add('show');
            
            setTimeout(() => {
                successMessage.classList.remove('show');
                rsvpForm.reset();
            }, 3000);
        }
    });
    
    function updateCountdown() {
        const eventDate = new Date('2024-06-18T00:00:00');
        const now = new Date();
        const diff = eventDate - now;
        
        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    showPage(1);
    
    const keys = {};
    document.addEventListener('keydown', function(e) {
        keys[e.key] = true;
        
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            showPage(currentPage + 1);
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            showPage(currentPage - 1);
        }
    });
    
    document.addEventListener('keyup', function(e) {
        keys[e.key] = false;
    });
});