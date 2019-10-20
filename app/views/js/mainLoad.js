/* 메인 페이지 로드  */

$(document).ready(function() {
    const path = {
        '0': { 'img':'/Assets/image/0.jpg','contents':'test1' },
        '1': { 'img':'/Assets/image/1.jpg','contents':'test2' },
        '2': { 'img':'/Assets/image/2.jpg','contents':'test3' },
        '3': { 'img':'/Assets/image/3.jpg','contents':'test4' },
        '4': { 'img':'/Assets/image/4.jpg','contents':'test5' },
        '5': { 'img':'/Assets/image/5.jpg','contents':'test6' },
        '6': { 'img':'/Assets/image/6.jpg','contents':'test7' },
        '7': { 'img':'/Assets/image/7.jpg','contents':'test8' },
        '8': { 'img':'/Assets/image/8.jpg','contents':'test9' },
        '9': { 'img':'/Assets/image/9.jpg','contents':'test10' }
    };

    $( "figure.columns-img" ).each(function( index ) {
        $( "figure.columns-img" ).eq( index ).html(
            `<a href=/post/pageId=${index}>
                <img src=${path[index].img}>
            </a>
            <figcaption>${path[index].contents}</figcaption>`
        );
    });
});

$( window ).on('load',function() {
    $( "#banner" ).css("visibility","visible");
    $( ".columns figure" ).css("visibility","visible");
    $( "#mainContents" ).css("display","block");
});