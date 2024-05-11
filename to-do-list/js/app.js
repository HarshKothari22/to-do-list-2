const item = document.querySelector("#item");
const toDoBox = document.querySelector("#to-do-box");

item.addEventListener("keyup",function(event){
    if(event.key === "Enter"){              
        if(this.value == ""){
            alert('you have to write something before.');
        }else{
            addToDo(this.value);
            // addUserToDo();
            saveList();
            this.value = "";
        }
    }
});

// const addUserToDo = () =>{
// const userItem = document.createElement("li");
// };

const addToDo = (item) => { 
    const listItem = document.createElement("li");  
    listItem.innerHTML = `  
        <span>${item}</span>    
        <i class="fa-solid fa-xmark"></i>   
        <i class="fa-regular fa-pen-to-square"></i> 
        <i class="fa-solid fa-circle blue"></i> 
        <i class="fa-solid fa-circle yellow"></i>   
        <i class="fa-solid fa-circle red"></i>  
    `;

    listItem.addEventListener("dblclick",function(){
        this.classList.toggle("dome");
        saveList();
    });
//------------- -------
    listItem.querySelector(".blue").addEventListener("click",function(){
        // toggleBackgroundColor(listItem, "blueBgCr");
        listItem.classList.toggle("blueBgCr");
        saveList();       
    });
    listItem.querySelector(".yellow").addEventListener("click",function(){
        // toggleBackgroundColor(listItem, "yellowBgCr");
        listItem.classList.toggle("yellowBgCr");
        saveList();       
    });
    listItem.querySelector(".red").addEventListener("click",function(){
        // toggleBackgroundColor(listItem, "redBgCr");
        listItem.classList.toggle("redBgCr");
        saveList();       
    });
//-------------- --------   
    listItem.querySelector(".fa-xmark").addEventListener("click",function(){
        listItem.remove();
        saveList();       
    });
    listItem.querySelector(".fa-pen-to-square").addEventListener("click",function(){
        let edit = prompt("Please enter your name", `${listItem.querySelector("span").innerHTML}`);
        if(edit === null || edit.trim() === ""){
            alert('you have to write something before.');
            return
        }
        listItem.querySelector("span").innerHTML = edit;
        saveList();       
    });

    toDoBox.appendChild(listItem);
}
// ----- function for changing color -----
// function toggleBackgroundColor(element, className) {
//     element.classList.toggle(className);
// }

// ----- function for saving data to local storage -----
const saveList = () => {
    const lists = document.querySelectorAll("span");
    const data = [];

    lists.forEach((list) => {
        data.push(list.textContent);
    });

    if(data.length === 0){
        localStorage.removeItem("lists");
    }else{
        localStorage.setItem("lists", JSON.stringify(data));
    }
    
}
// ----- anonymous function (called as page reload) -----
(
    function(){
        const lslists = JSON.parse(localStorage.getItem("lists"));

        if(lslists !== null){
            lslists.forEach((ls) => {
                addToDo(ls);
                });
        }
        }
)();


