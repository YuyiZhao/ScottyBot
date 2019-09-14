var treatsGiven = 0
var distanceWalked = 0
var weight = parseInt(8)
 
var canWalk = true
var canFeed = true
 
var hats = ["Beanie", "Cap", "Fedora"]
var toys = ["Frisbee", "Bone"]
var balls = ["Soccer", "Basketball", "Tennisball"]
var itemList = [hats, toys, balls]
var inventory = [[], [], []] // list of hats, toys, and balls owned, listed by index number
 
 
// Adds a new item to local inventory, indexed by type (hat-0, toys-1, balls-2) and number.
function addItem(type, index) {
    inventory[type].push(itemList[type][index]);
    save()
}
 
var walkTime = 12000;
var treatTime = 3000;
 
// starts walk timer (20 min.)
function startWalk() {
    if(canWalk) {
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
    if(canFeed) {
        canTreat = false
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
    console.log("Yote")
    distanceWalked++;
    weight = (weight*0.975).toFixed(3);
    document.getElementById("walk-button").innerHTML = "Walk"
    canWalk = true
    walkTime = 12000
    update()
    save()
 
}
 
function endTreat() {
    console.log("Yeet")
    treatsGiven++;
    weight = (weight*1.05).toFixed(3);
    document.getElementById("treat-button").innerHTML = "Feed"
    canFeed = true
    treatTime = 3000
    update()
    save()
}
 
function update() {
    document.getElementById("treats-given").innerHTML = "Treats Eaten: " + treatsGiven
    document.getElementById("distance-walked").innerHTML = "Distance Walked: " + distanceWalked + " km"
    document.getElementById("weight").innerHTML = "Scotty's Weight: " + weight + " kg"
}
 
function save() {
    localStorage.setItem("distance", distanceWalked);
    localStorage.setItem("treats", treatsGiven);
    localStorage.setItem("weights", weight)
}
 
function reset() {
    treatsGiven = 0
    distanceWalked = 0
    weight = 8
    update()
}
 
function load() {
    distanceWalked = localStorage.getItem("distance");
    treatsGiven = localStorage.getItem("treats");
    weight = localStorage.getItem("weights")
 
    if(weight == null)
        weight = 8
    if(treatsGiven == null)
        treatsGiven = 0
    if(distanceWalked == null)
        distanceWalked = 0
    update()
}
 
load()
document.getElementById("walk-button").addEventListener('click', startWalk);
document.getElementById("treat-button").addEventListener('click', startTreat);