var data;
$.getJSON("js/data.json", function(json) {
    data = json;
    //put calls here?
});

document.getElementById("submit").addEventListener("click", myFunction);

function myFunction() {
    id = document.getElementById("fce-input").value
    if (isValid(id)){
        alert("Average time spent for " + getName(id) + ": "+ getFCE(id))
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




/*
0: "Year"
1: "Semester"
2: "College"
3: "Dept"
4: "Course ID"
5: "Section"
6: "Name"
7: "Course Name"
8: "Type"
9: "Level"
10: "Possible Respondents"
11: "Num Respondents"
12: "Response Rate %"
13: "Hrs Per Week"
14: "Hrs Per Week 5"
15: "Hrs Per Week 8"
16: "Interest in student learning"
17: "Clearly explain course requirements"
18: "Clear learning objectives & goals"
19: "Instructor provides feedback to students to improve"
20: "Demonstrate importance of subject matter"
21: "Explains subject matter of course"
22: "Show respect for all students"
23: "Overall teaching rate"
24: "Overall course rate"
*/