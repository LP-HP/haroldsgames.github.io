let buttons = ['btn1', 'btn2', 'btn3', 'btn4', 'btn5', 'btn6', 'btn7', 'btn8' ,'btn9'];
var le = buttons.length;
let xwin = 'XXX';
let owin = 'OOO';
let turn = 'player1';
document.getElementById('playerturn').innerHTML = "X's turn!";
document.getElementById('playerturn').style.color = "red";
const checktie = () => {
  let numero = 0;
  for (var i = 0; i < le; i++){
    if (document.getElementById(buttons[i]).innerHTML === 'X' || document.getElementById(buttons[i]).innerHTML === 'O')
      numero++;
  }
  return numero;
};
const aler = (x, btn1, btn2, btn3) => {
  if (x==='t'){
    document.getElementById('playerturn').innerHTML = "Tie!";
    document.getElementById('playerturn').style.color = "purple";
    for (var iii = 0; iii < le; iii++) {
      document.getElementById(buttons[iii]).style.color = "purple";
      document.getElementById(buttons[iii]).disabled = true;
    }
  }
	else if (x === 'x'){
    document.getElementById('playerturn').innerHTML = "X wins!";
    document.getElementById('playerturn').style.color = "red";
    for (var i = 0; i < le; i++) {
      document.getElementById(buttons[i]).disabled = true;
      document.getElementById(buttons[i]).innerHTML === "X" && (buttons[i]===btn1 || buttons[i]===btn2 || buttons[i]===btn3)? document.getElementById(buttons[i]).style.textDecoration = "line-through":document.getElementById(buttons[i]).style.color = "gray";
    }
	}
	else {
    document.getElementById('playerturn').innerHTML = "O wins!";
    document.getElementById('playerturn').style.color = "blue";
    for (var ii = 0; ii < le; ii++) {
      document.getElementById(buttons[ii]).disabled = true;
      document.getElementById(buttons[ii]).innerHTML === "O" && (buttons[ii]===btn1 || buttons[ii]===btn2 || buttons[ii]===btn3)? document.getElementById(buttons[ii]).style.textDecoration = "line-through":document.getElementById(buttons[ii]).style.color = "gray";
    }
	}
};
const checkwin = () => {
  btn1t = document.getElementById('btn1').innerHTML;
  btn2t = document.getElementById('btn2').innerHTML;
  btn3t = document.getElementById('btn3').innerHTML;
  btn4t = document.getElementById('btn4').innerHTML;
  btn5t = document.getElementById('btn5').innerHTML;
  btn6t = document.getElementById('btn6').innerHTML;
  btn7t = document.getElementById('btn7').innerHTML;
  btn8t = document.getElementById('btn8').innerHTML;
  btn9t = document.getElementById('btn9').innerHTML;
  
  if (btn1t+btn2t+btn3t === xwin){
    aler('x', 'btn1', 'btn2', 'btn3');
  }else if (btn4t+btn5t+btn6t === xwin){aler('x', 'btn4', 'btn5', 'btn6');}
  else if (btn7t + btn8t + btn9t === xwin){aler('x', 'btn7', 'btn8', 'btn9');}
  else if (btn1t + btn4t + btn7t === xwin) {aler('x', 'btn1', 'btn4', 'btn7');} 
  else if (btn2t + btn5t + btn8t === xwin) {
    aler('x', 'btn2', 'btn5', 'btn8');
  } else if (btn3t + btn6t + btn9t === xwin) {
    aler('x', 'btn3', 'btn6', 'btn9');
  } else if (btn1t + btn5t + btn9t === xwin) {
    aler('x', 'btn1', 'btn5', 'btn9');
  } else if (btn3t + btn5t + btn7t === xwin) {
    aler('x', 'btn3', 'btn5', 'btn7');
  }
  //o
  else if (btn1t+btn2t+btn3t === owin){aler('o', 'btn1', 'btn2', 'btn3');}
  else if (btn4t+btn5t+btn6t === owin){aler('o', 'btn4', 'btn5', 'btn6');}
  else if (btn7t + btn8t + btn9t === owin){aler('o', 'btn7', 'btn8', 'btn9')}
  else if (btn1t + btn4t + btn7t === owin) {aler('o', 'btn1', 'btn4', 'btn7');}
  else if (btn2t + btn5t + btn8t === owin) {aler('o', 'btn2', 'btn5', 'btn8');} 
  else if (btn3t + btn6t + btn9t === owin) {aler('o', 'btn3', 'btn6', 'btn9');} 
  else if (btn1t + btn5t + btn9t === owin) {aler('o', 'btn1', 'btn5', 'btn9');} 
  else if (btn3t + btn5t + btn7t === owin) {aler('o', 'btn3', 'btn5', 'btn7');}
  //tie
  else if (checktie() === 9) {aler('t');}
};
const cl = (btn) => {
 if ((turn === 'player1') && (btn.innerHTML === '?')){
  btn.innerHTML = "X";
  btn.style.color='red';
  document.getElementById('playerturn').innerHTML = "O's turn!";
  document.getElementById('playerturn').style.color = "blue";
  turn = 'player2';
 }else if (turn ==='player2' && (btn.innerHTML === '?')){
  btn.innerHTML = "O"; 
  btn.style.color='blue';
  document.getElementById('playerturn').innerHTML = "X's turn!";
  document.getElementById('playerturn').style.color = "red";
  turn='player1';
 }
 checkwin();
};
const resetboard = () => {
  for (var i = 0; i < le; i++) {
    document.getElementById(buttons[i]).innerHTML = "?";
    document.getElementById(buttons[i]).style.color = "black";
    turn = 'player1';
    document.getElementById(buttons[i]).style.textDecoration = "None";
    document.getElementById(buttons[i]).disabled = false;
    document.getElementById('playerturn').innerHTML = "X's turn!";
    document.getElementById('playerturn').style.color = "red";
  }
};
