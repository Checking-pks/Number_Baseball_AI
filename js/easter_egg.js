var logo_click_num = 0; //로고 클릭횟수를 알기위한 전역변수

function easter_background(){
    logo_click_num++;

    //켜기
    if(logo_click_num == 10){
        document.getElementById("body").style.background = "linear-gradient(135deg, #0b214e 0%, #4e0b0e 100%)";
        document.getElementById("option").style.background = "linear-gradient(135deg, #0b214e 0%, #4e0b0e 100%)";
        document.getElementById("in_game").style.background = "linear-gradient(135deg, #0b214e 0%, #4e0b0e 100%)";
    }
    //끄기
    else if(logo_click_num == 15){
        document.getElementById("body").style.background = "linear-gradient(135deg, #0b214e 100%, #4e0b0e 100%)";
        document.getElementById("option").style.background = "linear-gradient(135deg, #0b214e 100%, #4e0b0e 100%)";
        document.getElementById("in_game").style.background = "linear-gradient(135deg, #0b214e 100%, #4e0b0e 100%)";

        logo_click_num = 0;
    }
} 
