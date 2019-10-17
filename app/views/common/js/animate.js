const row = $(".first-row");
      artList = $(".artwork-list");
      artLink = $(".artwork-link");
      saleLink = $(".sale-img-link");
      line = $(".line-h");


row.hover(
  function() {
      $(this).addClass("expanded");
  }, function() {
      $(this).removeClass("expanded");
  }
);

artList.hover(
   function() {
      $(this).addClass("selected");
   }, function() {
      $(this).removeClass("selected");
   } 
);

artLink.hover(
   function() {
      $(this).css({
          "text-decoration": "underline",
          "color": "#333333"
      });
   }, function() {
      $(this).css("text-decoration","none");
   }
);

saleLink.hover(
   function() {
     $(".sale-outline").addClass("img-hover");   
   }, function() {
      $(".sale-outline").removeClass("img-hover");
   }
);

line.css("width","270px");
 