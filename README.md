# Online College Management System
This system can maintain huge number of college records including student, faculty,  academic batches, courses, subjects, events, news or any college related activities. 


### Front-end : 
- HTML(Template engine as **ejs**)
- CSS
- JAVASCRIPT
- JQuery

### Back-end  : 
- Nodejs
- Express js
- MongoDB

## Installation
- Download & install
  - [Nodejs](https://nodejs.org/en/)
  - [MongoDB](https://www.mongodb.com/try/download/community)
- to install dependencies in the project
```
npm install
```

## Start up steps

- **to run project**
```
npm start
```

- Insert admin credentials in MongoDB database
```
db.admins.insertOne({username:"admin123",password:"admin123"})
```

# Note:

**By default password for faculties is F123 and for student is S123**

**UserID for faculties and students are generated dynamically which are provided by admin**
