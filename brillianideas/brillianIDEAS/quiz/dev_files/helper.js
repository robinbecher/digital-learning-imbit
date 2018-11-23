var richtigArray = [];
/**
 * eine Multiple Choice Frage anlegen
 *
 * @param frage
 *            Frage als String
 * @param antworten
 *            Antworten als Array aus Strings
 * @param richtig
 *            Lösung als Array aus Strings. Für jede Antwortmöglichkeit ein
 *            Eintrag 0 oder 1 wobei 1 für richtig und 0 für falsch steht
 * @returns ein <div> tag mit der Frage
 */
function createMC(frage, antworten, richtig) {

	for (var i = 0; i < richtig.length; i++) {
		richtigArray.push(richtig[i]);
	}

	console.log(richtigArray);

	var n = findQuestionNumber();

    var questiondiv = createHeader(frage, n);
    // questiondiv.attr("data-questiontype","mc");
    questiondiv.setAttribute("data-type","mc");
	var questiondiv = createHeader(frage, n);

	var i;
	for (i = 0; i < antworten.length; i++) {
		var questionlabel = document.createElement("label");
		questionlabel.className = "container_check";
		var questionlabeltext = document.createTextNode(antworten[i]);
		questionlabel.appendChild(questionlabeltext);
		var questionlabelinput = document.createElement("input");
		questionlabelinput.type = "checkbox";
		questionlabelinput.id = "question" + n + "_answer" + (i + 1);
		questionlabel.appendChild(questionlabelinput);
		var questionlabelspan = document.createElement("span");
		questionlabelspan.className = "checkmark_check";
		questionlabel.appendChild(questionlabelspan);
		questiondiv.appendChild(questionlabel);
	}

	var contentdiv = document.getElementById("content");
	contentdiv.append(questiondiv);

}
/**
 * eine Single Choice Frage anglegen
 *
 * @param frage
 *            Frage als String
 * @param antworten
 *            Antworten als Array aus Strings
 * @param richtig
 *            Lösung als Array aus Strings. Für jede Antwortmöglichkeit ein
 *            Eintrag 0 oder 1 wobei 1 für richtig und 0 für falsch steht
 * @returns ein <div> tag mit der Frage
 */
function createSC(frage, antworten, richtig) {

	for (var i = 0; i < richtig.length; i++) {
		richtigArray.push(richtig[i]);
	}

	var n = findQuestionNumber();

	var questiondiv = createHeader(frage, n);

	var i;
	for (i = 0; i < antworten.length; i++) {
		var questionlabel = document.createElement("label");
		questionlabel.className = "container";
		var questionlabeltext = document.createTextNode(antworten[i]);
		questionlabel.appendChild(questionlabeltext);
		var questionlabelinput = document.createElement("input");
		questionlabelinput.type = "radio";
		questionlabelinput.name = "radio";
		questionlabelinput.id = "question" + n + "_answer" + (i + 1);
		questionlabel.appendChild(questionlabelinput);
		var questionlabelspan = document.createElement("span");
		questionlabelspan.className = "checkmark";
		questionlabel.appendChild(questionlabelspan);
		questiondiv.appendChild(questionlabel);
	}

	var contentdiv = document.getElementById("content");
	contentdiv.append(questiondiv);

}
/**
 * Eine Drag&Drop Frage anlegen
 *
 * @param frage
 *            Frage als String
 * @param antworten
 *            Antwortmöglichkeiten als Array aus Strings
 * @param container
 *            Container in die gedropt werden soll als Array aus Strings
 * @param richtig
 *            Lösung als zweidimensionales Array mit einem Eintrag pro
 *            Antwortmöglichkeit der form [x,y] mit Frage x muss in Container y
 * @returns ein <div> tag mit der Frage
 */
