# liveCircles

A collection of easily interchangeable circles animations for the canvas element. Can also double as a stiff framework for developing new ones. Based on paper.js.


**Features:**

Can't-make-it-simpler usage on multiple canvas elements on the same page.
Easily changeable animations.
Easily definable circle size, colors and numbers.
Multiple ready-to-use animations. (It's actually only one + a static rendering for now :D, sorry. But more will follow soon)

## Prerequisites
[Paper.js](https://github.com/paperjs/paper.js). I use 0.9.22 in my development process.

## Implementation examples

[Working example](http://vantudor.github.io/my_work/livecircles/livecircles.html)

Basic full example code:

    <!-- Canvas set as background-->
    <canvas id="myCanvas" style="position: absolute; z-index: -1; height: 100% !important; width: 100% !important;">
    </canvas>
    <script src="bower_components/paper-full/paper_full.js"></script>
    <script src="scripts/liveCircles.js"></script>
    <script>
     var x = new liveCircles.canvasInstance('myCanvas', 100, 10, ['#EA3556','#ED146F','#61D2D6','#9BF0E9','#EDDE45']); 
     var sw = true;
     var toggle_animation = function(){
      if(sw){
        x.changeCurrentAnimation('fizzyBubbles');    
        sw = false;
      }else{
        x.changeCurrentAnimation('default_animation');
        sw=true;
      }
     };
     document.getElementById("switch_toggler").addEventListener("click", function(){toggle_animation();}, false);
    </script>
    
## Public methods and properties refference:
###Class constructor:

    canvasInstance(canvasId, numberOfCircles, maxCircleRadius, circlesColorsArray)
    
**Usage**

    var x = new canvasInstance(...);

**Parameters:**

canvasId:               id of the canvas the circles will drawn on
 
numberOfCircles:        number of circles to be drawn
 
maxCircleRadius:        [optional] maximum circle radius. Default = 10;
 
 circlesColorsArry:      [optional] an array containing the colors the circles will be filled with. Default = ['#EA3556','#ED146F','#61D2D6','#9BF0E9','#EDDE45']
 
###Change animation method
 
     canvasInstance.changeCurrentAnimation(animationName)
     
**Usage:**

    //var x = new canvasInstance(...);
    x.changeCurrentAnimation('fizzyBubbles');
    
**Parameters:**

animationName: currently only 'default_animation' and 'fizzyBubbles' are available. More to come in short time.

###Note: 
The code is still unpolished and some major updates will follow regarding the way animations are defined. Therefore, documentation on how to create new animations will be added later. 

**P.S.** The non-minified code is heavily commented though.
