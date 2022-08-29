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
    var args = process.argv.slice(2);
    var key = args.length > 0 ? args[0] : "coffee";
    key = `order.${key}`;
    var msg = args.slice(1).join(" ") || "Guilherme";

    channel.assertExchange(exchange, "topic", {
      durable: true,
      autoDelete: false,
    });
    channel.publish(exchange, key, Buffer.from(msg), { persistent: true });
    console.log(" [x] Sent %s: Client name: '%s'", key, msg);
  });

  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
});
