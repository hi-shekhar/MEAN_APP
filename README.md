# MEAN_APP
# What You need: 
Angular 6 , Node ^v10.6.0, mongod version ^v3.4.9 , nodemon(Better if you install), Robo3T(GUI for mongoDB)
# How to Start: 
	1.npm install all dependencies 
	2.Start your db server:
		(i) C:\Program Files\MongoDB\Server\3.4\bin\mongod --dbpath "your db path eg. E:\MongoDatabase\database"
		(ii)C:\Program Files\MongoDB\Server\3.4\bin\mongo
	3.Run your server (index.js)
		nodemon index
	4.Run your client side code (angular code): go to client folder 
		npm start

# Feature:
	1. Login and Registration page (Took reference from David Acousta MEAN Youtube Video)
	2. Forget password and email id
	3. Profile edit and view mode
	4. Reset Password
	5. Breakout Game (Initial phase , more changes will come here)
	6. AuthGaurd for safe navigation
	7. Redirect back To the same page after Login
	8. Login session for 24hrs
		