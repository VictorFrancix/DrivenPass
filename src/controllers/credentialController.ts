import {Request, Response} from "express";
import * as credentialService from "./../services/credentialServices.js";


export const createCredential = async (req: Request, res: Response) => {
    const userId = Number(res.locals.user.id)
    const  credentialsData = req.body;
    const createdCredential = await credentialService.create(credentialsData, userId);
    
    res.status(201).send(createdCredential);
}

export const getAllCredentials = async (req: Request, res: Response) => {
    const userId = Number(res.locals.user.id);
    const credentials = await credentialService.getAll(userId);
    res.status(200).send(credentials);
}

export const getCredentialById = async (req: Request, res: Response) => {
    const userId = Number(res.locals.user.id);
    const credentialId = Number(req.params.id);
    const credential = await credentialService.getById(userId, credentialId);
    res.status(200).send(credential);
}

export const deleteCredentialById = async (req: Request, res: Response) => {
    const userId = Number(res.locals.user.id);
    const credentialId = Number(req.params.id);
    const credential = await credentialService.deleteById(userId, credentialId);
    res.status(200).send(credential)
}
