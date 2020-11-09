// 위 문구 초기화용
function play_board_setting() {
    switch (game_mode) {
        case "AI":
            document.getElementById("turn_information").innerHTML = "your answer";
            break;
        case "single":
            document.getElementById("turn_information").innerHTML = "your turn";
            break;
    }
}


// 숫자를 입력하였을 시
function enter_number() {
    var num_list = document.getElementsByClassName("answer");

    for (var i=0; i<4; i++) if (num_list[i].innerHTML == "") return;

    switch (game_mode) {
        case "AI":
            if (ai_correct == "") {
                ai_correct = num_list[0].innerHTML + num_list[1].innerHTML + num_list[2].innerHTML + num_list[3].innerHTML;

                ai_auto();

                document.getElementById("turn_information").innerHTML = "your turn";

                document.getElementById("log_field").value += "your number : " + ai_correct + "\n";

                if (player_check_list.size > 0 && player_check_list[player_check_list.size -1][4] == 4) finish_game();
                else if (ai_check_list[0][4] == 4) finish_game();

                break;
            }

        case "single":
            var num = num_list[0].innerHTML + num_list[1].innerHTML + num_list[2].innerHTML + num_list[3].innerHTML;
            if (num.length != 4) break;
            ai_check_home_run(player_correct, num, 0);
            
            //스트라이크 볼 정보 보여주기
            if (player_check_list[player_check_list.length -1][4] != '4') {
                document.getElementById("log_info").innerHTML = ai_output((game_mode == "AI") ? 1 : 0);
                document.getElementById("strike_ball_container").style.transition = "opacity 0s";
                document.getElementById("strike_ball_container").style.opacity = "100%";
                //점점 지우기
                setTimeout(hide_strike_ball, 500);
            }

            if (player_correct == num) finish_game();
    }

    for (var i=0; i<4; i++) num_list[i].innerHTML = "";
    answer_focus_figure_number =0;
    answer_focus_auto();
}

function finish_game() {
    show_confirm(1);    // 1 : replay new game (not lobby)

    switch (game_mode) {
        case "AI":
            document.getElementById("log_info").innerHTML = ai_output(1);

            document.getElementById("custom_confirm_header").innerHTML = "You Lose..";
            document.getElementById("custom_confirm_header").style.color = "red";
            document.getElementById("custom_confirm_str").innerHTML = "Times : " + ai_check_list[0][6] + "<br>start a new game?";
            

            break;
        case "single":
            var num_list = document.getElementsByClassName("answer");
            var finish_words = document.getElementById("turn_information");

            document.getElementById("custom_confirm_header").innerHTML = "Home Run!";
            document.getElementById("custom_confirm_str").innerHTML = "Times : " + player_times + "<br>start a new game?";

            num_list[0].innerHTML = player_check_list[player_check_list.length -1][0];
            num_list[1].innerHTML = player_check_list[player_check_list.length -1][1];
            num_list[2].innerHTML = player_check_list[player_check_list.length -1][2];
            num_list[3].innerHTML = player_check_list[player_check_list.length -1][3];
        
            finish_words.innerHTML = "Home Run!!";

            ai_output(0);

            break;
    }
}

//스트라이크와 볼 정보 점점 지우기
function hide_strike_ball(){
    var strike_ball_container = document.getElementById("strike_ball_container");

    strike_ball_container.style.transition = "opacity 0.5s";
    strike_ball_container.style.opacity = "0";
}
