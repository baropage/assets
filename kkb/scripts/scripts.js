$(document).ready(function(){
    
//서브탭 동작 시작
    //서브탭 퇴장
    $(".mainmenu").click(function(){
        $(".subtab").css("margin-right", 90+"px");
        $(".subtab").removeClass("subtab_active");
        $(".submenu").removeClass("submenu_active");
    });
    //입력정보 서브탭 동작
    $(".nav_input>.mainmenu").click(function(){
        var num=$(this).index();
        $(".subtab_input").eq(num).addClass("subtab_active");
        setTimeout(function(){
            $(".subtab_input").eq(num).css("margin-right", 0+"px");
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
    $(".btn_add").click(function(){
        //daily1_enter
        $(this).parent().siblings(".visit_box").eq(0).append('<div class="visit_group mb-1"><div class="float-left clearfix" style="width: 80%"><div class="input-group input-group-seamless"><div class="input-group-prepend"><div class="input-group-text"><i class="material-icons">edit</i></div></div><input type="text" class="form-control" id="" placeholder="출발지 : 회사명 검색"></div></div><div class="float-left"><button type="submit" class="btn btn-accent"><span><i class="fas fa-search"></i></span></button></div></div>');
        $(this).parent().siblings(".visit_box").eq(1).append('<div class="visit_group mb-1"><div class="float-left clearfix" style="width: 80%"><div class="input-group input-group-seamless"><div class="input-group-prepend"><div class="input-group-text"><i class="material-icons">edit</i></div></div><input type="text" class="form-control" id="" placeholder="경유지 : 농장명 검색"></div></div><div class="float-left"><button type="submit" class="btn btn-accent"><span><i class="fas fa-search"></i></span></button></div></div>');
        
        //daily3_receive
        $(this).parent().siblings(".dongmove_box").eq(0).append('<div class="dongmove_group mb-1"><div class="selbox_group"><select class="selbox form-control"><option value="none" selected>선택</option><option value="1">1동</option><option value="2">2동</option><option value="3">3동</option><option value="direct">직접입력</option></select></div><div class="selboxDirect width_50 input-group input-group-seamless"><div class="input-group-prepend"><div class="input-group-text"><i class="material-icons">edit</i></div></div><input type="text" class="selboxDirectTxt form-control" id=""></div></div>');
        $(this).parent().siblings(".dongmove_box").eq(1).append('<div class="dongmove_group mb-1"><div class="selbox_group"><select class="selbox form-control"><option value="none" selected>선택</option><option value="1">1동</option><option value="2">2동</option><option value="3">3동</option><option value="direct">직접입력</option></select></div><div class="selboxDirect width_50 input-group input-group-seamless"><div class="input-group-prepend"><div class="input-group-text"><i class="material-icons">edit</i></div></div><input type="text" class="selboxDirectTxt form-control" id=""></div></div>');
        $(this).parent().siblings(".dongmove_box").eq(2).append('<div class="dongmove_group mb-1"><div class="input-group"><input type="number" class="form-control" placeholder="0" aria-label="Recipient\'s username" aria-describedby="basic-addon2" value=""></div></div>');
        $(this).parent().siblings(".dongmove_box").eq(3).append('<div class="dongmove_group mb-1"><div class="selbox_group"><select class="selbox form-control"><option value="none" selected>선택</option>{{#each nameSelect}}<option value={{id}}>{{name}}</option>{{/each}}<option value="direct">직접입력</option></select></div><div class="selboxDirect width_50 input-group input-group-seamless"><div class="input-group-prepend"><div class="input-group-text"><i class="material-icons">edit</i></div></div><input type="text" class="selboxDirectTxt form-control" id=""></div></div>');
        
        $(this).parent().siblings(".die_box").eq(0).append('<div class="die_group mb-1"><div class="selbox_group"><select class="selbox form-control"><option value="none" selected>선택</option>{{#each nameSelect}}<option value={{id}}>{{name}}</option>{{/each}}</select></div><div class="selboxDirect width_50 input-group input-group-seamless"><div class="input-group-prepend"><div class="input-group-text"><i class="material-icons">edit</i></div></div><input type="text" class="selboxDirectTxt form-control" id=""></div></div>');
        $(this).parent().siblings(".die_box").eq(1).append('<div class="die_group mb-1"><div class="selbox_group"><select class="selbox form-control"><option value="" selected>도태</option><option value="" >폐사</option></select></div></div>');
        $(this).parent().siblings(".die_box").eq(2).append('<div class="die_group mb-1"><div class="input-group"><input type="number" class="form-control" placeholder="0" aria-label="Recipient\'s username" aria-describedby="basic-addon2" value=""></div></div>');
        $(this).parent().siblings(".die_box").eq(3).append('<div class="die_group mb-1"><div class="selbox_group"><select class="selbox form-control"><option value="none" selected>선택</option>{{#each nameSelect}}<option value={{id}}>{{name}}</option>{{/each}}<option value="direct">직접입력</option></select></div><div class="selboxDirect width_50 input-group input-group-seamless"><div class="input-group-prepend"><div class="input-group-text"><i class="material-icons">edit</i></div></div><input type="text" class="selboxDirectTxt form-control" id=""></div></div>');
        $(this).parent().siblings(".die_box").eq(4).append('<div class="die_group mb-1"><div class="selbox_group"><select class="selbox form-control"><option value="none" selected>선택</option>{{#each nameSelect}}<option value={{id}}>{{name}}</option>{{/each}}<option value="direct">직접입력</option></select></div><div class="selboxDirect width_50 input-group input-group-seamless"><div class="input-group-prepend"><div class="input-group-text"><i class="material-icons">edit</i></div></div><input type="text" class="selboxDirectTxt form-control" id=""></div></div>');
        $(this).parent().siblings(".die_box").eq(5).append('<div class="die_group mb-1"><div class="selbox_group"><select class="selbox form-control"><option value="none" selected>선택</option>{{#each nameSelect}}<option value={{id}}>{{name}}</option>{{/each}}<option value="direct">직접입력</option></select></div><div class="selboxDirect width_50 input-group input-group-seamless"><div class="input-group-prepend"><div class="input-group-text"><i class="material-icons">edit</i></div></div><input type="text" class="selboxDirectTxt form-control" id=""></div></div>');
        
        //daily4_control_use
        $(this).parent().siblings(".medicine_box").eq(0).append('<div class="medicine_group mb-1"><div class="selbox_group"><select class="selbox form-control"><option value="none" selected>자동선택</option>{{#each nameSelect}}<option value={{id}}>{{name}}</option>{{/each}}<option value="direct">직접입력</option></select></div><div class="selboxDirect width_50 input-group input-group-seamless"><div class="input-group-prepend"><div class="input-group-text"><i class="material-icons">edit</i></div></div><input type="text" class="selboxDirectTxt form-control" id=""></div></div>');
        $(this).parent().siblings(".medicine_box").eq(1).append('<div class="medicine_group mb-1"><div class="selbox_group"><select class="selbox form-control"><option value="none" selected>자동선택</option>{{#each nameSelect}}<option value={{id}}>{{name}}</option>{{/each}}<option value="direct">직접입력</option></select></div><div class="selboxDirect width_50 input-group input-group-seamless"><div class="input-group-prepend"><div class="input-group-text"><i class="material-icons">edit</i></div></div><input type="text" class="selboxDirectTxt form-control" id=""></div></div>');
        $(this).parent().siblings(".medicine_box").eq(2).append('<div class="medicine_group input-group mb-1"><input type="number" class="form-control" placeholder="0" aria-label="Recipient\'s username" aria-describedby="basic-addon2" value=""></div>');
        $(this).parent().siblings(".medicine_box").eq(3).append('<div id="sessions-overview-date-range" class="medicine_group input-daterange input-group input-group-sm mb-2" style="max-width: 350px;"><input type="text" class="input-sm form-control" name="start" placeholder="자동입력" id="analytics-overview-sessions-date-range-1" disabled><span class="input-group-append"><span class="input-group-text"><i class="material-icons"></i></span></span></div>');
    });
    
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
    

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
});