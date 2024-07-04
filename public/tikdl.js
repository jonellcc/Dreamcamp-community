document.getElementById('tikdlForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const videoUrlInput = document.getElementById('videoUrl');
    const videoUrl = videoUrlInput.value.trim();
    if (!videoUrl) return;

    const loadingElement = document.getElementById('loading');
    const resultElement = document.getElementById('result');
    const resultVideo = document.getElementById('resultVideo');
    const downloadLink = document.getElementById('downloadLink');

    loadingElement.style.display = 'block';
    resultElement.style.display = 'none';

    // Function to extract video ID from TikTok URL
    function extractVideoId(url) {
        let videoId = '';
        const match = url.match(/(?:vt\.tiktok\.com\/|vm\.tiktok\.com\/|tiktok\.com\/)([^\s/]+)/);
        if (match && match[1]) {
            videoId = match[1];
        }
        return videoId;
    }

    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
        loadingElement.style.display = 'none';
        alert('Invalid TikTok video URL. Please enter a valid TikTok video URL.');
        return;
    }

    axios.post(`https://www.tikwm.com/api/`, {
        url: videoUrl
    }).then(async response => {
        const data = response.data.data;
        const videoStream = await axios({
            method: 'get',
            url: data.play,
            responseType: 'stream'
        });

        resultVideo.src = data.play;
        downloadLink.href = data.play;

        loadingElement.style.display = 'none';
        resultElement.style.display = 'block';
    }).catch(error => {
        console.error('Error downloading the video:', error);
        loadingElement.style.display = 'none';
        alert('An error occurred while downloading the video. Please check the URL and try again.');
    });
});
 