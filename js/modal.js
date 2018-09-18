var linkFormWriteUs = document.querySelector('.contacts .link');
var linkMap = document.querySelector('.contacts .map-link');
var overlay = document.querySelector('.popup-overlay');
var modalWriteUs = document.querySelector('.popup-write-us');
var btnClose = document.querySelector('.popup-write-us .btn-close');
var btnCloseMap = document.querySelector('.popup-map .btn-close');
var modalMap = document.querySelector('.popup-map');
var mapPic = document.querySelector('.popup-map .map-pic');
var form = document.querySelector('.popup-write-us__form');
var formLogin = document.querySelector('.popup-write-us__form .title-field__name');
var formEmail = document.querySelector('.popup-write-us__form .title-field__email');
var isStorageSupport = true;
var storage = '';
var iframe = document.querySelector('.popup-map iframe');
var iframeStatus = '';

// Проверка работы localStorage
try {
  storage = localStorage.getItem('userLogin');
} catch (err) {
  isStorageSupport = false;
}
// Проверка загрузки iframe с картой Яндекса
try {
  var iframeDocument = iframe.contentWindow.document || iframe.contentDocument;
  if (iframeDocument.readyState  == 'complete') {
    iframeStatus = true;}
} catch (err) {
    iframeStatus = false;
}

// Методы при взаимодействии с элементами
function hideModalWriteUs(evt) {
  evt.preventDefault();
  formLogin.classList.remove('popup-write-us--error');
  formEmail.classList.remove('popup-write-us--error');
  overlay.classList.remove('popup-overlay--active');
  modalWriteUs.classList.remove('popup-write-us--active');
}
function hideModalMap(evt) {
  evt.preventDefault();
  overlay.classList.remove('popup-overlay--active');
  modalMap.classList.remove('popup-map--active');
}
function showModalWriteUs(evt) {
  evt.preventDefault();
  modalWriteUs.classList.add('popup-write-us--active');
  overlay.classList.add('popup-overlay--active');
  if (storage) {
    formLogin.value = storage;
    formEmail.focus();
  } else {
    formLogin.focus();
  };
  window.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 27) {
      hideModalWriteUs(evt);
    }});
}
function showModalMap(evt) {
  evt.preventDefault();
  modalMap.classList.add('popup-map--active');
  overlay.classList.add('popup-overlay--active');
  if (iframeStatus) {
    mapPic.style.display = 'none';
  }
  window.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 27) {
      hideModalMap(evt);
    }});
}
function formValue(evt) {

  if (!formLogin.value) {
    evt.preventDefault();
    formLogin.classList.remove('popup-write-us--error');
    formLogin.offsetWidth = formLogin.offsetWidth;
    formLogin.classList.add('popup-write-us--error');
  } else if (!formEmail.value) {
    evt.preventDefault();
    formEmail.classList.remove('popup-write-us--error');
    formEmail.offsetWidth = formEmail.offsetWidth;
    formEmail.classList.add('popup-write-us--error');
  } else {
    if (isStorageSupport) {
    localStorage.setItem('userLogin', formLogin.value);
    localStorage.setItem('userPassword', formEmail.value);
  }};
}
// Действия с использованием методов
linkFormWriteUs.addEventListener('click', showModalWriteUs);
linkMap.addEventListener('click', showModalMap);
overlay.addEventListener('click', hideModalWriteUs);
overlay.addEventListener('click', hideModalMap);
btnClose.addEventListener('click', hideModalWriteUs);
btnCloseMap.addEventListener('click', hideModalMap);
form.addEventListener('submit', formValue);

