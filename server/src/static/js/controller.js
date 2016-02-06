$(document).ready(function() { 

    var namespace = '/controller';
    var socket = io.connect('http://' + document.domain + ':' + location.port + namespace);

    window.addEventListener("devicemotion", function(e) {
        document.getElementById("rota").innerHTML = e.rotationRate.alpha;
        document.getElementById("rotb").innerHTML = e.rotationRate.beta;
        document.getElementById("rotc").innerHTML = e.rotationRate.gamma;
    }, true);
    
    window.setInterval(function() {
        socket.emit('sensor input', {data: Math.random()});
    }, 1000);

});
