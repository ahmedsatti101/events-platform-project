# Events platform project

## About
This project allows an imagined business create and share cycling events with the community. Members of the community are able to sign up to the platform by creating an account, browse available events and sign up for them. An event can also be added to your Google Calendar if you wish so. Business staff (admins) will be able to create events and assign other users as staff as well and these privileges are only availabe to staff.

## Running locally
Clone the repo by clicking on the Code button above and copying the link. Depending on your machine, open either the command line or powershell for Windows or the integrated terminal on macOS/linux and type `git clone <repo-url>` replace repo-url with the link you copied earlier and press `Enter`. Naviagte to the `events-platform-project` folder that was created when you cloned the repo and open it in a code editor or IDE of your choice. Open the integrated terminal within the editor and run `npm install` or `npm install --force` to intall all the dependencies and dev dependencies to run the app on your machine. You'll need a `.env` file in the root of the folder, look at `.env.example`, which includes all the config details for the app to run because `Firebase` is used as the backend. Run `npm run magic` to bundle the app and run it using `npm run start` where you will be automatically redirected to a browser window where the app runs. Tests for the app can be ran using `npm run test`.

## Is the app hosted anywhere?
The app is hosted on Netlify and you can go [here](https://cyclingevents.netlify.app/) to see it.
