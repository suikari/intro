
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
  var startY = 0; 

  var distanceThreshold = 250; 
  var verticalThreshold = 100; 

  var isDragging = false; 

  $(document).on('mousedown', function(event) {
      if (isDragging) return;

      startX = event.pageX;
      startY = event.pageY;

      $(document).on('mousemove', function(event) {
        var currentX = event.pageX;
        var currentY = event.pageY;
        var distanceMovedX = currentX - startX; 
        var distanceMovedY = Math.abs(currentY - startY);

          if (Math.abs(distanceMovedX) >= distanceThreshold && distanceMovedY <= verticalThreshold) {
              if (distanceMovedX > 0) {
                  //console.log('오른쪽으로 이동!');
                  prev_pagemove();

              } else {
                  //console.log('왼쪽으로 이동!');
                  next_pagemove();

              }
    
              $(document).off('mousemove');
          }
      });

      $(document).on('mouseup', function() {
          $(document).off('mousemove');
      });
  });


  $(document).on('mousedown', function(event) {
    // XButton1 (뒤로가기)
    if (event.button === 3) {
      event.preventDefault(); //
      prev_pagemove();
    
    }
    // XButton2 (앞으로가기)
    else if (event.button === 4) {
      event.preventDefault(); //
      next_pagemove();
    }
});




  // document.addEventListener('mousemove', (e) => {
//   let mouseX = e.pageX; // document의 x좌표값
//   let mouseY = e.pageY; // document의 cursory좌표값

//   let cursor = document.querySelector('.cursor');
//   cursor.style.left = mouseX + 'px';
//   cursor.style.top = mouseY + 'px';
// })

