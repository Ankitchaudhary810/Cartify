const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
dotenv.config();

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const stripeRoutes = require("./routes/stripePayment");
const paypalRoute = require("./routes/paypalRoute");


//MongoDb connection
try {
    mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("DB CONNECTED");
    });
} catch (e) {
    console.error(e);
}

//MiddleWare
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: false }));
app.use(express.json())
app.use(cookieParser());
app.use(cors());
// testing
app.get('/', (req, res) => res.send("hello World"))

//my Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", stripeRoutes);
app.use('/api', paypalRoute)

//server connection -- 
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});