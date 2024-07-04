document.getElementById('reminiForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const loadingElement = document.getElementById('loading');
    const resultElement = document.getElementById('result');
    const resultImage = document.getElementById('resultImage');
    const downloadLink = document.getElementById('downloadLink');

    loadingElement.style.display = 'block';
    resultElement.style.display = 'none';

    axios.post('/upload', formData)
        .then(response => {
            const fileName = file.name;
            const hostUrl = window.location.origin;

            return axios.get(`https://joshweb.click/remini?q=${hostUrl}/uploads/${fileName}`);
        })
        .then(response => {
            const resultUrl = response.data.result;

            resultImage.src = resultUrl;
            downloadLink.href = resultUrl;

            loadingElement.style.display = 'none';
            resultElement.style.display = 'block';
        })
        .catch(error => {
            console.error('Error processing the image:', error);
            loadingElement.style.display = 'none';
            alert('An error occurred while processing the image. Please try again.');
        });
});
