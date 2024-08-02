# Events platform project

## About
This project allows an imagined business create and share cycling events with the community. Members of the community are able to sign up to the platform by creating an account, browse available events and sign up for them. An event can also be added to your Google Calendar if you wish so. Business staff (admins) will be able to create events and assign other users as staff as well and these privileges are only availabe to staff.

## Running locally

### Clone the repository
Clone the repo by clicking on the Code button above and copying the link. Depending on your machine, open either the command line or powershell for Windows or the integrated terminal on macOS/linux and type 

```git clone <repo-url>```

replace `repo-url` with the link you copied earlier and press `Enter`. Naviagte to the `events-platform-project` folder that was created when you cloned the repo and open it in a code editor or IDE of your choice. 

### Install dependencies
Open the integrated terminal within the editor and run 

`npm install` or `npm install --force`

to install all the dependencies and dev dependencies. 


### Build and run the app
Run 

```npm run magic```

to bundle the app and run it using 

```npm run start```

where you will be automatically redirected to a browser window where the app runs. 

### Run tests
Tests for the app can be run using 

```npm run test```

## Connect to Firebase
This project uses `Firebase` as it's backend.

So to run it locally you will need to:

1. Create a firebase application by going to https://firebase.google.com/,

2. Click on `Go to console` button top right

3. Assuming this the first time you work with Firebase, select `Get started with a Firebase project` option

4. Type a name for your project, and click `Continue`

5. Select the option you prefer for Google Analytics, and click `Continue`

6. Click `Create project`

7. After project is created, click `Continue`. You will be directed your project homepage.

8. Under `Get started by adding Firebase to your app` select the `Web` option (`</>` icon)

9. Provide app nickname and click on `Register app`

10. Firebase SDK was already installed when you installed the project dependencies above

11. You need to copy the `firebaseConfig` object values on screen, without the quotes, into a `.env` file, which you need to create, in the root directory.

```
const firebaseConfig = {
  apiKey: "xxxxxx", <-- copy what is inside the quotes
  authDomain: "xxxxx",
  projectId: "xxxxxx",
  storageBucket: "xxxxxx",
  messagingSenderId: "xxxx",
  appId: "xxxxx",
  measurementId: "xxxx"
};
```

12. Take a look at `.env.example` to see how you should do it.

13. Click `Continue to console` to finish and return to project homepage

14. Click on `Build > Authentication` on the left side menu

15. Click `Get started`

16. Select `Email/Password`

17. Enable `Email/Password` option, and click `Save`

## Setup Firebase locally

1. Install the Firebase CLI tools by running 

`npm install -g firebase-tools`

2. Login into firebase with `firebase login`

3. For option `Usage and error reporting information` select the option you prefer, and click `Enter`

4. Initialize firebase function with command

`firebase init functions`

5. Select `Use an existing project` and press `Enter`

6. You should see the firebase project you created earlier, select it and press `Enter`

7. For `What language` select `Typescript`

8. To use `ESLint` press `Enter` to select (default `Yes`)

9. Press `Enter` to start installing dependencies

10. After installing the dependencies, copy the contents of `firebaseFunctionsIndex.txt` in the root directory to replace contents of `functions/src/index.ts`

11. Deploy the function to firebase by running `firebase deploy --only functions`

12. Firebase might ask you to go on the `Pay as you go` plan in order to complete the deployment.

13. After deploying the function, the app is ready to use.

## Try the app
The app is hosted on Netlify and you can go [here](https://cyclingevents.netlify.app/) to see it.

### Hosted app

#### Add administrator

1. Go to [Demo app](https://cyclingevents.netlify.app/) 

2. On the app homepage click on `Sign Up` to create an account
3. Enter an email and password
4. Click `Sign up`
5. Navigate to https://cyclingevents.netlify.app/add-admin
2. Enter the email you signed up with
3. Click `Submit`
4. Refresh the app to see the `Create event` and `Add admin` menu items in the navigation bar.

### Local app

#### Add adminitrator
To add new administrator user:

1. Run the app with `npm run start`
2. On the app homepage click on `Sign Up`
3. Enter email and password
4. Click `Sign up`

Make yourself an Administrator
1. Navigate to http://localhost:3000/add-admin
2. Enter the email you signed up with
3. Click `Submit`
4. Refresh the app to see the `Create event` and `Add admin` menu items in the navigation bar.
