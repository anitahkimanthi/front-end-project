$(function() {
    
    //var $('#login-form') = $('#login-form');
    //var $('#lost-form') = $('#lost-form');
    //var $('#register-form') = $('#register-form');
    //var $('#div-forms') = $('#div-forms');
    var modalAnimateTime = 300;
    var msgAnimateTime = 150;
    var msgShowTime = 2000;

        
    $(document).on('click', '#login_register_btn', function () {
        $("#img_logo").attr("src", "/static/exams/images/signup1.png");
        modalAnimate($('#login-form'), $('#register-form'));
        });
    $(document).on('click', '#register_login_btn', function () {
        $("#img_logo").attr("src", "/static/exams/images/unlock.png");
        modalAnimate($('#register-form'), $('#login-form'));
        });
    $(document).on('click', '#login_lost_btn', function () {
        $("#img_logo").attr("src", "/static/exams/images/unlock.png");
        modalAnimate($('#login-form'), $('#lost-form'));
        });
    $(document).on('click', '#lost_login_btn',function () {
        $("#img_logo").attr("src", "/static/exams/images/unlock.png");
        modalAnimate($('#lost-form'), $('#login-form'));
        });
    $(document).on('click','#lost_register_btn', function () {
        $("#img_logo").attr("src", "/static/exams/images/unlock.png");
        modalAnimate($('#lost-form'), $('#register-form'));
        });
    $(document).on('click', '#register_lost_btn', function () {
        $("#img_logo").attr("src", "/static/exams/images/unlock.png");
        modalAnimate($('#register-form'), $('#lost-form'));
        });
    
    function modalAnimate (oldForm, newForm) {
        var oldH = oldForm.height();
        var newH = newForm.height();
        $('#div-forms').css("height",oldH);
        oldForm.fadeToggle(modalAnimateTime, function(){
            $('#div-forms').animate({height: newH}, modalAnimateTime, function(){
                newForm.fadeToggle(modalAnimateTime);
            });
        });
    }
    
    function msgFade (msgId, msgText) {
        msgId.fadeOut(msgAnimateTime, function() {
            $(this).text(msgText).fadeIn(msgAnimateTime);
        });
    }
    
    function msgChange(divTag, iconTag, textTag, divClass, iconClass, msgText) {
        var msgOld = divTag.text();
        msgFade(textTag, msgText);
        divTag.addClass(divClass);
        iconTag.removeClass("glyphicon-chevron-right");
        iconTag.addClass(iconClass + " " + divClass);
        setTimeout(function() {
            msgFade(textTag, msgOld);
            divTag.removeClass(divClass);
            iconTag.addClass("glyphicon-chevron-right");
            iconTag.removeClass(iconClass + " " + divClass);
  		}, msgShowTime);
    }
    
    $(document).on('submit', '#lost-form', function(e){
        
        e.preventDefault();
        
        $.ajax({
            type: 'POST',
            
            url: 'auth/password/reset/',
            
            data: {
                'email': $('#lost_email').val(),
            },
            dataType: 'json',
            success: function(){
                //$('#div-lost-msg').css('color', '#303030');
                //$('#div-forms').css('height', 'auto');
                //$('#text-lost-msg').html("An e-mail has been sent to &nbsp;" + $('#lost_email').val());
                $('#login-modal').modal('toggle');
                toastr.options = {
                    "closeButton": true,
                    "debug": true,
                    "newestOnTop": true,
                    "progressBar": true,
                    "positionClass": "toast-top-center",
                    "preventDuplicates": true,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": 0,
                    "extendedTimeOut": 0,
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut",
                    "tapToDismiss": true
                  };
                    toastr.info('An e-mail has been sent to &nbsp;'+$('#lost_email').val());
            },
            error: function(response){
                console.log(response);
            }
            
            });
        
        });
    
});