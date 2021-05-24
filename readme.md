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
Step 3: Configure your MongoDB Database (Optional)
The current clone is already connected to the MongoDB atlas database. To connect your own local database, see Section 2a.)

#### 2a.) Local MongoDB database
Step 1: Create a local database using the MongoDB Atlas application.
Step 2: Create the following collections

 - transactions
 - sessions
 - users
 - adminUsers
 - products

Step 3: Create an admin user by inserting a document in the adminUsers collection.

    enter code here

