window.onload = function () {
    var galleryDiv = document.getElementById('gallery');

    fetchImages().then(function (images) {
        images.forEach(function (image) {
            var img = document.createElement('img');
            img.src = 'https://github.com/TWKTemplar/Ch3shireWebsite/raw/main/images/' + image;
            img.alt = image;
            galleryDiv.appendChild(img);
        });
    }).catch(function (error) {
        console.error('Error fetching images:', error);
    });

    function fetchImages() {
        return fetch('https://github.com/TWKTemplar/Ch3shireWebsite/raw/main/images/')
            .then(response => response.text())
            .then(data => {
                // Extract image filenames from the response
                var filenames = extractFilenames(data);
                return filenames;
            });
    }

    function extractFilenames(data) {
        // Parse the HTML content to extract image filenames
        var parser = new DOMParser();
        var htmlDoc = parser.parseFromString(data, 'text/html');
        var links = htmlDoc.querySelectorAll('a[href$=".jpg"], a[href$=".jpeg"], a[href$=".png"], a[href$=".gif"]');

        var filenames = [];
        links.forEach(function (link) {
            var filename = link.getAttribute('href').split('/').pop(); // Get the filename from the URL
            filenames.push(filename);
        });
        return filenames;
    }
};
