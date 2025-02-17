function member_join() {

    html = '<div class="container_m paget"> ' +
    '<h2>회원가입</h2>' +
    '<form action="#" method="post"> ' +
    '    <div> '+
    '        <label for="userid">아이디:</label>'+
    '        <input type="text" id="userid" name="userid" required>'+
    '        <label for="password">패스워드:</label>'+
    '        <input type="password" id="password" name="password" required>'+
    '        <label for="password_confirm">패스워드 확인:</label>'+
    '        <input type="password" id="password_confirm" name="password_confirm" required>'+
    '        <label for="phone">핸드폰 번호:</label>'+
    '        <input type="text" id="phone" name="phone" pattern="[0-9]{11}" placeholder="01012341234" required>'+
    '    </div> ' +
    '    <div> ' +
    '        <label>관심 언어:</label>' +
    '        <input type="checkbox" id="java" name="language" value="java">' +
    '        <label for="java">자바</label>' +
    '        <input type="checkbox" id="oracle" name="language" value="oracle">' +
    '        <label for="oracle">오라클</label>' +
    '        <input type="checkbox" id="html" name="language" value="html">' +
    '        <label for="html">HTML</label>' +
    '        <input type="checkbox" id="python" name="language" value="python">' +
    '        <label for="python">Python</label> '+
    '    </div> '+
    '    <div> ' +
    '    <label>성별:</label>' +
    '        <input type="radio" id="male" name="gender" value="male" required>' +
    '        <label for="male">남성</label>' +
    '        <input type="radio" id="female" name="gender" value="female" required>' +
    '        <label for="female">여성</label>' +
    '    </div> ' +
    '</form> ' +
    '<button class="mem_button" onclick="mem_submit();" >가입하기</button> '+
    ' </div>';

    Swal.fire({
        html: html,
        allowOutsideClick: false,  
        showCancelButton: false,
        showConfirmButton: false
      });
}

// <button class="chat_button" id="member_join" onclick="member_join();" style="display: none;">회원가입</button>
// <button class="chat_button" id="member_join" onclick="Login();" style="">로그인테스트</button> 
// <button class="chat_button" id="google-login-button">Google 로그인</button>
// <button class="chat_button" id="anonymous-login-button">익명 로그인</button>


function mem_login(){

        html = '<div class="mem_body">' +
       ' <div class="mem_container">' +
       ' <h2 class="mem_title">로그인</h2>' +
       ' <div class="mem_button-group">' +
       '     <button onclick="gLogin();"  class="mem_google-btn">구글 로그인</button>' +
       '     <button onclick="anyLogin();" id="anonymous-login-button" class="mem_anonymous-btn">익명 로그인</button>' +
       ' </div>' +
       ' <div class="mem_input-group">' +
       '     <input type="text" placeholder="이름 입력" id="mem_userid" class="mem_input">' +
       ' </div>' +
       ' <div class="mem_input-group">' +
       '     <input type="password" placeholder="패스워드 입력" id="mem_userpwd" onkeyup="handleKeyPress(event);" class="mem_input">' +
       ' </div>' +
       ' <button class="mem_login-btn" onclick="mem_Login();" >로그인</button> '+
       ' <p class="mem_signup-text"> '+
       '     계정이 없으신가요? <a href="javascript:member_join();" class="mem_signup-link">회원가입</a> ' 
       ' </p> ' 
       ' </div> ' 
       '</div> ' 


       Swal.fire({
        html: html,
        allowOutsideClick: false,  
        showCancelButton: false,
        showConfirmButton: false
      });
}

function handleKeyPress(event) {
    if (event.keyCode === 13) { // 13은 엔터 키의 키코드입니다.
        mem_Login();
    }
}

function mem_submit() {

    var special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;

    let id           = $('#userid').val();
    let password     = $('#password').val();
    let password_chk = $('#password_confirm').val();
    let phone        = $('#phone').val();
    let language     = "";

    $('input:checkbox[name="language"]').each(function() {
        if(this.checked){
            language += this.value + ";"
        }
    });

    let gender       = $("input:radio[name='gender']:checked").val();

    console.log(language);
    console.log(gender);

    if ( id.length < 4  ) {
        //swal_msg("아이디 입력 에러","아이디 4글자 이상으로 입력","error");   
        toastr.error('아이디 4글자 이상으로 입력', '아이디 입력 에러');
        return;
    }
    
    if ( password.length < 6  ) {
        //swal_msg("패스워드 입력 에러"," 패스워드 6글자 이상으로 입력","error" );
        toastr.error('패스워드 6글자 이상으로 입력', '패스워드 입력 에러');
        return;
    }
    
    if ( password != password_chk ) {
        //swal_msg("패스워드 입력 에러","2개의 패스워드 일치하지 않음","error" );
        toastr.error('2개의 패스워드 일치하지 않음', '패스워드 입력 에러');
        return;
    }

    if (password.search(special_pattern) < 0 ) {
        //swal_msg("패스워드 입력 에러","패스워드 특수문자 포함되지않음","error" );
        toastr.error('패스워드 특수문자 포함되지않음', '패스워드 입력 에러');

        return;
    }

    if ( phone.length != 11  ) {
       //swal_msg("전화번호 입력 에러","전화번호 반드시 11글자로 입력(010XXXXXXXX)","error" );
       toastr.error('전화번호 반드시 11글자로 입력(010XXXXXXXX)', '전화번호 입력 에러');
       return;
    }

    if (typeof language == "undefined" || language == null || language == "") {
        // swal_confirm("관심언어를 선택하지 않았습니다 그대로 진행하시겠습니까?", "warning", "", "return;");
        //warning
        if(confirm("관심언어를 선택하지 않았습니다 그대로 진행하시겠습니까?")){
        }else{
            return;
        }
        
    }

    if (typeof gender == "undefined" || gender == null || gender == "") {
        //swal_msg("성별 입력 에러","성별 선택하지 않음" ,"error");
        toastr.error('성별 선택하지 않음', '성별 입력 에러');

        return;
    }
    //(userid,pwd,hp,hobby,gender,sysdate)
    window.module.addmember(id, password,phone,language,gender);

}


async function LoginModule(userid,pwd) {
    // let count = await window.module.countdata();

    let data = await window.module.getmember(userid,pwd);
    console.log(data);
    
    if (!(typeof data == "undefined" || data == null || data == "")) {
        localStorage.setItem("nickname", data[0].userid);
        swal_msg('','로그인 성공!','info');
        window.module.user_login(); 
    } else {
        toastr.error('아이디 또는 패스워드를 확인해 주세요.', '로그인 실패');
    }
}

function mem_Login () {
    userid = $('#mem_userid').val();
    pwd = $('#mem_userpwd').val();

    LoginModule(userid,pwd);

}

 function gLogin(){
     window.module.glogin(); 
}

 function anyLogin(){
     window.module.anylogin(); 
}