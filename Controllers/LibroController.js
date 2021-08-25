const Libro = require("../Models/LibroModel");


const Autor = require("../Models/AutorModel");
const Editorial = require("../Models/Editorialmodel");


exports.GetAddLibro = (req, res, next) => {

    Autor.findAll().then(result => {

       const  autor = result.map((result) => result.dataValues);

       Editorial.findAll().then(result => {

        const editorial = result.map((result) => result.dataValues);

        res.render("Libros/Create", {
            pageTitle: "Agregar Libro",
            LibroActive: true,
            listaA: autor,
            listaE: editorial,
            contA: autor.length > 0,
            contE: editorial.length >0,
        });


   }).catch(err => {
       console.log(err);
   });


    }).catch(err => {
        console.log(err);
    });

};

exports.PostAddLibro = (req, res, next) => {
    const nombre = req.body.nombre;
    const año = req.body.año;
    const autor = req.body.autor;
    const editorial = req.body.editorial;

    Libro.create({
        Nombre: nombre,
        año: año,
        autor: autor,
        editorial: editorial
    }).then(result => {
        return res.redirect("/");


    }).catch(err => {
        console.log(err);
    });


};

exports.GetMenu = (req, res, next) => {
    res.render("Libros/Menu", {
        pageTitle: "Gestionar Libros",
        LibrosActive: true
    });

};


exports.GetLibroList = (req, res, next) => {



    Libro.findAll().then(result => {
        const  libroo = result.map((result) => result.dataValues);

        res.render("Libros/List", {
            pageTitle: "Lista de  Libros",
            LibrosActive: true,
            Libro: libroo,
            contL: libroo.length > 0,
        });
    }).catch(err => {
        console.log(err);
    });



};

exports.GetEditLibro = (req, res, next) => {
    const edit = req.query.edit;
    const LibroId = req.params.libroId;
  
    if (!edit) {
      return res.redirect("/");
    }
  
    Libro.findOne({ where: { id: LibroId } })
      .then((result) => {
        const libro = result.dataValues;
  
        if (!libro) {
          return res.redirect("/");
        }
        Autor.findAll().then(result => {

            const  autor = result.map((result) => result.dataValues);
     
            Editorial.findAll().then(result => {
     
             const editorial = result.map((result) => result.dataValues);
             
               
     
             res.render("Libros/Create", {
                 pageTitle:"Editar libro",
                 LibroActive: true,
                 editMode: edit,
                 Libro: libro,
                 listaA: autor,
                 listaE: editorial,
                 contA: autor.length > 0,
                 contE: editorial.length >0,
             });
     
     
        }).catch(err => {
            console.log(err);
        });
     
     
         }).catch(err => {
             console.log(err);
         });

        
      })
      .catch((err) => {
        console.log(err);
      });
};

exports.PostEditLibro = (req, res, next) => {

  const nombre = req.body.nombre;
  const ano = req.body.año;
  const autor = req.body.autor;
  const editorial = req.body.editorial;
  const Id = req.body.libroId;

  Libro.update(
    { Nombre: nombre, año: ano, autor: autor, editorial: editorial, id: Id },
    { where: { id: Id } }
  )
    .then((result) => {
      return res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });

   
}





exports.GetDeleteLibro = (req, res, next) => {
    const id = req.params.libroId;
    
    Libro.findOne({ where: { id: id } })
    .then((result) => {
        const libro = result.dataValues;

        res.render("Libros/delete", {
            pageTitle: "Delete Confirm",
            LibrosActive: true,
            Libro: libro,
        }

    );


     }) .catch((err) => {
            console.log(err);
          });

         
    
}
exports.DeleteConfirm = (req, res, next) => {
    const libroId = req.body.libroId;


    Libro.destroy({ where: { id: libroId } })
    .then((result) => {
      return res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });

};