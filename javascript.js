
//initially hide side panels
document.getElementById('top-side').style.display = 'none';
document.getElementById('first-bottom-side').style.display = 'none';
document.getElementById('second-bottom-side').style.display = 'none';
document.getElementById('third-bottom-side').style.display = 'none';
document.getElementById('taskName').value = "";
document.getElementById('taskDescription').value = "";

//localStorage.clear();
console.log("testing the more than 9: ")
console.log(Object.keys(localStorage));

console.log(Object.keys(localStorage).filter(key => parseInt(key.toString().substring(0,2)) == 1)); //last digit is the first digit in "1-1"



let myObject = {};
let pressedTaskId;
let objectString;

//creating fake entries for the first date of the month
//localStorage.setItem("10-1", JSON.stringify({task: "this is a first task", description: "this is first desc", time: "12:20"}));
//localStorage.setItem("1-2", JSON.stringify({task: "this is a second task", description: "this is first desc", time: "12:20"}));
//localStorage.setItem("1-3", JSON.stringify({task: "this is a second task", description: "this is second desc", time: "13:20"}));
//localStorage.setItem("1-4", JSON.stringify({task: "this is a 3 task", description: "this is third desc", time: "14:20"}));
//localStorage.setItem("1-5", JSON.stringify({task: "this is a 4 task", description: "this is first desc", time: "12:20"}));
//localStorage.setItem("1-6", JSON.stringify({task: "this is a 5 task", description: "this is first desc", time: "12:20"}));
//localStorage.setItem("2-3", JSON.stringify({task: "this is a 5 task", description: "this is first desc", time: "12:20"}));
//localStorage.setItem("3-6", JSON.stringify({task: "this is a 5 task", description: "this is first desc", time: "12:20"}));
//stopping creating fake stuff
//console.log(Object.keys(localStorage)[0]);
loadingCalendar();
let buttonPressed = 0;
function clicked(x){ //WHEN YOU CLICK ANY OF THE DATES---------------

console.log(Object.keys(localStorage).filter(key => parseInt(key.toString().substring(0,2)) == x)); //this outputs all keys for this date
document.querySelector('.task-container').innerHTML = "";
createTaskDivs(x);
document.getElementById('top-side').style.display = 'block';
document.getElementById('first-bottom-side').style.display = 'block';
document.getElementById('second-bottom-side').style.display = 'none';
document.getElementById('third-bottom-side').style.display = 'none';
    buttonPressed = x;
    document.getElementById("outputDescription").innerText = myObject.description;
    document.getElementById("outputTime").innerHTML = myObject.time;
loadingCalendar();
}

console.log("random number");
console.log(Math.random());

function save_pressed(){ //WHEN YOU CLICK A SAVE BUTTON------------------
if(!document.querySelector("#taskName").value){
    alert("Please enter the task");
}
else{
myObject = {task: document.getElementById("taskName").value, description: document.getElementById("taskDescription").value,
time: document.getElementById("taskTime").value}; 
localStorage.setItem(buttonPressed+"-"+(Math.random()), JSON.stringify(myObject)); //send the object to localstorage, should be x-1
//to reset input fields
document.querySelector("#taskName").value = "";
document.querySelector('#taskDescription').value = "";
document.querySelector("#taskTime").value = "";
clicked(buttonPressed);
}
}

function findTaskAmount(x){ //find amount of tasks for the pressed date
    return Object.keys(localStorage).filter(key => parseInt(key.toString().substring(0,2)) == x).length;
}
//this is me saving stuff
function createTaskDivs(x){
    var anotherTask;
    let temp = Object.keys(localStorage).filter(key => parseInt(key.toString().substring(0,2)) == x);

    for(let i=0; i <temp.length; i++){
        anotherTask = document.getElementById('sampleTaskContainer').cloneNode(true);
        anotherTask.removeAttribute("id");
        anotherTask.childNodes[1].setAttribute("id", temp[i]+"Button");
        anotherTask.childNodes[1].setAttribute("onclick", "taskPressed"+"("+"'"+temp[i]+"'"+")"); // when specific task is pressed than "taskPressed" function will be launched.
        myObject = JSON.parse(localStorage.getItem(temp[i]));
        //setting task name of a task
        anotherTask.childNodes[1].childNodes[1].childNodes[1].setAttribute("id", temp[i]+"spTask");
        anotherTask.childNodes[1].childNodes[1].childNodes[1].innerHTML = myObject.task;
        //setting description of a task
        anotherTask.childNodes[1].childNodes[1].childNodes[3].setAttribute("id", temp[i]+"spDesc");
        anotherTask.childNodes[1].childNodes[1].childNodes[3].innerHTML = myObject.description;
        //setting time of a task
        anotherTask.childNodes[1].childNodes[3].setAttribute("id", temp[i]+"spTaskTime");
        anotherTask.childNodes[1].childNodes[3].innerHTML = myObject.time;
        //setting a id of a delete button
        let stringDel = "";
        stringDel = temp[i];
        anotherTask.childNodes[3].setAttribute("onclick", "delTask"+"("+"'"+stringDel+"'"+")");

        //console.log(anotherTask.childNodes[5]);
        document.querySelector('.task-container').appendChild(anotherTask);

        //make id=showDate show for what date tasts are shown
        document.querySelector('#showDate').innerText = x+" of January:";
    }
    //document.getElementById('sampleTask').remove();
}

