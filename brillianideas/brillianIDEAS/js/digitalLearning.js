digitallearning.js


// Modal for interaktive_whiteboards
var modal1 = document.getElementById('modal_interaktive_whiteboards');

// Get the button that opens the modal
var btn_interaktive_whiteboards = document.getElementById("interaktive_whiteboards");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn_interaktive_whiteboards.onclick = function() {
    modal1.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal1.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal1) {
        modal1.style.display = "none";
    }
};

// Modal for virtual classrooms
var modal_virtual_classrooms = document.getElementById('modal_virtual_classrooms');

// Get the button that opens the modal
var btn_virtual_classrooms = document.getElementById("virtual_classrooms");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
modal_virtual_classrooms.onclick = function() {
    modal_virtual_classrooms.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal_virtual_classrooms.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal_virtual_classrooms) {
        modal_virtual_classrooms.style.display = "none";
    }
};
