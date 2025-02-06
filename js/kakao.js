
window.onload = () => {
    var container = document.getElementById('map');
    var options = { 
        center: new kakao.maps.LatLng(37.490920171395985, 126.72078754716765), 
        level: 3 
        // disableClickZoom: true //
    };

    var map = new kakao.maps.Map(container, options); 
    var markerPosition  = new kakao.maps.LatLng(37.490920171395985, 126.72078754716765); 

    var marker = new kakao.maps.Marker({
        position: markerPosition ,
        text: '더조은 컴퓨터 학원' 
    });


    

    marker.setMap(map);

    // marker.setMap(null);    

    // kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
        
    //     var latlng = mouseEvent.latLng; 
        
    //     marker.setPosition(latlng);
        
    //     var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
    //     message += '경도는 ' + latlng.getLng() + ' 입니다';

    //     var resultDiv = document.getElementById('clickLatlng'); 
    //     resultDiv.innerHTML = message;
        
    // });
}