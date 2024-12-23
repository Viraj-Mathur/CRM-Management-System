# CRM Management System

## Live Link for the project: https://crm-management-system.vercel.app/

## Overview
The CRM Management System is a full-stack application designed to streamline customer relationship management and campaign execution. It features a React-based frontend, a Node.js backend, RabbitMQ for message queuing, and MySQL as the database. The project includes robust functionality for data ingestion, audience segmentation, campaign management, and personalized messaging.

## Features

### 1. Customer Management
- APIs to store, update and delete customer data in a MySQL database.
- Designed for seamless integration with frontend and external systems.

### 2. Campaign & Audience Management
- **Audience Creation:**
  - Users can define audience segments based on customer data with filtering logic (AND/OR conditions).
  - Example Filters:
    - Customers with total spending > INR 10,000.
    - Customers with spending > INR 10,000 and visits <= 3.
    - Customers who haven’t visited in the last 3 months.
      
- **Campaign Management:**
  - Create, view, and manage(delete) campaigns from the database using APIs.
  - Save defined audience data in a `communications_log` table.

### 3. Message Sending
- Implemented a message queuing system using RabbitMQ for efficient handling.
- Includes a “Delivery Receipt” API to simulate message delivery with random statuses:
  - 90% “SENT”
  - 10% “FAILED”
- Updates the communication status in the database based on delivery results.

## Technologies Used

### Frontend
- **React.js**: For building a responsive and dynamic user interface.
- **Tailwind CSS**: For styling and design.

### Backend
- **Node.js**: For server-side scripting and API logic.
- **Express.js**: For handling HTTP requests.
- **RabbitMQ**: For message queuing and asynchronous task handling.
- **MySQL**: For relational database management.

### Other Tools
- **Postman**: For API testing.
- **Google OAuth**: For user authentication.

## Installation and Setup

### Prerequisites
- Node.js (v16 or higher)
- MySQL Server
- RabbitMQ Server
- NPM (Node Package Manager)

### Backend Setup
1. Navigate to the `crm-backend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the environment variables in a `.env` file:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=crm
   RABBITMQ_URL=amqp://localhost
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the `crm-frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the environment variables in a `.env` file if needed.
4. Start the development server:
   ```bash
   npm start
   ```

## Usage
1. Launch the backend and frontend servers.
2. Access the application at `http://localhost:3000`.
3. Use the web interface to:
   - Define audience segments.
   - Create and manage campaigns.
   - Send and track personalized messages.

## Database Schema

### Customer Table
- **Columns:**
  - `id`: Primary key.
  - `name`: Customer name.
  - `email`: Customer email.
  - `total_spent`: Total spending by the customer.
  - `last_visit`: Last visit date.
  - `visits`: Number of visits.

### Communications Log Table
- **Columns:**
  - `id`: Primary key.
  - `audience_id`: Reference to the audience segment.
  - `message`: Message sent.
  - `status`: Delivery status (`SENT` or `FAILED`).

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.


