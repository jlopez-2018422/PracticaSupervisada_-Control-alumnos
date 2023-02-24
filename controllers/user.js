const {response, request} = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const getUsers = async (req = request, res = response) => {
    const listaUsers = await Promise.all([
        User.countDocuments(),
        User.find()
    ])

    res.json({
        msg: 'get api usuarios',
        listaUsers
    })
}


const postUser = async (req = request, res = response) => {
    const {nombre, email, password, role, cursos} = req.body;
    const userDB = new User({nombre, email, password, role, cursos});

    const salt = bcryptjs.genSaltSync();
    userDB.password = bcryptjs.hashSync(password, salt);

    await userDB.save();

    res.json({
        msg: 'post api usuarios',
        userDB
    })
}

const putUser = async(req = request, res = response) => {
    const {id} = req.params;
    const {_id, role, ...resto} = req.body;
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(resto.password, salt);
    const userEditado = await User.findByIdAndUpdate(id, resto, {new: true});
    res.status(200).json({
        msg: 'put api usuarios',
        userEditado
    })
}
const putMyUser = async (req = request, res = response) => {
    const {id} = req.params;
    const user = req.user._id;
    const idUser = user.toString();

    if (id === idUser) {
        const {_id, role,...resto} = req.body;
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(resto.password, salt);
        const userEditado = await User.findByIdAndUpdate(id, resto, {new: true});
        res.status(200).json({
            msg: 'put api usuarios',
            userEditado
        })
    } else{
        res.status(401).json({
            msg: 'si no es tu cuenta, no puedes editarla'

        })
    }

}

const deleteUser = async(req = request, res = response) => {
    const {id} = req.params;
    const userEliminado = await User.findByIdAndDelete(id);

    res.status(200).json({
        msg: 'delete api usuarios',
        userEliminado
    })
}

const deleteMyUser = async(req = request, res = response) => {
    const {id} = req.params;
    const user = req.user._id;
    const idUser = user.toString();

    if(id === idUser){
        const userEliminado = await User.findByIdAndDelete(id);
        res.status(200).json({
            msg: 'delete api usuarios',
            userEliminado
        })
    }else{
        res.status(401).json({
            msg: 'si no es tu cuenta, no puedes eliminarla'


        })
    }
    
}

const registerUser = async (req = request, res = response) => {
    const {nombre, email, password} = req.body;

    const userRegistered =  new User({nombre, email, password});
    const salt = bcryptjs.genSaltSync();
    userRegistered.password = bcryptjs.hashSync(password, salt);

    await userRegistered.save();

    res.status(200).json({
        msg: 'Nuevo alumno registrado',
        userRegistered
        
    })
}

const getMyCourses = async (req = request, res = response) => {
    const user = req.user._id;
    const cursos = req.user.cursos

    res.json({
        msg: 'get api cursos del alumno',
        cursos
    })
    
}


module.exports = {
    getUsers,
    postUser,
    putUser,
    deleteUser,
    registerUser,
    getMyCourses,
    deleteMyUser,
    putMyUser
    
}