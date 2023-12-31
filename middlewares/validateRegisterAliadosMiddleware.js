const path = require ('path');
const {body} = require ('express-validator')
const db = require("../database/models");  

const validationsAliados = [
    body('entity_name').notEmpty().withMessage('Escribir un nombre').isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
    body('first_name').notEmpty().withMessage('Escribir un nombre').isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
    body('last_name').notEmpty().withMessage('Escribir un apellido').isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
    body('services').notEmpty().withMessage('Escribir un profesión o servicio'),
    body('genre').notEmpty().withMessage('Elegir un género'),
    body('document_number').notEmpty().withMessage('Escribir identificación'),
    body('birth_date').notEmpty().withMessage('Elegir una fecha de nacimiento'),
    body('services_city').notEmpty().withMessage('Elegir una ciudad'),
    body('contact_number').notEmpty().withMessage('Escribir número celular'),
    body('password').notEmpty().withMessage('Crear una contraseña').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número'),
    body('email').notEmpty().withMessage('Escribir un email').bail()
    .isEmail().withMessage('Debes escribir un mail válido').custom(async (value) => {
        const existingAliado = await db.Aliado.findOne({ where: { email: value } });
        if (existingAliado) {
          throw new Error('El correo electrónico ya está registrado');
        }
        return true;
      }),

    body('avatar').custom((value, {req}) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif', '.jpeg', '.gif'];
        
        if(!file) {
            throw new Error('Subir una imagen')
        } else {
        let fileExtension = path.extname(file.originalname);
        if (!acceptedExtensions.includes(fileExtension)) {
            throw new Error ('Las extensiones permitidas son: ' + acceptedExtensions)
        }
        };
        return true;
    }),

    body('condiciones').notEmpty().withMessage('Debes aceptar los términos y condiciones'),
    body('privacidad').notEmpty().withMessage('Debes aceptar las políticas de privacidad')
]

module.exports = validationsAliados;