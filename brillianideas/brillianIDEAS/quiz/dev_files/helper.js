var richtigArray = [];

function createMC(frage, antworten, richtig) {

    for (var i=0;i<richtig.length;i++){
        richtigArray.push(richtig[i]);
    }

    console.log(richtigArray);

    var n = findQuestionNumber();

    var questiondiv = createHeader(frage, n);

    //Erste Antwort

    var i;
    for (i = 0; i < antworten.length; i++) {
        var questionlabel = document.createElement("label");
        questionlabel.className = "container_check";
        var questionlabeltext = document.createTextNode(antworten[i]);
        questionlabel.appendChild(questionlabeltext);
        var questionlabelinput = document.createElement("input");
        questionlabelinput.type = "checkbox";
        questionlabelinput.id = "question" + n + "_answer" + (i + 1) + "";
        questionlabel.appendChild(questionlabelinput);
        questiondiv.appendChild(questionlabel);
        var questionlabelspan = document.createElement("span");
        questionlabelspan.className = "checkmark_check";
        questionlabel.appendChild(questionlabelspan);
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

function createHeader(frage, n) {
    //Erste Frage
    var questiondiv1 = document.createElement("div");
    questiondiv1.className = "questionclass";
    questiondiv1.id = "question" + n;

    //Erster Header
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
                if (!(child.checked && (richtig === 1)|| !child.checked && (richtig === 0))) {
                    gibMirPunkte = false;
                }
            }

        }
        if(gibMirPunkte){
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
