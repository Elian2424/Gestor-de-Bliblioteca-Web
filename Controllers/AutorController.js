const Autor = require("../Models/AutorModel");
const nodemailer = require("nodemailer");



const trasnporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "freelancers24k@gmail.com",
    pass: "Free24kk"
  }
})

exports.GetMenu = (req, res, next) => {
  res.render("Autores/Menu", {
    pageTitle: "Gestionar Autores",
    autorActive: true
  });

};

exports.GetAddAutor = (req, res, next) => {
  res.render("Autores/Create", {
    pageTitle: "Agregar Autor",
    autorActive: true,
    editMode: false,
  });

};

exports.GetEditAutor = (req, res, next) => {
  const id = req.params.autorId;
  const edit = req.query.edit

  Autor.findOne({
      where: {
        id: id
      }
    })
    .then((result) => {
      const autor = result.dataValues;

      res.render("Autores/Create", {
        pageTitle: "Editar Autor",
        autorActive: true,
        editMode: edit,
        Autor: autor,

      })


      if (!edit) {
        return res.redirect("/");
      }

    }).catch((err) => {
      console.log(err);
    });

};

exports.PostAddAutor = (req, res, next) => {
  const nombreA = req.body.nombre;
  const correoA = req.body.correo;
  const ImageA = req.file;

  if (nombreA != ""){

    if (correoA != ""){

      Autor.findOne({where: {Correo: correoA }}).then((result)=>{

        if(result){
          res.render("Autores/Create", {
            pageTitle: "Agregar Autor",
            autorActive: true,
            editMode: false,
            Nombre: nombreA,
            Correo: correoA,
            MessageC: "Ya hay una cuenta registrada con este correo"
          });
        }else{

          Autor.create({
            Nombre: nombreA,
            Correo: correoA,
            ImagePath: "/" + ImageA.path,
          }).then(result => {
            res.redirect("/");
            return trasnporter.sendMail({
              from: "freelancers24k@gmail.com",
              to: `${correoA}`,
              subject: `Bienvenido ${nombreA}`,
              html: "<h1>Te registraste correctamente en nuestra biblitoteca InfoBooks </h1>"
            });
    
    
          }).catch(err => {
            console.log(err);
          });
        }
      }).catch(err => {
        console.log(err);
      });



    }else{
      res.render("Autores/Create", {
        pageTitle: "Agregar Autor",
        autorActive: true,
        editMode: false,
        Nombre: nombreA,
        Correo: correoA,
        MessageC: "*Este Campo es Obligatorio*"
      });
    }



  } else if (nombreA ==="" && correoA ==="") {

    res.render("Autores/Create", {
      pageTitle: "Agregar Autor",
      autorActive: true,
      editMode: false,
      Message: "*Todos los campos son obligatorios*"
    });

  }else if (correoA !=""){
    res.render("Autores/Create", {
      pageTitle: "Agregar Autor",
      autorActive: true,
      editMode: false,
      Nombre: nombreA,
      Correo: correoA,
      MessageN: "*Este Campo es Obligatorio*"
    });
  }





};