function delTask(x){
    localStorage.removeItem(x);
    clicked(buttonPressed);
}

function taskPressed(x){
    pressedTaskId = x;
    document.getElementById('first-bottom-side').style.display = 'none';
    document.getElementById('second-bottom-side').style.display = 'block';

    myObject = JSON.parse(localStorage.getItem(x));
    document.querySelector("#outputTask").innerText = myObject.task;
    document.querySelector("#outputDescription").innerText = myObject.description;
    document.querySelector("#outputTime").innerText = myObject.time;
}
let temp = Object.keys(localStorage).filter(key => parseInt(key.toString().substring(0,2)) == 1)[0];
myObject = JSON.parse(localStorage.getItem(temp));
console.log(myObject);
document.querySelector(".taskInside").innerHTML = myObject.task;

function loadingCalendar(){
        for(let i=1; i<31;i++){
            document.querySelector("#button"+i).innerText = "";
        }
        for(let j=1; j<31; j++){
            let temp = Object.keys(localStorage).filter(key => parseInt(key.toString().substring(0,2)) == j);
            

            for(let i=0; i<temp.length; i++){
                myObject = JSON.parse(localStorage.getItem(temp[i]));
                anotherTask = document.querySelector(".taskInsideContainer").cloneNode(true);
                anotherTask.childNodes[1].setAttribute("id", temp[i]+"taskInside");
                anotherTask.childNodes[1].innerHTML = "<span id='dot'>•</span>"+myObject.task;
                anotherTask.childNodes[3].setAttribute("id", temp[i]+"timeInside");
                anotherTask.childNodes[3].innerText = myObject.time;
                let string = "#button"+j;
                console.log(string);
                document.querySelector(string).appendChild(anotherTask);
            }
    }
}
//event listener to BACK button pressed
document.querySelector('#backButton').addEventListener("click", function(){
    document.getElementById('first-bottom-side').style.display = 'block';
    document.getElementById('second-bottom-side').style.display = 'none';
    clicked(buttonPressed);
});
//event listener to BACK2 button pressed
document.querySelector('#backButton2').addEventListener("click", function(){
    document.getElementById('first-bottom-side').style.display = 'none';
    document.getElementById('second-bottom-side').style.display = 'block';
    document.getElementById('third-bottom-side').style.display = 'none';
});
//event listener for SAVE button
document.querySelector('#saveButton').addEventListener("click", function(){
    myObject = {task: document.getElementById("taskName2").value, description: document.getElementById("taskDescription2").value,
    time: document.getElementById("taskTime2").value}; 
    localStorage.setItem(pressedTaskId, JSON.stringify(myObject));

    //showing and hiding the panels
    document.getElementById('first-bottom-side').style.display = 'none';
    document.getElementById('second-bottom-side').style.display = 'block';
    document.getElementById('third-bottom-side').style.display = 'none';
    loadingSecond();
});
//event listener to EDIT button pressed
document.querySelector('#editButton').addEventListener("click", function(){
    //showing and hiding the panels
    document.getElementById('first-bottom-side').style.display = 'none';
    document.getElementById('second-bottom-side').style.display = 'none';
    document.getElementById('third-bottom-side').style.display = 'block';
    //setting the values of textarea and the time
    loadingThird();
});
function loadingSecond(){
    myObject = JSON.parse(localStorage.getItem(pressedTaskId));
    document.querySelector('#outputTask').innerText = myObject.task;
    document.querySelector('#outputDescription').innerText = myObject.description;
    document.querySelector('#outputTime').innerText = myObject.time;
}

function loadingThird(){
    myObject = JSON.parse(localStorage.getItem(pressedTaskId));
    document.querySelector('#taskName2').value = myObject.task;
    document.querySelector('#taskDescription2').value = myObject.description;
    document.querySelector('#taskTime2').value = myObject.time;
    createTaskDivs(buttonPressed);
}

