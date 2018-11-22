var richtigArray = [];

function createMC(frage, antworten, richtig) {

	for (var i = 0; i < richtig.length; i++) {
		richtigArray.push(richtig[i]);
	}

	console.log(richtigArray);

	var n = findQuestionNumber();

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

function createDD(frage, antworten, container, richtig) {

	var n = findQuestionNumber();

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
		p.ondragstart = "drag(event)";
		var pText = document.createTextNode(antworten[i]);
		p.appendChild(pText);
		answersDiv.appendChild(p);
	}

	for (i = 0; i < container.length; i++) {
		var box = document.createElement("div");
		box.id = "question" + n + "_box" + i;
		box.className = "drop";
		box.ondrop = "drop(event)";
		box.ondragover = "allowDrop(event)";
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
			TextP.append(TQText);
		} else {
			var TQinput = document.createElement("input");
			TQinput.className = "text_input";
			TQinput.type = "text";
			TQinput.name = "question" + n + "_blanc" + j;
			TQinput.id = "question" + n + "_blanc" + j;
			j++;
			TextP.append(TQinput)
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