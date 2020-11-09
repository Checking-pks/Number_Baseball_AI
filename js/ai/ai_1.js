
// 4B, 숫자 위치 맞추기용 함수
function ai_four_ball(num) {
    // 문자열로 바꾼 후, 4자리 모든 경우의 수 제작
    var ai_correct_list = ai_permutations(String(num));
    var ai_correct_list_length = ai_correct_list.length + ai_check_list.length;
    
    // 경우의 수 중에 log와 안맞는 수 제거용
    for (var i=0; i<ai_correct_list.length; i++) {
        for (var j=0; j<ai_check_list.length; j++) {
            if (ai_check_list[j].substr(4, 2) != ai_check_home_run(ai_correct_list[i], ai_check_list[j].substr(0, 4), 2)) {
                ai_correct_list.splice(i, 1);
                i--;
                break;
            }
        }
    }
    
    // 남은 수들 걸러내기용       
    while (ai_check_list.length == 0 || ai_check_list[ai_check_list.length-1].substr(4, 2) != "40") {
        ai_check_home_run(ai_correct, ai_correct_list[0], 1);
        ai_correct_list.splice(0, 1);

        for (var i=0; i<ai_correct_list.length; i++) {
            if (ai_check_list[ai_check_list.length-1].substr(4, 2) != ai_check_home_run(ai_correct_list[i], ai_check_list[ai_check_list.length-1].substr(0, 4), 2)) {
                ai_correct_list.splice(i, 1);
                i--;
                continue;
            }
        }

        if (ai_check_list[ai_check_list.length-1][0] == "u") {
            ai_correct_list.splice(ai_check_list.length-1, 1);
        }
    }
}


