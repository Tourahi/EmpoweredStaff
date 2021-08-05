# EmpoweredStaff

##### Human resource management application.





# Install

* You will need :

  * npm
  * nodejs
  * mongoDB

* After cloning the repo you will need to add the conf.env file

  * in /EmpoweredStaff/config/conf.env

    * ```js
      PORT = 8080
      MONGO_URI = 'mongodb://127.0.0.1:27017'
      DBNAME    = 'EmpStaff'
      GOOGLE_CLIENT_ID = XXXXXXX
      GOOGLE_CLIENT_SECRET = XXXXXXXX
      ```

* Then install npm packages 

  * ```shell
    npm i
    ```

* Then run the script

  * ```shell
    npm run dev
    ```

* You should see 

  * ```shell
    [nodemon] 2.0.12
    [nodemon] to restart at any time, enter `rs`
    [nodemon] watching path(s): *.*
    [nodemon] watching extensions: mjs,hbs
    [nodemon] starting `node app.mjs`
    Server is running on port 8080.
    MongoDB instance connected : 127.0.0.1
    Database connected : EmpStaff
    connection url : mongodb://127.0.0.1:27017/EmpStaff
    
    ```

  * If else please make sure your mongoDB service is running.