exports.PostEditAutor = (req, res, next) => {
  const nombre = req.body.nombre;
  const correo = req.body.correo;
  const Id = req.body.autorId;
  const Image = req.file;

  if (nombre != "" || correo != "") {
    Autor.findOne({
        where: {
          id: Id
        }
      })
      .then((result) => {
        const autor = result.dataValues;

        if (correo === autor.Correo && nombre === autor.Nombre) {
          const imagePath = Image ? "/" + Image.path : autor.ImagePath;
          Autor.update({
              Nombre: nombre,
              Correo: correo,
              id: Id,
              ImagePath: imagePath
            }, {
              where: {
                id: Id
              }
            })
            .then((result) => {

              res.redirect("/");
              return trasnporter.sendMail({
                from: "freelancers24k@gmail.com",
                to: `${correo}`,
                subject: `Actualizacion, ${nombre}`,
                html: "<h2> No se realizo ningun cambio en sus datos personales</h2>"
              })


            })
            .catch((err) => {
              console.log(err);
            });
        }
        if (nombre != autor.Nombre) {
          if (correo != autor.Correo) {

            const imagePath = Image ? "/" + Image.path : autor.ImagePath;
            Autor.update({
                Nombre: nombre,
                Correo: correo,
                id: Id,
                ImagePath: imagePath
              }, {
                where: {
                  id: Id
                }
              })
              .then((result) => {

                res.redirect("/");
                return trasnporter.sendMail({
                  from: "freelancers24k@gmail.com",
                  to: `${autor.Correo}`,
                  subject: `Actualizacion, ${nombre}`,
                  html: `<h2>Su Nombre se actualizo a ${nombre} y Su Correo se actualizo a ${correo}</h2>`
                })


              })
              .catch((err) => {
                console.log(err);
              });
          }

          const imagePath = Image ? "/" + Image.path : autor.ImagePath;
          Autor.update({
              Nombre: nombre,
              Correo: correo,
              id: Id,
              ImagePath: imagePath
            }, {
              where: {
                id: Id
              }
            })
            .then((result) => {

              res.redirect("/");
              return trasnporter.sendMail({
                from: "freelancers24k@gmail.com",
                to: `${correo}`,
                subject: `Actualizacion, ${autor.Nombre}`,
                html: `<h2>Su Nombre se actualizo a ${nombre}</h2> `
              })


            })
            .catch((err) => {
              console.log(err);
            });




        } else if (nombre === autor.Nombre) {
          if (correo != autor.Correo) {
            const imagePath = Image ? "/" + Image.path : autor.ImagePath;
            Autor.update({
                Nombre: nombre,
                Correo: correo,
                id: Id,
                ImagePath: imagePath
              }, {
                where: {
                  id: Id
                }
              })
              .then((result) => {

                res.redirect("/");


                trasnporter.sendMail({
                  from: "freelancers24k@gmail.com",
                  to: `${autor.Correo}`,
                  subject: `Actualizacion, Hola ${nombre}`,
                  html: `<h2>Su correo se actualizo a ${correo}</h2>`
                })

                trasnporter.sendMail({
                  from: "freelancers24k@gmail.com",
                  to: `${correo}`,
                  subject: `Actualizacion, Hola ${nombre}`,
                  html: "<h2>Este es su nuevo correo Registrado en Nuestra Bliblioteca</h2>"

                })





              })
              .catch((err) => {
                console.log(err);
              });


          }
        }



      }).catch((err) => {
        console.log(err);
      });

  } else {

    res.render("Autores/Create", {
      pageTitle: "Editar Autor",
      autorActive: true,
      editMode: edit,
      Autor: autor,
      Message: "*Todos los campos son obligatorios*"

    })

  }



};



exports.GetAutorList = (req, res, next) => {


  Autor.findAll().then(result => {

    const Autores = result.map((result) => result.dataValues);
    res.render("Autores/List", {
      pageTitle: "Lista de Autores",
      autorActive: true,
      autores: Autores,
      contautores: Autores.length > 0,
    });
  }).catch(err => {
    console.log(err);
  })



};

exports.GetDeleteAutor = (req, res, next) => {
  const id = req.params.autorId;

  Autor.findOne({
      where: {
        id: id
      }
    })
    .then((result) => {
      const autor = result.dataValues;

      res.render("Autores/Delete", {
          pageTitle: "Delete Confirm",
          LibrosActive: true,
          Autor: autor,
        }

      );


    }).catch((err) => {
      console.log(err);
    });



}

exports.DeleteConfirm = (req, res, next) => {
  const autorId = req.body.autorId;

  Autor.findOne({
    where: {
      id: autorId
    }
  }).then((result) => {
    const autor = result.dataValues;
    Autor.destroy({
        where: {
          id: autorId
        }
      })
      .then((result) => {
        res.redirect("/");
        return trasnporter.sendMail({
          from: "freelancers24k@gmail.com",
          to: `${autor.Correo}`,
          subject: `Hola ${autor.Nombre}`,
          html: "<h2>Su cuenta a sido borrada de nuestra plataforma, Esperemos que  vuelva pronto</h2>"

        })
      })
      .catch((err) => {
        console.log(err);
      });


  }).catch((err) => {
    console.log(err);
  });


};
