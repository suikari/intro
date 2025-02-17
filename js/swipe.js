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

  var diffX = endX - mob_startX;
  var diffY = endY - mob_startY;

  // X축으로 200픽셀 이상 이동했을 때만 감지
  if (Math.abs(diffX) > 200 && Math.abs(diffY) < 100) {
    if (diffX > 0) {
      alert('오른쪽으로 200픽셀 이상 스와이프');
    } else {
      alert('왼쪽으로 200픽셀 이상 스와이프');
    }
  }
});