$(document).ready(function(){
  var countW = 25;
  $("#workout").html(countW);
  var countB = 5;
  $("#break").html(countB);
  var countR = 8;
  $("#round").html(countR);
  var pos = "HIIT";
  var count;
  var currentR=0;
  $("#stats").html(pos);
  let isRunning = false;
  let timer;
  let currentTime;
  let workDuration;
  let restDuration;
  let stopcounter =0;
  let spos;
 
    
  //SESSION
  $("#workInc").on("click", function(){
    if ($("#workout").html() > 0){
      countW = parseInt($("#workout").html());
      countW+=1;
      $("#workout").html(countW);
    }
  });
  $("#workDec").on("click", function(){
    if ($("#workout").html() > 1){
      countW = parseInt($("#workout").html());
      countW-=1;
      $("#workout").html(countW);
    }
  });
  //BREAK
  $("#breakInc").on("click", function(){
    if ($("#break").html() > 0){
      countB = parseInt($("#break").html());
      countB+=1;
      $("#break").html(countB);
    }    
  });
  $("#breakDec").on("click", function(){
    if ($("#break").html() > 1){
      countB = parseInt($("#break").html());
      countB-=1;
      $("#break").html(countB);
    }
  });
  $("#roundInc").on("click", function(){
    if ($("#round").html() > 0){
      countR = parseInt($("#round").html());
      countR+=1;
      $("#round").html(countR);
    }
  });
  $("#roundDec").on("click", function(){
    if ($("#round").html() > 1){
      countR = parseInt($("#round").html());
      countR-=1;
      $("#round").html(countR);
    }
  });
  $("#start").on("click", function(){
    if(stopcounter>0){
      stopcounter =0;
      if(!isRunning){
        pos=spos;
        $("#stats").html(pos);
        isRunning = true;
        updateDisplay();
        if(spos == "Break"){
          document.body.style.backgroundColor= "blue";
        }else if(spos =="Workout"){
          document.body.style.backgroundColor= "green";
        }else if(spos =="Finished"){
          document.body.style.backgroundColor= "purple";
        }

        timer = setInterval(() => {
          if(currentR == countR){
            pos="Finished";
            $("#stats").html(pos);
            clearInterval(timer);
            document.body.style.backgroundColor= "purple";
          } else if (currentTime <= 0) {
            if (pos=="Workout") {
              currentTime = restDuration;
              pos="Break";
              $("#stats").html(pos);
              document.body.style.backgroundColor= "blue";
            }else {
              currentR++;
              if(currentR == countR){
                pos="Finished";
                $("#stats").html(pos);
                document.body.style.backgroundColor= "purple";
              }else{
                currentTime = workDuration;
                pos="Workout";
                $("#stats").html(pos);
                document.body.style.backgroundColor= "green";
              }
            }
          } else {
            currentTime--;
          }
          updateDisplay();
        }, 1000);
      }
    }else{
      
      if(!isRunning){
        pos="Workout";
        $("#stats").html(pos);
        document.body.style.backgroundColor= "green";
        isRunning = true;
        workDuration = parseInt(countW);
        restDuration = parseInt(countB);
        currentTime = workDuration;
        updateDisplay();
        

        timer = setInterval(() => {
          if(currentR == countR){
            pos="Finished";
            $("#stats").html(pos);
            clearInterval(timer);
            document.body.style.backgroundColor= "purple";
          } else if (currentTime <= 0) {
            if (pos=="Workout") {
              currentTime = restDuration;
              pos="Break";
              $("#stats").html(pos);
              document.body.style.backgroundColor= "blue";
            }else {
              currentR++;
              if(currentR == countR){
                pos="Finished";
                $("#stats").html(pos);
                document.body.style.backgroundColor= "purple";
              }else{
                currentTime = workDuration;
                pos="Workout";
                $("#stats").html(pos);
                document.body.style.backgroundColor= "green";
              }
            }
          } else {
            currentTime--;
          }
          updateDisplay();
        }, 1000);
      }
    }
      
  });
  function updateDisplay() {
    const minutes = String(Math.floor(currentTime / 60)).padStart(2, '0');
    const seconds = String(currentTime % 60).padStart(2, '0');
    timerDisplay.textContent = `${minutes}:${seconds}`;
  }
  
  $("#stop").on("click", function(){
    if(isRunning){
      spos=pos;
      isRunning=false;
      clearInterval(timer);
      stopcounter++;
      document.body.style.backgroundColor= "red";
    }
  });
  $("#clear").on("click", function(){
    clearInterval(timer);
    currentR =0;
    isRunning = false;
    timerDisplay.textContent = '00:00';
    pos = "HIIT";
    $("#stats").html(pos);
    document.body.style.backgroundColor= "white";
  });
});