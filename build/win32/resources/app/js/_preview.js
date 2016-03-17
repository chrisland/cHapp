
var _preview = {
  init: function () {

    console.log('preview init');

    /*Only needed for the controls*/
    var iframe = document.getElementById("editor.pages.preview.webview");
    var phone = document.getElementById("editor.pages.preview.phone_1");

    _preview.updateIframe(phone);
    _preview.events(phone, iframe);


     if (iframe.attachEvent){
         iframe.attachEvent("onload", function(){
             _preview.afterLoading(phone);
         });
     } else {
         iframe.onload = function(){
             _preview.afterLoading(phone);
         };
     }

  },
  events: function (phone, iframe) {



    document.getElementById("editor.pages.preview.views").addEventListener("click", function(evt) {
      console.log('views click');
      _preview.updateView(evt.target.value, phone);
    });

    document.getElementById("editor.pages.preview.phones").addEventListener("click", function(evt) {

      console.log('phone click');

      if(evt.target.value == 1){
        // iphone 6
        width = 375;
        height = 667;
      }

      if(evt.target.value == 2){
        // samsung
        width = 400;
        height = 640;
      }

      if(evt.target.value == 3){
        // microsoft
        width = 320;
        height = 480;
      }

      if(evt.target.value == 4){
        // htc
        width = 360;
        height = 640;
      }

      if(evt.target.value == 5){
        // ipad mini
        width = 768;
        height = 1024;
      }

      phone.style.width = width + "px";
      phone.style.height = height + "px";

      iframe.style.width = width + "px";
      iframe.style.height = height + "px";

      iframe.minwidth = width;
      iframe.minheight = height;

    });

  },
  updateIframe: function (phone) {

    console.log('updateIframe',phone);

    // preload iphone width and height
    phone.style.width = "375px";
    phone.style.height = "667px";



  },
  updateView: function (view, phone) {
    console.log('updateView',view,phone);
    if (view) {
      phone.className = "phone view_" + view;
    }
  },
  afterLoading: function (phone){
      console.log('afterLoading',phone);
      setTimeout(function() {
          phone.className = "phone view_1";
          setTimeout(function() {
              // do second thing
              phone.className = "phone view_1 rotate";
          }, 1000);
      }, 1000);

  }


};
