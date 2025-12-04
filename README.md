# Flight Reservation Frontend

This is the frontend application for the Flight Reservation System. It is built using HTML, CSS, and JavaScript.

## ⚠️ Important: Run the Server First

**Before using this frontend, you MUST have the backend server running.**

This frontend expects a backend API running at `http://localhost:8080`.
Please ensure the Java backend is started and listening on port 8080 before you attempt to log in or search for flights.

## 🚀 Getting Started

1.  **Start the Backend**: Ensure you have **JDK 17** installed. Run the following command from the project root (parent of `flight-frontend`):
    ```bash
    java -jar server/FlightReservationSystem-1.0.jar
    ```
2.  **Open the Frontend**:
    *   You can simply open `index.html` in your web browser.
    *   **Recommended**: Use a local static server like "Live Server" in VS Code for the best experience.

## 📂 Project Structure

*   `index.html`: Login and Registration page.
*   `flights.html`: Main dashboard to search and book flights.
*   `bookings.html`: View your booking history.
*   `admin.html`: Admin dashboard (accessible only to admin users).
*   `style.css`: Global styles.
*   `app.js`: Main JavaScript logic for API communication.

## ✨ Features

*   **User Authentication**: Login and Register.
*   **Flight Search**: Search by source, destination, and date.
*   **Filtering**: Filter by airline, price range, and sort by fare.
*   **Seat Selection**: Interactive seat map for booking.
*   **Booking History**: View and cancel your bookings.
*   **Dark Mode**: Toggle between light and dark themes.


## 📸 Mockup Screenshots

### Login Page
![Login Page](images/login_page.png)

### User Dashboard
![User Dashboard](images/user_dashboard.png)

### Admin Dashboard
![Admin Dashboard](images/admin_dashboard.png)

## 🔗 Backend Repository

The backend code for this project can be found here:
[https://github.com/JavaProgswing/flight-server](https://github.com/JavaProgswing/flight-server)

