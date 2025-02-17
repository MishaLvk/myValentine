document.addEventListener('DOMContentLoaded', function () {
  const envelope = document.querySelector('.envelope');
  const envelopeTop = document.querySelector('.envelope__top');
  const content = document.querySelector('.items');
  const contentItems = document.querySelectorAll('.photo');
  let isOpen = false;
  let stack = Array.from(contentItems).reverse(); // Стек для витягування вмісту

  // Функція для відкриття та закриття конверта
  function toggleEnvelope(open) {
    isOpen = open;
    envelope.classList.toggle('open', isOpen);
    envelope.classList.toggle('closed', !isOpen);
    content.style.top = isOpen ? '80%' : '100%';
  }

  // Клік на верхню частину конверта відкриває/закриває його
  envelopeTop.addEventListener('click', () => {
    toggleEnvelope(!isOpen);
  });

  // Обробка свайпів для відкриття/закриття
  document.addEventListener('touchstart', function (event) {
    const startY = event.touches[0].clientY;

    function onSwipeEnd(e) {
      const endY = e.changedTouches[0].clientY;
      if (endY - startY > 50) {
        // Свайп вниз - повернути всі витягнуті фото та закрити конверт
        contentItems.forEach(item => {
          item.style.transition = 'top 0.5s ease';
          item.style.top = '0px';
        });
        setTimeout(() => {
          stack.forEach(item => content.appendChild(item));
          toggleEnvelope(false);
        }, 500);
      } else if (startY - endY > 50) {
        // Свайп вгору - відкрити конверт
        toggleEnvelope(true);
      }
      document.removeEventListener('touchend', onSwipeEnd);
    }
    document.addEventListener('touchend', onSwipeEnd);
  });

  // Додаємо обробники для перетягування
  document.querySelectorAll('.photo img').forEach(img => {
    img.onmousedown = function (e) {
      e.preventDefault(); // Запобігаємо стандартному drag&drop

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
