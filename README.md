# UMaT PAST QUESTIONS DATABASE

A web application for students and lecturers to download and upload past questions respectively.

## Get Started

This project was developed using [React](https://react.dev/) and [Firebase](https://firebase.google.com/) and bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Local Setup

#### Clone Repository

Run the following command to create a local copy of the repository.

```bash
git clone https://github.com/Quarcoo-arc/umat_past_questions.git
```

#### Install Project Dependencies

In the root directory of the project run the following to install application dependencies.

```bash
npm install
```

#### Setup Firebase

This application makes use of **Firebase** primarily for **authentication** and **storage**.

- Create a [firebase project](https://firebase.google.com/docs/web/setup)
- Enable `email/password authentication` for your project
- Create a [cloud firestore database](https://firebase.google.com/docs/firestore/quickstart#create)
  - Create two collections `users` and `past_questions`
  - **users** collections stores user information
  - **past_questions** stores links to past questions for various programs and year groups.
- Create a `document` for each program
  - Set `Document ID` to the _program name_
  - Create **4 fields** for each document, each of type **map**
    (`LEVEL 100`, `LEVEL 200`, `LEVEL 300`, `LEVEL 400`)
  - Each of the _4 fields_ contain `two arrays` (`1ST SEMESTER` and `2ND SEMESTER`)
  - These arrays store past questions.
- Store Firebase api keys in a `.env` file

```bash
REACT_APP_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_AUTH_DOMAIN=xxxxxxxxxxx.firebaseapp.com
REACT_APP_PROJECT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_STORAGE_BUCKET=xxxxxxxxxxxxxxxxxxxx.appspot.com
REACT_APP_MESSAGING_SENDER_ID=xxxxxxxxxx
REACT_APP_APP_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_MEASUREMENT_ID=xxxxxxxxxxxx
```

#### Setup CORS for Firebase Storage Bucket

In order to allow for past questions to be downloaded, CORS needs to be set up for the application.
The steps below provide a guide as to how to get that done.

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

#### Start Development Server

Run the following command to spin up the development server 🚀

```bash
npm start
```
