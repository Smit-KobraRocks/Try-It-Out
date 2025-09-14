// Content script to detect product images on supported e-commerce sites
// Sends the main product image URL to the background service worker.

(function() {
  function detectImage() {
    const host = location.hostname;
    let imgUrl = null;

    if (host.includes('amazon.')) {
      imgUrl = document.querySelector('#landingImage')?.src;
    } else if (host.includes('myntra.')) {
      imgUrl = document.querySelector('img[itemprop="image"]')?.src;
    } else if (host.includes('flipkart.')) {
      imgUrl = document.querySelector('img._2r_T1I')?.src;
    } else if (host.includes('zara.')) {
      imgUrl = document.querySelector('img[data-qa-model="image"]')?.src;
    }

    if (imgUrl) {
      chrome.runtime.sendMessage({ type: 'SET_PRODUCT_IMAGE', url: imgUrl });
    }
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    detectImage();
  } else {
    document.addEventListener('DOMContentLoaded', detectImage);
  }
})();
