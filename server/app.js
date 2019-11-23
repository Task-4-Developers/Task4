const express = require('express');
const bodyparser = require('body-parser')


const app = express();


const mongoose = require("mongoose");

//const mongooseValidator = require('mongoose-unique-validator')

app.use(bodyparser.json());

mongoose.connect("mongodb+srv://admin:admin@cluster0-umm0g.mongodb.net/Task4", { useNewUrlParser: true, useUnifiedTopology: true });


const userSchema = {
    //id: Number,
    login: String,
    password: String,
    organizations: [String],
    lastFetchTime: Number
}

const eventSchema = {
    //_id: mongoose.Schema.Types.ObjectId,
    eventMadeTime: Number,
    startTime: Number,
    endTime: Number,
    usersId: [mongoose.Schema.Types.ObjectId],
    usersCount: Number,
    usersMax: Number,
    activityId: mongoose.Schema.Types.ObjectId,
}

const activitySchema = {
    //_id: mongoose.Schema.Types.ObjectId,
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

    Event.findOne({ startTime: { $gte: req.body.startTime }, endTime: { $lte: req.body.endTime } }, (err, eve) => {
        if (err) res.json({ succesful: "false" });

        if (eve == null) {

            Activity.findOne({ _id: req.body.activityId.ObjectId }, (err, act) => {
                if (err) res.json({ succesful: false });

                User.findOne({ login: req.body.login }, (err, user) => {
                    console.log(user._id);
                    const event = new Event({
                        eventMadeTime: Date.now(),
                        startTime: req.body.startTime,
                        endTime: req.body.endTime,
                        usersId: [user._id],
                        usersCount: 1,
                        usersMax: act.slots,
                        activityId: req.body.activityId.ObjectId

                    });
                    event.save();
                    console.log(event)
                    res.json({ succesful: true });
                });
            })
        }
        else res.json({ succesful: false });
    })

})

app.get('/updates', (req, res) => {

    User.findOne({ login: req.body.login }, (err, user) => {
        Event.find({ eventMadeTime: { $gt: user.lastFetchTime } }, (err, eve) => {
            if ((err) || (eve == null)) {
                res.json({ events: [] })
            }
            else {
                res.json({ events: eve })
            }

        })
    })

})



app.post('/join', async (req, res) => {

    Event.findOne({ _id: req.body.eventId.ObjectId }, async (err, eve) => {

        var xd = await Event.updateOne({ _id: req.body.eventId.ObjectId, usersCount: { $lt: eve.usersMax } }, { $inc: { usersCount: 1 }, $push: { usersId: req.body.userId.ObjectId } })
    })
    res.json({ succesful: true })
})


app.get('/', (req, res) =>

    res.send("helloword00")
)


app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
})


let port = process.env.PORT;
if (port == null || port == "") {
    port = 8080;
}

app.listen(port, () => console.log("Server started :>"))
