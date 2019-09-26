/* 판매하기 팝업 창 제어 */

const column_img = $('figure a img');


column_img.click(function() {
    var windowObjectReference;
    
    function openRequestedPopup() {
        windowObjectReference = window.open("/saleInfo", "window_saleInfo",'width=1000,height=1000');
    }

    openRequestedPopup();

});