const Editorial = require("../Models/Editorialmodel");

exports.GetMenu = (req,res,next) =>{
    res.render("Editoriales/Menu",
    {pageTitle:"Gestionar Editoriales",
    EditorialActive:true          
});

};

exports.GetAddEditorial = (req,res,next) =>{
    res.render("Editoriales/Create",
    {pageTitle:"Agregar Editorial",
    EditorialActive:true ,
    editMode: false         
});

};

exports.PostAddEditorial = (req,res,next)=>{
    const nombreE = req.body.nombre;
    const telefonoE  = req.body.telefono;
    const paisE = req.body.pais;
    
 
    Editorial.create({nombre: nombreE, telefono: telefonoE, pais: paisE}).then(result=>{
     return res.redirect("/");
        
 
    }).catch(err =>{
        console.log(err);
    });
 
    
 };

exports.GetEditEditorial = (req,res,next) =>{
    const edit = req.query.edit;
    const id = req.params.editorialId;


    Editorial.findOne({ where: { id: id } })
    .then((result) => {
      const editorial = result.dataValues;

      res.render("Editoriales/Create",
      {pageTitle: "Editar Editorial",
      EditorialActive:true,
      editMode: edit,
      editorial: editorial,
      contE: editorial.length > 0,

  });
   
 }).catch((err) => {
    console.log(err);
  });
 
            

};

exports.PostEditEditorial = (req,res,next)=>{
 const nombre = req.body.nombre;
  const telefono = req.body.telefono;
  const pais = req.body.pais;
  const Id = req.body.editorialId;

  Editorial.update(
    { nombre: nombre, telefono: telefono, pais: pais,  id: Id },
    { where: { id: Id } }
  )
    .then((result) => {
      return res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });

};


exports.GetEditorialList = (req,res,next) =>{
   
    Editorial.findAll().then(result=>{

        const Editorial = result.map((result) => result.dataValues);
        res.render("Editoriales/List",
        {pageTitle:"Lista de Editoriales",
        EditorialActive:true ,
        editorial: Editorial,
        contedit: Editorial.length > 0 ,
        
        });
    }).catch(err =>{
        console.log(err);
    })
    
};

exports.GetDeleteEditorial = (req,res,next) =>{
    

const id = req.params.editorialId;
    
    Editorial.findOne({ where: { id: id } })
    .then((result) => {
        const editorial = result.dataValues;

        res.render("Editoriales/Delete",
    {pageTitle:"Delete Confirm",
    autorActive:true ,
    editorial:editorial,

});


     }) .catch((err) => {
            console.log(err);
          });

         







}
exports.DeleteConfirm =(req,res,next) =>{
    const editorialId = req.body.editorialId;
    Editorial.destroy({ where: { id: editorialId } })
    .then((result) => {
      return res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });





    
};