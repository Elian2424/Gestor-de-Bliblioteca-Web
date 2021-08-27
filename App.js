const path = require("path");
const express = require("express");
const expressHbs = require("express-handlebars");
const multer = require("multer");
const session = require("express-session");
const bcrypt = require("bcryptjs");

const homerouter = require("./Routes/Home");
const {v4: uuidv4} = require("uuid");


const autorrouter = require("./Routes/Autores");
const editorialrouter = require("./Routes/Editoriales");
const librorouter = require("./Routes/Libros");
const adminrouter = require("./Routes/Admin");


const Libro = require("./Models/LibroModel");
const Autor = require("./Models/AutorModel");
const Editorial = require("./Models/Editorialmodel");
const Usuario = require("./Models/UsuarioModel");


const sequelize = require("./Util/database");


const ErrorController = require("./Controllers/ErrorController");


const app = express();



app.engine("hbs", expressHbs({
    
    layoutsDir: "Views/Layout/",
    defaultLayout: "main-layout",
    extname: "hbs",
}));
app.set("view engine", "hbs");
app.set("Views", "views");


app.use(express.urlencoded({
    extended: false
}));


const fileStorage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,"Images")
    },
    filename: (req,file,cb)=>{
        cb(null,uuidv4() + "-"+ file.originalname) 
    }
});
app.use(multer({storage: fileStorage }).single("imagen"));

app.use(express.static(path.join(__dirname, "Public")));
app.use("/Images",express.static(path.join(__dirname, "Images")));


app.use(session({secret: "freelancer24k",resave: true, saveUninitialized: false}));

app.use((req,res,next)=>{

    
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.correo = req.session.correo;
    next();
});


app.use(homerouter);

app.use("/Autores", autorrouter);
app.use("/Libros", librorouter);
app.use("/Editoriales", editorialrouter);
app.use("/Admin",adminrouter);




app.use(ErrorController.Get404);

sequelize.sync(/*{force: true}*/).then(result => {
    app.listen(5001);


}).catch(err => {
    console.log(err);
});
