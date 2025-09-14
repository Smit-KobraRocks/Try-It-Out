// Popup script for AI Virtual Try-On
const API_ENDPOINT = 'https://httpbin.org/post'; // Replace with real backend

let userPhoto = null;
let productImageUrl = null;

function loadProductImage() {
  chrome.runtime.sendMessage({ type: 'GET_PRODUCT_IMAGE' }, (response) => {
    productImageUrl = response?.url || null;
    if (productImageUrl) {
      document.getElementById('product-image').src = productImageUrl;
    }
  });
}

function init() {
  loadProductImage();
  chrome.storage.local.get('userPhoto', (data) => {
    if (data.userPhoto) {
      userPhoto = data.userPhoto;
    }
  });

  document.getElementById('user-photo').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function() {
      userPhoto = reader.result.split(',')[1]; // base64
      chrome.storage.local.set({ userPhoto });
    };
    reader.readAsDataURL(file);
  });

  document.getElementById('try-btn').addEventListener('click', async () => {
    if (!userPhoto || !productImageUrl) {
      alert('Missing user photo or product image');
      return;
    }

    document.getElementById('loading').hidden = false;
    document.getElementById('result-container').hidden = true;

    try {
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_photo: userPhoto,
          product_image_url: productImageUrl,
        }),
      });
      const json = await res.json();
      if (json.result_image) {
        document.getElementById('result-image').src = `data:image/png;base64,${json.result_image}`;
        document.getElementById('result-container').hidden = false;
      } else {
        alert('API did not return an image');
      }
    } catch (err) {
      console.error(err);
      alert('Error contacting API');
    } finally {
      document.getElementById('loading').hidden = true;
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
