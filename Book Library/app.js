const cardAdd = document.getElementById('card-add');
const main = document.getElementById('main');
const input = document.querySelectorAll('input');
const formContainer = document.getElementById('form-container');
const form = document.getElementById('form');
const submit = document.getElementById('submit');
const exit = document.getElementById('exit');

// Library array that holds all books
let myLibrary = [];

// Object Constructor for Book items
function Book(id, title, author, pages, read) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  if (this.read === true) {
    return 'checked';
  }
};

function addBookToLibrary() {
  for (let i = 0; i < myLibrary.length; i++) {
    cardAdd.insertAdjacentHTML(
      'beforebegin',
      `
    <div class="card" data-id="${myLibrary[i].id}">
    <div class="book-info-container">
      <p class="book-title">${myLibrary[i].title}</p>
      <p class="book-author">By ${myLibrary[i].author}</p>
      <p class="book-pages">${myLibrary[i].pages} pages</p>
    </div>
    <div class="buttons-container">
      <div class="read-container">
        <p id="read">Read</p>
        <input type="checkbox" class="read" ${
          myLibrary[i].read ? 'checked' : ''
        }/>
      </div>
      <i class="fas fa-trash-alt"></i>
    </div>
    `
    );
  }
}

function deleteBook() {
  const trash = document.querySelectorAll('.fa-trash-alt');

  for (let i = 0; i < trash.length; i++) {
    trash[i].addEventListener('click', e => {
      let parent = e.target.parentElement;
      let parent2 = parent.parentElement;
      let id = parent2.getAttribute('data-id');

      // Find and remove book from myLibrary array
      for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id === id) {
          myLibrary.splice(i, 1);
        }
      }
      saveToLocal();
      parent2.remove();
    });
  }
}

function saveToLocal() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function populate() {
  if (localStorage.getItem('myLibrary')) {
    const getObj = JSON.parse(localStorage.getItem('myLibrary'));
    myLibrary = getObj;
    addBookToLibrary();
    deleteBook();
    greyOut();
  }
}

// Generate random id
function s4() {
  return Math.floor((1 + Math.random()) * 0x1000)
    .toString(16)
    .substring(1);
}

// Populate library with books from local storage
populate();

// Check if book is read and save to local storage
function checkRead() {
  const read = document.querySelectorAll('.read');
  for (let i = 0; i < read.length; i++) {
    read[i].addEventListener('click', e => {
      const checked = e.target.checked;
      const parent1 = e.target.parentElement;
      const parent2 = parent1.parentElement;
      const bookId = parent2.parentElement.getAttribute('data-id');

      for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id === bookId) {
          myLibrary[i].read = checked;
        }
      }
      saveToLocal();
      greyOut();
    });
  }
}

checkRead();

// Grey out books that are read
function greyOut() {
  const read = document.querySelectorAll('.read');
  for (let i = 0; i < read.length; i++) {
    const parent = read[i].parentElement.parentElement.parentElement;
    if (read[i].checked) {
      parent.style.backgroundColor = 'lightgrey';
    } else {
      parent.style.backgroundColor = '#eeeeee';
    }
  }
}

// Display add book form
cardAdd.addEventListener('click', e => {
  formContainer.style.display = 'flex';
});

// Add book when form is submitted
form.addEventListener('submit', e => {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const formRead = document.getElementById('form-read').checked;
  const bookId = s4() + '-' + s4() + '-' + s4();
  const book = new Book(bookId, title, author, pages, formRead);

  cardAdd.insertAdjacentHTML(
    'beforebegin',
    `
    <div class="card" data-id="${book.id}">
        <div class="book-info-container">
          <p class="book-title">${book.title}</p>
          <p class="book-author">By ${book.author}</p>
          <p class="book-pages">${book.pages} pages</p>
        </div>
        <div class="buttons-container">
          <div class="read-container">
            <p id="read">Read</p>
            <input type="checkbox" class="read" ${book.toggleRead()} />
          </div>
          <i class="fas fa-trash-alt"></i>
        </div>
      </div>
  `
  );

  myLibrary.push(book);
  saveToLocal();
  deleteBook();
  checkRead();
  greyOut();
  e.preventDefault();

  formContainer.style.display = 'none';
});

// Exit Form
exit.addEventListener('click', e => {
  formContainer.style.display = 'none';
});
