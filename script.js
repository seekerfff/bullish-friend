document.addEventListener('DOMContentLoaded', () => {
    loadGallery();
    initBackground();
});

function loadGallery() {
    const gallery = document.getElementById('gallery');
    const totalImages = 70;
    const totalVideos = 6;

    // Load images
    for (let i = 1; i <= totalImages; i++) {
        gallery.appendChild(createMediaElement(`memes/${i}.webp`, 'image'));
    }

    // Load videos
    for (let i = 1; i <= totalVideos; i++) {
        gallery.appendChild(createMediaElement(`meme%20videos/${i}.webm`, 'video'));
    }
}

function createMediaElement(src, type) {
    const container = document.createElement('div');
    container.className = `meme-item ${type}-container`;
    
    if (type === 'image') {
        const img = document.createElement('img');
        img.src = src;
        img.loading = "lazy";
        container.appendChild(img);
    } else {
        const video = document.createElement('video');
        video.innerHTML = `<source src="${src}" type="video/webm">`;
        video.loop = true;
        video.muted = false;
        video.addEventListener('mouseenter', handleVideoHover);
        video.addEventListener('mouseleave', handleVideoLeave);
        container.appendChild(video);
    }

    container.addEventListener('click', () => openModal(src, type));
    return container;
}

function handleVideoHover(e) {
    const video = e.target;
    video.play().catch(() => {
        video.muted = true;
        video.play();
    });
}

function handleVideoLeave(e) {
    e.target.pause();
}

function openModal(src, type) {
    const modal = document.getElementById('modal');
    const content = document.getElementById('modal-content');
    
    content.innerHTML = type === 'image' 
        ? `<img src="${src}" alt="Fullscreen meme">`
        : `<video controls autoplay><source src="${src}" type="video/webm"></video>`;

    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function copyAddress() {
    navigator.clipboard.writeText("bullish-1254.meme-cooking.near");
    showToast();
}

function showToast() {
    const toast = document.querySelector('.toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

function initBackground() {
    const bg = document.querySelector('.background-animation');
    for (let i = 1; i <= 16; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `--i: ${i}; background-image: url('src/${i}.webp')`;
        bg.appendChild(particle);
    }
}
