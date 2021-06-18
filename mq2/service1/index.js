const { connect } = require('amqplib');
const express = require('express');
const app = express();
const amqp = require("amqplib");


var channel;
var connection;
// connect();
async function connect() {


    try {
    const amqpServer = "http://localhost:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();


    await channel.assertQueue("rabbit");
    }

    catch(err) {
        console.log(err)
    }




}

app.get("/send", (req, res) => {


});

app.listen(5001, () => {

    console.log(`server at 5001`);

});