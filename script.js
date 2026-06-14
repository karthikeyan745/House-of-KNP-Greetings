document.addEventListener('DOMContentLoaded', () => {
  const dropdownContainer = document.querySelector('.dropdown-container');
  const langBtn = document.getElementById('lang-btn');
  const dropdownMenu = document.getElementById('lang-dropdown');
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  const loader = document.getElementById('loader');
  const imageContainer = document.getElementById('image-container');
  
  // Dual-image elements for seamless cross-fading
  const imgPrimary = document.getElementById('greeting-primary');
  const imgSecondary = document.getElementById('greeting-secondary');

  // Track the currently active image element (starts with primary)
  let activeImg = imgPrimary;
  let inactiveImg = imgSecondary;

  /**
   * Resizes the image container dynamically to match the image aspect ratio
   * without creating black bars or overflowing the viewport.
   * @param {number} imgWidth - Natural width of the image
   * @param {number} imgHeight - Natural height of the image
   */
  function adjustContainerDimensions(imgWidth, imgHeight) {
    if (!imgWidth || !imgHeight) return;

    const aspectRatio = imgWidth / imgHeight;

    // Get header and footer heights for viewport spacing calculations
    const headerHeight = document.querySelector('.header')?.offsetHeight || 120;
    const footerHeight = document.querySelector('.footer')?.offsetHeight || 55;
    
    let maxHeight, maxWidth;
    
    if (window.innerWidth >= 1024) {
      // Desktop View optimization: occupy ~70% of available viewport height
      // Header is absolute on desktop, so only subtract footer and safety margins
      maxHeight = window.innerHeight - footerHeight - 90;
      maxHeight = Math.max(400, Math.min(maxHeight, 680));
      maxWidth = window.innerWidth * 0.85;
    } else {
      // Tablet & Mobile View (unchanged)
      maxHeight = window.innerHeight - headerHeight - footerHeight - 40;
      maxHeight = Math.max(300, Math.min(maxHeight, 580));
      maxWidth = Math.min(window.innerWidth * 0.9, 600);
    }

    // Calculate dimensions based on aspect ratio
    let targetHeight = maxHeight;
    let targetWidth = targetHeight * aspectRatio;

    // If target width exceeds screen width boundaries, scale down based on width
    if (targetWidth > maxWidth) {
      targetWidth = maxWidth;
      targetHeight = targetWidth / aspectRatio;
    }

    // Apply the exact dimensions to the container
    imageContainer.style.width = `${Math.round(targetWidth)}px`;
    imageContainer.style.height = `${Math.round(targetHeight)}px`;
  }

  /**
   * Toggles the dropdown menu's visibility
   */
  function toggleDropdown(event) {
    event.stopPropagation();
    const isOpen = dropdownContainer.classList.contains('open');
    if (isOpen) {
      closeDropdown();
    } else {
      dropdownContainer.classList.add('open');
      langBtn.setAttribute('aria-expanded', 'true');
    }
  }

  /**
   * Closes the dropdown menu
   */
  function closeDropdown() {
    dropdownContainer.classList.remove('open');
    langBtn.setAttribute('aria-expanded', 'false');
  }

  /**
   * Resolves a relative image path to an absolute URL.
   * This ensures consistent path comparison on both localhost and Vercel.
   * @param {string} relativePath - The relative image path (e.g. "images/english.jpg")
   * @returns {string} The fully resolved absolute URL
   */
  function resolveImagePath(relativePath) {
    const a = document.createElement('a');
    a.href = relativePath;
    return a.href; // Browser resolves this to a full absolute URL
  }

  /**
   * Swaps the active greeting image using a smooth cross-fade transition.
   * Uses absolute URL comparison to work correctly on both localhost and Vercel.
   * @param {string} newSrc - Relative path to the selected greeting image
   */
  function switchLanguageImage(newSrc) {
    // Resolve both paths to absolute URLs for reliable cross-environment comparison
    const resolvedNew = resolveImagePath(newSrc);
    const resolvedActive = activeImg.src; // .src always returns absolute URL

    console.log(`[Language Switch] Requested: ${resolvedNew}`);
    console.log(`[Language Switch] Currently active: ${resolvedActive}`);

    // If the selected image is already active, do nothing
    if (resolvedActive === resolvedNew) {
      console.log('[Language Switch] Same image already active, skipping.');
      return;
    }

    // Set up a loading indicator if image takes time to load
    let isLoadingTimeout = setTimeout(() => {
      loader.classList.add('show');
    }, 100); // 100ms delay to prevent flashing on cached images

    // Load the new image in the background (on the inactive img tag)
    inactiveImg.src = newSrc;
    console.log(`[Language Switch] Loading image: ${newSrc}`);

    // Trigger transition when the new image is fully loaded
    inactiveImg.onload = () => {
      clearTimeout(isLoadingTimeout);
      loader.classList.remove('show');
      console.log(`[Language Switch] Image loaded successfully: ${newSrc}`);

      // Adjust container dimensions to match the new image aspect ratio
      adjustContainerDimensions(inactiveImg.naturalWidth, inactiveImg.naturalHeight);

      // Make the loaded image active
      inactiveImg.classList.add('active');
      activeImg.classList.remove('active');

      // Swap the active and inactive pointers for the next language switch
      const temp = activeImg;
      activeImg = inactiveImg;
      inactiveImg = temp;
    };

    // If load fails (e.g., image is missing or case mismatch on server), log the error
    inactiveImg.onerror = () => {
      clearTimeout(isLoadingTimeout);
      loader.classList.remove('show');
      console.error(`[Language Switch] FAILED to load image: ${newSrc}`);
      console.error('[Language Switch] Check: 1) File exists in /images/ folder, 2) Filename case matches exactly, 3) File was committed to GitHub.');
    };
  }

  // Adjust container on initial load once the primary image is loaded
  if (imgPrimary.complete) {
    adjustContainerDimensions(imgPrimary.naturalWidth, imgPrimary.naturalHeight);
  } else {
    imgPrimary.onload = () => {
      adjustContainerDimensions(imgPrimary.naturalWidth, imgPrimary.naturalHeight);
    };
  }

  // Handle window resize dynamically to maintain responsiveness
  window.addEventListener('resize', () => {
    if (activeImg && activeImg.naturalWidth && activeImg.naturalHeight) {
      adjustContainerDimensions(activeImg.naturalWidth, activeImg.naturalHeight);
    }
  });

  // Toggle dropdown on button click
  langBtn.addEventListener('click', toggleDropdown);

  // Close dropdown when clicking outside the dropdown container
  document.addEventListener('click', (event) => {
    if (!dropdownContainer.contains(event.target)) {
      closeDropdown();
    }
  });

  // Handle language selection
  dropdownItems.forEach(item => {
    item.addEventListener('click', (event) => {
      const selectedItem = event.currentTarget;
      
      // Update dropdown selection UI
      dropdownItems.forEach(btn => btn.classList.remove('active'));
      selectedItem.classList.add('active');

      // Start the language transition
      const imgPath = selectedItem.getAttribute('data-img');
      switchLanguageImage(imgPath);

      // Auto-close dropdown after selection
      closeDropdown();
    });
  });
});
