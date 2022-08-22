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
let LIST, id;

let data =localStorage.getItem("TODO")

// check data
if(data){
  LIST = JSON.parse(data);
  id=LIST.length ;
  loadList(LIST);
}
else{
  LIST = [];
  id=0;
}

function loadList(array){
  array.forEach(item => {
    addToDoToUi(item.name, item.id, item.done, item.trash);
    
  });
}
clear.addEventListener("click", function(){
  localStorage.clear();
  location.reload();
})

//show date
const options= {weekday:"long", month:"short",day:"numeric"};
const today= new Date();
dateElement.innerHTML=today.toLocaleDateString("en-us", options);

function addToDoToUi(toDo, id, done, trash) {
  if (trash) {
    return;
  }
  const DONE = done ? check : uncheck;
  const LINETHROUGH = done ? lineThrough : "";
  const text = `<li class="item">
  <i class="fa ${DONE}" job="complete" id="${id}"></i>
  <p class="text ${LINETHROUGH}">${toDo}</p>
  <i class="fa fa-trash-o" job="delete" id="${id}"></i>
</li>`;
  const position = "beforeend";
  list.insertAdjacentHTML(position, text);
  console.log(LIST);

}

document.addEventListener("keydown", (e) => {
  if (e.code !== "Enter") {
    return;
  }

  if (e.code === "Enter") {
    const toDo = input.value;
    if (toDo) {
      // console.log(toDo);
      // add to LIST
      LIST.push({ name: toDo, id: id, done: false, trash: false });

      // add to ui
      addToDoToUi(toDo, id, false, false);
            // add to local storage wheneverlist is updated
            localStorage.setItem("TODO", JSON.stringify(LIST));
      id++;

    }
    input.value = "";
  }
});

function completeToDo(element) {
  // console.log(element, "here");
  LIST[element.id].done = LIST[element.id].done ? false : true;
  // updating the UI
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector(".text").classList.toggle(lineThrough);
  console.log(LIST);
}

function removeToDo(element) {
  // console.log("11111111111");
  console.log(element.id)
  // console.log(typeof(element.id))
  

  //   ui code    
  const check_id = parseInt(element.id);
  // console.log(check_id,typeof(check_id))

  
  //LIST[element.id].trash = true;
  // LIST.forEach(app => {
  //   console.log(app.id,typeof(app.id), 'idss') });
  console.log(LIST);

  const indexToDelete = LIST.findIndex((el)=>{return el.id == check_id}); 
  console.log(indexToDelete)

  // LIST deletion
  LIST.splice(indexToDelete , 1)
  // ui deletion
  element.parentNode.parentNode.removeChild(element.parentNode); 
  console.log(LIST);

}
list.addEventListener("click", (e) => {


  try {
    const element = e.target.closest(".fa");
    const elementJob = element.attributes.job.value;
  if(element){
    if (elementJob === "complete") {
      completeToDo(element);
    }
    else if (elementJob === "delete") {
      removeToDo(element);
    }
    // to local storage wheneverlist is updated
    localStorage.setItem("TODO", JSON.stringify(LIST));// add 

  }
  else {return}
} catch (e) {
  alert(e.message);
}

});


console.log(LIST);
