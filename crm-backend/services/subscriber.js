const amqp = require('amqplib');
const pool = require('../config/db'); // MySQL connection pool

let buffer = []; // Buffer to hold messages
const BATCH_SIZE = 10; // Process after 10 messages
const INTERVAL = 5000; // Process every 5 seconds

// Function to process the buffer and update the database
const processBuffer = async () => {
    if (buffer.length === 0) return; // Skip processing if the buffer is empty

    try {
        const query = 'UPDATE message_logs SET status = ? WHERE id = ?';
        const connection = await pool.getConnection(); // Get MySQL connection from pool

        try {
            await connection.beginTransaction(); // Start transaction

            // Execute queries in batch
            for (const { logId, status } of buffer) {
                await connection.query(query, [status, logId]);
            }

            await connection.commit(); // Commit the transaction
            console.log(`Processed ${buffer.length} updates.`);
        } catch (err) {
            await connection.rollback(); // Rollback on error
            console.error('Error during transaction, rolled back:', err);
        } finally {
            connection.release(); // Release connection back to pool
        }

        buffer = []; // Clear the buffer after processing
    } catch (error) {
        console.error('Error processing buffer:', error);
    }
};

// Start the subscriber
const startSubscriber = async () => {
    try {
        const connection = await amqp.connect('amqps://idwohalj:Wpo8f0FpgJw37OgK2duJZXsFOkFs83jh@sparrow.rmq.cloudamqp.com/idwohalj'); // RabbitMQ connection
        const channel = await connection.createChannel(); // Create a channel
        const queue = 'delivery_status_updates'; // Queue name

        await channel.assertQueue(queue, { durable: true }); // Ensure the queue is durable
        console.log('Listening for messages on queue:', queue);

        // Listen for messages
        channel.consume(queue, (msg) => {
            if (msg !== null) {
                try {
                    const message = JSON.parse(msg.content.toString());
                    buffer.push(message); // Add message to buffer
                    channel.ack(msg); // Acknowledge the message

                    // Process the buffer if it reaches the batch size
                    if (buffer.length >= BATCH_SIZE) {
                        processBuffer();
                    }
                } catch (error) {
                    console.error('Error parsing message:', error);
                    channel.nack(msg, false, false); // Negative acknowledgment for the message
                }
            }
        });

        // Process the buffer at regular intervals
        setInterval(processBuffer, INTERVAL);
    } catch (error) {
        console.error('Error in subscriber:', error);
    }
};

startSubscriber();

module.exports = { startSubscriber };
