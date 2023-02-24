const {Schema, model} = require('mongoose');
const CursoSchema = new Schema({
    
    nombre:{
        type:String,
        required:[true, 'El nombre es obligatorio']

    },
    descripcion:{
        type:String,
        required:[true, 'La descripcion es obligatoria']
    },
    maestro:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    alumnos:{
        type: Array,
        default:[]
        
    }
});
module.exports = model('Curso',CursoSchema);