$(document).ready(function(){
	//google map作成
	var map = new google.maps.Map(document.getElementById("map"), {
    	zoom: 7,
    	scrollwheel: false,
    	mapTypeId: google.maps.MapTypeId.ROADMAP
	});

  	//経路のポイントを保存する配列
  	var routePoints = [];

	//clickイベントを取得するListener追加
	google.maps.event.addListener(map, 'click', clickEventFunc);

	//クリックによるイベント、座標取得、マーカー設置
	function clickEventFunc(event) {
    	var Lat = event.latLng.lat();                //この辺省略できそう
		var Lng = event.latLng.lng();
		routePoints.push([Lat, Lng]);
		var markerOpt = {
        	position: new google.maps.LatLng(Lat, Lng),
        	map: map,
        	title: "routePoints"
      	};
		marker = new google.maps.Marker(markerOpt);
	}

	//マーカーを消す(未完成)
	$('#reset').click(function(){
		marker.setMap(null);
	});

	//途中経路を指定する場合 (未完成)
	if (routePoints.length > 2){
		var waypts = [];
		waypts.push({
	        location: new google.maps.LatLng(34.809258,135.658814),
	        stopover: true
	    });
	}

	//ルートを検索し、座標をテキストエリアに表示する
	new google.maps.DirectionsService().route({
    	origin:      new google.maps.LatLng(35.022542,135.776104), // 京都大学
    	destination: new google.maps.LatLng(34.685452,135.547140), // 自宅;
    	//waypoints: waypts,
    	travelMode: google.maps.DirectionsTravelMode.DRIVING,
    	avoidHighways: true,
    	avoidTolls: true
	}, function(result, status) {
    	if (status == google.maps.DirectionsStatus.OK) {
      		var arr = result.routes[0].overview_path;
      		for (var i = 0; i < arr.length; i++) {
        		$('#log').append("緯度" + arr[i].lat() + "経度" + arr[i].lng());
      		}
      		new google.maps.DirectionsRenderer({
        	map: map,
        	//suppressMarkers: true
      		}).setDirections(result);

    	} else if (status == google.maps.DirectionsStatus.INVALID_REQUEST) {
      		alert("DirectionsRequestに問題アリ！渡している内容を確認せよ！！");
    	} else if (status == google.maps.DirectionsStatus.MAX_WAYPOINTS_EXCEEDED) {
      		alert("DirectionsRequestのDirectionsWaypointsが多すぎ！");
    	} else if (status == google.maps.DirectionsStatus.NOT_FOUND) {
      		alert("DirectionsRequestのorigin,destination,waypointsのいずれかのジオコーディングに失敗！");
    	} else if (status == google.maps.ElevationStatus.OVER_QUERY_LIMIT) {
      		alert("短時間にDirectionsRequestクエリを送りすぎ！");
    	} else if (status == google.maps.ElevationStatus.REQUEST_DENIED) {
      		alert("このページでは DirectionsRequest の利用が許可されていない！");
    	} else if (status == google.maps.ElevationStatus.UNKNOWN_ERROR) {
      		alert("DirectionsServiceで原因不明のなんらかのトラブルが発生した模様。");
    	} else if (status == google.maps.ElevationStatus.ZERO_RESULTS) {
      		alert("DirectionsServiceでorigin,destinationを結ぶ経路が見つかりません。");
    	} else {
      		alert("DirectionsService バージョンアップ？");
    	}
	});
});
