var express = require("express");
var app = express();
var amqp = require('amqplib/callback_api');


const port = 3001;


amqp.connect('amqp://localhost', (error, conn) => {
    conn.createChannel((err, ch) => {
        var queue = 'FirstQueue';
        var message = { type: '2', content: 'Hello RabbitMQ is working' };


        ch.assertQueue(queue, {durable: false});
        ch.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        console.log("yes it works");
    });



    setTimeout(() => {
        conn.close() ;
        process.exit(0); }, 500);
    
});


app.listen(port, () => console.log(`App is listening on port ${port}!`))