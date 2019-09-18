/* 이미지 업로드 관련 */

const js = document.querySelector('html').classList.add('js');

var fileInput = document.querySelector('.input-file'),    
    button = document.querySelector('.input-file-trigger'),
    the_return = document.querySelector('.file-return');


// 키보드 이벤트가 눌렸을 때 발생
button.addEventListener('keydown', function(event) {
     if (event.keyCode === 13 || event.keyCode === 32) {
         fileInput.focus();
     }
});

// 마우스 이벤트가 눌렸을 때 발생
button.addEventListener('click', function(event) {
     fileInput.focus();
});

// 변경 이벤트
// 버튼을 누를때 마다 파일 이 변경됨
fileInput.addEventListener('change', function(event) {  
    the_return.innerHTML = this.value;  
});