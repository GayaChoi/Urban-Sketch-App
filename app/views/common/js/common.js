/* 각 페이지 메인 을 설정 하는 기능 */

const nav = $('#nav a span'); 
       

/* 링크 제어 */
if (window.location.pathname === '/' || window.location.pathname === '/index.html') { // 사용자가 메인 페이지 에 접근할 경우
    nav.eq(0).css("color","#000000");
} else if (window.location.pathname === '/add' || window.location.pathname === '/add/') { // 사용자가 로그인 페이지 에 접근할 경우
    nav.eq(2).css("color","#000000");
} else if (window.location.pathname === '/gallery' || window.location.pathname === '/gallery/') { // 사용자가 구경하기 페이지 에 접근할 경우
    nav.eq(4).css("color","#000000");
} else { // 그 외 의 페이지 에 접근 할 경우
    nav.eq(4).css("color","#000000");
}

