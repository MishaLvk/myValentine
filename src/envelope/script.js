document.addEventListener('DOMContentLoaded', function () {
  const envelope = document.querySelector('.envelope');
  const envelopeTop = document.querySelector('.envelope__top');
  const photos = document.querySelectorAll('.photo');
  let isOpen = false; // Конверт стартує у відкритому стані
  let startY = 0;

  function toggleEnvelope(open) {
    isOpen = open;
    envelope.classList.toggle('open', isOpen);
    envelope.classList.toggle('closed', !isOpen);
  }

  // Початковий стан - відкритий конверт
  envelope.classList.add('closed');

  envelopeTop.addEventListener('click', () => toggleEnvelope(!isOpen));

  envelope.addEventListener('touchstart', function (event) {
    startY = event.touches[0].clientY;
  });

  envelope.addEventListener('touchend', function (event) {
    let endY = event.changedTouches[0].clientY;
    if (endY - startY > 20) {
      toggleEnvelope(false); // Свайп вниз → закрити
    } else if (startY - endY > 20) {
      toggleEnvelope(true); // Свайп вгору → відкрити
    }
  });

  // Перетягування фото
  photos.forEach(photo => {
    photo.addEventListener('mousedown', startDrag);
    photo.addEventListener('touchstart', startDrag);
  });

  function startDrag(event) {
    event.preventDefault();
    let target = event.target;
    let shiftX = event.clientX - target.getBoundingClientRect().left;
    let shiftY = event.clientY - target.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
      target.style.position = 'absolute';
      target.style.zIndex = 1000;
      target.style.left = pageX - shiftX + 'px';
      target.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    function onTouchMove(event) {
      let touch = event.touches[0];
      moveAt(touch.pageX, touch.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onTouchMove);

    function drop() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('mouseup', drop);
      document.removeEventListener('touchend', drop);
    }

    document.addEventListener('mouseup', drop);
    document.addEventListener('touchend', drop);
  }
});
