
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
  var isDragging = false; 

  $(document).on('mousedown', function(event) {
      if (isDragging) return;

      startX = event.pageX;

      $(document).on('mousemove', function(event) {
          var currentX = event.pageX;
          var distanceMoved = currentX - startX; 

          if (Math.abs(distanceMoved) >= distanceThreshold) {
              if (distanceMoved > 0) {
                  //console.log('오른쪽으로 이동!');
                  next_pagemove();
              } else {
                  //console.log('왼쪽으로 이동!');
                  prev_pagemove();
              }
    
              $(document).off('mousemove');
          }
      });

      $(document).on('mouseup', function() {
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

