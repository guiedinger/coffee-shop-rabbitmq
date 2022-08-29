#!/usr/bin/env node

var amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    var exchange = "coffee_shop";

    channel.assertExchange(exchange, "topic", {
      durable: true,
      autoDelete: false,
    });

    channel.assertQueue(
      "coffee-deliver",
      { durable: true },
      function (error2, q) {
        if (error2) {
          throw error2;
        }
        console.log(
          ' [*] Waiting to deliver "#.finished" coffees.  To exit press CTRL+C'
        );

        channel.bindQueue(q.queue, exchange, "#.finished");

        channel.consume(
          q.queue,
          function (msg) {
            console.log(
              " [x] %s:'%s your coffee is ready!'",
              msg.fields.routingKey,
              msg.content.toString()
            );
          },
          {
            noAck: true,
          }
        );
      }
    );
  });
});
