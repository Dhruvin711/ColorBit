# ColorBit

ColorBit is a web-based game built with React.js for the frontend and a Django Python backend with a Django Rest Framework API. Earn points by tapping blue tiles while avoiding red ones for an engaging experience.


## Features
- **Game Controls:** Seamlessly initiate or pause the game with the "Start Game" and "Stop Game" buttons. Choose from levels 1 to 5 to set the animation speed.
- **Scoring System:** Monitor user performance with a scoring mechanism. Earn +10 points for clicking on blue tiles and incur -10 points for red tiles.
- **Interactive Feedback:** Tiles provide visual feedback by blinking three times upon clicking.
- **Backend Integration:** Integrated backend with django for server-side logic, generating initial grid patterns served to the frontend.

## Getting Started

### Frontend

To run the ColorBit Challenge frontend locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/Dhruvin711/ColorBit.git
    cd colorbit
    ```

2. Navigate to the frontend directory:

    ```bash
    cd client
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the development server:

    ```bash
    npm start
    ```


### Backend

To run the ColorBit backend locally, follow these steps:

1. Navigate to the backend directory:

    ```bash
    cd server
    ```

2. Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

3. Start the Django development server:

    ```bash
    python manage.py runserver
    ```

