const express = require("express");
const cors = require("cors");
const path = require("path");
const config = require("config");
const ToDoItemRoute = require("./routes/todoitem.route");
var app = express();
const mongoose = require("mongoose");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/Todos", ToDoItemRoute)
//Change this:
const URL = "'mongodb://localhost:27017/test'";
mongoose.set("useCreateIndex", true);
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
mongoose.connection.on(
    "error",
    console.error.bind(console, "MongoDB Connection Error...")
);

app.get('*', (req, res) => {
    try {
        const resolvingPath = path.resolve(
            __dirname,
            'build',
            'index.html'
        );
        return res.sendFile(resolvingPath);
    } catch (err) {
        console.log(err)
        if (err.code === 'ENOENT') {
            const resolvingPath = path.resolve(
                __dirname,
                'build',
                'index.html'
            );
            return res.sendFile(resolvingPath);
        } else {
            throw err;
        }

    }
});

// Error handling
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.end(err.message);
});

const PORT = 4000;
app.listen(PORT);

// Exports
module.exports = app;