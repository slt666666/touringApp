var map = L.map("map", {
  center: [36.3, -80.2],
  maxBounds: [ [33.32134852669881, -85.20996093749999], [39.16414104768742, -75.9814453125] ],
  zoom: 6,
  minZoom: 6,
  maxZoom: 6,
  dragging: false,
  zoomControl: false,
  touchZoom: false,
  scrollWheelZoom: false,
  doubleClickZoom: false,
  boxZoom: false,
  keyboard: false
});

L.tileLayer("http://server.arcgisonline.com/ArcGIS/rest/services/"+"Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}", {attribution: "Tiles &copy; Esri &mdash; Esri, Delorme, NAVTEQ", maxZom: 16
}).addTo(map);
