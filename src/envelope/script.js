document.addEventListener('DOMContentLoaded', () => {
  let currentCardIndex = 1;
  const cards = document.querySelectorAll('.card');
  const envelope = document.querySelector('.envelope');

  const swipeCard = () => {
    if (currentCardIndex <= cards.length) {
      const card = document.querySelector(
        `.card[data-index="${currentCardIndex}"]`
      );
      card.style.transform = 'translateY(-250px)';
      currentCardIndex++;
    }
  };

  envelope.addEventListener('click', swipeCard);
  envelope.addEventListener('touchstart', swipeCard);
});
