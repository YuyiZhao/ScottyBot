Content-Security-SecurityPolicyViolationEvent

var treatsGiven = 0
var distanceWalked = 0 
var weight = 8  

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
}

var walkTime = 12000;
var treatTime = 3000;

// starts walk timer (20 min.)
function startWalk() {
    canWalk = false;
    setTimeout('decrementWalkTimer()', 1000)
}

// decrease walk timer by one second 
function decrementWalkTimer() {
    walkTime -= 1000
    var timer = Math.floor((walkTime/1000) / 60) + ":" + (walkTime/1000) % 60
    document.getElementById("walk-button").innerHTML = timer
    if (walkTime == 0) {
        endWalk();
    } else {
        setTimeout('decrementWalkTimer()', 1000)
    }
}

// starts treat timer (5 min.)
function startTreat() {
    canTreat = false
    setTimeout('decrementTreatTimer()', 1000);
}

// decrease treat timer by one second
function decrementTreatTimer() {
    treatTime -= 1000
    var timer = Math.floor((treatTime/1000) / 60) + ":" + (treatTime/1000) % 60
    document.getElementById("treat-button").innerHTML = timer
    if (treatTime == 0) {
        endTreat();
    } else {
        setTimeout('decrementTreatTimer()', 1000);
    }
}

function endWalk() {
    distanceWalked += 1;
    if(weight > 5)
        weight *= 0.975;
    calories = distanceWalked * 30
    document.getElementById("distance-walked").innerHTML = "Distance Walked: " + distanceWalked + "km"
    document.getElementById("weight").innerHTML = "Scotty Weight: " + weight.toFixed(3)
    document.getElementById("walk-button").innerHTML = "Walk"
    canWalk = true
    walkTime = 12000

}

function endTreat() {
    treatsGiven++;
    weight *= 1.05;
    calories = treatsGiven * 50;
    document.getElementById("treats-given").innerHTML = "Treats Eaten: " + treatsGiven
    document.getElementById("weight").innerHTML = "Scotty Weight: " + weight.toFixed(3)
    document.getElementById("treat-button").innerHTML = "Feed"
    canFeed = true
    treatTime = 3000
}

document.getElementById("walk-button").addEventListener('click', startWalk);
document.getElementById("treat-button").addEventListener('click', startTreat);
