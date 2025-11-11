const promptinp = document.querySelector('.promptinp');
const generate = document.querySelector('.gen');
const imageContainer = document.querySelector('.image-container');

// Allow Enter key to generate
promptinp.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        generate.click();
    }
});

generate.addEventListener('click', async () => {
    const url = `https://botfather.cloud/Apis/ImgGen/client.php?inputText=${encodeURIComponent(promptinp.value)}`;
    
    console.log(url);
    console.log(promptinp.value.replace(/\s/g, ''));
    
    if (promptinp.value.replace(/\s/g, '') == '') {
        const loaderContainer = document.querySelector('.loader-container');
        loaderContainer.innerText = 'Please enter a prompt';
        setTimeout(() => {
            loaderContainer.innerText = '';
        }, 2000);
    } else {
        imageContainer.innerHTML = `
            <div class="loader-container">
                <div class="progress">
                    <div class="spinner"></div>
                    <div class="progress-container">
                        <p class="text">LOADING...</p>
                        <div class="progress-bar"></div>
                    </div>
                </div>
            </div>
            <img class="image" src="" alt="">
        `;
        
        const img = document.querySelector('.image');
        
        // After 3 seconds, show shimmer effect to indicate image is coming
        const shimmerTimeout = setTimeout(() => {
            const loaderContainer = document.querySelector('.loader-container');
            if (loaderContainer) {
                loaderContainer.innerHTML = `
                    <div class="shimmer-wrapper">
                        <div class="shimmer"></div>
                    </div>
                    <div class="progress">
                        <p class="text" style="z-index: 10; position: relative;">Almost there...</p>
                    </div>
                `;
            }
        }, 10000);
        
        // Load the image
        img.onload = () => {
            clearTimeout(shimmerTimeout);
            img.classList.add('loaded');
            const loaderContainer = document.querySelector('.loader-container');
            const shimmerWrapper = document.querySelector('.shimmer-wrapper');
            if (shimmerWrapper) {
                shimmerWrapper.style.opacity = '0';
                shimmerWrapper.style.transition = 'opacity 0.5s';
            }
            if (loaderContainer) {
                setTimeout(() => {
                    loaderContainer.style.display = 'none';
                }, 500);
            }
        };
        
        img.onerror = () => {
            clearTimeout(shimmerTimeout);
            const loaderContainer = document.querySelector('.loader-container');
            if (loaderContainer) {
                loaderContainer.innerHTML = '<p style="color: #ff6b6b;">Failed to generate image. Please try again.</p>';
            }
        };
        
        img.src = url;
    }
});
