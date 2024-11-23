const amqp = require('amqplib');

// Function to publish messages to the queue
const publishMessage = async (queueName, message) => {
    try {
        // Connect to RabbitMQ server
        const connection = await amqp.connect('amqps://idwohalj:Wpo8f0FpgJw37OgK2duJZXsFOkFs83jh@sparrow.rmq.cloudamqp.com/idwohalj');
        const channel = await connection.createChannel();

        // Assert that the queue exists
        await channel.assertQueue(queueName, { durable: true });

        // Send the message to the queue
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
            persistent: true, // Make messages persistent
        });

        console.log(`Message sent to queue "${queueName}":`, message);

        // Close the connection after a short delay to ensure message is sent
        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (error) {
        console.error(`Error publishing message to queue "${queueName}":`, error);
    }
};

module.exports = { publishMessage };
