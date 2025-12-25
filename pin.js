const API_KEY = "53803149-f2d5735eaf08880ceb3ded9e5"
const API_URL="https://pixabay.com/api/"
const imgBox = document.querySelector(".imageBox")
const input = document.querySelector(".input-image")
const btn= document.querySelector(".btn-image")
let infoDiv = document.querySelector(".info-footer")
function scrolling(baby){
  imgBox.appendChild(baby)
  imgBox.scrollTop = imgBox.scrollHeight
}
function addUser(text){
  const userDiv = document.createElement("div")
  userDiv.className="img-content-user"
  userDiv.textContent=`${text}`
  scrolling(userDiv)
}
function addBot(image){
  image.forEach( img=> {
  const botDiv = document.createElement("div")
  botDiv.className="img-content-bot"
  setTimeout(() => {
  botDiv.innerHTML=`
  <img src="${img.webformatURL}">
  <div class="info-footer">
          <h4><i>INFO </i><i class="bi bi-info-circle"></i></h4>
          <a href="#" onclick="voir('${img.largeImageURL}')"class="voir">
            VOIR &nbsp;<i class="bi bi-image"></i>
          </a>
          <a href="${img.largeImageURL}"class="download" download>
            DOWNLOAD &nbsp;<i class="bi bi-download"></i>
            </a>
        </div>
  `
  scrolling(botDiv)
  },1000)
})
}
function search(word){
  input.value = word
  setTimeout(()=> {
  send(word)
  },1000)
}
async function send(){
  const req = input.value.trim();
  if(!req) return;
  addUser(req)
  input.value=""
  const load = document.createElement("div")
  load.className="loading"
  scrolling(load)
  
  try{
    const res = await fetch(`
    ${API_URL}?key=${API_KEY}&q=${encodeURIComponent(req)}&image_type=photo&per_page=6&safesearch=true&lang=fr
    `)
    const data = await res.json()
    imgBox.removeChild(load)
    if(data.hits.length){
      setTimeout(() => {
      addBot(data.hits)
      },1000)
    }
    else {
      load.classList.remove("loading")
      load.classList.add("text")
      load.textContent=`Aucune image trouvée`
      scrolling(load)
    }
  }catch{
    load.classList.remove("loading")
    load.classList.add("text")
    load.textContent="Erreur reseau"
  }
}
function voir(url) {
  const overlay = document.createElement("div")
  overlay.style.position = "fixed"
  overlay.style.top = 0
  overlay.style.left = 0
  overlay.style.width = "100%"
  overlay.style.height = "100%"
  overlay.style.background = "rgba(0,0,0,0.85)"
  overlay.style.display = "flex"
  overlay.style.alignItems = "center"
  overlay.style.justifyContent = "center"
  overlay.style.zIndex = 9999

  overlay.innerHTML = `
    <img src="${url}" style="
      max-width: 90%;
      max-height: 90%;
      border-radius: 12px;
    ">
  `

  overlay.onclick = () => overlay.remove()
  document.body.appendChild(overlay)
}
input.addEventListener("keydown",e => {
  if (e.key === "Enter") {
    send()
  }
})
