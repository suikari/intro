
window.onload = () => {

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
	