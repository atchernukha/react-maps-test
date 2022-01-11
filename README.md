# react-maps-test

## Used Technologies

* React, Material UI, react-leaflet to build frontend
* Node/Express, Sequelize to backend
* Postgres database  
* s3 bucket AWS to store static files

## Result

You can check the app running clicking [here](https://react-maps-test.herokuapp.com/)

## How to Run

Follow the steps below to run the application on your computed, first of all, you'll need to have these tools installed on your computer: Git, Node.js, NPM or Yarn
If you have all of these tools installed on your computer, just follow the steps below:

* Clone the repository in some directory of your computer
>$ git clone git@github.com:atchernukha/react-maps-test.git
* Enter in the repository
>$ cd react-maps-test

### DATABASE
* on Postgres server dbserver create new user and new database with owner new user:
>sudo -u postgres createdb db_name  
>sudo -u postgres psql  
>create user db_user with password 'db_password';  
>grant ALL on database db_name to db_user;  
>quit;  

### Backend

* Enter in the server directory
>$ cd server
* Create .env file with port and db params:

>NODE_ENV=development  
>PORT=5000  
>PG_DATABASE=db_name  
>PG_USER=db_user  
>PG_PASSWORD=db_password  
>PG_HOST=dbserver  
>PG_PORT=5432
 
* Install the dependencies
>$ npm install
* Start the app
>$ npm run dev

### Frontend

* Enter in the client directory
>$ cd ../client
* Create .env file with API host params:

>REACT_APP_API_HOST = 'http://localhost:5000/'

* Install the dependencies
>`$ npm install`
* Start the app
>`$ npm start`



After following these steps, the terminal will show you in which port it's running, it's on the port 3000 usually, so, you'll just need to enter in your browser and type localhost:3000, then you'll see the app running. When you want to stop it, go to the terminal that you used to start the app, and type CTRL+C, this way you'll stop the app

> [!IMPORTANT]
> ## Technical requirements:
>* SPA approach for frontend
>* React/Vue.js should be used
>* Node.js for backend
>* Database (MongoDB / PostgreSQL / MySQL)

> [!IMPORTANT]
> ## Functional requirements:
>* The web application should have a trello-like dashboard.
>* Users should have an ability to create as many lists as they want.
>* Users should be able to create cards inside lists. Cards should have a title and timestamp of last edited time. It should be shown somewhere on the card and formatted like “30 minutes ago” or “2 days ago”.
>* Users should be able to move cards from one list to another with drag and drop
>* Users can delete cards and empty lists

> [!TIP]
> ## Would be a plus (not necessary)
>* Have a hosted frontend/backend/side 
>* Adaptive design  
>* Save on change 

> [!NOTE] 
> ## Additional info:
>* UI libraries can be used (material ui, vuetify, etc.)
>* No animation required
>* No perfect ui required
>* Code should follow best practices (structure, patterns, etc)

