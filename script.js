const teamMembers = [
    {
        name: "Phạm Minh Nhựt",
        avatar: "img/avatar/nhut.jpg",
        githubUrl: "https://nhutit-flu.github.io/",
    },
    {
        name: "Nguyễn Gia Bảo",
        avatar: "img/avatar/bao.jpg",
        githubUrl: "https://giabao0405.github.io/GiaBaoCV/",
    },
    {
        name: "Võ Văn Quyến",
        avatar: "img/avatar/quyen.jpg",
        githubUrl: "https://thevvq.github.io/degitalcv/",
    },
    {
        name: "Nguyễn Duy Minh",
        avatar: "img/avatar/minh.jpg",
        githubUrl: "https://minhkoi0103.github.io/NguyenDuyMinh/",
    },
    {
        name: "Tăng Tiến Lợi",
        avatar: "img/avatar/loi.jpg",
        githubUrl: "https://loi1966.github.io/degitalcv/",
    }
];

// Doraemon gadgets for floating elements
const doraemonGadgets = [
    { name: "dokodemo-door", tooltip: "Cửa thần kỳ - Di chuyển tức thì" },
    { name: "take-copter", tooltip: "Chong chóng tre - Bay lượn tự do" },
    { name: "time-machine", tooltip: "Máy thời gian - Du hành thời gian" },
    { name: "small-light", tooltip: "Đèn pin nhỏ - Chiếu sáng" },
    { name: "big-light", tooltip: "Đèn pin lớn - Ánh sáng mạnh" },
    { name: "memory-bread", tooltip: "Bánh mì ghi nhớ - Học nhanh" },
    { name: "time-cloth", tooltip: "Khăn thời gian - Quay ngược thời gian" },
    // Duplicate gadgets to double the count
    { name: "dokodemo-door", tooltip: "Cửa thần kỳ - Di chuyển tức thì" },
    { name: "take-copter", tooltip: "Chong chóng tre - Bay lượn tự do" },
    { name: "time-machine", tooltip: "Máy thời gian - Du hành thời gian" },
    { name: "small-light", tooltip: "Đèn pin nhỏ - Chiếu sáng" },
    { name: "big-light", tooltip: "Đèn pin lớn - Ánh sáng mạnh" },
    { name: "memory-bread", tooltip: "Bánh mì ghi nhớ - Học nhanh" },
    { name: "time-cloth", tooltip: "Khăn thời gian - Quay ngược thời gian" }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    createFloatingElements();
    createParticles();
    generateTeamCards(); // Call the new 2D card generation function
    initializeNavigation();
    startHeroTyping(); // Thêm hiệu ứng typing cho dòng chữ chào mừng
    setTimeout(function() {
        const audio = document.getElementById('bg-music');
        if (audio) {
            audio.volume = 0.05;
            audio.play().catch(function(){});
        }
    }, 300);
});

// Create floating Doraemon gadgets
function createFloatingElements() {
    const container = document.getElementById('floating-elements');
    
    doraemonGadgets.forEach((gadget, index) => {
        const element = document.createElement('div');
        element.className = `floating-element ${gadget.name}`;
        
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        const animationDelay = Math.random() * 5;
        
        element.style.left = randomX + '%';
        element.style.top = randomY + '%';
        element.style.animation = `flyBackAndForth ${8 + Math.random() * 6}s ease-in-out infinite`;
        element.style.animationDelay = animationDelay + 's';
        
        element.title = gadget.tooltip;
        
        element.addEventListener('mouseenter', function() {
            this.style.zIndex = '100';
            this.style.transform = 'scale(1.3)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.zIndex = '10';
            this.style.transform = 'scale(1)';
        });
        
        container.appendChild(element);
    });
}

// Create sparkle particles
function createParticles() {
    const container = document.getElementById('particle-container');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = (2 + Math.random() * 2) + 's';
        container.appendChild(particle);
    }
}

// Generate team member cards (2D version)
function generateTeamCards() {
    const teamCardsContainer = document.querySelector('.team-member-cards-container');

    teamCardsContainer.innerHTML = ''; // Clear existing content

    teamMembers.forEach(member => {
        const card = document.createElement('div');
        card.className = 'team-member-card';
        card.innerHTML = `
            <div class="card-header">
                <img src="${member.avatar}" alt="${member.name}" class="avatar" style="cursor:pointer;">
            </div>
            <div class="card-body">
                <h3 class="member-name-2d">${member.name}</h3>
            </div>
            <div class="bottom-bar">
                <a href="${member.githubUrl}" target="_blank" class="contact-me-btn"><i class="fab fa-github"></i> Xem CV GitHub</a>
            </div>
        `;
        // Thêm sự kiện click cho avatar
        const avatarImg = card.querySelector('.avatar');
        avatarImg.addEventListener('click', function(e) {
            window.open(member.githubUrl, '_blank');
        });
        teamCardsContainer.appendChild(card);
    });
}

// Remove navigation and auto-scroll logic
function initializeNavigation() {
    // Remove navigation arrows from DOM
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    if (leftArrow) leftArrow.style.display = 'none';
    if (rightArrow) rightArrow.style.display = 'none';
    // No navigation needed
}

// Enhanced contact button interactions
document.addEventListener('click', function(e) {
    if (e.target.closest('.contact-btn')) {
        const button = e.target.closest('.contact-btn');
        
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .contact-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top-btn';
scrollToTopBtn.addEventListener('click', scrollToTop);
document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

// Add CSS for scroll to top button
const scrollToTopStyle = document.createElement('style');
scrollToTopStyle.textContent = `
    .scroll-to-top-btn {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
        z-index: 1000;
        display: none;
    }
    
    .scroll-to-top-btn:hover {
        transform: translateY(-3px) scale(1.1);
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
    }
`;
document.head.appendChild(scrollToTopStyle);

function startHeroTyping() {
    const text = 'Chào mừng đến với ngôi nhà của Doreamon!';
    const target = document.getElementById('hero-typing-text');
    if (!target) return;
    target.textContent = '';
    let i = 0;
    function typeChar() {
        if (i <= text.length) {
            target.textContent = text.slice(0, i);
            i++;
            setTimeout(typeChar, 20 + Math.random() * 15);
        }
    }
    typeChar();
}

// Music toggle button functionality
const musicBtn = document.getElementById('music-toggle-btn');
const audio = document.getElementById('bg-music');
if (musicBtn && audio) {
    function updateMusicBtn() {
        if (audio.paused) {
            musicBtn.classList.add('music-off');
            musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            musicBtn.classList.remove('music-off');
            musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    }
    musicBtn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        updateMusicBtn();
    });
    // Cập nhật icon khi load trang
    updateMusicBtn();
    // Tự động phát nhạc khi vào trang (nếu trình duyệt cho phép)
    setTimeout(function() {
        if (audio.paused) {
            audio.play().catch(function(){});
            updateMusicBtn();
        }
    }, 300);
}