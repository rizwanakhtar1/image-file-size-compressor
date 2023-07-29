function compressImage() {
    const fileInput = document.getElementById("fileInput");
    const compressedImage = document.getElementById("compressedImage");
    const downloadLink = document.getElementById("downloadLink");

    if (fileInput.files.length === 0) {
        alert("Please select an image file.");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            canvas.toBlob(function (blob) {
                const compressedBlobUrl = URL.createObjectURL(blob);
                compressedImage.src = compressedBlobUrl;
                downloadLink.href = compressedBlobUrl;
                downloadLink.style.display = "block";
            }, "image/jpeg", 0.7); // 0.7 represents the image quality (0.0 to 1.0, 1.0 being highest)
        };

        img.src = e.target.result;
    };

    reader.readAsDataURL(file);
}
