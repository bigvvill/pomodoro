window.onload = function () {
  var sessionMinutes = 24; // default session minutes
  var sessionSeconds = 59; // session seconds
  var pause = false; // used to puause and restart setInterval(timer)
  var timer; // to hold the setInterval and its callback function
  var sessionTime = 25; // the default sessionTime, used to display the current minutes as set by sessionPlus and sessionMinus
  var breakTime= 5; // the default break time; used to display the current break minutes as set by breakPlus and breakMinus
  var workSessions= 0; // updates after each work session completes; used to display the number of work sessions that have been completed
  var workOrPlay = true; // used by the pause button to determine if display should be "Work Time" or "Play Time"
  
  // button logic to set sessionTime
  
  document.getElementById("sessionMinus").addEventListener("click", function() {
    // ensures sessionTime does not go below 1
    if (sessionTime === 1) {
      sessionTime === 1;
    // decrease sessionTime by one per click
    } else {    
      sessionTime--;
    }
    // updates sessionTime display
    document.getElementById("sessionTime").innerHTML = "<h3>" + sessionTime + "</h3>";
    document.getElementById("timer").innerHTML = "<h1>" + sessionTime + ":00</h1>";
    // sets session minutes and session seconds
    sessionMinutes = sessionTime - 1;
    sessionSeconds = 59;
  });
  
  document.getElementById("sessionPlus").addEventListener("click", function() {
    // increases sessionTime by one per click
    sessionTime++;
    // updates sessionTime display
    document.getElementById("sessionTime").innerHTML = "<h3>" + sessionTime + "</h3>";
    document.getElementById("timer").innerHTML = "<h1>" + sessionTime + ":00</h1>";
    // sets session minutes and session seconds
    sessionMinutes = sessionTime - 1;
    sessionSeconds = 59;
  });
  
  // button logic to set breakTime
  
  document.getElementById("breakMinus").addEventListener("click", function() {
    // ensures breakTime does not go below 1
    if (breakTime === 1) {
      breakTime === 1;
    // decrease breakTime by one per click
    } else {    
      breakTime--;
    }
    // updates breakTime display
    document.getElementById("breakTime").innerHTML = "<h3>" + breakTime + "</h3>";
  });
  
  document.getElementById("breakPlus").addEventListener("click", function() {
    // increases sessionTime by one per click
    breakTime++;
    // updates sessionTime display
    document.getElementById("breakTime").innerHTML = "<h3>" + breakTime + "</h3>";
  });
  
  // countdown timer for break time
  
  function breakCounter() {
    var seconds = 59; // seconds decremented to countdown
    var minutes = breakTime - 1; // minutes set by user to countdown
    var progress = document.getElementById("progressBar"); // used to display the countdown on the status bar 
    var width = 0; // initial value of status bar
    var percentage = 100 / ((minutes * 60) + seconds); // increment value of status bar
    workOrPlay = false; // break time
    
    // timer logic
    
    timer = setInterval(function() {
      // do function until user hits pause button
      if (!pause) {
        // increase and display status bar
        width += percentage;
        progress.style.width = width + "%";
        document.getElementById("timer").innerHTML = "<h1>" + minutes + ":" + seconds + "</h1>";
        if (minutes === 0 && seconds < 10) {
            document.getElementById("timer").innerHTML = "<h1>" + minutes + ":0" + seconds + "</h1>";
        }
        // when timer reaches 0:00 play sound and begin work session (sessionCounter())
        if (minutes === 0 && seconds === 0) {
          clearInterval(timer);
          document.getElementById("display").innerHTML = "<h3>Work Time</h3>";
          document.getElementById("sound").innerHTML='<audio autoplay="autoplay"><source src="assets/finish.mp3" type="audio/mpeg" /><source src="/assets.finish.ogg" type="audio/ogg" /><embed hidden="true" autostart="true" loop="false" src="finish.mp3" /></audio>';
          sessionCounter();
        }
        if (minutes !== 0 && seconds < 10) {
            document.getElementById("timer").innerHTML = "<h1>" + minutes + ":0" + seconds + "</h1>";
        }
        if (minutes !== 0 && seconds === 0) {
          minutes--;
          seconds = 59;
        }
        else {
          seconds--; 
        }
      }
    },1000); // setInterval runs timer function every second
  }
  
  function sessionCounter() {
    var seconds = 59; // seconds decremented to countdown
    var minutes = sessionTime -1; // minutes set by user to countdown
    var progress = document.getElementById("progressBar"); // used to display the countdown on the status bar
    var width = 100; // initial value of status bar
    var percentage = 100 / ((minutes * 60) + seconds); // decrement value of status bar
    workOrPlay = true; // session time
    
    // timer logic
    
    timer = setInterval(function() {
      // do function until user hits pause button
      if (!pause) {
        // decrease and display status bar
        width -= percentage;
        progress.style.width = width + "%";
        document.getElementById("timer").innerHTML = "<h1>" + minutes + ":" + seconds + "</h1>";
        if (minutes === 0 && seconds < 10) {
            document.getElementById("timer").innerHTML = "<h1>" + minutes + ":0" + seconds + "</h1>";
        }
        // when timer reaches 0:00 play sound and begin work session (breakCounter())
        if (minutes === 0 && seconds === 0) {
          clearInterval(timer);
          document.getElementById("display").innerHTML = "<h3>Play Time</h3>";
          // updated and display completed work sessions
          workSessions ++;
          document.getElementById("completedCount").innerHTML = "COMPLETED WORK SESSIONS: " + workSessions;
          document.getElementById("sound").innerHTML='<audio autoplay="autoplay"><source src="assets/finish.mp3" type="audio/mpeg" /><source src="/assets.finish.ogg" type="audio/ogg" /><embed hidden="true" autostart="true" loop="false" src="finish.mp3" /></audio>';
          breakCounter();
        }
        if (minutes !== 0 && seconds < 10) {
            document.getElementById("timer").innerHTML = "<h1>" + minutes + ":0" + seconds + "</h1>";
        }
        if (minutes !== 0 && seconds === 0) {
          minutes--;
          seconds = 59;
        }
        else {
          seconds--; 
        }
      }
    },1000); // setInterval runs timer function every second
  }
  
  // event listener for begin button
  document.getElementById("begin").addEventListener("click", function() {
    // pause button is initally disabled
    document.getElementById("pause").disabled = false;
    // displays work/play time
    if (workOrPlay) {
      document.getElementById("display").innerHTML = "<h3>Work Time</h3>";
    } else {
      document.getElementById("display").innerHTML = "<h3>Play Time</h3>";
    }
    // removes begin button and adds clear butotn
    document.getElementById("begin").style.display = "none";
    document.getElementById("clear").style.display = "inline";
    if (document.getElementById("pause").style.display === "none"){
      document.getElementById("pause").style.display = "inline"
    }
    // if the timer has not been started
    if (!pause) {
      sessionCounter();
    // if the timer has been started, upause the timer
    } else {
      pause = !pause;
    }
  });
  
  // event listener for pause button
  document.getElementById("pause").addEventListener("click", function() {
    document.getElementById("display").innerHTML = "<h3>Paused</h3>";
    pause = true;
    // removes pause button and adds begin button
    document.getElementById("begin").style.display = "inline";
    document.getElementById("pause").style.display = "none";
    
  });
  
  // event listener for pause button
  document.getElementById("clear").addEventListener("click", function() {
    // resets variables and display
    clearInterval(timer);
    sessionMinutes = 24; 
    sessionSeconds = 59; 
    pause = false; 
    sessionTime = 25; 
    breakTime= 5; 
    workSessions= 0; 
    workOrPlay = true; 
    document.getElementById("timer").innerHTML = "<h1>25:00</h1>";
    document.getElementById("display").innerHTML = "<h3>Pomodoro Timer</h3>";
    document.getElementById("completedCount").innerHTML = "COMPLETED WORK SESSIONS: " + workSessions;
    document.getElementById("progressBar").style.width = 0;
    document.getElementById("begin").style.display = "inline";
    document.getElementById("pause").style.display = "none";
    document.getElementById("sessionTime").innerHTML = "<h3>" + sessionTime + "</h3>";
    document.getElementById("breakTime").innerHTML = "<h3>" + breakTime + "</h3>";
  });
}