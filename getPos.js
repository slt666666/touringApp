$(document).ready(function(){
  function attachMessage(marker, msg) {
    google.maps.event.addListener(marker, "click", function(event) {
      new google.maps.InfoWindow({
        content: msg
      }).open(marker.getMap(), marker);
    });
  }


  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    scrollwheel: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  new google.maps.DirectionsService().route({
    origin:      new google.maps.LatLng(35.631089,139.266776), // 清滝駅
    destination: new google.maps.LatLng(35.631105,139.256127), // 高尾山駅;
    travelMode: google.maps.DirectionsTravelMode.WALKING 
  }, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      var arr = result.routes[0].overview_path;
      for (var i = 0; i < arr.length; i++) {
        console.log("緯度" + arr[i].lat() + "経度" + arr[i].lng());
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
      alert("短時間にDirectionsRequestクエリを送りすぎ！落ち着いて！！");
    } else if (status == google.maps.ElevationStatus.REQUEST_DENIED) {
      alert("このページでは DirectionsRequest の利用が許可されていない！・・・なぜ！？");
    } else if (status == google.maps.ElevationStatus.UNKNOWN_ERROR) {
      alert("DirectionsServiceで原因不明のなんらかのトラブルが発生した模様。");
    } else if (status == google.maps.ElevationStatus.ZERO_RESULTS) {
      alert("DirectionsServiceでorigin,destinationを結ぶ経路が見つかりません。");
    } else {
      alert("えぇ～っと・・、DirectionsService バージョンアップ？");
    }
  });
});