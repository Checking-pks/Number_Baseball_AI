Number_Baseball_A
================

# File list

## 1. html 파일
- index .html    : 기본 베이스 html 파일

## 2. css 파일
- reset.css     : 기본 베이스 css 파일
- lobby.css     : lobby 화면용 css파일
- option.css    : option 화면용 css파일
- ingame.css    : 인게임 화면용 css파일

## 3. js 파일
- lobby.js      : lobby 화면용 js파일
- option.js     : option 화면용 js파일
- easter_egg.js : 이스터에그용 js파일
- in_game.js    : 인게임 화면용 js파일
- base_ai.js    : AI 함수의 basic function js파일
- ai_1.js       : 숫자 4개 AI js파일

## 4. font 파일
- baseball_font.ttf     : (출처)
https://www.fontspace.com/old-sport-athletic-font-f29866

<hr>

# Function list
### base_ai.js

* ai_new_correct()
	game play에 필요한 변수들을 초기화하는 함수
	<hr>

*  ai_swapstr(str, first, second)
	문자열 위치 변환용 함수 (swap)
	- str : 변환할 문자열
	- first : 변환할 문자 위치 1 (index)
	- second : 변환할 문자 위치 2 (index)
	<hr>
                
* ai_permutations(string)
	문자열로 만들 수 있는 모든 경우의 수를 만드는 함수
	- string : 경우의 수를 만들 문자열
	<hr>

* ai_random_number_maker(str)
	문자열을 랜덤한 순서로 뒤섞어 4자리수를 리턴하는 함수
	- str : 섞을 문자열
	<hr>
                
* ai_check_home_run(correct, num, mode)
	받은 두 문자열의 같은 문자열을 판별하여 출력하는 함수
	- correct : 정답 문자열
	- num : 질문 문자열
	- mode : 리턴 모드 (1, 2, 3)
		- 1 : 출력용, 결과를 ai_check_list에 push한다.
		- 2 : 확인용, String(strike) + String(ball)을 리턴한다. (ex "12" _ 1S 2B)
		- 3 : 확인용, strike + ball (ex "3" _ 동일한 숫자의 개수가 3개이다.)
	<hr>

*  ai_output()
	ai_check_list에 저장된 결과 출력 함수 (First In Last Out 형태)
	
<hr>

### ai_1.js
- ai_auto()
	ai_correct를 맞추는 질문들을 자동으로 ai_number_list에 저장한다.
	<hr>
        
- ai_four_ball(num)
	ai_correct와 num이 숫자는 같으나 순서가 다를 경우 실행하는 용도. (순서를 맞춰준다.)
	- num : 순서는 다르나 존재하는 숫자가 같은 숫자 문자열
<hr>
    
### easter_egg.js
- easter_background()
	배경색을 변경시키는 이스터에그용 함수
<hr>

### lobby.js
- option_button()
	옵션화면을 보이게 하고 애니메이션 효과를 주는 함수
	<hr>
	
- option_out()
	로비화면으로 돌아가게 하는 함수
	<hr>
	
- play_button()
	플레이화면을 보이게 하고 게암플레이에 필요한 변수등을 초기화 시키는 함수
	<hr>

- play_out()
	로비화면으로 돌아가게 하는 함수
	<hr>
            
- play_button_move()
	option_button_move()
	play_button_restore()
	back_button_move()
    back_button_restore()
	로비와 설정화면의 버튼들 동적 효과를 위한 함수
<hr>
	
### in_game.js    
- key_pad_on()
	화면에 키패드를 보이게하는 함수
	<hr>
	
- log_on()
	화면에 로그화면을 보이게하는 함수
	<hr>
	
- replay_button()
	게임화면의 우측상단 아이콘을 클릭했을때 새로운 게임을 로드하는 함수
	<hr>

- replay_animation()
	replay_button()실행시 박스들에 동적 효과를 주는 함수
    <hr>
        
- answer_focus_manual(obj)
	정답 박스에 수동으로 포커스를 주기위한 함수
	- obj : this, 클릭되는 정답박스 객체
	<hr>
        
-	answer_focus_auto()
	정답 박스에 자동으로 포커스를 주기위한 함수
	함수 실행시 포커스가 다음 박스객체로 넘어가게 된다.
	<hr>

- put(obj)
	정답 박스에 클릭된 키패드버튼의 숫자를 표시하는 함수
	0~9까지의 숫자들에게 적용되어 있다.
	- obj : 클릭되는 키패드버튼
	<hr>
	
- new_game()
	정답박스의 포커스를 첫번째박스로 바꾸고 ai변수 초기화 하는 함수
<hr>
