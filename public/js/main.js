// Status messages
const statusMessages = [
    "Your QR code is ready!",
    "QR generated successfully!",
    "Looking sharp! Ready to download",
    "Professional QR code created",
    "Scan-worthy QR code generated"
  ];
  
  // Roasting messages
  const roastMessages = [
    "Your code might have bugs, but this QR won't",
    "Even your grandma could scan this!",
    "This QR won't ask you to update dependencies",
    "More reliable than your internet connection",
    "No JavaScript errors here (unlike your code)",
    "This QR works better than your last relationship",
    "Your code may fail, but this QR won't",
    "This QR has better uptime than your side projects",
    "Scan me like you scan Tinder profiles"
  ];
  
  // Initialize QR Code
  const qrCode = new QRCodeStyling({
    width: 240,
    height: 240,
    data: "",
    dotsOptions: {
      type: "rounded",
      color: "#000000"
    },
    backgroundOptions: {
      color: "#ffffff"
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 8,
      imageSize: 0.4
    }
  });
  
  // DOM Elements
  const urlInput = document.getElementById('url-input');
  const logoUpload = document.getElementById('logo-upload');
  const uploadPreview = document.getElementById('upload-preview');
  const qrColorInput = document.getElementById('qr-color');
  const bgColorInput = document.getElementById('bg-color');
  const styleButtons = document.querySelectorAll('.style-btn');
  const generateBtn = document.getElementById('generate-btn');
  const downloadBtn = document.getElementById('download-btn');
  const newBtn = document.getElementById('new-btn');
  const loader = document.getElementById('loader');
  const qrContainer = document.getElementById('qr-container');
  const qrPlaceholder = document.querySelector('.qr-placeholder');
  const roastMessage = document.getElementById('roast-message');
  
  // Current settings
  let currentSettings = {
    style: "rounded",
    qrColor: "#000000",
    bgColor: "#ffffff",
    logo: null
  };
  
  // Update color displays
  qrColorInput.addEventListener('input', (e) => {
    currentSettings.qrColor = e.target.value;
    qrColorInput.nextElementSibling.textContent = e.target.value.toUpperCase();
  });
  
  bgColorInput.addEventListener('input', (e) => {
    currentSettings.bgColor = e.target.value;
    bgColorInput.nextElementSibling.textContent = e.target.value.toUpperCase();
  });
  
  // Style button selection
  styleButtons.forEach(button => {
    button.addEventListener('click', () => {
      styleButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      currentSettings.style = button.dataset.style;
    });
  });
  
  // Logo upload preview
  logoUpload.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        uploadPreview.innerHTML = '';
        const img = document.createElement('img');
        img.src = event.target.result;
        img.alt = "Logo preview";
        uploadPreview.appendChild(img);
        currentSettings.logo = event.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  });
  
  // Generate QR Code
  generateBtn.addEventListener('click', () => {
    const url = urlInput.value.trim();
    
    if (!url) {
      updateStatus("Please enter a URL first", "error");
      urlInput.focus();
      return;
    }
  
    // Show loading
    loader.style.display = 'flex';
    qrContainer.innerHTML = '';
    downloadBtn.disabled = true;
    
    // Generate after short delay
    setTimeout(() => {
      generateQR(url);
    }, 300);
  });
  
  // Generate QR with current settings
  function generateQR(url) {
    qrCode.update({
      data: url,
      image: currentSettings.logo,
      dotsOptions: {
        type: currentSettings.style,
        color: currentSettings.qrColor
      },
      backgroundOptions: {
        color: currentSettings.bgColor
      }
    });
  
    // Append QR code
    qrCode.append(qrContainer);
    qrPlaceholder.style.display = 'none';
    
    // Hide loader and show success
    setTimeout(() => {
      loader.style.display = 'none';
      downloadBtn.disabled = false;
      showRandomRoast();
    }, 800);
  }
  
  // Download QR Code
  downloadBtn.addEventListener('click', () => {
    qrCode.download({ 
      name: 'qronster-qr', 
      extension: 'png' 
    });
    showRandomRoast();
  });
  
  // New QR button
  newBtn.addEventListener('click', resetForm);
  
  // Reset form
  function resetForm() {
    urlInput.value = '';
    logoUpload.value = '';
    uploadPreview.innerHTML = '<i class="fas fa-image"></i><span>Select an image file</span>';
    qrContainer.innerHTML = '';
    qrPlaceholder.style.display = 'flex';
    downloadBtn.disabled = true;
    currentSettings.logo = null;
    showRandomRoast();
  }
  
  // Show random roast message
  function showRandomRoast() {
    const randomIndex = Math.floor(Math.random() * roastMessages.length);
    roastMessage.style.opacity = 0;
    
    setTimeout(() => {
      roastMessage.textContent = roastMessages[randomIndex];
      roastMessage.style.opacity = 1;
    }, 500);
  }
  
  // Rotate roast messages every 5 seconds
  function rotateRoasts() {
    showRandomRoast();
    setInterval(showRandomRoast, 5000);
  }
  
  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    rotateRoasts();
  });