function createDD(frage, antworten, container, richtig) {

	var n = findQuestionNumber();

    var questiondiv = createHeader(frage, n);
    // questiondiv.attr("data-questiontype","dd");
    questiondiv.setAttribute("data-type","dd");

    var answersDiv = document.createElement("div");
    answersDiv.id = "dd"+n+"_answers";
    questiondiv.appendChild(answersDiv);
	var questiondiv = createHeader(frage, n);
	var answersDiv = document.createElement("div");
	answersDiv.id = "answers";
	questiondiv.appendChild(answersDiv);


    var i;
    for (i = 0; i < antworten.length; i++) {
        var p = document.createElement("p");
        p.id = "question" + n + "_answer" + i;
        p.className = "drag";
        p.draggable = "true";
        // p.ondragstart = "drag(event)";
        p.setAttribute("ondragstart","drag(event)");
        var pText = document.createTextNode(antworten[i]);
        p.appendChild(pText);
        answersDiv.appendChild(p);
    }

	for (i = 0; i < container.length; i++) {
		var box = document.createElement("div");
		box.id = "question" + n + "_box" + i;
		box.className = "drop";
		box.addEventListener('drop', function() {
			drop(event)
		});
		box.addEventListener('dragover', function() {
			allowDrop(event)
		});
		var p = document.createElement("p");
		p.className = "box_text";
		var pText = document.createTextNode(container[i]);
		p.appendChild(pText);
		box.appendChild(p);
		questiondiv.appendChild(box);
	}

	var contentdiv = document.getElementById("content");
	contentdiv.append(questiondiv);

}
/**
 * Eine Lückentext Frage anlegen
 *
 * @param frage
 *            Frage als String
 * @param text
 *            Text mit Lücken als Array aus Strings wobei ein leerer String ""
 *            eine Lücke darstellt
 * @param antworten
 *            Antwortmöglichkeiten als Array aus Strings
 * @param richtig
 *            Noch zu definieren
 * @returns ein <div> tag mit der Frage
 */
function createTQ(frage, text, antworten, richtig) {

	for (var i = 0; i < richtig.length; i++) {
		richtigArray.push(richtig[i]);
	}

	var n = findQuestionNumber();

	var questiondiv = createHeader(frage, n);

	var TextP = document.createElement("p");
	TextP.id = "question" + n + "text";

	var i;
	var j = 1;
	for (i = 0; i < text.length; i++) {
		if (text[i] !== "") {
			var TQText = document.createTextNode(text[i]);
			TextP.appendChild(TQText);
		} else {
			var TQinput = document.createElement("input");
			TQinput.className = "text_input";
			TQinput.type = "text";
			TQinput.name = "question" + n + "_blanc" + j;
			TQinput.id = "question" + n + "_blanc" + j;
			j++;
			TextP.appendChild(TQinput)
		}
	}
	questiondiv.appendChild(TextP);

	var answersdiv = document.createElement("div");

	for (i = 0; i < antworten.length; i++) {

		var answerP = document.createElement("p");
		answerP.className = "text_to_input";
		answerP.id = "question" + n + "_answer" + i;
		var answerText = document.createTextNode(antworten[i]);
		answerP.appendChild(answerText);

		answersdiv.appendChild(answerP);
	}
	questiondiv.appendChild(answersdiv);

	var contentdiv = document.getElementById("content");
	contentdiv.append(questiondiv);

}
/**
 * Erstellt den Header einer Frage und den div für die Antwortmöglichkeiten
 *
 * @param frage
 *            Text der Frage als String
 * @param n
 *            Nummer der zu erstellenden Frage
 * @returns div für die Antwortmöglichkeiten
 */
function createHeader(frage, n) {

	var questiondiv1 = document.createElement("div");
	questiondiv1.className = "questionclass";
	questiondiv1.id = "question" + n;

	// Erster Header
	var headerdiv1 = document.createElement("div");
	headerdiv1.className = "header";
	questiondiv1.appendChild(headerdiv1);

	var headerP1 = document.createElement("p");
	headerdiv1.appendChild(headerP1);
	var headerP1text = document.createTextNode(frage);
	headerP1.appendChild(headerP1text);
	headerP1.className = "question";

	questiondiv1.appendChild(headerdiv1);

	return questiondiv1;
}

function findQuestionNumber() {
	var weiter = true;
	var n = 1;
	console.log(document.getElementById("question" + n + "_answer1"));

	while (weiter) {
		console.log(document.getElementById("question" + n + "_answer1"));
		if (document.getElementById("question" + n + "_answer1") !== null) {
			n++;
		} else {
			weiter = false;
		}
	}
	return n;
}

