// 이벤트 부여 함수
function addEvent(target,e,f) {
    if(window.addEventListener)
        target.addEventListener(e,f,false);
    else if(window.attachEvent)
        target.attachEvent("on"+e,f);
    else
        target["on"+e] = f;
    }
    
    function removeEvent(target,e,f) {
    if(window.removeEventListener)
        target.removeEventListener(e,f,false);
    else if(window.detachEvent)
        target.detachEvent("on"+e,f);
    else
        target["on"+e] = null;
    }
    
    
    // 액션 리스트
    var _gestures = {
    // U : ["스크롤 UP",function() {document.documentElement.scrollTop -= document.documentElement.clientHeight;}],
    // D : ["스크롤 DOWN",function() {document.documentElement.scrollTop += document.documentElement.clientHeight;}],
    // LU : ["페이지 상단",function() {document.documentElement.scrollTop = 0;}],
    // LD : ["페이지 하단",function() {document.documentElement.scrollTop = document.documentElement.scrollHeight;}],
    
    R : ["앞으로",function() {next_pagemove();}],
    L : ["뒤로",function() {prev_pagemove();}],
    
    // DR : ["새 창(탭) 열기",function() {window.open('about:blank');}],
    // DL : ["창(탭) 닫기",function() {window.close();}],
    
    // DU : ["창(탭) 복사",function() {window.open(location.href);}],
    // UD : ["새로 고침",function() {location.reload();}]
    }
    
    // 사용 전역변수 선언
    var _g_pX,_g_pY,_g_tX,_g_tY;
    var _g_path = "";
    var _g_target;
    var _g_t_dir = "";
    
    // 마우스 다운시
    function _g_down(e) {
    var e = e || event;
    _g_path = "";
    _g_target = e.target || e.srcElement;
    
    if(e.button == 2) {
    _g_pX = _g_tX = e.clientX;
    _g_pY = _g_tY = e.clientY;
    addEvent(document,"mousemove",_g_move);
    addEvent(document,"mouseup",_g_up);
    } else {
    removeEvent(document,"mousemove",_g_move);
    removeEvent(document,"mouseup",_g_up);
    }
    }
    
    // 마우스 업시
    function _g_up(e) {
    if(e.button == 2) {
    if(_g_path in _gestures) _gestures[_g_path][1]();
    removeEvent(document,"mousemove",_g_move);
    removeEvent(document,"mouseup",_g_up);
    }
    }
    
    // 컨텍스트 메뉴 방지용 리턴 막는 함수
    function _g_false(e) {
    if(_g_path) {
    var e = e || event;
    if(e.preventDefault) e.preventDefault();
    if("returnValue" in e) e.returnValue = false;
    return false;
    }
    }
    
    addEvent(document,"contextmenu",_g_false);
    
    // 마우스 이동시
    function _g_move(e) {
    var e = e || event;
    var x = e.clientX;
    var y = e.clientY;
    var mX = x - _g_pX;
    var mY = _g_pY - y;
    var dir;
    
    if(mX == 0) {
    if(mY > 0) dir = "U";
    else if(mY < 0) dir = "D";
    else return;
    } else {
    var slope = mY/mX;
    if(slope > 2 || slope < -2) {
    if(mY > 0) dir = "U";
    else dir = "D";
    } else if(slope < 0.5 && slope > -0.5) {
    // if(mX > 0) dir = "R";
    // else dir = "L";
        if(mX > 200) dir = "R";
        else if(mX < -200) dir = "L";
    }
    }
    
    if(dir && dir != _g_path.charAt(_g_path.length-1)) {
    if(_g_t_dir != dir) {
    _g_tX = _g_pX;
    _g_tY = _g_pY;
    }
    if(Math.abs(x-_g_tX) > 20 || Math.abs(_g_tY-y) > 20) {
    _g_path += dir;
    }
    }
    _g_t_dir = dir;
    _g_pX = x;
    _g_pY = y;
    
    window.status = _g_path + ((_g_path in _gestures)?(" : " + _gestures[_g_path][0]):"");
    }
    
    addEvent(document,"mousedown",_g_down);