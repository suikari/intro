
var bStartEvent = false;
//touchstart 이벤트 발생 여부 플래그
var bMoveEvent = false;
//touchmove 이벤트 발생 여부 플래그
 
function init(){
    document.addEventListener("touchstart", this.onStart.bind(this), false);
    document.addEventListener("touchmove", this.onMove.bind(this), false);
    document.addEventListener("touchend", this.onEnd.bind(this), false);
}

function onMove(e) {
    if(!bStartEvent) {
        return
    }
    console.log('swipe');

    var nX = e.changedTouches[0].pageX;
    var nY = e.changedTouches[0].pageY;
    
    nMoveType = getMoveType(nX, nY);
    
    if(nMoveType === 1) {
        e.preventDefault();
        console.log('swipe');
    }
}
 
function getMoveType(x, y) {

    var nMoveType = -1;
    var nX = Math.abs(htTouchInfo.nX- x);
    var nY = Math.abs(htTouchInfo.nY - y);
    var nDis = nX + nY;
    
    if(nDis < 25) { return nMoveType }
    
    var nHSlope = ((window.innerHeight / 2) / window.innerWidth).toFixed(2) * 1;
    
    var nSlope = parseFloat((nY / nX).toFixed(2), 10);
    
    if(nSlope > nHSlope) {
        nMoveType = 1;
    } else {
        nMoveType = 0;
    }
    return nMoveType;
}
