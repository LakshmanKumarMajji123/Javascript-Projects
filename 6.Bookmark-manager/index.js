
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, query, where, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbYiwyZiccsCWBoRoGE3l_F42KRvmnCAQ",
  authDomain: "bookmark-69f03.firebaseapp.com",
  projectId: "bookmark-69f03",
  storageBucket: "bookmark-69f03.firebasestorage.app",
  messagingSenderId: "144767908031",
  appId: "1:144767908031:web:00db71f3273424aeb82e0a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//intiate the service
const db = getFirestore();

const collectionRef = collection(db, "bookmarks");


//Insert (Adding)
const addForm = document.querySelector(".add");
addForm.addEventListener("submit", event => {
  event.preventDefault();

  addDoc(collectionRef, {
    link: addForm.link.value,
    title: addForm.title.value,
    category: addForm.category.value,
    createdAt: serverTimestamp()
  })
    .then(() => {
      addForm.reset();

      showCards();
    })
});



//function for generating template
function generateTemplate(response, id) {

  return `<div class="card">
              <p class="title">${response.title}</p>

              <div class="sub-information">
                <p>
                  <span class="category ${response.category}">${response.category[0].toUpperCase()}${response.category.slice(1)}</span>
                </p>
                <a href="${response.link}" target="_blank"><i class="bi bi-box-arrow-up-right website"></i></a>
                <a href="https://www.google.com/search?q=${response.title}" target="_blank"><i class="bi bi-google search"></i></a>
                <span><i class="bi bi-trash delete" data-id="${id}"></i></span>
              </div>
            </div>`;
}



//Read
const cards = document.querySelector(".cards");

function showCards() {
  cards.innerHTML = "";
  getDocs(collectionRef)
    .then(data => {

      data.docs.forEach(document => {
        cards.innerHTML += generateTemplate(document.data(), document.id);
      });
      deleteEvent();

    })
    .catch(error => {
      console.log(error);
    });
}

showCards();


//Delete
function deleteEvent() {
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach(button => {

    button.addEventListener("click", event => {
      const deleteRef = doc(db, "bookmarks", button.dataset.id);
      deleteDoc(deleteRef)
        .then(() => {
          button.parentElement.parentElement.parentElement.remove();
        })
    });

  });
}


//filtered-out cards
function filteredCards(category) {

  if (category === "All") {
    showCards();
  }
  else {
    const queryRef = query(collectionRef, where("category", "==", category.toLowerCase()));
    cards.innerHTML = "";
    getDocs(queryRef)
      .then(data => {

        data.docs.forEach(document => {

          cards.innerHTML += generateTemplate(document.data(), document.id);
        });
        deleteEvent();

      })
      .catch(error => {
        console.log(error);
      });
  }
}
const categoryList = document.querySelector(".category-list");
const categorySpan = document.querySelectorAll(".category-list span");
categoryList.addEventListener("click", event => {

  if (event.target.tagName === "SPAN") {

    filteredCards(event.target.innerText);
  }

  categorySpan.forEach(span => span.classList.remove("active"));
  event.target.classList.add("active");
});

