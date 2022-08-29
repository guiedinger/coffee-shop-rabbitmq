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
      "coffee-maker",
      { durable: true },
      function (error2, q) {
        if (error2) {
          throw error2;
        }
        console.log(
          ' [*] Waiting for make coffee from "order.*". To exit press CTRL+C'
        );

        channel.bindQueue(q.queue, exchange, "order.*");

        channel.consume(
          q.queue,
          function (msg) {
            console.log(
              " [x] %s:'%s'",
              msg.fields.routingKey,
              msg.content.toString()
            );
            const timeToFinish = Math.random() * 10000;
            setTimeout(() => {
              console.log(
                " [v] %s:'%s' coffee finished in %s seconds",
                `${msg.fields.routingKey}.finished`,
                msg.content.toString(),
                (timeToFinish / 1000).toPrecision(2).toString()
              );
              channel.publish(
                exchange,
                `${msg.fields.routingKey}.finished`,
                Buffer.from(msg.content)
              );
            }, timeToFinish);
          },
          {
            noAck: true,
          }
        );
      }
    );
  });
});