function evaluate() {

    for (var i = 1; i < anzahlFragen; i++) {
        // var childrenInput = $("#question" + i).find("input").toArray();
        // console.log(childrenInput);
        // var gibMirPunkte = true;
        // if (childrenInput !== null) {
        //     for (var j = 0; j < childrenInput.length; j++) {
        //         var richtig = richtigArray.shift();
        //         var child = childrenInput[j];
        //         console.log(child);
        //         console.log(child.checked);
        //         console.log(richtig);
        //         if (!(child.checked && (richtig === 1)|| !child.checked && (richtig === 0))) {
        //             gibMirPunkte = false;
        //         }
        //     }
        //     if(gibMirPunkte){
        //         score++;
        //     }
        var question = document.getElementById("question" + i);
        console.log(question);
        if (question.getAttribute("data-type") === "mc") {
            var childrenInput = $("#question" + i).find("input").toArray();
            console.log(childrenInput);
            var gibMirPunkte = true;
            if (childrenInput !== null) {
                for (var j = 0; j < childrenInput.length; j++) {
                    var richtig = richtigArray.shift();
                    var child = childrenInput[j];
                    console.log(child);
                    console.log(child.checked);
                    console.log(richtig);
                    if (!(child.checked && (richtig === 1) || !child.checked && (richtig === 0))) {
                        gibMirPunkte = false;
                    }
                }
                if (gibMirPunkte) {
                    score++;
                }
            }
        }
        else if (question.getAttribute("data-type") === "dd") {
            var draggables = $("#dd" + i + "_answers").find("p").toArray();
            console.log(draggables);
            var richtig = richtigArray.shift();
            var boxes = question.find("div").toArray();

            for (var i = 0; i < draggables.length; i++) {
                if (draggables[i].closest("div").is(boxes[richtig[i]])) {
                    alert("Richtige Box für Draggable!");
                }
            }

        }

        console.log(childrenInput);

    }

	for (var i = 1; i < anzahlFragen; i++) {
		var children = $("#question" + i).find("input").toArray();
		console.log(children);
		var gibMirPunkte = true;
		if (children !== null) {
			for (var j = 0; j < children.length; j++) {
				var richtig = richtigArray.shift();
				var child = children[j];
				console.log(child);
				console.log(child.checked);
				console.log(richtig);
				if (!(child.checked && (richtig === 1) || !child.checked
						&& (richtig === 0))) {
					gibMirPunkte = false;
				}
			}

		}
		if (gibMirPunkte) {
			score++;
		}
		console.log(children);

	}

}

function evaluateDD() {

}

function evaluateSC() {

}

function evaluateTQ() {

}

// When clicking the "next"-button, the "question number" is counted upwards.
// the divs containing the questions are shown/hidden accordingly. To add
// questions, you have to create
function nextButtonClick() {
	count++;
	showTheQuestion(count);
}

// When clicking the "back"-button, the question number is counted downwards.
// All the questions are hidden except the previous question
function backButtonClick() {
	count--;
	showTheQuestion(count);
}

// This function shows the question on the screen that the user has to answer
// next
function showTheQuestion(count) {

	// Hides all the questions. The show() function of the questions has to be
	// called again to make them visible
	$(".questionclass").hide();

	$('#question' + count).show();

	if (count === 1) {
		$('#back_button_div').hide();
	} else if (count <= anzahlFragen) {
		$('#back_button_div').show();
		$('#next_button_div').show();
	} else {
		evaluate();
		$('#next_button_div').hide();
		$('#back_button_div').hide();
		$('#gz').show();

		$('#supergeil').html(
				"Gratuliere! Sie haben " + score + " von " + maxScore
						+ " Punkten!");
	}
}

function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
	ev.preventDefault();

	// data ist die ID des Elements, das verschoben wird
	var data = ev.dataTransfer.getData("text");

	ev.target.appendChild(document.getElementById(data));

	console.log("ev: " + ev);
	console.log("data: " + data);
	console.log("target: " + ev.target);
}