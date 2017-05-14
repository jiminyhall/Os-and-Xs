var mode = "blank";
var marker = "X";
var squares = ["tl","tm","tr","ml","mm","mr","bl","bm","br"];
var winner = "";


function computerTurn() {
  
  var rm = Math.floor(Math.random()*squares.length);
  // console.log("Random: " + squares[rm]);
  
  
  console.log("computerPress: " + squares[rm]);
  
  if(marker==="X") {
    marker="O";
    press(squares[rm]);
    marker="X"
  } else {
    marker="X";
    press(squares[rm]);
    marker="O"
  }
  
  document.getElementById("info").innerHTML = "Where next?";
  
  
}

function clearAll() {
  squares = ["tl","tm","tr","ml","mm","mr","bl","bm","br"];
  winner = "";
  mode="blank";
  document.getElementById("info").innerHTML = "Choose marker and click on a box to start. The computer will take a turn after you.";
  document.getElementById("tl").innerHTML = "";
  document.getElementById("tm").innerHTML = "";
  document.getElementById("tr").innerHTML = "";
  document.getElementById("ml").innerHTML = "";
  document.getElementById("mm").innerHTML = "";
  document.getElementById("mr").innerHTML = "";
  document.getElementById("bl").innerHTML = "";
  document.getElementById("bm").innerHTML = "";
  document.getElementById("br").innerHTML = "";
  document.getElementById("tl").style.backgroundColor = 'rgb(0,0,0)';
  document.getElementById("tm").style.backgroundColor = 'rgb(0,0,0)';
  document.getElementById("tr").style.backgroundColor = 'rgb(0,0,0)';
  document.getElementById("ml").style.backgroundColor = 'rgb(0,0,0)';
  document.getElementById("mm").style.backgroundColor = 'rgb(0,0,0)';
  document.getElementById("mr").style.backgroundColor = 'rgb(0,0,0)';
  document.getElementById("bl").style.backgroundColor = 'rgb(0,0,0)';
  document.getElementById("bm").style.backgroundColor = 'rgb(0,0,0)';
  document.getElementById("br").style.backgroundColor = 'rgb(0,0,0)';
}

function checkAll() {
  
  console.log("CheckAll");
  
  checkWin("tl", "tm", "tr");
  checkWin("ml", "mm", "mr");
  checkWin("bl", "bm", "br");
  checkWin("tl", "ml", "bl");
  checkWin("tm", "mm", "bm");
  checkWin("tr", "mr", "br");
  checkWin("tl", "mm", "br");
  checkWin("tr", "mm", "bl");
  
  if(winner === "")
    checkFull();
   
}

function checkFull() {
  
  if(squares.length === 0) {
    console.log("No Winner");
    document.getElementById("info").innerHTML = "Draw.<br>Change marker or click anywhere to clear.";
    winner = "D";
  document.getElementById("tl").style.backgroundColor = 'rgb(180,0,0)';
  document.getElementById("tm").style.backgroundColor = 'rgb(180,0,0)';
  document.getElementById("tr").style.backgroundColor = 'rgb(180,0,0)';
  document.getElementById("ml").style.backgroundColor = 'rgb(180,0,0)';
  document.getElementById("mm").style.backgroundColor = 'rgb(180,0,0)';
  document.getElementById("mr").style.backgroundColor = 'rgb(180,0,0)';
  document.getElementById("bl").style.backgroundColor = 'rgb(180,0,0)';
  document.getElementById("bm").style.backgroundColor = 'rgb(180,0,0)';
  document.getElementById("br").style.backgroundColor = 'rgb(180,0,0)';
        mode="end";
      document.getElementsByClassName("choice")[0].style.borderColor = 'black';
      document.getElementsByClassName("choice")[1].style.borderColor = 'black';
      document.getElementsByClassName("choice")[0].style.color = 'black';
      document.getElementsByClassName("choice")[1].style.color = 'black';
      document.getElementsByClassName("choice")[0].onclick = function() { choose('O'); };
      document.getElementsByClassName("choice")[1].onclick = function() { choose('X'); };
  }
  
}


function checkWin(l1, l2, l3) {
  if (document.getElementById(l1).innerHTML !== "") {
    if ((document.getElementById(l1).innerHTML === document.getElementById(l2).innerHTML) &&
      (document.getElementById(l2).innerHTML === document.getElementById(l3).innerHTML) &&
      (l1 !== "")) {
      console.log("Winner: " + document.getElementById(l1).innerHTML);
      document.getElementById("info").innerHTML = document.getElementById(l1).innerHTML + " WINS<br>Change marker or click anywhere to clear.";
      winner = document.getElementById(l1).innerHTML;
      document.getElementById(l1).style.backgroundColor = 'rgb(180,0,0)';
      document.getElementById(l2).style.backgroundColor = 'rgb(180,0,0)';
      document.getElementById(l3).style.backgroundColor = 'rgb(180,0,0)';
      mode="end";
      document.getElementsByClassName("choice")[0].style.borderColor = '#ffff33';
      document.getElementsByClassName("choice")[1].style.borderColor = '#ffff33';
      document.getElementsByClassName("choice")[0].style.color = '#ffff33';
      document.getElementsByClassName("choice")[1].style.color = '#ffff33';
      document.getElementsByClassName("choice")[0].onclick = function() { choose('O'); };
      document.getElementsByClassName("choice")[1].onclick = function() { choose('X'); };
    }
  }
}

function choose(val) {
  marker = val;
  document.getElementById("select-text").innerHTML = "Playing as: " + marker;
}

function playerTurn(name) {
  
  console.log("playerPress: " + name);
  
  if(mode==="blank") {
    mode="playing";
    document.getElementsByClassName("choice")[0].style.borderColor = 'rgb(0,0,0)';
    document.getElementsByClassName("choice")[1].style.borderColor = 'rgb(0,0,0)';
    document.getElementsByClassName("choice")[0].style.color = 'rgb(0,0,0)';
    document.getElementsByClassName("choice")[1].style.color = 'rgb(0,0,0)';
    document.getElementsByClassName("choice")[0].onclick = '';
    document.getElementsByClassName("choice")[1].onclick = '';
    // grey out select marker
  }
  else if (mode==="end") {
    clearAll();
    return;
  }
  
  press(name);
  checkAll();
  
  if(winner !== "")
    return;
    
  var delay=500; //1 second

  document.getElementById("info").innerHTML = "Thinking...";
  setTimeout(function() {
    computerTurn();
    checkAll();
  }, delay);
  
  
  
}

function press(name) {
 
  console.log(name);
  if (document.getElementById(name).innerHTML === "") {
    document.getElementById(name).innerHTML = marker;
    squares = squares.filter(function(id) { return name !== id;});
    
    //console.log(squares);
    // rem from list
  }
  
}