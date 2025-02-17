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

    if (!isOpen) {
      setTimeout(() => {
        stack.forEach(item => {
          content.appendChild(item);
          item.style.position = '';
          item.style.left = '';
          item.style.top = '';
        });
      }, 300);
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

  document.querySelectorAll('.photo img').forEach(img => {
    img.addEventListener('touchstart', function (e) {
      e.preventDefault();
      let touch = e.touches[0];
      let shiftX = touch.clientX - img.getBoundingClientRect().left;
      let shiftY = touch.clientY - img.getBoundingClientRect().top;

      img.style.position = 'absolute';
      img.style.zIndex = 1000;
      document.body.appendChild(img);

      function moveAt(pageX, pageY) {
        img.style.left = pageX - shiftX + 'px';
        img.style.top = pageY - shiftY + 'px';
      }

      function onTouchMove(e) {
        let touch = e.touches[0];
        moveAt(touch.pageX, touch.pageY);
      }

      document.addEventListener('touchmove', onTouchMove);

      function stopMoving() {
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', stopMoving);
      }

      document.addEventListener('touchend', stopMoving);
    });
  });

  document.querySelectorAll('.photo img').forEach(img => {
    img.onmousedown = function (e) {
      e.preventDefault();
      var shiftX = e.clientX - img.getBoundingClientRect().left;
      var shiftY = e.clientY - img.getBoundingClientRect().top;

      img.style.position = 'absolute';
      img.style.zIndex = 1000;
      document.body.appendChild(img);

      function moveAt(pageX, pageY) {
        img.style.left = pageX - shiftX + 'px';
        img.style.top = pageY - shiftY + 'px';
      }

      moveAt(e.pageX, e.pageY);

      function onMouseMove(e) {
        moveAt(e.pageX, e.pageY);
      }

      document.addEventListener('mousemove', onMouseMove);

      function stopMoving() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', stopMoving);
      }

      document.addEventListener('mouseup', stopMoving);
    };

    img.ondragstart = function () {
      return false;
    };
  });
});
