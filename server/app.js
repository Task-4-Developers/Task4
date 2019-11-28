const express = require('express');
const bodyparser = require('body-parser')
const mongoose = require("mongoose");
const path = require('path');
const fs = require('fs')


const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyparser.json());

mongoose.connect("mongodb+srv://admin:admin@cluster0-umm0g.mongodb.net/Task4", { useNewUrlParser: true, useUnifiedTopology: true });


const userSchema = {
    login: String,
    password: String,
    organizations: [String],
    lastFetchTime: Number
}

const eventSchema = {
    eventMadeTime: Number,
    startTime: Number,
    endTime: Number,
    users: [String],
    usersCount: Number,
    usersMax: Number,
    activityId: mongoose.Schema.Types.ObjectId,
}

const activitySchema = {
    name: String,
    type: String,
    slots: Number,
    takenSlots: Number,
    organization: String,
    img:
    {
        name: String,
        contentType: String
    }
}


const User = mongoose.model("User", userSchema);
const Event = mongoose.model("Event", eventSchema);
const Activity = mongoose.model("Activity", activitySchema);


app.post('/login', (req, res) => {

    User.findOne({ login: req.body.login }, (err, user) => {
        if ((err) || (user == null)) res.json({ succesful: false })
        else {
            if (user.password == req.body.password) {
                res.json({ succesful: true })
            }
            else
                res.json({ succesful: false })
        }
    })
})

app.post('/signin', (req, res) => {
    User.findOne({ login: req.body.login }, (err, user) => {
        if ((user == null)) {
            const user = new User({
                login: req.body.login,
                password: req.body.password,
                organizations: req.body.organizations,
                lastFetchTime: Date.now()
            })
            user.save()
            res.json({ succesful: true })
        }
        else {
            res.json({ succesful: false })
        }
    })
})

app.get('/getActivities', (req, res) => {
    User.findOne({ login: req.body.login }, async (err, user) => {
        if ((err) || (user == null)) res.json({ activities: [] })
        else {

            let activityList = []

            for (let org in user.organizations) {

                await Activity.find({ organization: user.organizations[org] }, (err, act) => {
                    activityList.push(act);

                    // activityList.push(
                    // {
                    //     name: act.name,
                    //     type: act.type,
                    //     slots: act.slots,
                    //     takenSlots: act.takenSlots,
                    //     organization: act.organization,
                    //     img:
                    //     {
                    //         name: act.img.name,
                    //         contentType: act.img.contentType,
                    //         data: fs.readFileSync(path.join(__dirname, '/public/icons/', act.img.name))
                    //     }

                    // });

                })
            }
            res.json({ activities: activityList })
        }
    })
})

app.get('/getEventsForActivities', (req, res) => {
    Event.find({ activityId: req.body.activityId.ObjectId }, (err, eve) => {
        if ((err) || (eve == null)) {
            res.json({ eve: [] })
        }
        else {
            res.json({ events: eve })
        }
    })
})

app.post('/addEvent', (req, res) => {

    Event.findOne({ startTime: { $gte: req.body.startTime }, endTime: { $lte: req.body.endTime } }, (err, eve) => {
        if (err) res.json({ succesful: false });

        if (eve == null) {

            Activity.findOne({ _id: req.body.activityId.ObjectId }, (err, act) => {
                if (err) res.json({ succesful: false });

                // User.findOne({ login: req.body.login }, (err, user) => {
                //     //console.log(user._id);
                //     const event = new Event(
                //     {
                //         eventMadeTime: Date.now(),
                //         startTime: req.body.startTime,
                //         endTime: req.body.endTime,
                //         usersId: [user._id],
                //         usersCount: 1,
                //         usersMax: act.slots,
                //         activityId: req.body.activityId.ObjectId

                //     });

                //     event.save();
                //     //console.log(event)
                //     res.json({ succesful: true });
                // });

                const event = new Event(
                    {
                        eventMadeTime: Date.now(),
                        startTime: req.body.startTime,
                        endTime: req.body.endTime,
                        users: [req.body.login],
                        usersCount: 1,
                        usersMax: act.slots,
                        activityId: req.body.activityId.ObjectId

                    });

                event.save();
                //console.log(event)
                res.json({ succesful: true });
            })
        }
        else res.json({ succesful: false });
    })
})

app.get('/fetchNewEvents', (req, res) => {

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

app.post('/joinEvent', async (req, res) => {

    Event.findOne({ _id: req.body.eventId.ObjectId }, async (err, eve) => {
        if (eve == null) res.json({ successful: false })

        await Event.updateOne({ _id: req.body.eventId.ObjectId, usersCount: { $lt: eve.usersMax } }, { $inc: { usersCount: 1 }, $push: { users: req.body.login } }, (err, eve1) => {

            if (eve1 == null) res.json({ successful: false })
            else res.json({ succesful: true })
        })
    })
    //res.json({ succesful: true })
})


///--------------------------- HTML shit only for testing


app.post('/addActivity', (req, res) => {

    let act = new Activity({
        name: req.body.name,
        type: req.body.type,
        slots: req.body.slots,
        takenSlots: req.body.takenSlots,
        organization: req.body.organization,
        img:
        {
            //data: fs.readFileSync(req.body.path),
            path: req.body.path,
            contentType: 'image/png'
        }
    })
    act.save();
    res.json({ succesful: true });
})

app.get('/viewActivity', (req, res) => {


    Activity.findOne({ _id: req.query.id }, (err, act) => {



        //res.set('Content-Type', act.img.contentType);
        //res.send(fs.readFileSync(act.img.path));
        //res.send(act.img.data)


        res.render('index', {
            name: act.name,
            type: act.type,
            slots: act.slots,
            organization: act.organization,
            path: path.join(__dirname, '/public/icons/', act.img.name),
            imgpath: path.join(__dirname, '/public/icons/', act.img.name)
        })
    })
})


app.get('/viewIMGfromfile', (req, res) => {
    Activity.findOne({ _id: req.query.id }, (err, act) => {

        res.set('Content-Type', act.img.contentType);
        res.send(fs.readFileSync(path.join(__dirname, '/public/icons/', act.img.name)));
        //res.send(act.img.data)
    })
})

///-----------------------------------------------------------------

app.get('/', (req, res) => {

    res.send("helloword00")
})


app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
})


let port = process.env.PORT;
if (port == null || port == "") {
    port = 8080;
}

app.listen(port, () => console.log("Server started :>"))
