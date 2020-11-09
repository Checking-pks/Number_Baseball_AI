function option_button() {
    document.getElementById("option").style.zIndex = "2";
    back_button_move();
    play_button_restore();
}

function option_out(){
    document.getElementById("option").style.zIndex = "-2";
    play_button_move();
    back_button_restore();
}

function play_button(){
    document.getElementById("in_game").style.zIndex = "2";
    
    var answer = document.getElementsByClassName("answer_container");

    for(var i=0;i<answer.length;i++){
        answer[i].style.padding = "0 5vw";
    }
    
    play_button_restore();

    new_game();
}

//로비버튼 이동효과를 위한 함수
function play_button_move(){
    var play = document.getElementById("play_button");
    play.style.transition = "opacity 0.7s,top 0.7s";    //속도
    play.style.opacity = "100%";
    play.style.top = "0";
    setTimeout(option_button_move, 300);        //플레이버튼이후 옵션버튼 등장하는데에 걸리는 시간
}
function option_button_move(){
    var option = document.getElementById("option_button");
    option.style.transition = "opacity 0.7s,top 0.7s";   //속도
    option.style.opacity = "100%";
    option.style.top = "0";
}
function play_button_restore(){
    var play = document.getElementById("play_button");
    var option = document.getElementById("option_button");
    play.style.transition = "all 0s";
    play.style.opacity = "0";
    play.style.top = "30px";
    option.style.transition = "all 0s";
    option.style.opacity = "0";
    option.style.top = "30px";
}
//뒤로가기버튼 이동효과
function back_button_move(){
    var back = document.getElementById("back_button");
    back.style.transition = "all 0.7s";     //속도
    back.style.opacity = "100%";
    back.style.bottom = "10.5vh";
}
function back_button_restore(){
    var back = document.getElementById("back_button");
    back.style.transition = "all 0s";
    back.style.opacity = "0";
    back.style.bottom = "7vh";
}