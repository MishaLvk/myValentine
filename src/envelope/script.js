document.addEventListener('DOMContentLoaded', function () {
  const envelope = document.querySelector('.envelope');
  const envelopeTop = document.querySelector('.envelope__top');
  const content = document.querySelector('.items');
  const contentItems = document.querySelectorAll('.photo');
  let isOpen = false;
  let stack = Array.from(contentItems).reverse(); // Стек для витягування вмісту

  function toggleEnvelope(open) {
    isOpen = open;
    envelope.classList.toggle('open', isOpen);
    envelope.classList.toggle('closed', !isOpen);
    content.style.top = isOpen ? '80%' : '100%';
  }

  envelopeTop.addEventListener('click', () => {
    toggleEnvelope(!isOpen);
  });

  document.addEventListener('touchstart', function (event) {
    const startY = event.touches[0].clientY;

    function onSwipeEnd(e) {
      const endY = e.changedTouches[0].clientY;
      if (endY - startY > 50) {
        // Свайп вниз - закрити конверт і повернути вміст
        stack.forEach(item => {
          content.appendChild(item);
        });
        toggleEnvelope(false);
      } else if (startY - endY > 50) {
        // Свайп вгору - відкрити конверт
        toggleEnvelope(true);
      }
      document.removeEventListener('touchend', onSwipeEnd);
    }
    document.addEventListener('touchend', onSwipeEnd);
  });

  contentItems.forEach(item => {
    item.addEventListener('mousedown', startDrag);
    item.addEventListener('touchstart', startDrag);
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

    function onMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    function onTouchMove(event) {
      let touch = event.touches[0];
      moveAt(touch.pageX, touch.pageY);
    }

    document.addEventListener('mousemove', onMove);
    document.addEventListener('touchmove', onTouchMove);

    function drop() {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('mouseup', drop);
      document.removeEventListener('touchend', drop);
    }

    document.addEventListener('mouseup', drop);
    document.addEventListener('touchend', drop);
  }
});
