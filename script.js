window.onload = function () {
    var galleryDiv = document.getElementById('gallery');

    fetchImages().then(function (images) {
        console.log('Fetched images:', images); // Log fetched images
        images.forEach(function (image) {
            var img = document.createElement('img');
            img.src = image.download_url; // Use the download_url directly
            img.alt = image.name;
            galleryDiv.appendChild(img);
        });
    }).catch(function (error) {
        console.error('Error fetching images:', error); // Log any errors encountered
    });

    function fetchImages() {
        console.log('Fetching images...'); // Log fetching images
        // Fetch list of images from the GitHub API
        return fetch('https://api.github.com/repos/TWKTemplar/Ch3shireWebsite/contents/images')
            .then(response => response.json())
            .then(data => {
                // Map the response to extract image URLs and names
                return data.map(item => ({
                    name: item.name,
                    download_url: item.download_url // Use download URL for direct image access
                }));
            });
    }
};
