const pageImg = $(".figure-page-img");      

for(let index = 0;index < pageImg.length;index++) {
     pageImg.eq(index).click(function() {
          window.history.pushState("","",`/gallery/pageId=${index}`);        
          window.location.reload();
    });
}

window.addEventListener('popstate', function() {
        window.location.reload(); 
});