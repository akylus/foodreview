function getRatingVars() {

	let ratings = [
	['really bad','extremely bad','a downer','a bummer', 'awful','poor','garbage','horrible'],
	['not good','not nice','unpleasant','not great','not up to the mark','not appealing','improvement-worthy','meh'],
	['just ok', 'average','not bad','just nice','nice','up to the mark','kinda meh','3-star worthy'],
	['pretty good','extremely nice','pretty nice','really','really nice','almost perfect','near perfection','above average'],
	['amazing','wonderful','incredible','extremely good','really great','perfect','stupendous','worth']
	];

	let finaloverall = [
	'Restaurant needs to improve a lot',
	'Can be definitely improved',
	'Despite the good things, I feel few aspects can be improved',
	'Despite a small flaw, the restaurant is incredible. But can be improved to push it to perfection',
	'Extremely wonderful experience. Keep the standards same'
	];

	var name = document.getElementById("name").value;
	var date = Number(document.getElementById("date").value);
	var amb = Number(document.getElementById("amb").value)-1;
	var taste = Number(document.getElementById("taste").value)-1;
	var vform = Number(document.getElementById("vform").value)-1;
	var service = Number(document.getElementById("service").value)-1;
	let days = "";
	let conjunction = [];
	let ratenums = [amb,service,taste,vform];
	let ratewords = [];

	if(name == "" || date == ""){
		alert("Kindly enter all values");
		return 0;
	}

	if(date < 3){
		days = `${date} days`;
	}
	if(date >= 3 && date < 7){
		days = "a few days";
	}
	else if(date > 7 && date < 14){
		days = "a week";
	}
	else if(date > 14){
		days = "a few weeks";
	}

	for(var i = 0; i < 4; i++){
		ratewords.push(ratings[ratenums[i]][randomIntFromInterval(0,7)]);
	}

	for(var i = 0; i < 3; i++){
		if((ratenums[i] != ratenums[i+1]) && (Math.abs(ratenums[i] - ratenums[i+1]) >= 2)){
			conjunction.push('but');
		}
		else{
			conjunction.push('and');
		}
	}

	var sum = 0;
	for( i = 0; i < ratenums.length; i++ ){
	    sum += parseInt( ratenums[i], 10 );
	}

	var avg = Math.ceil(sum/4);

	overall = ratings[avg][randomIntFromInterval(0,7)];



	let message = `Visited ${name} ${days} ago. The ambience was ${ratewords[0]} ${conjunction[0]} the service was ${ratewords[1]}. Coming to the taste of the food, I felt it was ${ratewords[2]} ${conjunction[2]} the value for money according to me was ${ratewords[3]}. Overall I would say the restaurant was ${overall}. ${finaloverall[avg]}!`;

	document.getElementById("prologue").innerHTML = `<h3>Review generated!<br> Make optional changes if any and hit copy to copy the review to your clipboard</h3>`; 

    document.getElementById("textboxx").innerHTML = `
	<textarea name="comment" style="width: 50%;" rows="4" id="copyTarget">${message}</textarea><br><br>
    <a href="#" class="btn btn-outline-danger" id="copyButton">Copy</a>`; 

    document.getElementById("copyButton").addEventListener("click", function() {
	    copyToClipboard(document.getElementById("copyTarget"));
	});

}

function copyToClipboard(elem) {
	  // create hidden text element, if it doesn't already exist
    var targetId = "_hiddenCopyText_";
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    } else {
        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
        if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = elem.textContent;
    }
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);
    
    // copy the selection
    var succeed;
    try {
    	  succeed = document.execCommand("copy");
    } catch(e) {
        succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }
    
    if (isInput) {
        // restore prior selection
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        // clear temporary content
        target.textContent = "";
    }
    alert("Review Copied successfully!");
    return succeed;
}


function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

var viewMode = getCookie("view-mode");
if(viewMode == "desktop"){
    viewport.setAttribute('content', 'width=1024');
}else if (viewMode == "mobile"){
    viewport.setAttribute('content', 'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no');
}