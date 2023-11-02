//Selected Elements in global  scope
let input = document.getElementById("input");
let grouplist = document.getElementById("grouplist");
let message = document.getElementById("msg");
let form = document.getElementById("form");
let dropdownFilters = document.getElementById("filter");
let dataArray = JSON.parse(localStorage.getItem("todos")) || [];
let dataArrayCopy = dataArray;



function displaySavedTask() {
        if (JSON.parse(localStorage.getItem("todos"))) {
                dataArray.map(function (data) {
                        createtasklist(data);
                });
        }
}
displaySavedTask();
//add task function
function addtask() {
        if (input.value === "") {
                message.innerHTML = "PLEASE ENTER AN INPUT ❌";
                return;
        } else {
                let dataObj = {};
                dataObj["taskName"] = input.value;
                dataObj["complete"] = false;
                dataObj["id"] = new Date().valueOf();
                dataArray.push(dataObj);
                dataArrayCopy = dataArray;
                let stringify = JSON.stringify(dataArray);
                localStorage.setItem("todos", stringify);
                createtasklist(dataObj);
                message.innerHTML = "";
        }
}
//Form submit button Event
form.addEventListener("submit", (e) => {
        e.preventDefault();
        addtask();
        input.value = "";
        console.log("button was clicked");
});
//Create a task on Click add button
function createtasklist(task) {
        //container holding delete and complete
        let tasklist = document.createElement("li");
        let container = document.createElement("div");
        container.setAttribute("class", "flex gap-8");
        //child complete button
        let completeButton = document.createElement("button");
        completeButton.textContent = "Complete";
        completeButton.setAttribute(
                "class",
                "bg-yellow-500 h-10 w-28 z-3 ml-2 border-none text-white rounded-sm border-yellow-300"
        );
        container.appendChild(completeButton);
        //Complete button events
        completeButton.addEventListener("click", () => {
                task.complete = task.complete ? false : true;
                if (task.complete) {
                        span.style.textDecoration = "line-through";
                        completeButton.textContent = "Incomplete";
                } else {
                        span.style.textDecoration = "none";
                        completeButton.textContent = "Complete";
                }
        });
        //child del button
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute(
                "class",
                "bg-yellow-500 h-10 w-16 z-3 ml-2 border-none text-white rounded-sm border-yellow-300"
        );
        deleteButton.addEventListener("click", (e) => {
                console.log(e.target.parentElement.parentElement.remove());
                let updatedTodos = dataArray.filter((elm) => {
                        return elm.id !== task.id;
                });
                dataArray = [...updatedTodos];
                dataArrayCopy = dataArray;
                let stringify = JSON.stringify(dataArray);
                localStorage.setItem("todos", stringify);
        });
        container.appendChild(deleteButton);
        let span = document.createElement("span");
        span.textContent = `${task.taskName}`;
        tasklist.appendChild(span);
        tasklist.appendChild(container);
        tasklist.setAttribute(
                "class",
                "bg-indigo-800 flex  justify-between px-12 py-6 rounded-lg text-white text-xl my-4 "
        );
        grouplist.appendChild(tasklist);
}
//dropDownFilter function
dropdownFilters.addEventListener("change", function (e) {
        let selectedValue = e.target.value;
        selectedValue = selectedValue.toLowerCase();

        if (selectedValue === "completed") {
                dataArray = dataArrayCopy.filter((elm) => {
                        return elm.complete === true;
                });

                grouplist.innerHTML = "";
                dataArray.map((elm) => {
                        createtasklist(elm);
                });
        }

        if (selectedValue === "incomplete") {
                dataArray = dataArrayCopy.filter((elm) => {
                        return elm.complete === false;
                });

                grouplist.innerHTML = "";
                dataArray.map((elm) => {
                        createtasklist(elm);
                });
        }
        if (selectedValue === "all") {
                dataArray = dataArrayCopy.filter((elm) => {
                        return elm.complete === false || elm.complete === true;
                });

                grouplist.innerHTML = "";
                dataArray.map((elm) => {
                        createtasklist(elm);
                });
        }
});
