const cards = document.querySelector(".cards");
const category = document.querySelector(".category");
const categorySpan = document.querySelectorAll(".category span");

const baseURL = "https://newsapi.org/v2";
const apiKey = "&apiKey=cc64311e817947909c303e3a4b4f0f5a";


const backupImage = "https://images.unsplash.com/photo-1495020689067-958852a7765e?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169";



/**
 * 1. Need to send ta "Fetch Request" to URL
 * 2. Get a response
 * 3. convert that respone and use it.
 */


async function dataRequest(url) {
  try {
    const respone = await fetch(baseURL + url + apiKey);

    const json = respone.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}



function urlRequest(url) {
  dataRequest(url).then(data => {
    data.articles.forEach(item => {
      cards.innerHTML += `<div class="card">

              <div class="image">
                <img src="${item.urlToImage ? item.urlToImage : backupImage}" alt="DefaultImage">
              </div>

              <div class="information">
                <div>
                  <p class="title">${item.title}</p>
                  <p class="description">${item.description}</p>
                  <p class="time">
                    <span>${item.publishedAt.replace("Z", "").split("T")[1]}</span> 
                    <span>${item.publishedAt.replace("Z", "").split("T")[0]}</span>  
                  </p>
                </div>
                <div class="other">
                  <span class="source">${item.source.name}</span>
                  <a class="url" href="${item.url}" target="_blank">Read Article <i class="bi bi-arrow-right"></i></a>
                </div>
              </div>
            </div>`;
      //console.log(item);
    });
  });

}

category.addEventListener("click", event => {

  if (event.target.tagName === "SPAN") {
    cards.innerHTML = "";
    urlRequest(event.target.dataset.id);

    categorySpan.forEach(eachSpan => eachSpan.classList.remove("active"));
    event.target.classList.add("active");
  }

});

urlRequest("/everything?q=tesla&from=2024-10-12&sortBy=publishedAt");  
