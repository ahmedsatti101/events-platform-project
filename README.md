# Events platform project

## About
This project allows businesses to create and share cycling events with the community. Members of the community are able to sign up to the platform by creating an account, browse available events and sign up for them. An event can also be added to your Google Calendar if you wish so. Business staff (admins) will be able to create events and assign other users as staff as well and these privileges are only availabe to staff.

## Running locally

### Clone the repository
Clone the repo by clicking on the Code button above and copying the link. Depending on your machine, open either the command line or powershell for Windows or the integrated terminal on macOS/linux and type 

```git clone <repo-url>```

replace `repo-url` with the link you copied earlier and press `Enter`. Naviagte to the `events-platform-project` folder that was created when you cloned the repo and open it in a code editor or IDE of your choice. 

### Install dependencies
Open the integrated terminal within the editor and run 

`npm install`

to install all the dependencies and dev dependencies.

## Connect to Amazon Web Services (AWS)
This project uses `AWS` as it's backend.

So to run it locally you will need to:

1. Create a AWS account, if you don't have one, by going to https://signin.aws.amazon.com/signup?request_type=register else skip to step 3,

2. Follow the steps to create your account

3. Click on `AWS Management Console` to navigate to your AWS console to create the necessary resources

4. In the console, search for DynamoDB which is the database used for this project

5. Click on `Create table`

6. For table details, the table name must be `events` and `partition key` must be `eventId` with data type of `String`

7. No additional configuration needed so click `Create table`

8. It may take a while for the table to be created, so start with creating a user pool with Cognito

9. From the left pane, select `User pools` and click on `Create user pool`

10. For application type select `Single-page application (SPA)` then choose a name for the application. Under `Configure options > Options for sign-in identifiers` select `Email`

11. Under `Required attributes for sign-up` select `email` then click `Create`.

12. Once the user pool is created, go to `Authentication > Sign-up` in the `Attribute verification and user account confirmation` section, click `Edit` and enable the `Keep original attribute value active when an update is pending` option.

13. You will need to allow users to sign in with their username (email) and password into your app. Under `Applications > App clients > your app > App client information` click Edit and under `Authentication flows` check the option `Sign in with username and password: ALLOW_USER_PASSWORD_AUTH` then save changes.

13. Under `Custom attributes` click `Add custom attributes`. For the name type `admin` and make sure `mutable` is checked. Users with this attribute set to true have admin privligies that allow them to create events and assign other users as admins.

14. Under `Branding > Message templates`, select `Verification message` click `Edit` and change the verification type to `Link`. Here you can customise your verification email subject and message that will be sent to users to confirm their accounts.

12. Create a `.env` file in the root directory that includes your credentials and user pool ids for the app to work. Take a look at `.env.example` to see how you should do it.

13. For the cognito client id, this can be found under `Applications > App clients > your app`. User pool ID can be found under `Overview` section of your user pool.

14. You will need a access key and a secert access key to make API calls to AWS services. In the upper right corner, select your account name, `Security credentials`, under `Access keys` click `Create access key`.

15. Copy the access key and secert access key into your `.env` file.

### Build and run the app
Run 

```npm run magic```

to bundle the app and run it using 

```npm run start```

where you will be automatically redirected to a browser window where the app runs. 

### Run tests
Tests for the app can be run using 

```npm run test```

## Try the app
The app is hosted on Netlify and you can go [here](https://cyclingevents.netlify.app/) to see it.

### Hosted app

#### Add administrator

1. Go to the [app](https://cyclingevents.netlify.app/) 

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
