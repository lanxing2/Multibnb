#Introduction:

  Multibnb is a website which users can rent in and rent our cars. User with spare cars can post there cars on the website. And user who want to rent cars can search the available cars in the area they select and booking the cars by paying to the owner of cars. User can also review their orders and change the details of cars. The owner of car can also add or delete photos to the car. It is the project for Next Generation Network course

#Keyword:
  Node.js, MySQL, MongoDB, AJAX, AngularJS, Bootstrap, Google Map Api, AWS

#Backend:  
  The webserver is running on AWS Elasticbeanstalk and users can visit the website freely. The car data and user data are stored in AWS RDS, a relational database. And separated image-server is deployed on AWS EC2 to store the photos of cars which were uploaded by the users. The paths of photos are stored in mongoDB and are updated synchronic with the photos. The backend of webserver and image-server are written by node.js


#Frontend:

The website of multibnb includes pages of login, home, view my cars, post new cars and booking history.
  
Log in page: Users with account can log in by entering their name and password. New users can click the sign-up button to get the register webpage.

Home page: After log in, users will be redirected to the home page. Users who want to rent cars can decide start and end date. By double clicking on the map, users decide where they want to rent cars and enter the distance range from the point. Cars available during the range will show up and the users can book these cars.

Post new car page: Users who want to rent their cars can input the information about their cars.

View my cars page: The owner of cars can update the information of cars and add or delete photos to cars. They can also view the details of cars and the orders for specific cars.

Booking history page: the page shows booking history of users, including owner, type of cars, star and end date, price, location and transaction location. They can also cancel their order in this page.


If you want to visit our website, you can go to the following link. The website is not always open due to the limit of AWS free tier. Please contact me before your visit.
 	http://multibnb.us-east-1.elasticbeanstalk.com


Author: Xing Lan      Wenjin Guo


12/11/2016 Angular Update merge login and register page
