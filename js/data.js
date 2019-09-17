var data;
$.getJSON("js/data.json", function(json) {
    data = json;
    //put calls here?
});

//document.getElementById("dog").addEventListener("click", pet);
document.getElementById("submit").addEventListener("click", myFunction);
document.getElementById('walk').addEventListener('ended',unWalk);
document.getElementById('eat').addEventListener('ended',unEat);

function clearItems(){
    for(var k = 0; k<items.length;k++){
        document.getElementById("item-"+(k+1)).style.display="none";       
    }
}

//----------------------------------------------------------------
//
//    VISUAL ELEMENTS
//
//----------------------------------------------------------------

// Changes Scotty based on whether it is walking, eating, or sitting
function setVisual(walk, eat, dog) {
    document.getElementById("walk").style.display = walk;
    document.getElementById("eat").style.display = eat;
    document.getElementById("dog").style.display = dog;
}

function walk() {
    setVisual("block", "none", "none");
    document.getElementById("walk").play();
    clearItems();
}

function unWalk() {
    setVisual("none", "none", "block");
}

function eat(){
    setVisual("none", "block", "none")
    document.getElementById("eat").play();
    clearItems();
}
function unEat(){
    setVisual("none", "none", "block")
}

//what the hell is this  -Will
function myHandler(e) {
    // What you want to do after the event
}

//----------------------------------------------------------------
//
//    FCE CALCULATOR
//
//----------------------------------------------------------------

//this too  -Will
function myFunction() {
    id = document.getElementById("fce-input").value
    if (isValid(id)){
      document.getElementById("FCEtot").innerHTML = "Total FCE: "+ getFCE(id) +
      "</br>For class: " + getName(id)
        //alert("Average time spent for " + getName(id) + ": "+ getFCE(id))
    } else {
        alert("Enter a valid course number")
    }
}

//wha
function isValid(course){
    return true;
}

function getFCE(courseId){
    courseId = courseId.split('-').join('');
    var total = 0;
    var people = 0;
    for(var i = 0; i < data.length; i++){
        let entry = data[i];
        /*if (entry["Course ID"] == courseId){
            total+=(entry["Hrs Per Week"]*entry["Num Respondents"]);
            console.log(entry["Hrs Per Week"])
            people+=entry["Num Respondents"];
        }*/
        if (entry["Course ID"] == courseId&& typeof(entry["Hrs Per Week"])==typeof(1) ){
            total+=(entry["Hrs Per Week"]*entry["Num Respondents"]);
            people+=entry["Num Respondents"];
        }


    }
    return (total/people);
}
function getName(courseId){
    for(var i = 0; i < data.length; i++){
        let entry = data[i];
        if (entry["Course ID"] ==courseId){
            return entry["Course Name"]
        }

    }
    return false;
}


//----------------------------------------------------------------
//
//    SCOTTY ACTIONS (WALK, FEED, ACCESSORIES)
//
//----------------------------------------------------------------

var treatsGiven = 0;
var distanceWalked = 0;
var weight = 8;
 
var canWalk = true;
var canFeed = true;
 
var filepath = ["assets/scotty_friends.png", "assets/scotty_pipe.png", "assets/scotty_scarf_tartan.png", "assets/scotty_scarf_cmu.png", "assets/scotty_volley.png"];
var items =         ["frens", "bagpipe", "scarf-c", "scarf-t", "volleyball"];
var probabilities = [ .25,    .25,       .25,      .25,      .25       ];
var inventory = [];
 
function init() {
    load();

    // initialize walk/treat buttons
    document.getElementById("walk-button").addEventListener('click', startWalk);
    document.getElementById("treat-button").addEventListener('click', startTreat);
     
    // initialize accessory buttons
    names = ["Scotty and Friends", "Scotty's Bagpipe", "CMU Scarf", "Tartan Scarf", "Volleyball"]
    for(var i = 0; i < names.length; i++) {
        if(inventory != null && inventory.includes(items[i])) {
            document.getElementById(items[i]).innerHTML = names[i]
            document.getElementById(items[i]).style.display = "block"
            console.log("ADDED: " + items[i])
        } else {
            document.getElementById(items[i]).style.display= "none"
            console.log("NOT ADDED: " + items[i])
        }
    }
}

// CHANGE THIS TO SET WALK/TREAT TIMES 
var walkTime = 3000;
var treatTime = 3000;

//hardcoded stuff
for(let i = 0; i<5;i++){ 
    document.getElementById(items[i]).addEventListener('click', function(acc) {
        for(var k = 0; k<items.length;k++){
            document.getElementById("item-"+(k+1)).style.display="none"
           
        }
        var s = "item-"+(i+1);
        console.log(s)
        document.getElementById(s).style.display = "block"
    });
}


