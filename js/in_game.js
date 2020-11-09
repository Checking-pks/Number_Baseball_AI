function key_pad_on(){
    document.getElementById("log_field").style.zIndex = "-1";
    document.getElementById("key_pad").style.zIndex = "2";
    document.getElementById("log").style.zIndex = "1";
}

function log_on(){
    document.getElementById("log_field").style.zIndex = "2";
    document.getElementById("key_pad").style.zIndex = "1";
    document.getElementById("log").style.zIndex = "2";
}

function replay_animation(){
    var answer = document.getElementsByClassName("answer_container");
    for(var i=0;i<answer.length;i++){
            answer[i].style.transition = "padding 0.5s";
            answer[i].style.padding = "0 5vw";
        }
}


var answer_focus_figure_number = 0; //answer칸에 자동 포커스를 주기위한 전역변수

function answer_focus_manual(obj){
    var answer = document.getElementsByClassName("answer");
    for(i=0;i<answer.length;i++){
        answer[i].style.background = "#cfcfcf";
    }
    obj.style.background = "white";

    if(obj == answer[0]){
        answer_focus_figure_number = 0 ;
    }
    else if(obj == answer[1]){
        answer_focus_figure_number = 1 ;
    }
    else if(obj == answer[2]){
        answer_focus_figure_number = 2 ;
    }
    else if(obj == answer[3]){
        answer_focus_figure_number = 3 ;
    }
    key_pad_on();
}

function answer_focus_auto(){   // 수정 예정
    var answer = document.getElementsByClassName("answer");
    for(i=0;i<answer.length;i++){
        answer[i].style.background = "#cfcfcf";
    }
    answer[answer_focus_figure_number].style.background = "white";
}

function put(obj){

    if (player_check_list.length > 0 && player_check_list[player_check_list.length -1][4] == "4") return;

    // 정답 칸 4개 object
    var answer = document.getElementsByClassName("answer");

    if (answer_focus_figure_number == 0 && obj.value == "0") return;
    else if (obj.value == "del") {
        answer[answer_focus_figure_number].innerHTML = ""; 
        return;
    } else answer[answer_focus_figure_number].innerHTML = obj.value;
    
    // 중복 체크
    for (var i=0; i<4; i++){
        if (answer_focus_figure_number != i && answer[i].innerHTML == answer[answer_focus_figure_number].innerHTML){
            answer[i].innerHTML = "";
            if (i<answer_focus_figure_number) {
                answer_focus_figure_number = i;
                answer_focus_auto();
                return;
            } else {
                for (var j=answer_focus_figure_number+1; j<4; j++) {
                    if (answer[j].innerHTML == "") {
                        answer_focus_figure_number = j;
                        answer_focus_auto();
                        return;
                    }
                }
            }
        }
    }

    if (answer_focus_figure_number != 3) {
        answer_focus_figure_number++;
        answer_focus_auto();
    }

}

//새로운게임
function new_game(){
    var answer = document.getElementsByClassName("answer");
    for(i=0;i<answer.length;i++) answer[i].innerHTML = "";

    answer_focus_figure_number = 0;
    answer_focus_auto(); 

    document.getElementById("log_field").value = "";
    play_board_setting();

    ai_new_correct(); // ai 변수 초기화
    player_new_correct(); // player 변수 초기화
}


var player_correct = "";
var player_times = 0;

var player_check_list = [];

function player_new_correct() {
    player_correct = ai_random_number_maker("0123456789");
    player_times = 0;

    player_check_list = [];
}