const clear = document.querySelector(".clear");
const dateElement = document.querySelector("#date");
const list = document.getElementById("list");
const item = document.getElementsByClassName("item");
const input = document.getElementById("input");
const check = "fa-check-circle";
const uncheck = "fa-circle-thin";
const lineThrough = "lineThrough";
// console.log(list);

// console.log(input);
let LIST = [];
let id = 0;

function addToDo(toDo, id, done, trash) {
  if (trash) {
    return;
  }
  const DONE = done ? check : uncheck;
  const LINETHROUGH = done ? lineThrough : "";
  const text = `<li class="item">
  <i class="fa ${DONE}" job="complete" id="${id}"></i>
  <p class="text${LINETHROUGH}">${toDo}</p>
  <i class="fa fa-trash-o" job="delete" id="${id}"></i>
</li>`;
  const position = "beforeend";
  list.insertAdjacentHTML(position, text);
}

document.addEventListener("keydown", (e) => {
  if (e.code !== "Enter") {
    return;
  }

  if (e.code === "Enter") {
    const toDo = input.value;
    if (toDo) {
      // console.log(toDo);
      addToDo(toDo, id, false, false);
      LIST.push({ name: toDo, id: id, done: false, trash: false });
      id++;
    }
    input.value = "";
  }
});

function completeToDo(element) {
  // console.log(element, "here");
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  console.log(element.parentNode);
  element.parentNode.querySelector(".text").classList.toggle(lineThrough);
  LIST[element.id].done = LIST[element.id].done ? false : true;
  console.log(LIST[element.id]);
}

function removeToDo(element) {
  console.log("11111111111");

  element.parentNode.parentNode.removeChild(element.parentNode);
  console.log("heereeeeee");
  LIST[element.id].trash = true;
  console.log(LIST[element.id]);
}
list.addEventListener("click", (e) => {
  const element = e.target.closest(".fa");
  if (element) {
    const elementJob = element.attributes.job.value;
    if (elementJob === "complete") {
      completeToDo(element);
    }
    if (elementJob === "delete") {
      removeToDo(element);
    }
  }
});
console.log(LIST);
