window.renderStatistics = function (ctx, names, times) {
    console.log(names);
    console.log(times);
    ctx.fillStyle='rgba(0, 0, 0, 0.7)';
    ctx.strokeRect(110, 20, 420, 270);
    ctx.fillRect(110, 20, 420, 270);

    ctx.fillStyle = 'rgba(256, 256, 256, 1.0)';
    ctx.strokeRect(100, 10, 420, 270);
    ctx.fillRect(100, 10, 420, 270);

    

    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';

    ctx.fillText('Ура вы победили!', 120, 40);

    var max = -1;
    var maxName;

    for (i=0; i < times.length; i++){
        var current = times[i];

        if (current > max) {
            max = current;
            maxName=names[i];
        }
    }
  
    var histogramHeight = 150;              // px;
    var step = histogramHeight / (max - 0); // px;
    console.log(step);
    
    ctx.fillText('Худшее время: ' + max.toFixed(2) + 'мс у игрока ' + maxName, 120, 60);
  
    var barWidth = 40; // px; 
    var indent = 50;    // px;
    var initialX = 128; // px;
    var initialY = 100;  // px;
  
    ctx.textBaseline = 'bottom'; // положение надписи от левого верхнего угла
    
    for(var i = 0; i < times.length; i++) {
        // ctx.fillRect(initialX, initialY + indent * i, times[i] * step, barWidth);
        var coordY =   initialY + histogramHeight - times[i]*step;
        var coordX =  initialX + i*barWidth + i*indent;
        console.log(coordY);
        
        if (names[i]==='Вы'){
           ctx.fillStyle = 'rgba(255, 0, 0, 1.0)'; 
       }else{
            ctx.fillStyle ='rgba(0, 0, 255, '+Math.random()+')';
            
       }
        
        ctx.fillRect(coordX, coordY, barWidth, times[i] * step);
        ctx.fillStyle = '#000';
        ctx.fillText(times[i].toFixed(0), coordX, coordY);
        ctx.fillText(names[i], coordX, initialY+histogramHeight+20);
    }
};