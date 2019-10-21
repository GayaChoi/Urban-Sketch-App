$(document).ready(function() {
    for (var i = 0;i < 10;i++) {
       if (window.location.pathname == `/post/pageId=${i}` || window.location.pathname == `/post/pageId=${i}/`) {
          $( "a.popupImage").attr("href",`/Assets/image/${i}.jpg`);
          $( ".popupImage img" ).attr("src",`/Assets/image/${i}.jpg`);
       } 
    } 
});

$( window ).on("load",function() {
     $( ".post-wrap" ).css("display","block");
     $( "#mainContents" ).css("display","block");
     $( "#mainContents" ).css("visibility","visible");
     $( ".alert" ).css("dislay","none");  
});