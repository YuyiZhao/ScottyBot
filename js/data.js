var data;
$.getJSON("js/2019fall.json", function(json) {
    data = json;
    //put calls here?
});


//event listeners
document.getElementById("dog").addEventListener("click", function (){ startAnimation("pet")} );
document.getElementById("submit").addEventListener("click", myFunction);
document.getElementById("fce-input").addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      myFunction();
    }
});
document.getElementById('walk').addEventListener('ended',idle);
document.getElementById('eat').addEventListener('ended',idle);
document.getElementById('pet').addEventListener('ended',idle);
//document.getElementById("walk-button").addEventListener('click', animate("walk"));
document.getElementById("walk-button").addEventListener('click', function(){startAnimation("walk")});
document.getElementById("treat-button").addEventListener('click', function(){startAnimation("eat")});

function clearItems(){
    for(var k = 0; k<items.length;k++){
        document.getElementById("item-"+(k+1)).style.display="none";       
    }
}
var isIdle = true;

//----------------------------------------------------------------
//
//    VISUAL ELEMENTS
//
//----------------------------------------------------------------

// Changes Scotty based on whether it is walking, eating, or sitting

function animate(word){
    clearVideos();
    clearItems();
    switch (word){
        case "pet":
            document.getElementById("pet").style.display = "block";
            document.getElementById("pet").play();
            break;
        case "walk":
            document.getElementById("walk").style.display = "block";
            document.getElementById("walk").play();
            break;
        case "eat":
            document.getElementById("eat").style.display = "block";
            document.getElementById("eat").play();
            break;
        case "dog":

            break;
    }
}

function idle(){
    clearVideos()
    document.getElementById("dog").style.display = "block";
}

function clearVideos(){
    document.getElementById("walk").style.display = "none";
    document.getElementById("eat").style.display = "none";
    document.getElementById("dog").style.display = "none";
    document.getElementById("pet").style.display = "none";
}


function setVisual(walk, eat, dog) {
    document.getElementById("walk").style.display = walk;
    document.getElementById("eat").style.display = eat;
    document.getElementById("dog").style.display = dog;
}

function eat(){
    clearVideos()
    setVisual("none", "block", "none")
    document.getElementById("eat").play();
    clearItems();
}
function myHandler(e) {
    // What you want to do after the event
}

//----------------------------------------------------------------
//
//    FCE CALCULATOR
//
//----------------------------------------------------------------

function myFunction() {
    id = document.getElementById("fce-input").value
    if (isValid(id)){
        let fce = getFCE(id);
        fce = Math.round(fce*100)/100
        document.getElementById("FCEtot").innerHTML = "Total FCE: "+ fce +
        "</br>For class: " + getName(id)
        //alert("Average time spent for " + getName(id) + ": "+ getFCE(id))
    } else {
        alert("Enter a valid course number")
    }
}

// ?
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
 
var filepath = ["assets/scotty_friends.png", "assets/scotty_pipe.png", "assets/scotty_scarf_tartan.png", "assets/scotty_scarf_cmu.png", "assets/scotty_volley.png"];
var items =         ["frens", "bagpipe", "scarf-c", "scarf-t", "volleyball"];
var probabilities = [ .25,    .25,       .25,      .25,      .25       ];
var names = ["Scotty and Friends", "Scotty's Bagpipe", "CMU Scarf", "Tartan Scarf", "Volleyball"]
var inventory = [];
 
function init() {
    load();
     
    // initialize accessory buttons
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



//hardcoded stuff to be fixed later
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

//attempted universal timer function
function startAnimation(name){
    if (!isIdle){
        return;
    }
    isIdle = false;
    let vid;
    switch (name){
        case "pet":
            time = petTime;
            vid = document.getElementById("pet")
            animate("pet")
            break;
        case "walk":
            time = walkTime;
            vid = document.getElementById("walk")
            button = document.getElementById("walk-button")
            animate("walk")
            break;
        case "eat":
            time = treatTime;
            vid = document.getElementById("eat")
            button = document.getElementById("treat-button")
            animate("eat")
            break;
        case "dog":
    }
    loopDown(name)
}
var button;
var time = 0;

function loopDown(name){
    time -= 1000
    console.log(time);
    if ((time/1000) % 60 < 10) {
        mins = "0" + (time/1000 % 60).toString()
    } else {
        mins = time/1000 % 60
    }
    var timer = Math.floor((time/1000) / 60) + ":" + mins
 
    //document.getElementById("walk-button").innerHTML = timer
    if (button){
        button.innerHTML = timer
    }
    if (time <= 0) {
        endAnim(name);
        return;
    } else {
        setTimeout(function(){loopDown(name)}, 1000)
    }
}

function endAnim(name){
    isIdle = true;
    button = null;
    switch(name){
        case "pet":
            break;
        case "walk":
            distanceWalked++;
            weight = (weight*0.975).toFixed(3);
            document.getElementById("walk-button").innerHTML = "Walk"
            isIdle = true
            walkTime = Math.ceil(document.getElementById("walk").duration+1)*1000;
            update()
            findItem()
            save()
            break;
        case "eat":
            console.log("End Treat")
            treatsGiven++;
            weight = (weight*1.05).toFixed(3);
            document.getElementById("treat-button").innerHTML = "Feed"
            isIdle = true
            treatTime = Math.ceil(document.getElementById("eat").duration+1)*1000
            update()
            save()
            break;
    }
}
// CHANGE THIS TO SET WALK/TREAT TIMES 
var walkTime = 7000;
var treatTime = 4000;
var petTime = 4000;


// starts walk timer
function startWalk() {
    if(isIdle) {
        clearVideos()
        setVisual("block", "none", "none");
        document.getElementById("walk").play();
        clearItems();
        isIdle = false;
        decrementWalkTimer()
    }
}

// starts treat timer
function startTreat() {
    if(isIdle) {
        eat()
        isIdle = false;
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
    if (treatTime <= 0) {
        endTreat();
    } else {
        setTimeout(decrementTreatTimer, 1000)
    }
}
 
// ends the walk and changes weight and distance walked counters
function endWalk() {
 
}
 
// ends the feeding and changes weight and distance walked counters
function endTreat() {

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