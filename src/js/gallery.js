const galleryCollection = document.querySelector('.js-gallery');
const galleryModalBox = document.querySelector('.js-lightbox');
const modalImage = galleryModalBox.querySelector('.lightbox__image');

export default class gallery {
  constructor() {
    this.current = 0; //selected image
    this.min = 0;
    this.max = null;
    // this.initGallery();
    this.galleryImagesArray = null; //array with all links images
    this.urlList = [];
    // console.log(this.urlList);
  }

  updateMaxArray() {
    this.max = this.urlList.length - 1;
  }

  nextNumImage() {
    if (this.current < this.max) {
      this.current += 1; //next image
      return;
    }
    this.current = this.min; //next image on the next round
    return;
  }

  prevNumImage() {
    if (this.current > this.min) {
      this.current -= 1; //prev image
      return;
    }
    this.current = this.max; //prev image on the next round
    return;
  }

  clearUrlList() {
    this.urlList = [];
    // console.log(this.urlList);
  }

  initGallery() {
    this.updateGalleryArray();
    galleryCollection.addEventListener('click', evt => {
      evt.preventDefault();
      if (evt.target.nodeName === 'UL') {
        return;
      }
      this.openModalWindow(); //open modal
      this.imageNumber(evt); //render select image in modal window
    });
  }

  updateGalleryArray() {
    this.galleryImagesArray = document.querySelectorAll('.image-card');
  }

  openModalWindow() {
    galleryModalBox.classList.add('is-open'); //open modal
    galleryModalBox.addEventListener('click', e => {
      this.modalCloseBtn(e);
    });
    galleryModalBox.addEventListener('click', e => {
      this.modalCloseOverlay(e);
    });
    window.addEventListener('keydown', e => {
      this.modalCloseEcsKey(e);
    });
    window.addEventListener('keydown', e => {
      this.modalArrows(e);
    });
  }

  closeModalWindow() {
    galleryModalBox.classList.remove('is-open'); //close modal
    galleryModalBox.removeEventListener('click', e => {
      this.modalCloseBtn(e);
    });
    galleryModalBox.removeEventListener('click', e => {
      this.modalCloseOverlay(e);
    });
    window.removeEventListener('keydown', e => {
      this.modalCloseEcsKey(e);
    });
    window.removeEventListener('keydown', e => {
      this.modalArrows(e);
    });
    this.removeSrcImage();
  }

  modalCloseBtn(evt) {
    if (evt.target.className === 'lightbox__button') {
      this.closeModalWindow(); //close modal
    }
  }

  modalCloseOverlay(evt) {
    if (evt.target.className === 'lightbox__overlay') {
      this.closeModalWindow(); //close modal
    }
  }

  modalCloseEcsKey(evt) {
    if (evt.code === 'Escape') {
      this.closeModalWindow(); //close modal
    }
  }

  imageNumber(img) {
    this.galleryImagesArray.forEach((e, number) => {
      if (
        e == img.target.parentElement.parentElement.parentElement ||
        e == img.target.parentElement.parentElement.parentElement.parentElement ||
        e == img.target.parentElement.parentElement.parentElement.parentElement.parentElement
      ) {
        this.current = number;
        this.buildImageInModal(number); //render image with selected number image in array
      }
    });
  }

  buildImageInModal(number) {
    // console.dir(number);
    modalImage.setAttribute('src', this.urlList[number].largeImageURL);
    modalImage.setAttribute('alt', 'photo');
  }

  removeSrcImage() {
    modalImage.setAttribute('src', '');
    modalImage.setAttribute('alt', '');
  }

  nextImage() {
    this.nextNumImage();
    this.buildImageInModal(this.current); //render image with new "current" value
  }

  prevImage() {
    this.prevNumImage();
    this.buildImageInModal(this.current); //render image with new "current" value
  }

  modalArrows(evt) {
    if (evt.code === 'ArrowRight') {
      this.nextImage();
    } else if (evt.code === 'ArrowLeft') {
      this.prevImage();
    }
  }

  set updateURL(newList) {
    this.urlList = [...this.urlList, ...newList];
    this.updateMaxArray();
    // console.log(this.urlList);
  }
}
