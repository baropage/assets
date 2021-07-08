(function(){
//서브탭 동작 시작
    //서브탭 퇴장
    $(".mainmenu").click(function(){
        $(".subtab").css("margin-right", 90+"px");
        $(".subtab").removeClass("subtab_active");
        $(".submenu").removeClass("submenu_active");
        $(".mainmenu").find("a").removeClass("active");
    });
    //입력정보 서브탭 동작
    $(".nav_input>.mainmenu").click(function(){
        var menuId=$(this).attr("menu_id");
        $(this).find("a").addClass("active");
        var subTab=$(".subtab").filter("[menu_target='"+menuId+"']");
        subTab.addClass("subtab_active");
        setTimeout(function(){
            subTab.css("margin-right", 0+"px");
        });
    });
    //출력정보 서브탭 동작
    $(".nav_output>.mainmenu").click(function(){
        var num=$(this).index();
        $(".subtab_output").eq(num).addClass("subtab_active");
        setTimeout(function(){
            $(".subtab_output").eq(num).css("margin-right", 0+"px");
        });
    });
//서브탭 동작 끝
    
    //서브메뉴(아이콘) 동작
    $(".submenu").click(function(){
        $(".submenu").removeClass("submenu_active");
        $(this).addClass("submenu_active");
    });    
    //dropdown 동작
    var slideConfig = {
        duration: 270,
        easing: 'easeOutSine'
    }; // Add dropdown animations when toggled.
    
    $(':not(.main-sidebar--icons-only) .dropdown').on('show.bs.dropdown', function() {
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown(slideConfig);
    });
    $(':not(.main-sidebar--icons-only) .dropdown').on('hide.bs.dropdown', function() {
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp(slideConfig);
    }); // Sidebar toggle functionality.
    
    $('.toggle-sidebar').click(function(e) {
        $('.main-sidebar').toggleClass('open');
    }); // Apply dynamic scroll to sidebar nav wrapper
    
    
    function handleSidebarHeightCheck() {
        var $navWrapper = $('.nav-wrapper');
        var height = $navWrapper.height();
        var scrollHeight = $navWrapper[0].scrollHeight;
        if (scrollHeight > height) {
            $navWrapper.css('overflowY', 'auto');
            return;
        }
        $navWrapper.css('overflowY', 'none');
    }
    handleSidebarHeightCheck();
    $(window).resize(handleSidebarHeightCheck);
    
    //탭 동작
    $(".whole_tab>label").click(function(){
        $(".whole_tab_cont").removeClass("whole_tab_cont_active");
        var num=$(this).index();
        $(".whole_tab_cont").eq(num).addClass("whole_tab_cont_active");
    });
    
    //라디오 버튼 탭 동작
    $(".radi_btn").click(function(){
        $(this).parents(".radio_group").find(".radio_tab").removeClass("radio_active");
        var num = $(this).parent().index();
        $(this).parents(".radio_group").find(".radio_tab").eq(num).addClass("radio_active");
    });
    
//셀렉트 직접입력 시작
    //한줄에 두칸
    $(document).on("change",".selbox", function(){
        if($(this).val()=="direct"){
            //직접입력선택시 한줄에 .selbox와 .selboxDirect 넣기
            $(this).parent(".selbox_group").css("display","inline-block");
            $(this).parent(".selbox_group").css("float","left");
            $(this).parent().parent().find(".selboxDirect").show();
        }else{
            $(this).parent().parent().find(".selboxDirect").hide();
            $(this).parent(".selbox_group").css("display","block");
            $(this).parent(".selbox_group").css("float","none");
        }
    });
    //한줄에 한칸씩
    $(document).on("change",".selbox2", function(){
        if($(this).val()=="direct"){
            //직접입력선택시 .selbox2 아래에 .selboxDirect 넣기
            $(this).parent().find(".selboxDirect").show();
        }else{
            $(this).parent().find(".selboxDirect").hide();
        }
    });
//셀렉트 직접입력 끝
    
//#daily1_enter 차량번호 직접입력 선택시 축산차량등록번호도 활성화
    $(document).on("change","#animal_car_num", function(){
        if($(this).val()=="direct"){
            $("#animal_car_registered").hide();
            $("#animal_car_unregistered").show();
        }else{
            $("#animal_car_unregistered").hide();
            $("#animal_car_registered").show();
        }
    });
    
    
//+-버튼 동작
    //+버튼 클릭시 입력행 추가, 모바일 대응으로 eq(0)~eq(n) 각각 입력

    
    //-버튼 클릭시 마지막 행 제거
    $(".btn_remove").click(function(){
        //daily1_enter
        var cnt=$(this).parent().siblings().children(".visit_group").length;
        if(cnt>2){
            $(".visit_box").eq(0).children(".visit_group:last").remove();
            $(".visit_box").eq(1).children(".visit_group:last").remove();
        }
        
        //daily3_receive
        var cnt=$(this).parent().siblings().children(".dongmove_group").length;
        if(cnt>4){
            $(".dongmove_box").eq(0).children(".dongmove_group:last").remove();
            $(".dongmove_box").eq(1).children(".dongmove_group:last").remove();
            $(".dongmove_box").eq(2).children(".dongmove_group:last").remove();
            $(".dongmove_box").eq(3).children(".dongmove_group:last").remove();
        }
        
        var cnt=$(this).parent().siblings().children(".die_group").length;
        if(cnt>6){
            $(".die_box").eq(0).children(".die_group:last").remove();
            $(".die_box").eq(1).children(".die_group:last").remove();
            $(".die_box").eq(2).children(".die_group:last").remove();
            $(".die_box").eq(3).children(".die_group:last").remove();
            $(".die_box").eq(4).children(".die_group:last").remove();
            $(".die_box").eq(5).children(".die_group:last").remove();
        }
        
        //daily4_control_use
        var cnt=$(this).parent().siblings().children(".medicine_group").length;
        if(cnt>4){
            $(".medicine_box").eq(0).children(".medicine_group:last").remove();
            $(".medicine_box").eq(1).children(".medicine_group:last").remove();
            $(".medicine_box").eq(2).children(".medicine_group:last").remove();
            $(".medicine_box").eq(3).children(".medicine_group:last").remove();
        }
        
    });

})();