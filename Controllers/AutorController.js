const Autor  = require("../Models/AutorModel");


exports.GetMenu = (req,res,next) =>{
    res.render("Autores/Menu",
    {pageTitle:"Gestionar Autores",
    autorActive:true          
});

};

exports.GetAddAutor = (req,res,next) =>{
    res.render("Autores/Create",
    {pageTitle:"Agregar Autor",
    autorActive:true,
    editMode: false          
});

};

exports.GetEditAutor = (req,res,next) =>{
    const id = req.params.autorId;
    const edit = req.query.edit

    Autor.findOne({ where: { id: id } })
    .then((result) => {
      const autor = result.dataValues;

      res.render("Autores/Create",
    {pageTitle:"Editar Autor",
    autorActive:true,
    editMode: edit,  
    Autor: autor,
   
 })


    if(!edit){
        return res.redirect("/");
    }
            
}).catch((err) => {
    console.log(err);
  });;

};

exports.PostAddAutor = (req,res,next) =>{
    const nombreA = req.body.nombre;
    const correoA = req.body.correo;      
    Autor.create({Nombre: nombreA, Correo: correoA}).then(result=>{
        return res.redirect("/");
           
    
       }).catch(err =>{
           console.log(err);
       });
    
       
    
};

exports.PostEditAutor = (req,res,next) =>{
    const nombre = req.body.nombre;
    const correo = req.body.correo;      
     const Id = req.body.autorId;

  Autor.update(
    { Nombre: nombre, Correo: correo,id: Id },
    { where: { id: Id } }
  )
    .then((result) => {
      return res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};



exports.GetAutorList = (req,res,next) =>{


    Autor.findAll().then(result=>{

        const Autores = result.map((result) => result.dataValues);
        res.render("Autores/List",
        {pageTitle:"Lista de Autores",
        autorActive:true,
        autores: Autores,
        contautores: Autores.length >0,
        });
    }).catch(err =>{
        console.log(err);
    })

    
    
};

exports.GetDeleteAutor = (req,res,next) =>{
    const id = req.params.autorId;
    
    Autor.findOne({ where: { id: id } })
    .then((result) => {
        const autor = result.dataValues;

        res.render("Autores/Delete", {
            pageTitle: "Delete Confirm",
            LibrosActive: true,
            Autor: autor,
        }

    );


     }) .catch((err) => {
            console.log(err);
          });

         
    
}

exports.DeleteConfirm =(req,res,next) =>{
    const autorId = req.body.autorId;
    


    Autor.destroy({ where: { id: autorId } })
    .then((result) => {
      return res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
    
};
