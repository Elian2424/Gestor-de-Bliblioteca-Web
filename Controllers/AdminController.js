const Usuario = require("../Models/UsuarioModel");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
var codigo = "0000";
let correoU = "";
let nombreU = "";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "freelancers24k@gmail.com",
        pass: "Free24kk"
    }
});



exports.GetLogin = (req, res, next) => {


    res.render("Admin/Login", {
        pageTitle: "Login - Admin",
        

    })
};
exports.PostLogin = (req, res, next) => {

    const correoQ = req.body.Correo;
    const passQ = req.body.Pass;

    if (correoQ === "" || passQ === "") {

        res.render("Admin/Login", {
            pageTitle: "Login - Admin",
            User: correoQ,
            Pass: passQ,
            Message: "*Todos los campos son obligatorios*"
        })


    } else {
        Usuario.findOne({
            where: {
                Correo: correoQ
            }
        }).then((user) => {
            
            if(!user){

                res.render("Admin/Login", {
                    pageTitle: "Login - Admin",
                    User: correoQ,
                    Pass: passQ,
                    Message: "Correo o Contraseña incorrectos"
                })
            }else{
                bcrypt.compare(passQ, user.Contraseña).then((Upass)=>{
                    if(Upass){
                         req.session.isLoggedIn = true;
                         req.session.correo = correoQ;
                         res.redirect("/")
                    }else{
                        res.render("Admin/Login", {
                            pageTitle: "Login - Admin",
                            User: correoQ,
                            Message: "Contraseña incorrecta"
                        })

                    }
                })
                
               
            }


            

        }).catch((err) => {
            console.log(err);
        });
    }


}

exports.GetAddUsuario = (req, res, next) => {

    res.render("Admin/Create", {
        pageTitle: "Login - Admin",
    })
}

exports.PostAddUsuario = (req, res, next) => {
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const correo = req.body.correo;
    const usuario = req.body.usuario;
    const pass = req.body.contraseña;
    const passC = req.body.contraseña1;

    if (nombre === "" || apellido === "" || correo == "" || usuario === "" || pass === "") {
        res.render("Admin/Create", {
            pageTitle: "Registro - Admin",
            Nombre: nombre,
            Apellido: apellido,
            Correo: correo,
            Usuario: usuario,
            Contraseña: pass,
            Message: "*Todos los campos son obligatorios*",
        });

    } else {
        if (pass != passC) {
            res.render("Admin/Create", {
                pageTitle: "Registro - Admin",
                Nombre: nombre,
                Apellido: apellido,
                Correo: correo,
                Usuario: usuario,
                Contraseña: pass,
                Contraseña1: passC,
                Message: "*Las contraseñas no coinciden*",
            });

        } else {
            Usuario.findOne({where: {Correo: correo}}).then((user)=>{

                if(user){
                    res.render("Admin/Create", {
                        pageTitle: "Registro - Admin",
                        Nombre: nombre,
                        Apellido: apellido,
                        Correo: correo,
                        Usuario: usuario,
                        Contraseña: pass,
                        Contraseña1: passC,
                        Message: "*El correo que ha ingresado ya existe*",
                    });
                }else{
                    Usuario.findOne({where: {Usuario: usuario}}).then((userN) =>{
    
                        
                        if(userN){
    
                            res.render("Admin/Create", {
                                pageTitle: "Registro - Admin",
                                Nombre: nombre,
                                Apellido: apellido,
                                Correo: correo,
                                Usuario: usuario,
                                Contraseña: pass,
                                Contraseña1: passC,
                                Message: "*El nombre de usuario que ha ingresado ya existe*",
                            });
                        } else{
    
                            bcrypt.hash(pass,12).then(hashedPass =>{
    
                                Usuario.create(
                                    {
                                       Nombre: nombre,
                                       Apellido: apellido,
                                       Correo: correo,
                                       Usuario: usuario,
                                       Contraseña: hashedPass,
                                        
                                    }).then(result=>{
                
                                         res.redirect("/Admin/Login");
                                         return transporter.sendMail({
                                            from: "freelancers24k@gmail.com",
                                            to: `${correo}`,
                                            subject: `Bienvenido ${nombre}`,
                                            html: `<h1>Te has registrado correctamente como administrador en nuestro sitio web InfoBooks</h1>`
                                        });
                                           
                                    
                                       }).catch(err =>{
                                           console.log(err);
                                       });
    
                            }).catch(err =>{
                                console.log(err);
                                return res.redirect("/Admin/Create");
                            })
                        }
                       
                        
    
                    }).catch(err=>{
                        console.log(err);
                    });
                }
               
                

            }).catch(err => {
                console.log(err);
            });
           

        }


    }


}

