/* 메인 에 관련 된 기능 */

const banner = $('#banner'); 
      left = $('#side_left');
      contents = $('#contents');
      right = $('#side_right');
      nav = $('#nav a span');      


if (window.location.pathname === '/' || window.location.pathname === '/index.html') { // 사용자가 메인 페이지 에 접근할 경우
    nav.eq(0).css('color','#000000');
} else if (window.location.pathname === '/login') { // 사용자가 로그인 페이지 에 접근할 경우
   nav.eq(2).css('color','#000000');
   banner.css('height','750px');
} else if (window.location.pathname === '/look') { // 사용자가 구경하기 페이지 에 접근할 경우
   nav.eq(4).css('color','#000000');
   banner.css('height','750px');
} else if (window.location.pathname === '/share') { // 사용자가 공유하기 페이지 에 접근할 경우
    nav.eq(6).css('color','#000000');
    banner.css('height','750px');
} else {
   // TODO: error 페이지 로 이동
}




