const scatteredImages = document.querySelectorAll('.scattered-image');
const body = document.body;

const overlay = document.createElement('div');
overlay.className = 'image-overlay';
overlay.style.cssText = `
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    z-index: 1000;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;
`;

const expandedContainer = document.createElement('div');
expandedContainer.style.cssText = `
    position: relative;
    max-width: 90%;
    max-height: 90%;
    transform: scale(0.8);
    transition: transform 0.3s ease;
`;

const expandedImage = document.createElement('img');
expandedImage.style.cssText = `
    max-width: 100%;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 15px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
`;

const closeButton = document.createElement('button');
closeButton.innerHTML = '×';
closeButton.style.cssText = `
    position: absolute;
    top: -20px;
    right: -20px;
    width: 50px;
    height: 50px;
    border: none;
    background: white;
    color: #667eea;
    font-size: 2.5rem;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
    font-family: Arial, sans-serif;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

closeButton.addEventListener('mouseenter', () => {
    closeButton.style.transform = 'rotate(90deg) scale(1.1)';
    closeButton.style.background = '#667eea';
    closeButton.style.color = 'white';
});

closeButton.addEventListener('mouseleave', () => {
    closeButton.style.transform = 'rotate(0deg) scale(1)';
    closeButton.style.background = 'white';
    closeButton.style.color = '#667eea';
});

expandedContainer.appendChild(expandedImage);
expandedContainer.appendChild(closeButton);
overlay.appendChild(expandedContainer);
body.appendChild(overlay);

function openImage(imageSrc) {
    expandedImage.src = imageSrc;
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    setTimeout(() => {
        overlay.style.opacity = '1';
        expandedContainer.style.transform = 'scale(1)';
    }, 10);
}

function closeImage() {
    overlay.style.opacity = '0';
    expandedContainer.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
    }, 300);
}

scatteredImages.forEach(image => {
    image.style.cursor = 'pointer';
    image.addEventListener('click', () => {
        openImage(image.src);
    });
});

closeButton.addEventListener('click', closeImage);

overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        closeImage();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.style.display === 'flex') {
        closeImage();
    }
});