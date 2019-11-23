const express = require('express');
const bodyparser = require('body-parser')


const app = express();
const port = 8080;

const mongoose = require("mongoose");

//const mongooseValidator = require('mongoose-unique-validator')

app.use(bodyparser.json());

mongoose.connect("mongodb+srv://admin:admin@cluster0-umm0g.mongodb.net/Task4", { useNewUrlParser: true, useUnifiedTopology: true });


const userSchema = {
    _id: mongoose.Schema.Types.ObjectId,
    login: String,
    password: String,
    organizations: [String],
    lastFetchTime: Number
}

const eventSchema = {
    _id: mongoose.Schema.Types.ObjectId,
    eventMadeTime: Number,
    startTime: Number,
    endTime: Number,
    usersId: [Number],
    usersCount: Number,
    usersMax: Number,
    activityId: mongoose.Schema.Types.ObjectId,
}

const activitySchema = {
    _id: mongoose.Schema.Types.ObjectId,
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
            const user = new User({
                login: req.body.login,
                password: req.body.password,
                organizations: req.body.organizations,
                lastFetchTime: Date.now()
            })
            user.save()
            res.json({ accepted: true })
        }
        else {
            res.json({ accepted: false })
        }
    })
})

app.get('/eventsForActivities', (req, res) => {
    Event.find({ activityId: req.body.activityId.ObjectId }, (err, events) => {
        if ((err) || (events == null)) {
            res.json({ events: [] })
        }
        else {
            res.json({ events: events })
        }
    })
})




app.post('/events', (req, res) => {

    //res.send(Date(req.body.startTime.$date.$numberLong));
    // res.json({ dataa: Date.now() })

    //res.json({ xd: User.findOne({ login: "Mihau" }).lastFetchTime })


    Event.findOne({ startTime: { $gt: req.body.startTime } }, (err, eve) => {
        if (err) res.json({ succesful: false });

        if (eve == null) {


            // var xd = User.findOne({ login: req.body.login })

            //console.log(xd.password);

            const event = new Event({
                eventMadeTime: Date.now(),
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                //usersId: [XDDD],
                usersCount: 1,
                //usersMax: Activity.findOne({ _id: req.body._id.ObjectId }).slots,
                activityId: req.body._id.ObjectId
            });

            event.save();
            res.json({ succesful: true });
            console.log(event)
        }
        else res.json({ succesful: false });

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