exports.GetRestorePass = (req, res, next) => {

    res.render("Admin/RestorePass", {
        pageTitle: "Olvide mi Contraseña",
        CodeVisible: true,
    })
}

exports.PostRestorePass = (req, res, next) => {
    const correo = req.body.correo;
    if (correo === "") {
        res.render("Admin/RestorePass", {
            pageTitle: "Olvide mi Contraseña",
            Message: "*El campo esta vacio*"
        })

    } else {

        Usuario.findOne({
            Where: {
                Correo: correo
            }
        }).then((result) => {


            const user = result.dataValues;

            if (user.Correo != correo) {
                res.render("Admin/RestorePass", {
                    pageTitle: "Confirmacion de Correo",
                    Message: "No se encontro ninguna cuenta con este correo",
                })
            } else {
                correoU = user.Correo;
                nombreU = user.Nombre;

                codigo = Math.floor(Math.random() * (9999 - 1000) + 1000);
                console.log(codigo);

                res.render("Admin/Confirm", {
                    pageTitle: "Confirmacion de Correo",
                    correo: correoU,

                })
                return transporter.sendMail({
                    from: "freelancers24k@gmail.com",
                    to: `${user.Correo}`,
                    subject: `Hola ${user.Nombre}`,
                    html: `<h1>Solicitaste un cambio de contraseña</h1><p>El codigo de verificacion es: ${codigo}</p>`
                });
            }




        }).catch((err) => {
            console.log(err);
        })
    }

}

exports.PostVerify = (req, res, next) => {
    let code = req.body.codigo;
    console.log(codigo);
    console.log(code);

    if (code == codigo) {
        res.render("Admin/NewPass", {
            pageTitle: "Nueva Contraseña",
        })
    } else {
        res.render("Admin/Confirm", {
            pageTitle: "Olvide mi Contraseña",
            correo: correoU,
            Code: code,
            Message: "Codigo Incorrecto",

        })
    }


}

exports.PostNewPass = (req, res, next) => {
    const pass1 = req.body.Pass1;
    const pass2 = req.body.Pass2;

    if (pass1 === pass2) {

        Usuario.findOne({
            where: {
                Correo: correoU
            }
        }).then((result) => {
            const user = result.dataValues;
            Usuario.update(

                    {
                        Nombre: user.Nombre,
                        Apellido: user.apellido,
                        Correo: user.Correo,
                        Usuario: user.Usuario,
                        Contraseña: pass1,
                        id: user.id
                    }, {
                        where: {
                            Correo: correoU
                        }
                    })
                .then((result) => {
                    res.redirect("/Admin/Login");

                    return transporter.sendMail({
                        from: "freelancers24k@gmail.com",
                        to: `${correoU}`,
                        subject: `Hola ${nombreU}`,
                        html: `<h1>Tu contraseña se actualizo correctamente</h1>`
                    });


                }).catch((error) => {
                    console.log(error);
                })
        })



    } else {
        res.render("Admin/NewPass", {
            pageTitle: "Nueva Contraseña",
            Message: "Las contraseñas no coinciden",

        })
    }


}

exports.PostLogout = (req,res,next)=>{

    req.session.destroy( err =>{
        console.log(err);
        res.redirect("/")
    });
};