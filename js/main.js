
window.onload = () => {

	for (let i = 0; i < 200; i++) {
		const snow = document.createElement("div");
		snow.className = "snow";
		snow.style.opacity = Math.random(); // 무작위 투명도
	
		const startX = Math.random() * 100; // 시작 X 좌표 무작위
		const endX = startX + (Math.random() * 20 - 10); // 종료 X 좌표 무작위
		const scale = Math.max(Math.random(), 0.5); // 무작위 크기
	
		const keyframe = [
		  { transform: `translate(${startX}vw, 0) scale(${scale})` },
		  { transform: `translate(${endX}vw, 100vh) scale(${scale})` },
		];
	
		const option = {
		  duration: 15000 + Math.random() * 5000, // 무작위 지속 시간
		  easing: "linear",
		  iterations: Infinity,
		  delay: -Math.random() * 20 * 1000, // 무작위 지연 시간
		};
	
		snow.animate(keyframe, option);
		document.body.appendChild(snow);
	  }

    let container = document.getElementById('map');
    let options = { 
        center: new kakao.maps.LatLng(37.490920171395985, 126.72078754716765), 
        level: 3 
        // disableClickZoom: true //
    };

    let map = new kakao.maps.Map(container, options); 
    let markerPosition  = new kakao.maps.LatLng(37.490920171395985, 126.72078754716765); 

    let marker = new kakao.maps.Marker({
        position: markerPosition ,
        text: '더조은 컴퓨터 학원' 
    });

    marker.setMap(map);
	
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) { 
			console.log("xml",this.responseXML);
			console.log("xml",url);
			parseXML(this.responseXML);
			
		}
	};
	

	xhttp.open("GET", url, true);
	xhttp.send();

}


function getParameter(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


