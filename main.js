//1~100까지 랜덤한 숫자가 정해져야함
//숫자를 입력할 창과 입력할 버튼 있어야함
//결과값이 보여야 함
//유저가 입력한 값 > 정답 Down
//유저가 입력한 값 < 정답 Up
//정답을 맞추면 맞췄다고 알려주기
//Reset버튼을 누르면 다시 랜덤한 숫자 생성, 기회 초기화
//1~100사이의 숫자 외에 다른 숫자를 입력하면 알려줘야함 기회를 깎지않음
//기회는 5번 제한 5번이 끝나면 버튼 비활성화
//중복된 숫자를 입력하면 알려주기 기회 깎이지 않음

let randomNum = 0;
let chances = 5;
let inputList = []; //입력한 숫자를 저장하는 배열
let gameOver = false; //go버튼 비활성화 여부
let inputNum = document.getElementById("input-number");
let goButton = document.getElementById("go-button");
let resultArea = document.getElementById("result-area");
let chanceArea = document.getElementById("chance-area");
let resetButton = document.getElementById("reset-button");

goButton.addEventListener("click", go);
resetButton.addEventListener("click", reset);
inputNum.addEventListener("focus", function () {
  inputNum.value = "";
});

function randomNumber() {
  //1~100 랜덤 숫자 생성하는 함수
  randomNum = Math.floor(Math.random() * 100) + 1;
  console.log("정답", randomNum);
}
randomNumber(); //랜덤 숫자 생성

function go() {
  let userNum = inputNum.value;
  if (userNum < 1 || userNum > 100) {
    //입력값이 1~100 범위를 벗어나면 알려주면서 종료
    resultArea.textContent = "1부터 100 사이의 값을 입력해 주세요.";
    return;
  }

  if (userNum < randomNum) {
    resultArea.textContent = "Up!";
  } else if (userNum > randomNum) {
    resultArea.textContent = "Down!";
  } else {
    resultArea.textContent = "정답입니다!!";
  }

  chances--; //기회 차감
  chanceArea.textContent = `기회 : ${chances}번`;

  if (inputList.includes(userNum) == true) {
    resultArea.textContent = "중복된 숫자입니다. 다시 입력해 주세요";
    return;
  } else {
    inputList.push(userNum); //배열에 입력값을 추가
    console.log(inputList);
  }

  if (chances < 1) {
    gameOver = true;
  }
  if (gameOver == true) {
    goButton.disabled = gameOver; //go버튼 비활성화
  }
}

function reset() {
  chances = 5; //기회 초기화
  inputList = []; //입력값 배열 초기화
  inputNum.value = ""; //input창 공백
  resultArea.textContent = "범위는 1부터 100까지입니다";
  chanceArea.textContent = `기회 : ${chances}번`;
  randomNumber(); //랜덤 숫자 재생성
  gameOver = false; //go버튼 활성화
}
