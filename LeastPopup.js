class LeastPopup {
  constructor({containerClass}) {
    this.container = document.querySelector(`.${containerClass}`);
    this.photos = document.querySelectorAll(`.${containerClass} img`);
    // Индекс активного фото
    this.indexPhoto = null;

    // Инициализация проекта
    this.init();
  }
  init() {
    this.container.addEventListener('click', this.openModal);
  }
  openModal = () => {
    const target = event.target;

    // Проверка на картинку
    if(target.tagName != 'IMG') return;

    this.photos.forEach((photo, index) => {
      if(target.src == photo.src) {
        this.indexPhoto = index;
      }
    });

    this.renderModal(target.src);
  }
  renderModal = (srcImg) => {
    const modal = document.createElement('div');
    modal.className = 'lp-modal';
    modal.innerHTML = `
    <div class="lp-modal__close">✕</div>
    <div class="lp-modal__arrow lp-modal__prev">&#10148</div>
    <div class="lp-modal__wrapper">
        <div class="lp-modal__content">
            <div class="lp-modal__counter">
                <span class="lp-modal__counter-current">${this.indexPhoto+1}</span> / <span class="lp-modal__counter-total">${this.photos.length}</span>
            </div>
            <img src="${srcImg}" class="lp-modal__img">
        </div>
    </div>
    <div class="lp-modal__arrow lp-modal__next">&#10148</div>
    `;
    document.querySelector('body').prepend(modal);

    // Закрытие модального окна
    document.querySelector('.lp-modal').addEventListener('click', this.deleteModal);
    // Пролистывание на предыдущее изображение
    document.querySelector('.lp-modal__prev').addEventListener('click', this.swapPrevImage);
    // Пролистывание на следующее изображение
    document.querySelector('.lp-modal__next').addEventListener('click', this.swapNextImage);
  }
  deleteModal = (event) => {
    const target = event.target;
    
    if(target.closest(".lp-modal__arrow") || target.closest(".lp-modal__img") || target.closest(".lp-modal__counter")) return;

    document.querySelector('.lp-modal').remove();
  }
  swapPrevImage = () => {
    const galleryPhoto = document.querySelector('.lp-modal__img');
    
    // Если нулевой индекс, то начинаем с конца
    if(this.indexPhoto != 0) {
      this.indexPhoto--;
    }
    else {
      this.indexPhoto = this.photos.length-1;
    }

    // Добавление ссылки нужной фотографии в изображение модального окна
    galleryPhoto.src = this.photos[this.indexPhoto].src;
    // Добавление текущего индекса фотографии
    document.querySelector('.lp-modal__counter-current').innerHTML = this.indexPhoto+1;
  }
  swapNextImage = () => {
    const galleryPhoto = document.querySelector('.lp-modal__img');

    // Если последнее индекс, то начинаем сначало
    if(this.indexPhoto != this.photos.length-1) {
      this.indexPhoto++;
    }
    else {
      this.indexPhoto = 0;
    }

    // Добавление ссылки нужной фотографии в изображение модального окна
    galleryPhoto.src = this.photos[this.indexPhoto].src;
    // Добавление текущего индекса фотографии
    document.querySelector('.lp-modal__counter-current').innerHTML = this.indexPhoto+1;
  }
}