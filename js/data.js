var data;
$.getJSON("js/data.json", function(json) {
    data = json;
    //put calls here?
});

//document.getElementById("dog").addEventListener("click", pet);
document.getElementById("submit").addEventListener("click", myFunction);
document.getElementById('walk').addEventListener('ended',unWalk);
document.getElementById('eat').addEventListener('ended',unEat);


function walk(){
    document.getElementById("walk").style.display = "block"
    document.getElementById("eat").style.display = "none"
    document.getElementById("dog").style.display = "none"
    document.getElementById("walk").play();
}
function unWalk(){
    document.getElementById("dog").style.display = "block"
    document.getElementById("walk").style.display = "none"
    document.getElementById("eat").style.display = "none"
}

function eat(){
    document.getElementById("eat").style.display = "block"
    document.getElementById("dog").style.display = "none"
    document.getElementById("walk").style.display = "none"
    document.getElementById("eat").play();
}
function unEat(){
    document.getElementById("dog").style.display = "block"
    document.getElementById("eat").style.display = "none"
    document.getElementById("walk").style.display = "none"
}

function myHandler(e) {
    // What you want to do after the event
}
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


//line between his and mine

var treatsGiven = 0
var distanceWalked = 0
var weight = parseInt(8)
 
var canWalk = true
var canFeed = true
 
var filepath = ["assets/scotty_friends.png", "assets/scotty_pipe.png", "assets/scotty_scarf_tartan.png", "assets/scotty_scarf_cmu.png", "assets/scotty_volley.png"];
var items =         ["frens", "bagpipe", "scarf-c", "scarf-t", "volleyball"];
var probabilities = [ 1,    1,       1,      1,      1       ];
var inventory = [];
 
 
var walkTime = 3000;
var treatTime = 3000;

for(var i = 0; i<items.length;i++){ 
    document.getElementById(items[i]).addEventListener('click', function(acc) {
        for(var k = 0; k<items.length;k++){
            console.log("item-"+(k+1))
            document.getElementById("item-"+(k+1)).style.display="none"
           
        }
        var s = "item-"+(i+1);
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
 
function endWalk() {
    console.log("End Walk")
    distanceWalked++;
    weight = (weight*0.975).toFixed(3);
    document.getElementById("walk-button").innerHTML = "Walk"
    canWalk = true
    walkTime = 3000
    update()
    save()
    findItem()
 
}
 
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
 
function findItem() {
    var i;
    for (i = 0; i < items.length; i++) {
        x = Math.random()
        if (!inventory.includes(items[i]) && x <= probabilities[i]) {
            console.log("ITEM FOUND!!!")
            console.log(typeof(inventory)+"    "+ items[i])
            inventory.push(items[i])

            names = ["Scotty and Frens", "ScottyPipe", "CMU Scarf", "Stylish Scarf", "Volleyball"]

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
 
function save() {
    localStorage.setItem("distance", distanceWalked);
    localStorage.setItem("treats", treatsGiven);
    localStorage.setItem("weights", weight);
    list = []
    for(var i = 0; i < inventory.length; i++) {
        list.push(inventory[i])
    }
    localStorage.setItem("inventories", list);
}
 
function reset() {
    treatsGiven = 0
    distanceWalked = 0
    weight = 8
    inventory = []
    update()
}
 
function load() {
    distanceWalked = localStorage.getItem("distance");
    treatsGiven = localStorage.getItem("treats");
    weight = localStorage.getItem("weights");
    console.log(localStorage.getItem("inventories"))
    console.log(typeof(localStorage.getItem("inventories")))
    inventory = localStorage.getItem("inventories");
 
    if(weight == null) {
        weight = 8
    }
    if(treatsGiven == null) {
        treatsGiven = 0
    }
    if(distanceWalked == null) {
        distanceWalked = 0
    }
    if(inventory == null) {
        inventory = []
    }
    update()
}
 
load()
// initialize walk/treat buttons
document.getElementById("walk-button").addEventListener('click', startWalk);
document.getElementById("treat-button").addEventListener('click', startTreat);
 
names = ["Scotty and Frens", "ScottyPipe", "CMU Scarf", "Stylish Scarf", "Volleyball"]
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