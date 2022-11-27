console.log("Welcome to Notes App");

showNotes();

let newPage = document.getElementById("newPage");
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", add);


let addTxt = document.getElementById("addTxt");
let addTitle = document.getElementById("addTitle");

let sidebar = document.getElementById("sidebar");


window.onresize = function(event) {
    resize();
};

function resize() {
    let sidebar = document.getElementById("sidebar");
    let windowWidth = screen.width;

    if (windowWidth >= 800) {
        sidebar.style.width = "250px";
    } else if ((windowWidth <= 800)) {

        sidebar.style.width = "0";

    } else {

        sidebar.style.width = "250px";
    }
}

//sidebar
function menu() {
    let sidebar = document.getElementById("sidebar");

    if (sidebar.style.width == "250px") {
        sidebar.style.width = "0"
    } else {
        sidebar.style.width = "250px"

    }
}

function showNotes() {

    var myNotes = localStorage.getItem('notes');
    if (myNotes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(myNotes);
    }

    let html = "";

    notesObj.forEach(function(element, index) {
        let title;
        if (element.title.length >= 17) {
            title = element.title.substring(0, 17) + "..."
        } else {
            title = element.title.substring(0, 17);
        }
        html += `
        <span style="position: relative;" class="item">
            <li onclick="changeNote(${index})" id="li">${index+1}. <h5 style="display: inline; font-size: 14px !important;font-weight: 500;">${title}<h5></li>
            <img src="trash.svg" onclick="deleteNote(${index})" id="delete" alt="">
            </span>
            `;
        // <img src="edit.svg" onclick="editNote(${index})" id="edit" alt="">
    });

    let notesElm = document.getElementById("notes-list");

    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `<h3 style="margin:20px; height:20px; word-wrap: break-word; width:auto; color:white;">Nothing to show! <br>"Add a Note"</h3>`;
    }
}

//add new note function
newPage.addEventListener("click", function() {
    window.location = "https://ashwin-maurya.github.io/Quicky/";
    // if (!addTitle.value == "" || !addTxt.value == "") {
    //     if (confirm("Do You want to save the previous data")) {
    //         add();
    //     }
    // } else {
    addTitle.value = "";
    addTxt.value = "";
    // }
    // showNotes();
    resize();
});

//add note function
function add() {

    if (addTitle.value == "") {
        alert("Please enter title")
    } else {
        let notes = localStorage.getItem("notes");

        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
        }
        let myObj = {
            title: addTitle.value,
            text: addTxt.value
        }

        notesObj.push(myObj);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        menu();
        addTitle.value = "";
        addTxt.value = "";

    }
    showNotes();
}

//edit note function
function editNote(index) {
    let notes = JSON.parse(localStorage.notes);
    notes[index].title = addTitle.value;
    notes[index].text = addTxt.value;

    localStorage.setItem("notes", JSON.stringify(notes));

    showNotes();
};

function changeNote(str) {
    let strindex = str;

    var retrievedNotes = localStorage.getItem('notes');
    var parsedNotes = JSON.parse(retrievedNotes);
    let intIndex = parseInt(strindex);

    addTitle.value = parsedNotes[intIndex].title;
    addTxt.value = parsedNotes[intIndex].text;

    addTitle.oninput = function() {
        // document.getElementById('edit').style.display = "block";
        editNote(str);
    };
    addTxt.oninput = function() {
        // document.getElementById('edit').style.display = "block";
        editNote(str);
    };
    resize();

};

function deleteNote(index) {

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTitle.value = "";
    addTxt.value = "";
    showNotes();
}


let search = document.getElementById('search');
search.addEventListener("input", function() {

    let inputVal = search.value.toLowerCase();

    let noteCards = document.getElementsByClassName('item');

    Array.from(noteCards).forEach(function(element) {

        let cardTxt = element.getElementsByTagName("h5")[0].innerText;
        let lcardTxt = cardTxt.toLowerCase();

        if (lcardTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
})