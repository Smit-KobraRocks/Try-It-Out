# AI Virtual Try-On Chrome Extension

This repository contains a sample Chrome extension that lets users try on clothing products virtually using an external AI service. The extension detects product images on supported e-commerce sites and sends them along with a user photo to a backend for processing.

## Supported Sites
- amazon.com
- myntra.com
- flipkart.com
- zara.com

## Development
1. Open `chrome://extensions` in Chrome.
2. Enable **Developer mode**.
3. Click **Load unpacked** and select this folder.
4. Visit a supported product page and open the extension popup.

The popup allows uploading a user photo and sends it together with the detected product image to a backend endpoint (currently set to `https://httpbin.org/post`). Replace the `API_ENDPOINT` value in `popup.js` with your actual backend URL.

## Notes
This is a proof-of-concept and uses simple selectors for each site. Real-world usage may require more robust DOM parsing and error handling.
