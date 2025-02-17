var mob_startX, mob_startY, mob_endX, mob_endY;


// body 전체에 대해 터치 이벤트를 설정
$('body').on('touchstart', function(e) {
  var touch = e.originalEvent.touches[0];
  mob_startX = touch.pageX;
  mob_startY = touch.pageY;
});

$('body').on('touchmove', function(e) {
  e.preventDefault(); // 화면 스크롤을 방지하려면
});

$('body').on('touchend', function(e) {
  var touch = e.originalEvent.changedTouches[0];
  mob_endX = touch.pageX;
  mob_endY = touch.pageY;

  var mob_diffX = mob_endX - mob_startX;
  var mob_diffY = mob_endY - mob_startY;

  // X축으로 200픽셀 이상 이동했을 때만 감지
  if (Math.abs(mob_diffX) > 200 && Math.abs(mob_diffY) < 100) {
    if (mob_diffX > 0) {
      //alert('오른쪽으로 200픽셀 이상 스와이프');
      next_pagemove();
    } else {
      prev_pagemove();
      //alert('왼쪽으로 200픽셀 이상 스와이프');
    }
  }
});

  
