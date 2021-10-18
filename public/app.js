// Bootstrap tooltip
var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

// Pretending to copy styling when texts is pasted in editor
function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// main logic for editor
function format(command, value) {
  document.execCommand(command, false, value);
}
const ce = document.querySelector("#editor[contenteditable]");
ce.addEventListener("paste", function (e) {
  e.preventDefault();
  const text = e.clipboardData.getData("text/plain");
  document.execCommand("insertText", false, text);
});

const insertImage = document.getElementById("insertImage");
const editor = document.getElementById("editor");
const imageBtn = document.querySelector(".controls .imageBtn");
const i_s = document.querySelectorAll(".controls i");
const imageMedia = document.querySelector(".controls .imageMedia");
const uploadPhotos = document.querySelectorAll(".uploaded_photos > img");
const photoField = document.querySelector(".controls .uploaded_photos");
const medias = document.querySelectorAll(".controls .media");
const a_i = document.querySelectorAll(
  '.controls a[href="javascript:void(0)"]>i'
);

for (const ai of a_i) {
  ai.addEventListener("click", () => {
    removeMedia();
  });
}

if (photoField.querySelector("div") === null) {
  photoField.innerHTML =
    "<small class='text-secondary' style='grid-column:1/4'>No images uploaded</small>";
}

function removeMedia() {
  medias.forEach((med) => {
    med.parentElement.classList.add('position-relative');
    med.style.top = '100%';
    med.style.left = '0';
    med.classList.add("d-none");
  });
}

insertImage.addEventListener("click", (e) => {
  let media = e.target.nextElementSibling;
  if (!media.classList.contains("d-none")) {
    media.classList.add("d-none");
    removeMedia();
  } else {
    removeMedia();
    media.classList.remove("d-none");
  }
});

for (const photo of uploadPhotos) {
  photo.addEventListener("click", () => {
    let src = photo.getAttribute("data-url");
    document.execCommand("insertImage", false, src);
    removeMedia();
  });
}

function insertImgUrl(e) {
  e.preventDefault();
  let input = e.target.querySelector("input");

  document.execCommand("insertImage", false, input.value);
  input.value = "";
}

function insertVideo(e) {
  e.preventDefault();
  let input = e.target.querySelector("input");
  let src = getParameterByName("v", input.value);
  document.execCommand(
    "insertHTML",
    false,
    `
  <iframe width="560" height="315" src="https://www.youtube.com/embed/${src}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  `
  );
  input.value = "";
  removeMedia();
}

function videoApp(e) {
  let media = e.target.nextElementSibling;
  if (!media.classList.contains("d-none")) {
    removeMedia();
    media.classList.add("d-none");
  } else {
    removeMedia();
    media.classList.remove("d-none");
  }
}
function linkMedia(e) {
  let media = e.target.nextElementSibling;
  if (!media.classList.contains("d-none")) {
    removeMedia();
    media.classList.add("d-none");
  } else {
    removeMedia();
    media.classList.remove("d-none");
  }
}
function insertLink(e) {
  e.preventDefault();
  let inputUrl = e.target.querySelector("input");

  document.execCommand("createLink", false, inputUrl.value);
  removeMedia();
}
function headingInsert() {
  document.execCommand("formatBlock", false, "h2");
}
function paraInsert() {
  document.execCommand("formatBlock", false, "p");
}
function colorMedia(e) {
  let media = e.target.nextElementSibling;
  if (!media.classList.contains("d-none")) {
    removeMedia();
    media.classList.add("d-none");
  } else {
    removeMedia();
    media.classList.remove("d-none");
  }
}
function colorInsert(color) {
  document.execCommand("foreColor", false, color);
  removeMedia();
}
function backInsert(color) {
  document.execCommand("backColor", false, color);
  removeMedia();
}

//confimation plugin

const confirmBtn = document.querySelectorAll(".confirm>svg");

for (const c of confirmBtn) {
  c.addEventListener("click", () => {
    let id = c.parentElement.getAttribute("data-id");
    let post = c.parentElement.getAttribute("data-post");
    let span = document.createElement("span");
    span.classList.add("confirmation");
    span.innerHTML = `
            <span class='d-block'>Are you confirm?</span>
            <span class='d-flex align-items-center'>
                <form action='${post}' method='POST'>
                    <input type='text' name='value' value=${id} class='d-none'/>
                    <button type='submit'>YES</button>
                </form>
                <button class='no-del-com' onclick='no_del(event)'>NO</button>
            </span>
        `;
    c.parentElement.appendChild(span);
  });
}

function no_del(e) {
  e.target.parentElement.parentElement.remove();
}

let mousedown = false;
const mediaMove = document.querySelectorAll('.media .move');
const stopMedias = document.querySelectorAll('svg.stopMedia');

for(const move of mediaMove){
  let media = move.parentElement;
  move.addEventListener('mousedown',()=>{
    mousedown = true;
  });
  document.addEventListener('mouseup',()=>{
    mousedown = false;
  });
  document.addEventListener('mousemove',(e)=>{
    if(mousedown){
      media.style.top=e.clientY+'px';
      media.style.left=e.clientX+'px';
      media.parentElement.classList.remove('position-relative');
    }
  })
}

for(const stopMedia of stopMedias){
  stopMedia.addEventListener('click',(e)=>{
    removeMedia();
  });
}
