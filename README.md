# SWE3028-Exponential

This repository includes solution for the capstone design project. Below is given short information regarding each service. Moreover it is explained how to run and debug the whole solution locally.

## Overview of the system architecture
![Group 139 (4)](https://user-images.githubusercontent.com/46525030/145254901-ba9140cf-a6f7-457c-a336-ed8d58942eba.png)

## Solution

The repository contains 4 projects, each with different purpose. 

The **alerts-checker** folder contains the alert checker service. Its purpose is to perform continuous checks on all of the alerts that has been set by the users and send notifications if needed. The service is implemented in **Python**.

The **mobile** folder contains the mobile application solution. The application is developed using **React Native**, **Redux**, and **Typescript**.

The rest of the projects are done in **ASP.NET Core**.

The **identity** folder contains the service responsible for handling authentication and authization.

The **AlertsService** folder contains the service responsible for handling alert requests and notifications.

## Development setup

If you want to run the projects separately and debug them:

### Mobile Application
The mobile application handles notifications by using Firebase Cloud Messaging System. In order the notifications to be working properly on local development,
the application has to be registered with firebase.[In the following guide is explained how to achieve this.](https://firebase.google.com/docs/android/setup#register-app)

In order to run the mobile application localy an Android or iOS simulator is needed. Take into accont that iOS simulator is available only on MacOS
Run the following commands into the **mobile** folder

For android simulator:

```sh
npm install
npm run android
```

For iOS simulator:

```sh
npm install
npm run ios
```

### Authentication service

The service uses SQL Server database for storing the user data. SQL Server Management Studio has to be installed locally.
After installation and setup, set the database conneciton string in the following folder: "identity/identity/appsettings.Development.json"

DefaultConnection: DATABASE_CONNECTION_STRING

Then run the following commands into the **identity** folder, if you have **dotnet cli** installed:

```sh
dotnet run --project identity
```

Otherwise open the solution with Visual Studio, choose the server project as a startup project and run it with IIS Express.
The service is configured to run on http://localhost:64438/api/identity.

### Alerts service

Similarly to the authentication service, an SQL Server database is needed to be installed locally.

After installation and setup, set the database conneciton string in the following folder: "AlertsService/AlertsService/appsettings.Development.json"

DefaultConnection: DATABASE_CONNECTION_STRING

Then run the following commands into the **AlertsService** folder, if you have **dotnet cli** installed:

```sh
dotnet run --project AlertsService
```

Otherwise open the solution with Visual Studio, choose the server project as a startup project and run it with IIS Express.
The service is configured to run on http://localhost:64439/alerts.

### Alerts Checker service

You need to have **python3** installed on your system.
Then run the following commands into the **alerts-checker** folder

```sh
python install -r ./requirements

```

Create an .env file and set API keys for firebase, azure blob storage connection string, blob container for notifications and blob storage id

FIREBASE_API_KEY=
BLOB_CONNECITON_STRING=
NOTIFICATIONS_BLOB_CONTAINER=
BLOB_ID=

Then run the following command:

```sh
python main.py
```
