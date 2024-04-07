let uploadedImage = null; // Global variable to store the uploaded image

function displayUploaded() {
    const fileInput = document.getElementById('imageUpload');
    const imageDisplay = document.getElementById('imageDisplay');

    const file = fileInput.files[0];
    if (!file) {
        alert('Please select an image to upload.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const uploadedImg = new Image();
        uploadedImg.src = e.target.result;
        uploadedImg.onload = function () {
            imageDisplay.innerHTML = ''; // Clear previous content
            imageDisplay.appendChild(uploadedImg);
            uploadedImage = cv.imread(uploadedImg); // Convert uploaded image to OpenCV Mat
        };
    };
    reader.readAsDataURL(file);
}

function processImage(operation) {
    if (!uploadedImage) {
        alert('Please upload an image first.');
        return;
    }

    // Perform image processing based on the selected operation
    switch (operation) {
        case 'grayscale':
            applyGrayscale();
            break;
        case 'edgeDetection':
            applyEdgeDetection();
            break;
        case 'blur':
            applyBlur();
            break;
        case 'histogramEqualization':
            applyHistogramEqualization();
            break;
        default:
            alert('Invalid operation.');
    }
}

function applyGrayscale() {
    const dst = new cv.Mat();
    cv.cvtColor(uploadedImage, dst, cv.COLOR_RGBA2GRAY, 0);

    const canvas = document.createElement('canvas');
    canvas.width = dst.cols;
    canvas.height = dst.rows;
    document.getElementById('imageDisplay').appendChild(canvas);

    cv.imshow(canvas, dst);
    dst.delete();
}


function applyEdgeDetection() {
    const dst = new cv.Mat();
    cv.cvtColor(uploadedImage, uploadedImage, cv.COLOR_RGBA2GRAY, 0);
    cv.Canny(uploadedImage, dst, 50, 150, 3, false); // Edge detection parameters (adjust as needed)

    const canvas = document.createElement('canvas');
    canvas.id = 'edgeCanvas'; // Set the ID for the canvas element
    canvas.width = dst.cols;
    canvas.height = dst.rows;
    document.getElementById('imageDisplay').appendChild(canvas);

    cv.imshow('edgeCanvas', dst); // Use the canvas ID as the argument for cv.imshow
    dst.delete();
}


function applyBlur() {
    const dst = new cv.Mat();
    cv.GaussianBlur(uploadedImage, dst, {width: 5, height: 5}, 0, 0, cv.BORDER_DEFAULT); // Gaussian blur parameters (adjust as needed)
    cv.imshow('imageDisplay', dst);
    dst.delete();
}

function applyHistogramEqualization() {
    const dst = new cv.Mat();
    cv.cvtColor(uploadedImage, uploadedImage, cv.COLOR_RGBA2GRAY, 0);
    cv.equalizeHist(uploadedImage, dst);
    cv.imshow('imageDisplay', dst);
    dst.delete();
}

function clearUpload() {
    uploadedImage = null; // Reset uploaded image variable
    const imageDisplay = document.getElementById('imageDisplay');
    imageDisplay.innerHTML = ''; // Clear uploaded image from display
}

function uploadNext() {
    const fileInput = document.getElementById('imageUpload');
    fileInput.value = ''; // Clear file input field
    clearUpload(); // Clear uploaded image from display
}

function applyBlur() {
    const dst = new cv.Mat();
    cv.GaussianBlur(uploadedImage, dst, { width: 5, height: 5 }, 0, 0, cv.BORDER_DEFAULT); // Gaussian blur parameters (adjust as needed)

    const canvasId = 'resultCanvas'; // ID for the canvas element
    const canvas = document.getElementById(canvasId) || document.createElement('canvas');
    canvas.id = canvasId;
    canvas.width = dst.cols;
    canvas.height = dst.rows;

    document.getElementById('imageDisplay').appendChild(canvas);

    cv.imshow(canvasId, dst); // Use the canvas ID as the argument for cv.imshow
    dst.delete();
}

function applyHistogramEqualization() {
    if (!uploadedImage) {
        alert('Please upload an image first.');
        return;
    }

    const dst = new cv.Mat();
    cv.cvtColor(uploadedImage, uploadedImage, cv.COLOR_RGBA2GRAY, 0);
    cv.equalizeHist(uploadedImage, dst);

    const canvasId = 'resultCanvas'; // ID for the canvas element
    let canvas = document.getElementById(canvasId);

    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = canvasId;
        document.getElementById('imageDisplay').appendChild(canvas);
    }

    canvas.width = dst.cols;
    canvas.height = dst.rows;

    cv.imshow(canvasId, dst);
    dst.delete();
}
