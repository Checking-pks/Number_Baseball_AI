var game_mode = "AI";

function option1_select(obj){
    var option1_mode = document.getElementsByClassName("option1_mode");

    for(var i =0;i<option1_mode.length;i++){
        option1_mode[i].style.color = "white";
        option1_mode[i].style.background = "#0b214e00";
    }
    obj.style.color = "#0b214e";
    obj.style.background = "white";
    
    game_mode = obj.innerHTML;
}