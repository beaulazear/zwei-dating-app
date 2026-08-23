/**
 * Preload critical images for faster initial render
 * This helps reduce perceived load time for the first card
 */

export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadImages = (imageSources) => {
  return Promise.all(imageSources.map(src => preloadImage(src)));
};

export const preloadFirstCard = (users) => {
  if (users && users.length > 0) {
    // Preload the first card's image (top of stack)
    const firstUser = users[users.length - 1];
    if (firstUser && firstUser.image) {
      preloadImage(firstUser.image);
    }
  }
};
