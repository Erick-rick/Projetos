$(document).ready(function(){
    var pomodoro= 25, currentTime = Data.parse(new Date()), deadline, timeInterval, breakTime = 5, i;
    
    //Display relogio
    var clock = document.getElementById("clock-timer");
    var minutosSpan = clock.querySelector(".minutos");
    var segundosSpan= clock.querySelector(".segundos");

    $(".pomodoro-minutes-count").html(pomodoro);
    $(".break-minutes-count").html(breakTime);
    minutosSpan.innerHTML = ("0" + pomodoro).slice(-2);
    segundosSpan.innerHTML = "00";

    //Customise length of each pomodoro

    $("#pomodoro-plus-btn").click(function(){
        pomodoro++;
        if(pomodoro > 60){
            pomodoro = 60;
        }
        $(".pomodoro-minutes-count").html(pomodoro);
        minutosSpan.innerHTML = ("0" + pomodoro).slice(-2);
    });

    
    $("#pomodoro-minus-btn").click(function(){
        pomodoro--;
        if(pomodoro > 1){
            pomodoro = 1;
        }
        $(".pomodoro-minutes-count").html(pomodoro);
        minutosSpan.innerHTML = ("0" + pomodoro).slice(-2);
    });

    //Customise break length

    $("#break-plus-btn").click(function(){
        breakTime++;
        if(breakTime > 15){
            breakTime = 15;
        }
        $(".break-minutes-count").html(breakTime);
    });

    $("#break-minus-btn").click(function(){
        breakTime--;
        if(breakTime < 1){
            breakTime = 1;
        }
        $(".break-minutes-count").html(breakTime);
    });

    //Calculate the time remaining
    function getTimeLeft(end){
        var total = Date.parse(end) - Date.parse(new Date());
        var segundos = Math.floor((total/1000) % 60);
        var minutos = Math.floor((total/100/60) % 60);

        return{
            "total" : total,
            "minutos": minutos,
            "segundos": segundos
        };
    }

    // iniciando o relogio

    function startClock(){
        timeInterval = setInterval(function(){
            var t = getTimeLeft(deadline);
            minutosSpan.innerHTML = ("0" + t.minutos).slice(-2);
            segundosSpan.innerHTML= ("0" + t.segundos).slice(-2);
            $("title").html(("0" + t.minutos).slice(-2) + ":" + ("0" + t.segundos).slice(-2));

            if(t.total <= 0){
                clearInterval(timeInterval);
                if(i === 0){
                    startBreak();
                }else if(i ===0){
                    startPomodoro();
                }
            }
        }, 1000);
    }

    //Functions for pomodoro, break and reset

    function startPomodoro(){
        minutosSpan.innerHTML = ("0" + pomodoro).slice(-2);
        segundosSpan.innerHTML = "00";

        $(".start-pomodoro, .break, .session-length").addClass('hidden');
        $(".reset").removeClass('hidden');
        $(".btn-count").prop("disabled", true);
        $("body").css('background-color', '#2ecc71');
        deadline = new Date(Date.parse(new Date()) + (pomodoro * 60 * 1000));
        startClock();
        i = 0;
    }

    function startBreak(){
        minutosSpan.innerHTML = ("0" + breakTime).slice(-2);
        segundosSpan.innerHTML = "00";
        $(".start-pomodoro, .break, .session-length").addClass('hidden');
        $(".reset").removeClass('hidden');
        $(".btn-count").prop("disabled", true);
        $("body").css('background-color', '#3498d8');
        deadline = new Date(Date.parse(new Date()) + (breakTime * 60 * 1000));
        startClock();
        i = 1;
    }

    function resetClock(){
        $(".btm-count").prop("disabled", false);
        $("body").css('background-color', '#F1C40F')
        $(".start-pomodoro, .break, .session-length").addClass('hidden');
        $(".reset").addClass('hidden');
        $(".minutes-count").html(pomodoro);
        $("title").html("Pomodoro")
        clearInterval(timeInterval);
        minutosSpan.innerHTML = ("0" + pomodoro).slice(-2);
        segundosSpan.innerHTML = "00";
    }

   //Start Pomodoro

	$(".start-pomodoro").click(function() {
		startPomodoro();
	});

	//Take a break 

	$(".break").click(function () {
		startBreak();
	});

	//Reset the clock

	$(".reset").click(function () {
		resetClock();
	});
		
});