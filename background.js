// Background service worker for AI Virtual Try-On extension
// Stores product image URLs and relays data between content scripts and popup.

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SET_PRODUCT_IMAGE') {
    chrome.storage.local.set({ productImageUrl: message.url }, () => {
      sendResponse({ status: 'ok' });
    });
    // indicate asynchronous response
    return true;
  }

  if (message.type === 'GET_PRODUCT_IMAGE') {
    chrome.storage.local.get('productImageUrl', (data) => {
      sendResponse({ url: data.productImageUrl });
    });
    return true;
  }
});
