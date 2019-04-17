$(document).ready(function(){
    var total;
    var tick;
    var isActive = false;
    var trackSeconds = 1500;
    var alarm = new Audio('Undertale.mp3');
    $('#setTime').on("submit", function(e){
        e.preventDefault();
        var minutes = parseInt(document.getElementById("mins").value);
        var seconds = parseInt(document.getElementById("secs").value);
        if(!minutes || minutes < 0 || isNaN(minutes)){
            minutes = 0;
        }
        if(!seconds || minutes < 0 || isNaN(seconds)){
            seconds = 0;
        }
        total = minutes*60 + seconds;
        minutes = parseInt(total/60);
        seconds = total - minutes*60;
        setMinutes(niceFormatMin(minutes));
        setSeconds(niceFormatSec(seconds));
        clearInterval(tick);
    });
    $("#toggle").on("click", function(e){
        e.preventDefault();
        document.getElementById("open").hidden= false;
        document.getElementById("setTime").hidden = true;
        if(!isActive){
        
        if(total){
            trackSeconds = total;
            tick = setInterval(startTime, 1000);
            total = null;
        }else{
            
            tick = setInterval(startTime, 1000);
        }
            setToggle("Stop");
            isActive = true;
        }else{
            alarm.pause();
            clearInterval(tick);
            setToggle("Start");
            isActive = false;
        }   
    });
    $("#reset").on("click", function(e){
        e.preventDefault();
        isActive = false;
        clearInterval(tick);
        trackSeconds = 1500;
        setMinutes("25");
        setSeconds("00");
        setToggle("Start");
    });
    $("#break").on("click", function(e){
        e.preventDefault();
        alarm.pause();
        alarm.currentTime = 0;
        isActive = true;
        clearInterval(tick);
        trackSeconds = 300;
        setMinutes("05");
        setSeconds("00");
        setToggle("Stop");
        tick = setInterval(startTime, 1000);
    });
    $("#open").on("click", function(){
        document.getElementById("open").hidden= true;
        document.getElementById("setTime").hidden = false;
    });
    function startTime(){
        if(trackSeconds <1){
            alarm.play();
            clearTimeout(tick);
        }else{
            trackSeconds -=1;
        
        var minutes = niceFormatMin(parseInt(trackSeconds/60));
        var seconds = niceFormatSec(trackSeconds - minutes*60);
        
        setSeconds(seconds);
        setMinutes(minutes);
        
        
        }
        
    }
    function niceFormatMin(minutes){
        if(minutes < 10){
            minutes = "0" + minutes;
        }
        return minutes;
    }
    function niceFormatSec(seconds){
        if(seconds < 10){
            seconds = "0" + seconds;
        }
        return seconds;
    }
    function setSeconds(data){
        document.getElementById("seconds").innerHTML = data;
    }
    function setMinutes(data){
        document.getElementById("minutes").innerHTML = data;
    }
    function setToggle(data){
        document.getElementById("toggle").innerHTML = data;
    }
});