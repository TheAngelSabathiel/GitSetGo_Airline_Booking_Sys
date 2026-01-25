const AncillaryService = require("../models/AncillaryService");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { errorHandler } = require("../auth");
require("dotenv").config();


exports.createService = async (req, res) => {
    try {
        const newService = new AncillaryService(req.body);
        const savedService = await newService.save();
        res.status(201).send(savedService);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getAllServices = async (req, res) => {
    try {
        const services = await AncillaryService.find({});
        res.status(200).send(services);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getAllActiveServices = async (req, res) => {
    try {
        const activeServices = await AncillaryService.find({ isActive: true });
        res.status(200).send(activeServices);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getServiceInfo = async (req, res) => {
    try {
        const service = await AncillaryService.findById(req.params.serviceId);
        if (!service) return res.status(404).send({ message: "Service not found" });
        res.status(200).send(service);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.updateServiceInfo = async (req, res) => {
    try {
        const updatedService = await AncillaryService.findByIdAndUpdate(
            req.params.serviceId, 
            req.body, 
            { new: true }
        );
        res.status(200).send(updatedService);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.archiveService = async (req, res) => {
    try {
        const archived = await AncillaryService.findByIdAndUpdate(
            req.params.serviceId, 
            { isActive: false }, 
            { new: true }
        );
        res.status(200).send({ message: "Service archived successfully", archived });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.searchByName = async (req, res) => {
    try {
        const services = await AncillaryService.find({
            name: { $regex: req.body.name, $options: 'i' } // Case-insensitive search
        });
        res.status(200).send(services);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports.uploadPicture = (req, res) => {
    const { serviceId } = req.params;
    const { pictureUrl } = req.body;

    Ancillary.findByIdAndUpdate(
        serviceId, 
        { picture: pictureUrl }, 
        { new: true } 
    )
    .then(updatedService => {
        if (updatedService) {
            res.status(200).send({
                message: "Picture updated successfully",
                updatedService
            });
        } else {
            res.status(404).send({ message: "Service not found" });
        }
    })
    .catch(error => errorHandler(error, req, res));
};