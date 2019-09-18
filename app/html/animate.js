  /* 메인 페이지 컨텐츠 텍스트 애니메이션 */

   var words = document.getElementsByClassName('word');
   var wordArray = [];
   var currentWord = 0;
   
   words[currentWord].style.opacity = 1; // word 클래스를 불러와 투명도 에 의해 숨겼던 텍스트에 투명도를 준다.
   
   
   function animateLetterOut(cw, i) {
     setTimeout(function() {
           cw[i].className = 'letter out'; 
     }, i * 80); // 글자의 인덱스 만큼 0.08초 움직임 즉,순서대로 빠르게 -> 천천히 움직임 
   }
   
   function animateLetterIn(nw, i) {
     setTimeout(function() {
           nw[i].className = 'letter in';
     }, 340 + (i * 80));
   }
   
   function splitLetters(word) {
     var content = word.innerHTML; // 원본 을 복사하여 content 에 할당한다.
     word.innerHTML = ''; // 원본 내용 을 지운다.
     var letters = [];
     
     
     for (var i = 0; i < content.length; i++) {
       var letter = document.createElement('span'); // 원본크기 만큼 span 태그를 생성한다.
       letter.className = 'letter'; // 특정 문자 에 애니메이션을 주는 클래스를 추가해준다.
       letter.innerHTML = content.charAt(i); // 문자 하나당 letter 클래스의 애니메이션을 부여한다.
       word.appendChild(letter); // 기존에 있던 내용에 덮어써준다.
       letters.push(letter); // letters 에 넣어준다.
     }
     
     wordArray.push(letters); // 새로운 내용을 전역배열 에 넣어준다.
   }
   
   
   for (var i = 0; i < words.length; i++) { // word 클래스 길이만큼 해당 함수를 호출한다.
     splitLetters(words[i]);
   }
   
   
   function changeWord() { 
     var cw = wordArray[currentWord];
     var nw = currentWord == words.length - 1 ? wordArray[0] : wordArray[currentWord + 1]; 
   
     for (var i = 0; i < cw.length; i++) { // 문자열 의 크기 만큼 함수를 호출
       animateLetterOut(cw, i); // 문자열,인덱스 를 함수에 전달
     }
     
     for (var i = 0; i < nw.length; i++) { // letter out 클래스 를 적용한 문자열 의 길이 만큼 
       nw[i].className = 'letter behind'; // 글자가 위에서 아래로 변형 되는 모션의 클래스 를 삽입
       nw[0].parentElement.style.opacity = 1; // 가장 먼저 앞에 있는 글자 부터 뒤에 까지 보이게 함.
       animateLetterIn(nw, i);
     }
     
     currentWord = (currentWord == wordArray.length - 1) ? 0 : currentWord + 1; // 다음 문자로 넘어감
   }
     changeWord();
     setInterval(changeWord, 4000); // changeWord 가 호출스택 에서 함수 를 마치게 되면 실행,콜백으로 전달,4초 마다 작동 됨