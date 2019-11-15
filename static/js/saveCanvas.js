function save() {
    var canvas = document.getElementById('canvas');
    destinationCanvas = document.createElement("canvas");
    destinationCanvas.width = canvas.width;
    destinationCanvas.height = canvas.height;

    destCtx = destinationCanvas.getContext('2d');

    //create a rectangle with the desired color
    destCtx.fillStyle = "#FFFFFF";
    destCtx.fillRect(0,0,canvas.width,canvas.height);

    //draw the original canvas onto the destination canvas
    destCtx.drawImage(canvas, 0, 0);

    //finally use the destinationCanvas.toDataURL() method to get the desired output;
    document.getElementById('image').value = destinationCanvas.toDataURL('image/jpeg', 1.0);
    document.forms["canvasForm"].submit();
}