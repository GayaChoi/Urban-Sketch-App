$( ".artwork-btn" ).on("click", function() {
    const USER = '<%user%>'.displayName;

    if (USER !== undefined) {
        if (USER.displayName) {
          $( ".alert" ).css("display","none");    
        } 
    } else {
        $( ".alert" ).css("display","block"); 
    }
});