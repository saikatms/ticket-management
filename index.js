const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config();

const middleware = require("./middleware");
const Routes = require("./routes/route");
const authRoutes = require("./routes/authRoute");
const adminRoutes = require("./routes/adminRoute");
const projectRoutes = require("./routes/projectRoute");
const issueRoutes = require("./routes/issueRoute");

const PORT = process.env.PORT || 8080;

const MONGO_URI = process.env.MONGO_URI;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

middleware(app);

app.use(
  morgan((tokens, req, res) => {
    let logArray = [
      tokens["remote-addr"](req, res),
      "-",
      tokens["remote-user"](req, res),
      `[${tokens.date(req, res, "clf")}]`,
      `"${tokens.method(req.res)} ${tokens.url(req, res)} HTTP/${tokens[
        "http-version"
      ](req, res)}"`,
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
    ];
    if (req.user_id) logArray.push("user id", req.user_id);

    if (req.headers.authorization)
      logArray.push("authorization", req.headers.authorization);

    console.log("request body", JSON.stringify(req.body));
    return logArray.join(" ");
  })
);

// app.use(Routes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/issue", issueRoutes);

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App is listening on PORT ${PORT}`);
    });
  });
