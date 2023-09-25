const express = require('express');
const mongoose = require('mongoose');
const apiResponse = require("../helpers/apiResponse");

const equipmentsModel = require("../models/equipmentsModel");

 const getEquipments = async (req, res) => { 
    try {
        const equipments = await equipmentsModel.find();
                 
        apiResponse.Success(res,"Equipments",{ equipments: equipments })
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
}


 const getEquipment = async (req, res) => { 
    const { id } = req.params;

    try {
        const equipment = await equipmentsModel.findById(id);
        
        apiResponse.Success(res,"Equipment",{ equipment: equipment })
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
}


 const createEquipment = async (req, res) => {
    const equipment = req.body;

    const newEquipment = new equipmentsModel({ ...equipment, creator: req.equipmentId, })
    console.log("Saved data",newEquipment);
    try {
        await newEquipment.save();
        
        apiResponse.Success(res,"NewEquipment",{ newEquipment: newEquipment })
    } catch (err) {
        console.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
}


 const updateEquipment = async (req, res) => {
    const { id } = req.params;
    const { name, quantity, value, company_name, date_of_purchaced, category} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedEquipment = {name, quantity, value, company_name, date_of_purchaced, category, _id: id };

    await equipmentsModel.findByIdAndUpdate(id, updatedEquipment, { new: true });

    apiResponse.Success(res,"Equipment Updated", {})
}


 const deleteEquipment = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await equipmentsModel.findByIdAndRemove(id);

    apiResponse.Success(res,"Equipment Deleted", {})
}

module.exports = {getEquipment, getEquipments, deleteEquipment, createEquipment, updateEquipment};