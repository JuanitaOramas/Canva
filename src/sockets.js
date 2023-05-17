module.exports = io => {

    var line_history = [];

    io.on('connection',  socket => {
        console.log('New User Connected');

        //apenas usuario se conecte, recorro arreglo y envio datos. (atraves de data.line) 
        // guardar info para que nuevas conexiones tambien tengan esa info
        for (let i in line_history){
            socket.emit('draw_line', {line: line_history[i]});
        }

        
        //socket.emit('draw_line',)

        socket.on("draw_line", cursorData =>{
            line_history.push(cursorData.line); //almacena
            io.emit('draw_line', cursorData); //reenvia usuarios, cliente envia
        });
        
        socket.on("erase_line", cursorData =>{
            line_history.splice(0,line_history.length); //borra
            io.emit('erase_line', cursorData); //reenvia usuarios, cliente envia
        });

    });
}