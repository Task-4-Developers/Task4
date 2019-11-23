const express = require('express');
const bodyparser = require('body-parser')


const app = express();
const port = 8080;

const mongoose = require("mongoose");

//const mongooseValidator = require('mongoose-unique-validator')

app.use(bodyparser.json());

mongoose.connect("mongodb+srv://admin:admin@cluster0-umm0g.mongodb.net/Task4", { useNewUrlParser: true, useUnifiedTopology: true });


const userSchema = {
    id: mongoose.Schema.Types.ObjectId,
    login: String,
    password: String,
    organizations: [String],
    lastFetchTime: Date
}

const eventSchema = {
    id: mongoose.Schema.Types.ObjectId,
    eventMadeTime: Date,
    startTime: Date,
    endTime: Date,
    usersId: [Number],
    usersCount: Number,
    usersMax: Number,
    activityID: Number,
}

const activitySchema = {
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    type: String,
    slots: Number,
    takenSlots: Number,
    organization: String
}


const User = mongoose.model("User", userSchema);
const Event = mongoose.model("Event", eventSchema);
const Activity = mongoose.model("Activity", activitySchema);


app.post('/login', (req, res) => {

    User.findOne({ login: req.body.login }, (err, user) => {
        if ((err) || (user == null)) res.json({ accepted: false })
        else {
            if (user.password == req.body.password) {
                res.json({ accepted: true })
            }
            else
                res.json({ accepted: false })
        }
    })
})


var promise1 = new Promise((resolve, reject) => { resolve('foo') });

app.get('/activities', (req, res) => {
    User.findOne({ login: req.body.login }, async (err, user) => {
        if ((err) || (user == null)) res.json({ succesful: false })
        else {

            let activityList = []




            for (let org in user.organizations) {

                await Activity.find({ organization: user.organizations[org] }, (err, act) => {
                    activityList.push(act);

                })
            }
            res.json(activityList)

        }

    })






})


app.post('/signin', (req, res) => {
    User.findOne({ login: req.body.login }, (err, user) => {
        if ((err) || (user == null)) {
            const user = new User({ login: req.body.login, password: req.body.password, organizations: req.body.organizations, lastFetchTime: Date.now() })
            user.save()
            res.json({ accepted: true })
        }
        else {
            res.json({ accepted: false })
        }
    })
})










// app.get('/dodaj', (req, res) => {
//     const user = new User({ login: 'marek', password: 'dupa1', lastFetchTime: Date.now() })
//     user.save()
//     res.send("dodano")
//     console.log("dodano :>")
// })

app.get('/', (req, res) =>

    res.send("helloword00")
)

// app.get('/xD', (req, res) => {

//     res.sendFile(__dirname + "/index.html")
//     //res.send("helloword00")
// })

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
})


app.listen(port, () => console.log("Server started :>"))
