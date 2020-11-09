//커스텀 confirm창
var which_confirm = 0;      //replay인지 home인지..
function show_confirm(obj){
    document.getElementById("custom_confirm_header").innerHTML = "Are you sure?";
    document.getElementById("custom_confirm_str").innerHTML = "The game won't be saved.";

    document.getElementById("custom_confirm").style.zIndex = "10";
    document.getElementById("confirm_filter").style.zIndex = "9";
    document.getElementById("confirm_filter").style.opacity = "50%";
    which_confirm = obj;
}
function hide_confirm(){
    document.getElementById("custom_confirm").style.zIndex = "-2";
    document.getElementById("confirm_filter").style.zIndex = "-2";
    document.getElementById("confirm_filter").style.opacity = "0%";
}

function confirm_work(obj){
    if(which_confirm == 1){
        var answer = document.getElementsByClassName("answer_container");
        if(obj == 1){
            for(var i=0;i<answer.length;i++){
                answer[i].style.transition = "padding 0s";
                answer[i].style.padding = "0 35vw";
                setTimeout(replay_animation, 50);
            }
            new_game();
            key_pad_on();
            hide_confirm();
        }
        hide_confirm();
    }
    else{
        var in_game = document.getElementById("in_game");
        var answer = document.getElementsByClassName("answer_container");
        if(obj == 1){
            in_game.style.zIndex = "-2";
            for(var i=0;i<answer.length;i++){
                answer[i].style.padding = "0 35vw";
            }
            play_button_move();
            new_game();
            key_pad_on();
            hide_confirm();
        }
        hide_confirm();
    }
}