// Array of funny/roasting messages
const loadingMessages = [
    "Generating your QR code... unlike your ex, I won't ghost you.",
    "Working on it... faster than your internet connection, hopefully.",
    "Creating magic... or at least a scannable square.",
    "Processing... this would be faster if you bought me coffee.",
    "Hold tight... unlike your CSS, I won't break.",
    "Almost there... just like your deadlines, I'm approaching fast.",
    "QR code incoming... with fewer bugs than your last project.",
    "Compiling awesomeness... just like your code (but actually working).",
    "Reticulating splines... okay, not really, but it sounds cool.",
    "Doing the thing... that thing you pay developers to do."
  ];
  
  const randomMessages = [
    "Why did the web developer go broke? Because he used up all his cache!",
    "UX Designer to QR Code: 'You're so square!' QR Code: 'At least I work on all devices.'",
    "This QR code has better responsiveness than your last website.",
    "If this QR code doesn't work, try turning it off and on again.",
    "I generate QR codes better than you generate excuses for not writing tests.",
    "Your logo in the middle makes this QR code look fancy, unlike your code.",
    "QR codes: The only squares developers actually like.",
    "Warning: May contain traces of actual usefulness.",
    "This tool is more reliable than your production environment.",
    "Made with 100% organic, free-range pixels."
  ];
  
  const tipMessages = [
    "Make your QR code scannable, unlike your handwriting.",
    "A good logo in the center is like a good UX designer - it makes everything better.",
    "If your QR code doesn't work, it's probably user error. Just kidding... maybe.",
    "This tool is free, unlike your therapist after seeing your design choices.",
    "Pro tip: Test your QR code before printing 10,000 copies.",
    "Your QR code should work better than your last MVP.",
    "Remember: QR codes are like APIs - they should just work.",
    "This QR code has better uptime than your side project.",
    "No QR codes were harmed in the making of this website.",
    "QR codes: Because typing URLs is so 2010."
  ];
  
  // DOM elements
  const urlInput = document.getElementById('url-input');
  const logoUpload = document.getElementById('logo-upload');
  const qrColor = document.getElementById('qr-color');
  const bgColor = document.getElementById('bg-color');
  const generateBtn = document.getElementById('generate-btn');
  const downloadBtn = document.getElementById('download-btn');
  const qrCodeElement = document.getElementById('qr-code');
  const loader = document.getElementById('loader');
  const loaderMessage = document.getElementById('loader-message');
  const randomMessageElement = document.getElementById('random-message');
  const tipsList = document.querySelector('.tips-list');
  
  // Initialize QR code
  let qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    data: "https://example.com",
    image: "",
    dotsOptions: {
      type: "rounded",
      color: qrColor.value
    },
    backgroundOptions: {
      color: bgColor.value
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 4,
      imageSize: 0.4
    }
  });
  
  // Append QR code to DOM
  qrCode.append(document.getElementById('qr-code'));
  
  // Update random messages periodically
  function updateRandomMessage() {
    const randomIndex = Math.floor(Math.random() * randomMessages.length);
    randomMessageElement.textContent = randomMessages[randomIndex];
    
    // Update tips
    tipsList.innerHTML = '';
    const shuffledTips = [...tipMessages].sort(() => 0.5 - Math.random()).slice(0, 4);
    shuffledTips.forEach(tip => {
      const li = document.createElement('li');
      li.textContent = tip;
      tipsList.appendChild(li);
    });
  }
  
  // Show loading state
  function showLoading() {
    const randomIndex = Math.floor(Math.random() * loadingMessages.length);
    loaderMessage.textContent = loadingMessages[randomIndex];
    loader.style.display = 'block';
    qrCodeElement.style.display = 'none';
    downloadBtn.disabled = true;
  }
  
  // Hide loading state
  function hideLoading() {
    loader.style.display = 'none';
    qrCodeElement.style.display = 'block';
  }
  
  // Generate QR code
  function generateQRCode() {
    const url = urlInput.value.trim();
    
    if (!url) {
      alert("Please enter a valid URL");
      return;
    }
    
    showLoading();
    
    // Get logo if uploaded
    let logo = '';
    if (logoUpload.files && logoUpload.files[0]) {
      const reader = new FileReader();
      reader.onload = function(e) {
        logo = e.target.result;
        createQRCode(url, logo);
      };
      reader.readAsDataURL(logoUpload.files[0]);
    } else {
      createQRCode(url, logo);
    }
  }
  
  // Create QR code with given parameters
  function createQRCode(url, logo) {
    qrCode.update({
      data: url,
      image: logo,
      dotsOptions: {
        type: "rounded",
        color: qrColor.value
      },
      backgroundOptions: {
        color: bgColor.value
      }
    });
    
    // Simulate processing delay
    setTimeout(() => {
      hideLoading();
      downloadBtn.disabled = false;
      updateRandomMessage();
    }, 1500);
  }
  
  // Download QR code
  function downloadQRCode() {
    qrCode.download({
      name: "qrcode",
      extension: "png"
    });
  }
  
  // Event listeners
  generateBtn.addEventListener('click', generateQRCode);
  downloadBtn.addEventListener('click', downloadQRCode);
  
  // Initialize random messages
  updateRandomMessage();
  setInterval(updateRandomMessage, 10000);