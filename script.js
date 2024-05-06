window.onload = function () {
    var galleryDiv = document.getElementById('gallery');

    fetchImages().then(function (images) {
        images.forEach(function (image) {
            var img = document.createElement('img');
            img.src = 'images/' + image.name;
            img.alt = image.name;
            galleryDiv.appendChild(img);
        });
    });

    function fetchImages() {
        return fetch('images')
            .then(response => response.json())
            .then(data => data.filter(item => item.type === 'file'));
    }
};
