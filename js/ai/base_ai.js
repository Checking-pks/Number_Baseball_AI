var ai_number_list = "0123456789";
var ai_correct = "";
var ai_times = 0;

var ai_list_right = "";
var ai_check_list = [];

// 새로운 게임용 변수 초기화
function ai_new_correct() {
    ai_number_list = "0123456789";
    ai_correct = "";
    ai_times = 0;

    ai_list_right = "";
    ai_check_list = [];
}


// 문자 Swap 함수
function ai_swapstr(str, first, second) {
    str = String(str);

    if (first == second) {
        return str;
    } else if (first < second) {
        return str.substr(0, first) + str[second] + str.substr(first+1, second - first -1) + str[first] + str.substr(second+1);
    } else {
        return str.substr(0, second) + str[first] + str.substr(second+1, first - second -1) + str[second] + str.substr(first+1);
    }
}


// 문자열로 만들 수 있는 모든 경우의 수 리턴 함수 (4B 용)
let ai_permutations = (string) => {
  if (!string || typeof string !== "string"){
    return "Please enter a string"
  } else if (string.length < 2 ){
    return string
  }

  let permutationsArray = [] 
   
  for (let i = 0; i < string.length; i++){
    let char = string[i]

    if (string.indexOf(char) != i)
    continue

    let remainingChars = string.slice(0, i) + string.slice(i + 1, string.length)

    for (let permutation of ai_permutations(remainingChars)){
      permutationsArray.push(char + permutation) }
  }
  return permutationsArray
}

// 문자열로 4자리의 랜덤한 수 제작
function ai_random_number_maker(str) {
    list = String(str);

    var length = list.length;

    if (length < 4) return;

    for (var i=0; i<length; i++) {
        list = ai_swapstr(list, i, Math.floor(Math.random() * (length -1)));
    }

    if (list[0] == "0") list = ai_swapstr(list, 0, Math.floor(Math.random() * (length-2)) + 1);
    
    return list.substr(0,4);
}


// 홈런인지, 아웃인지, 안타인지 인식용
function ai_check_home_run(correct, num, mode) {
    correct = String(correct);
    num = String(num);

    var strike = 0;
    var ball = 0;

    // 모드 1 일때만 횟수 추가
    if (mode == 0) player_times++;
    if (mode == 1) ai_times++;
    
    for (var i=0; i<num.length; i++) {
        for (var j=0; j<correct.length; j++) {
            if (num[i] == correct[j]) {
                if (i == j) strike++;
                else ball++;

                break;
            }
        }
    }

    // mode _ 1 : log 저장, 2 : 리턴, 3 : 리턴2
    if (mode == 0) {
        player_check_list.push(String(num) + String(strike) + String(ball));
        if (strike == 4) player_check_list[player_check_list.length -1] += player_times;
    } else if (mode == 1) {
        ai_check_list.push(String(num) + String(strike) + String(ball));
        if (strike == 4) ai_check_list[ai_check_list.length -1] += ai_times;
    }
    else if (mode == 2) return String(strike) + String(ball);
    else if (mode == 3) return strike + ball;
}

function ai_output(mode) {
    var result = document.getElementById("log_field"); //결과를 출력할 창

    var num = player_check_list[0].substr(0, 4);
    var strike = player_check_list[0][4];
    var ball = player_check_list[0][5];

    if (strike != 4) player_check_list.splice(0, 1);

    if (strike == 4) result.value += "\n" + num + "\tHome Run!\t";
    else if (strike == 0 && ball == 0) result.value += num + "\tOUT!\t";
    else result.value += num + "\t" + strike + "S " + ball + "B\t";

    if (mode) {
        var ai_num = ai_check_list[0].substr(0, 4);
        var ai_strike = ai_check_list[0][4];
        var ai_ball = ai_check_list[0][5];

        if (strike != 4) ai_check_list.splice(0, 1);

        if (strike == 4) result.value += "\n" + ai_num + "\tHome Run!\n";
        else if (strike == 0 && ball == 0) result.value += ai_num + "\tOUT!\n";
        else result.value += ai_num + "\t" + ai_strike + "S " + ai_ball + "B\n";
    }

    if (strike == 4) return "Home Run!";
    else if (strike == 0 && ball == 0) return "OUT!";
    else return strike + "S " + ball + "B";
}