// AI 실행 함수
function ai_auto() {

    if (ai_times == "2") {
        // 2회까지 한 후 나머지 Right 경우
        if (first_result + second_result === 2) {
            ai_list_right += ai_number_list;
        }
    }
    
    if (ai_times*1 < 2) {   // 2회까지는 확정적 질문 (겹치지 않는 4자리 수 2회 질문)
        // 랜덤 수 질문
        ai_check_home_run(ai_correct, ai_random_number_maker(ai_number_list), 1);

        // ai_check_list에서 질문한 수 제거
        ai_number_list = ai_number_list.replace(ai_check_list[ai_check_list.length-1][0], "").replace(ai_check_list[ai_check_list.length-1][1], "").replace(ai_check_list[ai_check_list.length-1][2], "").replace(ai_check_list[ai_check_list.length-1][3], "");

        // 1회 홈런, 4B 확인용
        if (ai_check_list[ai_check_list.length -1].substr(4, 2) == "40") {
            return;
        } else if (ai_check_list[ai_check_list.length -1][4]*1 + ai_check_list[ai_check_list.length -1][5]*1 == 4) {
            ai_four_ball(ai_check_list[ai_check_list.length -1].substr(0, 4));

            return;
        } 

        // 재귀
        ai_auto();
    } else {

        // 편의용 변수 간략화
        if (ai_check_list[0][4]*1 + ai_check_list[0][5]*1 <= ai_check_list[1][4]*1 + ai_check_list[1][5]*1) {
            // Strike + Ball value
            var first_result = ai_check_list[0][4]*1 + ai_check_list[0][5]*1;
            var second_result = ai_check_list[1][4]*1 + ai_check_list[1][5]*1;
            
            // ai_check_list num
            var first_question = ai_check_list[0].substr(0, 4);
            var second_question = ai_check_list[1].substr(0, 4);
            var rest_num = ai_number_list;
        } else {
            // Strike + Ball value
            var first_result = ai_check_list[1][4]*1 + ai_check_list[1][5]*1;
            var second_result = ai_check_list[0][4]*1 + ai_check_list[0][5]*1;

            // ai_check_list num
            var first_question = ai_check_list[1].substr(0, 4);
            var second_question = ai_check_list[0].substr(0, 4);
            var rest_num = ai_number_list;
        }

        if (first_result === 0 && second_result === 2) {    // first 0b, second 2b, rest 2b
            ai_check_home_run(ai_correct, ai_random_number_maker(rest_num + second_question.substr(2)), 1);

            switch (ai_check_home_run(ai_correct, ai_random_number_maker(rest_num + second_question.substr(2)), 3)) {
                case 2:
                    ai_list_right += second_question.substr(0, 2);

                    break;
                case 4:
                    ai_list_right += second_question.substr(2);

                    break;
                case 3:
                    ai_check_home_run(ai_correct, ai_random_number_maker(rest_num + second_question.substr(1, 2)), 1);

                    switch(ai_check_home_run(ai_correct, ai_random_number_maker(rest_num + second_question.substr(1, 2)), 3)) {
                        case 2:
                            ai_list_right += second_question[0] + second_question[3];

                            break;
                        case 4:
                            ai_list_right += second_question.substr(1, 2);

                            break;
                        case 3:
                            ai_check_home_run(ai_correct, ai_random_number_maker(rest_num + second_question[0] + second_question[2]), 1);

                            switch(ai_check_home_run(ai_correct, ai_random_number_maker(rest_num + second_question[0] + second_question[2]), 3)) {
                                case 2:
                                    ai_list_right += second_question[1] + second_question[3];
                                    
                                    break;
                                case 4:
                                    ai_list_right += second_question[0] + second_question[2];

                                    break;
                            }

                            break;
                    }

                    break;
            }

        } else if (first_result === 0 && second_result === 3) { // first 0b, second 3b, rest 1b
            ai_check_home_run(ai_correct, ai_random_number_maker(rest_num + second_question.substr(2)), 1);

            switch (ai_check_home_run(ai_correct, ai_random_number_maker(rest_num + second_question.substr(2)), 3)) {
                case 2:
                    ai_list_right += second_question.substr(0, 2);

                    ai_check_home_run(ai_correct, ai_random_number_maker(rest_num + second_question.substr(1, 2)), 1);

                    switch (ai_check_home_run(ai_correct, ai_random_number_maker(rest_num + second_question.substr(1, 2)), 3)) {
                        case 2:
                            ai_list_right += second_question[3];

                            ai_check_home_run(ai_correct, ai_random_number_maker(rest_num[0] + second_question.substr(0, 2) + second_question[3]), 1);

                            switch (ai_check_home_run(ai_correct, ai_random_number_maker(rest_num[0] + second_question.substr(0, 2) + second_question[3]), 3)) {
                                case 3:
                                    ai_list_right += rest_num[1];

                                    break;
                                case 4:
                                    ai_list_right += rest_num[0];
                                    
                                    break;
                            }

                            break;
                        case 3:
                            ai_list_right += second_question[2];

                            ai_check_home_run(ai_correct, ai_random_number_maker(rest_num[0] + second_question.substr(0, 3)), 1);

                            switch (ai_check_home_run(ai_correct, ai_random_number_maker(rest_num[0] + second_question.substr(0, 3)), 3)) {
                                case 3:
                                    ai_list_right += rest_num[1];

                                    break;
                                case 4:
                                    ai_list_right += rest_num[0];
                                    
                                    break;
                            }

                            break;
                    }

                    break;
                case 3:
                    ai_list_right += second_question.substr(2);

                    ai_check_home_run(ai_correct, ai_random_number_maker(rest_num + second_question.substr(1, 2)), 1);

                    switch (ai_check_home_run(ai_correct, ai_random_number_maker(rest_num + second_question.substr(1, 2)), 3)) {
                        case 2:
                            ai_list_right += second_question[0];

                            ai_check_home_run(ai_correct, ai_random_number_maker(rest_num[0] + second_question[0] + second_question.substr(2, 2)), 1);

                            switch (ai_check_home_run(ai_correct, ai_random_number_maker(rest_num[0] + second_question[0] + second_question.substr(2, 2)), 3)) {
                                case 3:
                                    ai_list_right += rest_num[1];

                                    break;
                                case 4:
                                    ai_list_right += rest_num[0];
                                    
                                    break;
                            }

                            break;
                        case 3:
                            ai_list_right += second_question[1];

                            ai_check_home_run(ai_correct, ai_random_number_maker(rest_num[0] + second_question.substr(1, 3)), 1);

                            switch (ai_check_home_run(ai_correct, ai_random_number_maker(rest_num[0] + second_question.substr(1, 3)), 3)) {
                                case 3:
                                    ai_list_right += rest_num[1];

                                    break;
                                case 4:
                                    ai_list_right += rest_num[0];
                                    
                                    break;
                            }

                            break;
                    }

                    break;
            }
        } else if (first_result === 1 && second_result === 1) { // first 1b, second 1b, rest 2b
            ai_check_home_run(ai_correct, ai_random_number_maker(rest_num + first_question.substr(0, 2)), 1);

            switch (ai_check_home_run(ai_correct, ai_random_number_maker(rest_num + first_question.substr(0, 2)), 3)) {
                case 2:
                    ai_check_home_run(ai_correct, ai_random_number_maker(rest_num + first_question.substr(1, 2)), 1);

                    switch (ai_check_home_run(ai_correct, ai_random_number_maker(rest_num + first_question.substr(1, 2)), 3)) {
                        case 2:
                            ai_list_right += first_question[3];

                            break;
                        case 3:
                            ai_list_right += first_question[2];

                            break;
                    }

                    break;
                case 3:
                    ai_check_home_run(ai_correct, ai_random_number_maker(rest_num + first_question.substr(1, 2)), 1);

                    switch (ai_check_home_run(ai_correct, ai_random_number_maker(rest_num + first_question.substr(1, 2)), 3)) {
                        case 2:
                            ai_list_right += first_question[0];

                            break;
                        case 3:
                            ai_list_right += first_question[1];

                            break;
                    }

                    break;
            }

            switch (ai_check_home_run(ai_correct, ai_random_number_maker(rest_num + second_question.substr(0, 2)), 3)) {
                case 2:
                    ai_check_home_run(ai_correct, ai_random_number_maker(rest_num + second_question.substr(1, 2)), 1);

                    switch (ai_check_home_run(ai_correct, ai_random_number_maker(rest_num + second_question.substr(1, 2)), 3)) {
                        case 2:
                            ai_list_right += second_question[3];

                            break;
                        case 3:
                            ai_list_right += second_question[2];

                            break;
                    }

                    break;
                case 3:
                    ai_check_home_run(ai_correct, ai_random_number_maker(rest_num + second_question.substr(1, 2)), 1);

                    switch (ai_check_home_run(ai_correct, ai_random_number_maker(rest_num + second_question.substr(1, 2)), 3)) {
                        case 2:
                            ai_list_right += second_question[0];

                            break;
                        case 3:
                            ai_list_right += second_question[1];

                            break;
                    }

                    break;
            }
        } else if (first_result === 1 && second_result === 2) { // first 1b, second 2b, rest 1b

            // second_question 확정 2개 찾기
            ai_check_home_run(ai_correct, ai_random_number_maker(rest_num + second_question.substr(2)), 1);

            switch (ai_check_home_run(ai_correct, ai_random_number_maker(rest_num + second_question.substr(2)), 3)) {
                case 1:
                    ai_list_right += second_question.substr(0, 2);

                    break;
                case 3:
                    ai_list_right += second_question.substr(2);

                    break;
                case 2:
                    ai_check_home_run(ai_correct, ai_random_number_maker(rest_num + second_question.substr(1, 2)), 1);

                    switch (ai_check_home_run(ai_correct, ai_random_number_maker(rest_num + second_question.substr(1, 2)), 3)) {
                        case 1:
                            ai_list_right += second_question[0] + second_question[3];

                            break;
                        case 3:
                            ai_list_right += second_question.substr(1, 2);

                            break;
                        case 2:
                            ai_check_home_run(ai_correct, ai_random_number_maker(rest_num + second_question[0] + second_question[2]), 1);

                            switch (ai_check_home_run(ai_correct, ai_random_number_maker(rest_num + second_question[0] + second_question[2]), 3)) {
                                case 1:
                                    ai_list_right += second_question[1] + second_question[3];

                                    break;
                                case 3:
                                    ai_list_right += second_question[0] + second_question[2];

                                    break;
                            }

                            break;
                    }

                    break;
            }

            // first_question 확정 1개 찾기
            ai_check_home_run(ai_correct, ai_random_number_maker(ai_list_right + first_question.substr(2)), 1);

            switch (ai_check_home_run(ai_correct, ai_random_number_maker(ai_list_right + first_question.substr(2)), 3)) {
                case 2:
                    ai_check_home_run(ai_correct, ai_random_number_maker(ai_list_right + first_question.substr(1, 2)), 1);

                    switch(ai_check_home_run(ai_correct, ai_random_number_maker(ai_list_right + first_question.substr(1, 2)), 3)) {
                        case 2:
                            ai_list_right += first_question[0];

                            break;
                        case 3:
                            ai_list_right += first_question[1];

                            break;
                    }

                    break;
                case 3:
                    ai_check_home_run(ai_correct, ai_random_number_maker(ai_list_right + first_question.substr(1, 2)), 1);

                    switch(ai_check_home_run(ai_correct, ai_random_number_maker(ai_list_right + first_question.substr(1, 2)), 3)) {
                        case 2:
                            ai_list_right += first_question[3];

                            break;
                        case 3:
                            ai_list_right += first_question[2];

                            break;
                    }

                    break;
            }

            // rest_num 확정 1개 찾기
            ai_check_home_run(ai_correct, ai_random_number_maker(ai_list_right + rest_num[0]), 1);

            switch (ai_check_home_run(ai_correct, ai_random_number_maker(ai_list_right + rest_num[0]), 3)) {
                case 3:
                    ai_list_right += rest_num[1];

                    break;
                case 4:
                    ai_list_right += rest_num[0];

                    break;
            }
        } else if (first_result === 1 && second_result === 3) { // first 1b, second 3b, rest 0b

            // second_question 확정 3개 찾기
            ai_check_home_run(ai_correct, ai_random_number_maker(rest_num + second_question.substr(2)), 1);

            switch (ai_check_home_run(ai_correct, ai_random_number_maker(rest_num + second_question.substr(2)), 3)) {
                case 1:
                    ai_list_right += second_question.substr(0, 2);

                    ai_check_home_run(ai_correct, ai_random_number_maker(rest_num[0] + second_question.substr(0, 3)), 1);

                    switch (ai_check_home_run(ai_correct, ai_random_number_maker(rest_num[0] + second_question.substr(0, 3)), 3)) {
                        case 2:
                            ai_list_right += second_question[3];

                            break;
                        case 3:
                            ai_list_right += second_question[2];

                            break;
                    }

                    break;
                case 2:
                    ai_list_right += second_question.substr(2);

                    ai_check_home_run(ai_correct, ai_random_number_maker(rest_num[0] + second_question.substr(1, 3)), 1);

                    switch (ai_check_home_run(ai_correct, ai_random_number_maker(rest_num[0] + second_question.substr(1, 3)), 3)) {
                        case 2:
                            ai_list_right += second_question[0];

                            break;
                        case 3:
                            ai_list_right += second_question[1];

                            break;
                    }

                    break;
            }

            //first_question 확정 1개 찾기
            ai_check_home_run(ai_correct, ai_random_number_maker(ai_list_right.substr(0, 2) + first_question.substr(2)), 1);

            switch (ai_check_home_run(ai_correct, ai_random_number_maker(ai_list_right.substr(0, 2) + first_question.substr(2)), 3)) {
                case 2:
                    ai_check_home_run(ai_correct, ai_random_number_maker(ai_list_right + first_question[0]), 1);

                    switch (ai_check_home_run(ai_correct, ai_random_number_maker(ai_list_right + first_question[0]), 3)) {
                        case 3:
                            ai_list_right += first_question[1];

                            break;
                        case 4:
                            ai_list_right += first_question[0];

                            break;
                    }

                    break;
                case 3:
                    ai_check_home_run(ai_correct, ai_random_number_maker(ai_list_right + first_question[2]), 1);

                    switch (ai_check_home_run(ai_correct, ai_random_number_maker(ai_list_right + first_question[2]), 3)) {
                        case 3:
                            ai_list_right += first_question[3];

                            break;
                        case 4:
                            ai_list_right += first_question[2];

                            break;
                    }

                    break;
            }
        } else if (first_result === 2 && second_result === 2) { // first 2b, second 2b, rest 0b

            //first_question 확정 2개 찾기
            ai_check_home_run(ai_correct, ai_random_number_maker(rest_num + first_question.substr(2)), 1);

            switch (ai_check_home_run(ai_correct, ai_random_number_maker(rest_num + first_question.substr(2)), 3)) {
                case 0:
                    ai_list_right += first_question.substr(0, 2);

                    break;
                case 2:
                    ai_list_right += first_question.substr(2);

                    break;
                case 1:
                    ai_check_home_run(ai_correct, ai_random_number_maker(rest_num + first_question.substr(1, 2)), 1);

                    switch(ai_check_home_run(ai_correct, ai_random_number_maker(rest_num + first_question.substr(1, 2)), 3)) {
                        case 0:
                            ai_list_right += first_question[0] + first_question[3];

                            break;
                        case 2:
                            ai_list_right += first_question.substr(1, 2);

                            break;
                        case 1:
                            ai_check_home_run(ai_correct, ai_random_number_maker(rest_num + first_question[0] + first_question[2]), 1);

                            switch(ai_check_home_run(ai_correct, ai_random_number_maker(rest_num + first_question[0] + first_question[2]), 3)) {
                                case 0:
                                    ai_list_right += first_question[1] + first_question[3];
                                    
                                    break;
                                case 2:
                                    ai_list_right += first_question[0] + first_question[2];

                                    break;
                            }

                            break;
                    }

                    break;
            }

            //second_question 확정 2개 찾기
            ai_check_home_run(ai_correct, ai_random_number_maker(ai_list_right + second_question.substr(2)), 1);

            switch (ai_check_home_run(ai_correct, ai_random_number_maker(ai_list_right + second_question.substr(2)), 3)) {
                case 2:
                    ai_list_right += second_question.substr(0, 2);

                    break;
                case 4:
                    ai_list_right += second_question.substr(2);

                    break;
                case 3:
                    ai_check_home_run(ai_correct, ai_random_number_maker(ai_list_right + second_question.substr(1, 2)), 1);

                    switch(ai_check_home_run(ai_correct, ai_random_number_maker(ai_list_right + second_question.substr(1, 2)), 3)) {
                        case 2:
                            ai_list_right += second_question[0] + second_question[3];

                            break;
                        case 4:
                            ai_list_right += second_question.substr(1, 2);

                            break;
                        case 3:
                            ai_check_home_run(ai_correct, ai_random_number_maker(ai_list_right + second_question[0] + second_question[2]), 1);

                            switch(ai_check_home_run(ai_correct, ai_random_number_maker(ai_list_right + second_question[0] + second_question[2]), 3)) {
                                case 2:
                                    ai_list_right += second_question[1] + second_question[3];
                                    
                                    break;
                                case 4:
                                    ai_list_right += second_question[0] + second_question[2];

                                    break;
                            }

                            break;
                    }

                    break;
            }
        }

        if (ai_check_list[ai_check_list.length -1].substr(4, 2) != "40") ;ai_four_ball(ai_list_right);
    }
}