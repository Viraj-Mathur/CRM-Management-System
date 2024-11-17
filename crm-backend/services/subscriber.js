const amqp = require('amqplib');

const pool = require('../config/db'); // MySQL connection pool

let buffer = []; // Buffer to hold messages
const BATCH_SIZE = 10; // Process after 10 messages
const INTERVAL = 5000; // Process every 5 seconds

// Function to process the buffer and update the database
const processBuffer = async () => {
    if (buffer.length === 0) return;

    try {
        const query = 'UPDATE message_logs SET status = ? WHERE id = ?';
        const promises = buffer.map(({ logId, status }) => pool.query(query, [status, logId]));

        await Promise.all(promises);

        console.log(`Processed ${buffer.length} updates.`);
        buffer = []; // Clear the buffer after processing
    } catch (error) {
        console.error('Error processing buffer:', error);
    }
};

// Start the subscriber
const startSubscriber = async () => {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const queue = 'delivery_status_updates';

        await channel.assertQueue(queue);
        console.log('Listening for messages on queue:', queue);

        // Listen for messages
        channel.consume(queue, (msg) => {
            if (msg !== null) {
                const message = JSON.parse(msg.content.toString());
                buffer.push(message); // Add message to buffer
                channel.ack(msg);

                // Process the buffer if it reaches the batch size
                if (buffer.length >= BATCH_SIZE) {
                    processBuffer();
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
