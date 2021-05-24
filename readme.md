# Baked Goods PH Web Application
Baked Goods PH is a web application developed for an imaginary bakery called Baked Goods PH started by 3 Lasallians during the COVID-19 Pandemic. The web application features a complete shop with the option to purchase breads online.

# How to Install and Run the Program
### 1.) via Heroku Web App
The web application is currently deployed via Heroku.
baked-goods-ph.herokuapp.com/

### 2.) Localhost Installation
Step 1: Clone the project via Github

    git clone https://github.com/dychosenone/g12_phase_2.git
Step 2: Run `npm install` to install all required packages.  
Step 3: Configure your MongoDB Database.
The current clone is connected to an environment variable. To connect your own local database, see Section 2a.)  
Step 4: You can use this to access the online database. Copy paste this to db.js and index.js. (mongodb+srv://user:shusanzingzoo@jacobscluster.raxpp.mongodb.net/baked-goods?retryWrites=true&w=majority)  
Step 5: run `npm start`  

The initial console output should be

    Listening to port 3000
    Connected to mongodb://localhost:27017/baked_goods

#### 2a.) Setting up your Local MongoDB database
Step 1: Create a local database named `baked-goods` using the MongoDB Atlas application.
Step 2: Create the following collections

 - transactions
 - sessions
 - users
 - adminUsers
 - products

Step 3: Create an admin user by inserting a document in the adminUsers collection.

    {"_id":{"$oid":"60a9f318e91d19b31dab8cde"},"username":"admin","password":"$2b$12$jPkNBQPaKEyD8lrfofzKHe4AqizN5Z6cx6YpLAfB3IBi0cziTvFHu"}

## Default Username and Passwords
Listed below are the username and passwords for access to the web application.
| Username |Password  |Role | 
|--|--| -- |
|admin  |abc123|Administrator |
|cheddar|abcdef123  |User|
|popcorn|abcdef123  |User|
|ilovebread|abcdef123  |User|

## Included Products
| Product|Description| 
|--|--|
|Original Sourdough Bread|Carefully Baked sourdough perfect with coffee or tea.|
|Original Chocolate Chip Cookies|Macarons perfect for your afternoon tea.|
|Macarons|Carefully Baked sourdough perfect with coffee or tea.|
|Classic Chocolate Cake|Our best-selling chocolate cake.|
|Cinnamon Rolls|Lola's classic Cinnamon Rolls.|
## Libraries Used
- ExpressJS
- SASS
- Bulma
- Bycrypt
- EJS
-  connect-mongo
- body-parser
- mongoose
- express-session
- express-validator
- fs
- git
- multer
- nanoid
- path
- uuid

## Authors
- Jacob Miguel Dy
- Giancarlo Tee
