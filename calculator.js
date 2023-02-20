const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000, function(){
	console.log("Server started on port 3000");
});

app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
	var flames = "FLAMES";
	let n1 = req.body.name1;
	let n2 = req.body.name2;
	
	var name1=n1.toLowerCase();
	var name2=n2.toLowerCase();
	
	if(name1=="")
		res.send("First Name is empty, Please check");
	if(name1=="" || name2=="")
		res.send("Second Name is empty, Please check");
	
	var res1=nameValidation(name1);
	if(res1=="!@#")
		res.send("Name1 is Invalid");	
	var res2=nameValidation(name2);
	if(res2=="!@#")
		res.send("Name2 is Invalid");
		
	var len1=name1.length, len2=name2.length, commonElements=0, num=0, temp=0, i=0;
	
	var commonElements = CommonElements(name1, name2);
	num=len1+len2-2*commonElements;
	
	if(num==0){
		res.send("Both names are same, check once");
		return 0;
    	}
    	var tempNum=2;
    	while (flames.length !== 1) {
    	//while (tempNum--) {
		temp = i+num-1;
		if (temp >=flames.length) {
			temp = temp % flames.length;
		}
		console.log("temp: "+temp);
		
		//flames = tempString1.slice(0, temp - 1) + tempString2.slice(temp, flames.length);
		flames = flames.substr(0, temp) + flames.substr(temp+1, flames.length);
		
		if (temp === flames.length) {
			i = 0;
		} else {
			i = temp;
		}
		console.log(flames);
	}
    	
	let c = flames[0];
    	switch (c) {
		case "F":
			res.send("<h1> Friends </h1>");
			break;
		case "L":
			res.send("<h1> Lovers </h1>");
			break;
		case "A":
			res.send("<h1> Affectionate </h1>");
			break;
		case "M":
			res.send("<h1> Marriage </h1>");
			break;
		case "E":
			res.send("<h1> Enemies </h1>");
			break;
		case "S":
			res.send("<h1> Sibilings </h1>");
			break;
	}
	
	console.log(req.body);
	res.send("Got your request");
});


function nameValidation(a) {
  for (let i = 0; i < a.length; i++) {
    if (a.charCodeAt(i) >= 65 && a.charCodeAt(i) <= 90) {
      a = a.substring(0, i) + a[i].toLowerCase() + a.substring(i + 1);
    } else if (a.charCodeAt(i) < 97 || a.charCodeAt(i) > 122) {
      return "!@#";
    }
  }
  return a;
}


function CommonElements(a, b) {
    let m = new Map();
    let count = 0;
    for (let i = 0; i < a.length; i++) {
        if (m.has(a[i])) {
            m.set(a[i], m.get(a[i]) + 1);
        } else {
            m.set(a[i], 1);
        }
    }
    for (let i = 0; i < b.length; i++) {
        if (m.has(b[i]) && m.get(b[i]) > 0) {
            count++;
            m.set(b[i], m.get(b[i]) - 1);
        }
    }
    return count;
}





