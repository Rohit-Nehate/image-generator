const promptinp = document.querySelector('.promptinp');
const generate = document.querySelector('.gen');
const imageContainer = document.querySelector('.image-container');
const downloadBtn = document.querySelector('.download-btn');

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
    
    // Hide download button when generating new image
    downloadBtn.style.display = 'none';
    
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
            <button class="download-btn" style="display: none;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download
            </button>
        `;
        
        const img = document.querySelector('.image');
        const newDownloadBtn = document.querySelector('.download-btn');
        
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
        }, 3000);
        
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
                    // Show download button after image loads
                    newDownloadBtn.style.display = 'flex';
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
        
        // Download button functionality
        newDownloadBtn.addEventListener('click', async () => {
            try {
                // Fetch the image as blob
                const response = await fetch(img.src);
                const blob = await response.blob();
                
                // Create download link
                const downloadUrl = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = `prinexa-${Date.now()}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(downloadUrl);
            } catch (error) {
                console.error('Download failed:', error);
                alert('Failed to download image. Please try again.');
            }
        });
    }
});
