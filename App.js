const path = require("path");
const express = require("express");
const expressHbs = require("express-handlebars");

const homerouter = require("./Routes/Home");


const autorrouter = require("./Routes/Autores");
const editorialrouter = require("./Routes/Editoriales");
const librorouter = require("./Routes/Libros");
const Libro = require("./Models/LibroModel");
const Autor = require("./Models/AutorModel");
const Editorial = require("./Models/Editorialmodel");


const sequelize = require("./Util/database");


const ErrorController = require("./Controllers/ErrorController");


const app = express();



app.engine("hbs", expressHbs({
    layoutsDir: "Views/Layout/",
    defaultLayout: "main-layout",
    extname: "hbs",
}));
app.set("view engine","hbs");
app.set("Views","views");


app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,"Public")));



app.use(homerouter);

app.use("/Autores",autorrouter);
app.use("/Libros",librorouter);
app.use("/Editoriales",editorialrouter);




app.use(ErrorController.Get404);

sequelize.sync().then(result=>{
    app.listen(5001);
    
  
  }).catch(err =>{
      console.log(err);
  });


