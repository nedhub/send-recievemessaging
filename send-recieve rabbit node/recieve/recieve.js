var express = require('express');
var app = express();

var amqp = require('amqplib/callback_api');

const port = 3001;

amqp.connect('amqp://localhost', (error, conn) => {
    conn.createChannel((err, ch) => {
        var queue = 'FirstQueue';
        


        ch.assertQueue(queue, {durable: false});
        console.log(`waiting for message in ${queue}`);
        ch.consume(queue, (message) => {

            console.log(`Recieved ${message.content}`);

        },{noAck: true});
        
    });



    setTimeout(() => {
        conn.close() ;
        process.exit(0); }, 500);
    
});




app.listen(port, () => console.log(`App is listening on port ${port}!`))