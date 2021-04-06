var input = document.getElementById("text");
var ul = document.getElementById("list");
var remaining = 0;
showList();
input.addEventListener("keyup",e=>{
    if(e.keyCode === 13){
        addToList();
    }
})
function addToList(){
    if(checkAvailable()){
        var text = input.value;
        if(textFilter(text)){
            var oldData = JSON.parse(localStorage.todo);
            var count = oldData.len;
            count++;
            oldData.len = count;
            oldData[`list${count}`] = text;
            localStorage.todo = JSON.stringify(oldData);
            input.value = "";
            updateList();
        }
    }
    else{
        localStorage.todo = JSON.stringify({"len":0});
    }
}
function showList(){
    if(checkAvailable()){
        var fetchData = JSON.parse(localStorage.todo);
        ul.innerHTML = "";
        remaining =0;
        for(key in fetchData){
            if(key!="len"){
                if(fetchData[key]!=""){
                    ul.innerHTML += `<li class="list-item white-theme" id=${key}>
                    <span class="span-list-name">${fetchData[key]}</span>
                    <div class="button-container"><button class="btn li-btn" onclick="deleteList('${key}')"><i class="fas fa-trash"></i></button>
                    <button class="btn li-btn" onclick="editList('${key}')"><i class="fas fa-edit"></i></button></div> 
                    </li>`;
                    remaining ++;
                }
            }
    }
        document.getElementById("remaining").innerHTML = "You Have "+remaining+" Remaining Tasks To Do......";
    }
    else{
        localStorage.todo = JSON.stringify({"len":0});
    }
}
function updateList(){
    if(checkAvailable()){
        var fetchData = JSON.parse(localStorage.todo);
        var key = "list"+fetchData['len'];
        var lastItem = fetchData[key];
        var li = document.createElement("li");
        li.id = key;
        li.classList.add("list-item","white-theme","animate__animated", "animate__fadeInDown");
        li.innerHTML += `<span class="span-list-name">${fetchData[key]}</span>
                    <div class="button-container"><button class="btn li-btn" onclick="deleteList('${key}')"><i class="fas fa-trash"></i></button>
                    <button class="btn li-btn" onclick="editList('${key}')"><i class="fas fa-edit"></i></button></div>`;
        ul.appendChild(li);
        remaining++;
        document.getElementById("remaining").innerHTML = "You Have "+remaining+" Remaining Tasks To Do......";
    }
    else{
        localStorage.todo = JSON.stringify({"len":0});
    }
}
function clearAll(){
    if(checkAvailable()){
        var deleteConfirm = confirm("Are you sure want to delete all?");
        if(deleteConfirm){
            localStorage.todo = JSON.stringify({"len":0});
            showList();
        }
    }
    else{
        alert("There is nothing!");
    }
}
function deleteList(key){
    var oldData = JSON.parse(localStorage.todo);
    var deleteConfirm = confirm(`Are you sure want to delete ${oldData[key]} ?`);
    
    if(deleteConfirm){
        delete oldData[key];
        localStorage.todo = JSON.stringify(oldData);
        showList();
    }  
}
function editList(key){
    var oldData = JSON.parse(localStorage.todo);
    var text = prompt("Enter text to edit:",oldData[key]);
    if(textFilter(text)){
        oldData[key] = text;
        localStorage.todo = JSON.stringify(oldData);
        
        showList();
    }
    
}
function textFilter(x) {
    if(x){
        if(x.length>=3){
            return x;
        }
        else{
            alert("Minimum length is 3.");
            return false;
        }
    }
    else{
        return false;
    }
    
}
function checkAvailable(){
    if(localStorage.todo){
        return true;
    }
    else{
        return false;
    }

}