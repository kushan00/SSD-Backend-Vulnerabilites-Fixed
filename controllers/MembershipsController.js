const express = require('express');
const mongoose = require('mongoose');
const apiResponse = require("../helpers/apiResponse");

const membershipModel = require("../models/membershipModel");

 const getMemberships = async (req, res) => { 
    try {
        const memberships = await membershipModel.find();
                 
        apiResponse.Success(res,"Memberships",{ memberships: memberships })
    } catch (err) {
        logger.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
}


 const getMembership = async (req, res) => { 
    const { id } = req.params;

    try {
        const membership = await membershipModel.findById(id);
        
        apiResponse.Success(res,"Membership",{ membership: membership })
    } catch (err) {
        logger.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
}


 const createMembership = async (req, res) => {
    const memberships = req.body;

    const newMembership = new membershipModel({ ...memberships, creator: req.membershipsId, })
    console.log("Saved data",newMembership);
    try {
        await newMembership.save();
        
        apiResponse.Success(res,"New Membership",{ newMembership: newMembership })
    } catch (err) {
        logger.error(err.message);
        apiResponse.ServerError(res,"Server Error",{err:err});
    }
}


 const updateMembership = async (req, res) => {
    const { id } = req.params;
    const { name, price, duration, description} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return apiResponse.NotFound(res,`No post with id: ${id}`,{ err: "Error" });

    const updatedMembership = {name, price, duration, description, _id: id };

    await membershipModel.findByIdAndUpdate(id, updatedMembership, { new: true });

    apiResponse.Success(res,"Membership Updated", {})
}


 const deleteMembership = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return apiResponse.NotFound(res,`No post with id: ${id}`,{ err: "Error" });

    await membershipModel.findByIdAndRemove(id);

    apiResponse.Success(res,"Membership Deleted", {})
}

module.exports = {getMembership, getMemberships, deleteMembership, createMembership, updateMembership};