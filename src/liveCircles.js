/* 
* liveCircles.js - an experiment based on paper.js
* Author: Tudor Leustean
* License: MIT
* version: 0.1 Alpha
*/

// Usage example: 
/* in HTML: 
* <script src= "scripts/paper.js"></script>
* <script type="text/paperscript" canvas="myCanvas" src= "scripts/liveCircles.js"></script>
* <canvas id ="myCanvas"></canvas>
* in js: var example = new liveCircles('myCanvas', 50, 10, 'center');
*/


paper.install(window);
var liveCircles = {
  //available animations array. add new animations here.
  animations : {
    default_animation  : function(canvas){return function(canvas){};},
    fizzyBubbles       : function(canvas, count, animationResources){
        // Define a random point in the view, which we will be moving
        // the each circle towards.
        for (var i = 0; i < count; i++) {
          var x = Point.random();
          animationResources.destination.push(x.multiply(canvas.projects[0].view.size));
        }
        // Run through the active layer's children (circles) list and change
        // their position and speed:
        for (var i = 0; i < count; i++) {
          var item =  canvas.projects[0].activeLayer.children[i];
          
          // Move the item 1/20th of its width to the right. This way
          // larger circles move faster than smaller circles:
          //item.position += item.bounds.width / 20;

          var vector = animationResources.destination[i].subtract(item.position);
          //var speed = Math.floor((Math.random() * 100) + 100); //(bigger is slower)
          
        var speed = Math.floor((Math.random() * 140) + 30); //(bigger is slower)
          item.position = item.position.add(vector.divide(speed));
          // If the distance between the path and the destination is less
          // than 5, we define a new random point in the view to move the
          // path to:
          //item.fillColor = "#61D2D6";
          if (vector.length < 5) {
            var x = Point.random();
            animationResources.destination[i] = x.multiply(canvas.projects[0].view.size);
          }
        }
    }
  },
  //class to be instantiated on each canvas
  /*
  * Class constructor parameters:
  * canvasId:             name of the canvas the circles will drawn on
  * numberOfCircles:        number of circles to be drawn
  * maxCircleRadius:        [optional] maximum circle radius. Default = 10;
  * circlesColorsArry:      [optional] an array containing the colors the circles will be filled with. Default = ['#EA3556','#ED146F','#61D2D6','#9BF0E9','#EDDE45']
  *
  * |*To be implemented*|
  * circlesInitialPosition: random, center, positions_array.
  */ 
  canvasInstance : function(canvasId, numberOfCircles, maxCircleRadius, circlesColorsArray){
    var privateMembers = [];
    var that = this;

    that.animationIndex = null;
    that.currentAnimation = null;

    var constructorParametersOk = true;
    //check if required constructor parameters are defined and load default values
    //check canvasId parameter and run its associated code
    if(typeof canvasId !== 'string'){
      console.log('liveCircles Error: \'canvasId\' is not defined or is not a string.');
      constructorParametersOk = false;
    }else{
      //Load canvas
      this.canvas = document.getElementById(canvasId);
      //check if canvas has been found
      if(this.canvas){
        //set the canvas' size and draw it
        //console.log('loading the bitches on the train to ho town');
        privateMembers.objectCanvas = new paper.PaperScope();
        privateMembers.objectCanvas.setup(this.canvas);

        privateMembers.objectCanvas.view.viewSize = new paper.Size(this.canvas.offsetWidth, this.canvas.offsetHeight);
      }else{
        console.log('liveCircles Error: No canvas with id '+canvasId+' could be found.');
        constructorParametersOk = false;
      }
    }

     //check circlesColorsArray parameter and run its associated code
     if(typeof circlesColorsArray !== 'Array'){
      console.log('liveCircles Warning: \'circlesColorsArray\' is not defined or is not an Array. Default colors have been assigned.');
      circlesColorsArray = ['#EA3556','#ED146F','#61D2D6','#9BF0E9','#EDDE45'];
     }

     //check maxCircleRadius parameter and run its associated code
     if(typeof maxCircleRadius !== 'number'){
      console.log('liveCircles Warning: \'maxCircleRadius\' is not defined or is not a Number. Default value of 10 has been assigned.');
      maxCircleRadius = 10;
     }

     //check numberOfCircles parameter and draw them on the canvas
     if(typeof numberOfCircles !== 'number'){
      console.log('liveCircles Error: \'numberOfCircles\' is not defined or is not a Number.');
      constructorParametersOk = false;
     }

    var load_elements_on_canvas = function(){

      var initialScalesArray = [];
      //load circles on the canvas
        // Place symbol(circle) instances:
        for (var i = 0; i < numberOfCircles; i++) {
          // Circle original position. 
          var center = privateMembers.objectCanvas.view.center;
          // Create a symbol, which we will use to place instances of later:
          var path = new privateMembers.objectCanvas.Path.Circle({
            center: [0, 2],
            radius: maxCircleRadius,
            fillColor: circlesColorsArray[Math.round(Math.random() * (circlesColorsArray.length - 1))]
          });
          path.scale(i / numberOfCircles);
          initialScalesArray[i] = i/numberOfCircles;
        }
    };

    var draw_canvas = function(){
      privateMembers.objectCanvas.view.draw();
    };

    /*
    *  pushes the default animation in the animations array with its instance associated canvas as a parameter
    *  sets instance.animationIndex
    */
    var load_default_animation = function(){
      that.currentAnimation = 'default_animation';
    }

    //current running animation


    //contains variables needed for 
    var commonAnimationResources = {
     destination : [],
    };

    if(constructorParametersOk){
      load_elements_on_canvas();
      draw_canvas();
      load_default_animation();
      //runs selected animation onframe
      privateMembers.objectCanvas.projects[0].view.onFrame = function(event){
        liveCircles.animations[that.currentAnimation](privateMembers.objectCanvas, numberOfCircles, commonAnimationResources);
      };
    }

    /*public*/

    //changes the animation running its associated canvas
    this.changeCurrentAnimation = function(animationName){
      if(liveCircles.animations.hasOwnProperty(animationName)){
        that.currentAnimation = animationName;
      }else{
        console.log('liveCircles Error: requested animation is not defined. Continuing with previous one.');
      }
    };

    this.animationSettings = {

    };


  }
};