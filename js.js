var count = 400; //number of dots
var size = 2; //size of dots
var c = 4; //constant scaling factor


var golden_angle = 137.508;
//var golden_angle = 140.2554;

function radiusFermat(n) {
  return c * Math.sqrt(n);
}

function angleFermat(n) {
  return n * golden_angle;
}

function describeFermatPoint(n) {
  return polarToCartesian(150, 150, radiusFermat(n), angleFermat(n));
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function createFermatPlot(l) {
  var set = [];
  for (var i = 0; i <= l; i++) {
    set[i] = describeFermatPoint(i);
  }
  return set;
}

function renderCircles(set) {
  for (var i = 1; i < set.length; i++) {
    var p =  describeFermatPoint(i);
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("id", "circle" + i);
    circle.setAttribute("fill", "red");
    circle.setAttribute("r", size);
    circle.setAttribute("cx", set[i].x);
    circle.setAttribute("cy", set[i].y);
    document.getElementById("svg-id").appendChild(circle);
  }
}

/*==========arc=========*/
function describeArc(x, y, radius, startAngle, endAngle){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;       
}

window.onload = function() {

  /*====adding plot=====*/
  renderCircles(createFermatPlot(count));

  /*====adding arc=====*/
  document.getElementById("arc1").setAttribute("d", describeArc(150, 150, 100, 0, 270));

};
