# UMaT PAST QUESTIONS DATABASE

A web application for students and lecturers to download and upload past questions respectively.

<br>

This project was developed using [React](https://react.dev/) and [Firebase](https://firebase.google.com/) and bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Get Started

- Clone the repository
- Install project dependencies

```bash
npm install
```

- Create a [firebase project](https://firebase.google.com/docs/web/setup)
  - Enable `email/password authentication` for your project
  - Create a [cloud firestore database](https://firebase.google.com/docs/firestore/quickstart#create)
    - Create two collections `users` and `past_questions`
      - **users** collections stores user information
      - **past_questions** stores links to past questions for various programs and year groups.
        - Create a `document` for each program
          - `Document ID` is the _program name_
            - Each document has **4 fields** each of type **map**
              (`LEVEL 100`, `LEVEL 200`, `LEVEL 300`, `LEVEL 400`)
            - Each of the _4 fields_ contain `two arrays` (`1ST SEMESTER` and `2ND SEMESTER`)
              - These arrays store past questions.
  - Create a Fire
- Firebase api keys to .env file

```bash
REACT_APP_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_AUTH_DOMAIN=xxxxxxxxxxx.firebaseapp.com
REACT_APP_PROJECT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_STORAGE_BUCKET=xxxxxxxxxxxxxxxxxxxx.appspot.com
REACT_APP_MESSAGING_SENDER_ID=xxxxxxxxxx
REACT_APP_APP_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_MEASUREMENT_ID=xxxxxxxxxxxx
```

- Set up CORS for the Firebase Storage bucket
  - Install [gsutil](https://cloud.google.com/storage/docs/gsutil_install)
  - Create a file `cors.json` in the root directory the project with the following content
  ```json
  [
    {
      "origin": ["*"],
      "method": ["GET"],
      "maxAgeSeconds": 3600
    }
  ]
  ```
  - `"*"` allows access from all web addresses.
    Change to specific web addresses to restrict access.
  - Run the following command in the terminal from the root project directory.
  ```bash
  gsutil cors set cors.json gs://[BUCKET_NAME]
  ```
  - Replace `[BUCKET_NAME]` with the name of your storage bucket (xxxxxxxxxxxxxxxxxxxx.appspot.com).
- Spin up development server

```bash
npm start
```
