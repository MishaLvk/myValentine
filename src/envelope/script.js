document.addEventListener('DOMContentLoaded', function () {
  const envelope = document.querySelector('.envelope');
  const envelopeTop = document.querySelector('.envelope__top');
  const content = document.querySelector('.items');
  const contentItems = document.querySelectorAll('.photo');
  const postcard = document.querySelector('.postcard'); // Додаємо відкритку
  let isOpen = false;

  function toggleEnvelope(open) {
    isOpen = open;
    envelope.classList.toggle('open', isOpen);
    envelope.classList.toggle('closed', !isOpen);

    if (isOpen) {
      envelope.style.transform = 'translateY(50px)'; // Опускаємо конверт трохи вниз
      postcard.style.transition = 'transform 1.5s ease-out';
      postcard.style.transform = 'translateY(-60px)'; // Відкритка трохи висовується
      releasePhotos();
    } else {
      postcard.style.transition = 'transform 1s ease-in';
      postcard.style.transform = 'translateY(-8px)'; // Відкритка повертається назад
      setTimeout(() => {
        envelope.style.transition = 'transform 2.5s ease-out';
        envelope.style.transform = 'translateY(0)';
        collectPhotos();
      }, 500); // Затримка перед закриттям конверта
    }
  }

  envelopeTop.addEventListener('click', () => {
    toggleEnvelope(!isOpen);
  });

  document.addEventListener('touchstart', function (event) {
    const startY = event.touches[0].clientY;

    function onSwipeEnd(e) {
      const endY = e.changedTouches[0].clientY;
      if (endY - startY > 50) {
        toggleEnvelope(false);
      } else if (startY - endY > 50) {
        toggleEnvelope(true);
      }
      document.removeEventListener('touchend', onSwipeEnd);
    }
    document.addEventListener('touchend', onSwipeEnd);
  });

  function releasePhotos() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    contentItems.forEach((photo, index) => {
      let angle = Math.random() * 40 - 20 + 'deg';
      let x = Math.random() * (screenWidth * 0.6) - screenWidth * 0.3 + 'px'; // Обмеження в межах екрану
      let y = -Math.random() * (screenHeight * 0.4) - screenHeight * 0.2 + 'px'; // Виліт тільки вгору
      photo.style.transition =
        'transform 0.7s ease-out, top 0.7s ease-out, left 0.7s ease-out';
      photo.style.transform = `translate(${x}, ${y}) rotate(${angle})`;
    });
  }

  function collectPhotos() {
    contentItems.forEach(photo => {
      photo.style.transition = 'transform 0.7s ease-in';
      photo.style.transform = 'translate(0, 10px) rotate(0)';
    });
  }
});