// starts walk timer (20 min.)
function startWalk() {
    if(canWalk&&canFeed) {
        walk();
        canWalk = false;
        decrementWalkTimer()
    }
}
 
// decrease walk timer by one second
function decrementWalkTimer() {
    walkTime -= 1000
    if ((walkTime/1000) % 60 < 10) {
        mins = "0" + (walkTime/1000 % 60).toString()
    } else {
        mins = walkTime/1000 % 60
    }
    var timer = Math.floor((walkTime/1000) / 60) + ":" + mins
 
    document.getElementById("walk-button").innerHTML = timer
    if (walkTime == 0) {
        endWalk();
    } else {
        setTimeout(decrementWalkTimer, 1000)
    }
}
 
// starts treat timer (5 min.)
function startTreat() {
    if(canFeed&&canWalk) {
        eat()
        canFeed = false
        decrementTreatTimer()  
    }
}
 
// decrease treat timer by one second
function decrementTreatTimer() {
    treatTime -= 1000
    if ((treatTime/1000) % 60 < 10) {
        mins = "0" + (treatTime/1000 % 60).toString()
    } else {
        mins = treatTime/1000 % 60
    }
    var timer = Math.floor((treatTime/1000) / 60) + ":" + mins
 
    document.getElementById("treat-button").innerHTML = timer
    if (treatTime == 0) {
        endTreat();
    } else {
        setTimeout(decrementTreatTimer, 1000)
    }
}
 
// ends the walk and changes weight and distance walked counters
function endWalk() {
    console.log("End Walk")
    distanceWalked++;
    weight = (weight*0.975).toFixed(3);
    document.getElementById("walk-button").innerHTML = "Walk"
    canWalk = true
    walkTime = 3000
    update()
    findItem()
    save()
 
}
 
// ends the feeding and changes weight and distance walked counters
function endTreat() {
    console.log("End Treat")
    treatsGiven++;
    weight = (weight*1.05).toFixed(3);
    document.getElementById("treat-button").innerHTML = "Feed"
    canFeed = true
    treatTime = 3000
    update()
    save()
}
 
// mechanism for randomly finding items on walks
function findItem() {
    var i;
    for (i = 0; i < items.length; i++) {
        x = Math.random()
        if (!inventory.includes(items[i]) && x <= probabilities[i]) {
            console.log("ITEM FOUND!!!")
            console.log(typeof(inventory)+"    "+ items[i])
            inventory.push(items[i])

            names = ["Scotty and Friends", "Scotty's Bagpipe", "CMU Scarf", "Tartan Scarf", "Volleyball"]

            for(var i = 0; i < names.length; i++) {
                if(inventory != null && inventory.includes(items[i])) {
                    document.getElementById(items[i]).innerHTML = names[i]
                    document.getElementById(items[i]).style.display = "block"
                    console.log("ADDED: " + items[i])
                } else {
                    document.getElementById(items[i]).style.display= "none"
                    console.log("NOT ADDED: " + items[i])
                }
            }

            break
        }
    }
}
 
function update() {
    document.getElementById("treats-given").innerHTML = "Treats Eaten: " + treatsGiven
    document.getElementById("distance-walked").innerHTML = "Distance Walked: " + distanceWalked + " km"
    document.getElementById("weight").innerHTML = "Scotty's Weight: " + weight + " kg"
}
 
//----------------------------------------------------------------
//
//    SAVE, LOAD, AND RESET SCOTTYSTATS
//
//----------------------------------------------------------------

function save() {
    localStorage.setItem("distance", distanceWalked);
    localStorage.setItem("treats", treatsGiven);
    localStorage.setItem("weights", weight);

    // maps item names to a boolean representing if an item was obtained or not
    for(var i = 0; i < items.length; i++) {
        var inInventory = false
        if(inventory.includes(items[i])) {
            var inInventory = true
            console.log(items[i] + " saved")
        }
        localStorage.setItem(items[i], inInventory)
        console.log(inInventory, items[i])
    }
}
 
function load() {
    distanceWalked = localStorage.getItem("distance");
    treatsGiven = localStorage.getItem("treats");
    weight = localStorage.getItem("weights");
    
    for(var i = 0; i < items.length; i++) {
        if(localStorage.getItem(items[i]) == "true") {
            console.log(localStorage.getItem(items[i]))
            inventory.push(items[i]);
            console.log(items[i] + " loaded")
        }
        console.log(localStorage.getItem(items[i]))
    }
 
    if(weight == null) {
        weight = 8
    }
    if(treatsGiven == null) {
        treatsGiven = 0
    }
    if(distanceWalked == null) {
        distanceWalked = 0
    }
    update()
}

function reset() {
    treatsGiven = 0
    distanceWalked = 0
    weight = 8
    inventory = []
    update()
}
 
init()