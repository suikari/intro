// document.addEventListener('DOMContentLoaded', function () {
//   // 마우스의 위치값 저장
//   let x = 0;
//   let y = 0;

//   // 대상 Element 가져옴
//   const ele = document.getElementById('draggable');

//   // 마우스 누른 순간 이벤트
//   const mouseDownHandler = function (e) {
//     // 누른 마우스 위치값을 가져와 저장
//     x = e.clientX;
//     y = e.clientY;

//     // 마우스 이동 및 해제 이벤트를 등록
//     document.addEventListener('mousemove', mouseMoveHandler);
//     document.addEventListener('mouseup', mouseUpHandler);
//   };

//   const mouseMoveHandler = function (e) {
//     // 마우스 이동시 초기 위치와의 거리차 계산
//     const dx = e.clientX - x;
//     const dy = e.clientY - y;

//     // 마우스 이동 거리 만큼 Element의 top, left 위치값에 반영
//     ele.style.top = `${ele.offsetTop + dy}px`;
//     ele.style.left = `${ele.offsetLeft + dx}px`;

//     // 기준 위치 값을 현재 마우스 위치로 update
//     x = e.clientX;
//     y = e.clientY;
//   };

//   const mouseUpHandler = function () {
//     // 마우스가 해제되면 이벤트도 같이 해제
//     document.removeEventListener('mousemove', mouseMoveHandler);
//     document.removeEventListener('mouseup', mouseUpHandler);
//   };

//   ele.addEventListener('mousedown', mouseDownHandler);
// });





// 다중 드래그 가능한 div 처리
const draggables = document.querySelectorAll('.draggable');
let activeDraggable = null; 
let offsetX = 0;
let offsetY = 0;

draggables.forEach((draggable) => {

  draggable.addEventListener('mousedown', (e) => {
    activeDraggable = draggable; 
    isDragging = true;

    // console.log(activeDraggable);
    
    offsetX = e.clientX - draggable.offsetLeft;
    offsetY = e.clientY - draggable.offsetTop;
    draggable.style.cursor = 'grabbing';
  });
});

document.addEventListener('mousemove', (e) => {
  if (activeDraggable) {
    
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;

    const boundedX = x;
    const boundedY = y;

    // const boundedX = Math.max(0, Math.min(x, window.innerWidth - activeDraggable.offsetWidth));
    // const boundedY = Math.max(0, Math.min(y, window.innerHeight - activeDraggable.offsetHeight));

    activeDraggable.style.left = `${boundedX}px`;
    activeDraggable.style.top = `${boundedY}px`;
  }
  });

  document.addEventListener('mouseup', () => {
    if (activeDraggable) {
      activeDraggable.style.cursor = 'grab';
      activeDraggable = null; 
    }
  });

  // Prevent blocking other events
  document.addEventListener('mousedown', (e) => {
    if (!e.target.classList.contains('draggable')) {
      activeDraggable = null; 
      isDragging = false;
    }
  });



  var startX = 0;
  var distanceThreshold = 200; // 이동 거리 기준 (픽셀 단위)
  var isDragging = false; // 드래그 여부를 추적

  // body에서 왼쪽/오른쪽 이동 거리 감지
  $(document).on('mousedown', function(event) {
      // 드래그 중이라면 왼쪽/오른쪽 이동 감지를 하지 않도록 처리
      if (isDragging) return;

      // body에서 클릭 시 시작 위치 기록
      startX = event.pageX;

      $(document).on('mousemove', function(event) {
          var currentX = event.pageX;
          var distanceMoved = currentX - startX; // 이동 거리 계산

          if (Math.abs(distanceMoved) >= distanceThreshold) {
              if (distanceMoved > 0) {
                  // 오른쪽으로 이동
                  //console.log('오른쪽으로 이동!');
                  next_pagemove();
              } else {
                  // 왼쪽으로 이동
                  //console.log('왼쪽으로 이동!');
                  prev_pagemove();
              }
    
              // 한 번 이동을 감지한 후 더 이상 추적하지 않음
              $(document).off('mousemove');
          }
      });

      $(document).on('mouseup', function() {
          // 마우스 업 시 이벤트 해제
          $(document).off('mousemove');
      });
  });






  // document.addEventListener('mousemove', (e) => {
//   let mouseX = e.pageX; // document의 x좌표값
//   let mouseY = e.pageY; // document의 cursory좌표값

//   let cursor = document.querySelector('.cursor');
//   cursor.style.left = mouseX + 'px';
//   cursor.style.top = mouseY + 'px';
// })

