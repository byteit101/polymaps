var po = org.polymaps;

var map = po.map()
    .container(document.getElementById("map").appendChild(po.svg("svg")))
    .center({lat: 37.787, lon: -122.228})
    .zoom(12)
    .add(po.interact());

map.add(po.image()
    .url(po.url("http://{S}tile.cloudmade.com"
    + "/1a1b06b230af4efdbb989ea99e9841af" // http://cloudmade.com/register
    + "/998/256/{Z}/{X}/{Y}.png")
    .hosts(["a.", "b.", "c.", ""])));

map.add(po.geoJson()
    .features([{geometry: {coordinates: [-122.258, 37.805], type: "Point"}}])
    .on("load", load))

map.add(po.compass()
    .pan("none"));

/* Create a shadow filter. */
var filter = map.container().appendChild(po.svg("filter")),
    blur = filter.appendChild(po.svg("feGaussianBlur"));
filter.setAttribute("id", "shadow"); // don't uppercase ids!
filter.setAttribute("width", "140%");
filter.setAttribute("height", "140%");
blur.setAttribute("in", "SourceAlpha");
blur.setAttribute("stdDeviation", 3);

/* Create radial gradient r1. */
var r1 = map.container().appendChild(po.svg("radialGradient")),
    r1s0 = r1.appendChild(po.svg("stop")),
    r1s1 = r1.appendChild(po.svg("stop"));
r1.setAttribute("id", "r1");
r1.setAttribute("fx", 0.5);
r1.setAttribute("fy", 0.9);
r1s0.setAttribute("offset", "0%");
r1s0.setAttribute("stop-color", "#00bf17");
r1s1.setAttribute("offset", "100%");
r1s1.setAttribute("stop-color", "#0f2f13");

/* Create radial gradient r2. */
var r2 = map.container().appendChild(po.svg("radialGradient")),
    r2s0 = r2.appendChild(po.svg("stop")),
    r2s1 = r2.appendChild(po.svg("stop"));
r2.setAttribute("id", "r2");
r2.setAttribute("fx", 0.5);
r2.setAttribute("fy", 0.1);
r2s0.setAttribute("offset", "0%");
r2s0.setAttribute("stop-color", "#cccccc");
r2s1.setAttribute("offset", "100%");
r2s1.setAttribute("stop-color", "#cccccc");
r2s1.setAttribute("stop-opacity", 0);

function load(e) {
  var r = 20 * Math.pow(2, e.tile.zoom - 12);
  for (var i = 0; i < e.features.length; i++) {
    var circle = e.features[i].element;

    var g = circle.parentNode.insertBefore(po.svg("g"), circle),
        x = circle.getAttribute("cx"),
        y = circle.getAttribute("cy");
    g.setAttribute("transform", "translate(" + x + "," + y + ")");

    var shadow = g.appendChild(po.svg("circle"));
    shadow.setAttribute("r", r);
    shadow.setAttribute("transform", "translate(" + r + ",0)skewX(-45)");
    shadow.setAttribute("opacity", .5);
    shadow.setAttribute("filter", "url(#shadow)");

    g.appendChild(circle);
    circle.setAttribute("fill", "url(#r1)");
    circle.setAttribute("r", r);
    circle.removeAttribute("cx");
    circle.removeAttribute("cy");

    var light = g.appendChild(po.svg("circle"));
    light.setAttribute("transform", "scale(.95,1)");
    light.setAttribute("fill", "url(#r2)");
    light.setAttribute("r", r);
  }
}
