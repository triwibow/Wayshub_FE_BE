const {
    Chanel,
    Subscribe,
    Video,
    Comment
} = require('../../models');

const Joi = require('joi');
const bcrypt = require('bcrypt');
const { moveFile, deleteFile } = require('../helper/file');

const getChanels = async (req, res) => {
    try {
        const chanels = await Chanel.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
            },
            include: {
                model: Chanel,
                as: 'subscribers',
                through: {
                    attributes : []
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password']
                }
            }
        });

        res.send({
            status: "success",
            data : {
                chanels
            }
        });
    } catch(err){
        console.log(err);
        return res.status(500).send({
            status: "error",
            messages: "server error"
        });
    }
}

const getChanelById = async (req, res) => {
    try {
        const {id} = req.params;
        const chanel = await Chanel.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
            },
            include: {
                model: Chanel,
                as: 'subscribers',
                through: {
                    attributes : []
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password']
                }
            }
        });

        if(!chanel){
            return res.status(400).send({
                status: 'error',
                error: {
                    message: "Chanel not found"
                }
            });
        }

        res.send({
            status: "success",
            data : {
                chanel
            }
        });
    } catch(err) {
        console.log(err);
        return res.status(500).send({
            status: "error",
            messages: "server error"
        });
    }
}

const editChanel = async (req, res) => {
    
    try {

        const currentUserLoginId = req.user.id;
        const { id } = req.params;

        const chanelDb = await Chanel.findOne({
            where: {
                id
            }
        });

        const { body, files } = req;
        const thumbnailName = (files.thumbnail) ? files.thumbnail[0].filename : chanelDb.thumbnail
        const photoName = (files.photo) ? files.photo[0].filename : chanelDb.photo;

        if(currentUserLoginId != id){
            deleteFile('tmp/photo', photoName);
            deleteFile('tmp/thumbnail', thumbnailName);
            return res.status(400).send({
                status: "error",
                messages: "Invalid user"
            });
        }

        const schema = Joi.object({
            email: Joi.string().email().required(),
            chanelName: Joi.string().required(),
            description: Joi.string().required(),
            password: Joi.string()
        });


        const { error } = schema.validate(body ,{
            abortEarly: false
        });

        const checkEmail = await Chanel.findOne({
            where: {
                email: body.email
            }
        });

        const checkChanelName = await Chanel.findOne({
            where: {
                chanelName: body.chanelName
            }
        });

        if(error){
            deleteFile('tmp/photo', photoName);
            deleteFile('tmp/thumbnail', thumbnailName);
            return res.status(400).send({
                status: 'error',
                error: {
                    message: error.details.map(err => {
                        return {
                            [err.path] : err.message
                        };
                    })
                }
            });
        }

        if(checkEmail && body.email !== chanelDb.email){
            deleteFile('tmp/photo', photoName);
            deleteFile('tmp/thumbnail', thumbnailName);
            return res.status(400).send({
                status: 'error',
                error: {
                    message: "email is already registered"
                }
            });
        }


        if(checkChanelName && body.chanelName !== chanelDb.chanelName){
            deleteFile('tmp/photo', photoName);
            deleteFile('tmp/thumbnail', thumbnailName);
            return res.status(400).send({
                status: 'error',
                error: {
                    message: "chanel name is already registered"
                }
            });
        }

        
        const checkPassword = await bcrypt.compare(body.password, chanelDb.password);
        
        const newPasword = (checkPassword) ? chanelDb.password : await bcrypt.hash(body.password, 10);

        const update = await Chanel.update({
            ...body,
            password: newPasword,
            thumbnail: thumbnailName,
            photo: photoName
        }, {
            where: {
                id
            }
        });

        const chanel = await Chanel.findOne({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password', 'id']
            },
            where: {
                id
            }
        });

        moveFile('photo', chanel.photo);
        moveFile('thumbnail', chanel.thumbnail);
        
        if(chanel.photo !== chanelDb.photo){
            deleteFile('photo', chanelDb.photo);
        }

        if(chanel.thumbnail !== chanelDb.thumbnail){
            deleteFile('thumbnail', chanelDb.thumbnail);
        }
        
        return res.send({
            status: "success",
            data: {
                chanel
            }
        });

    } catch(err){
        console.log(err);
        return res.status(500).send({
            status: "error",
            messages: "server error"
        });
    }
}

const deleteChanel = async (req, res) => {
    try {
        const { id } = req.params;
        const currentUserLoginId = req.user.id;

        if(currentUserLoginId != id){
            return res.status(400).send({
                status: "error",
                messages: "Invalid user"
            });
        }

        const chanelById = await Chanel.findOne({
            where: {
                id
            }
        });

        const video = await Video.findAll({
            where: {
                chanelId: id
            }
        });

        const videoId = [];

        video.forEach(item => {
            videoId.push(item.id);
        });

        if(!chanelById){
            return res.status(400).send({
                status: 'error',
                message: `Chanel with id: ${id} not found`,
            });
        }

        deleteFile('photo', chanelById.photo);
        deleteFile('thumbnail', chanelById.thumbnail);

        await Subscribe.destroy({
            where: {
                subscriberId: id
            }
        });

        await Subscribe.destroy({
            where: {
                chanelId: id
            }
        });

        await Comment.destroy({
            where: {
                id: videoId
            }
        });

        await Comment.destroy({
            where: {
                chanelId: id
            }
        })

        await Video.destroy({
            where: {
                chanelId: id
            }
        })

        await Chanel.destroy({
            where: {
                id
            }
        })
        
        return res.send({
            status: "success",
            data: {
                id
            }
        });

    } catch(err){
        console.log(err);
        return res.status(500).send({
            status: "error",
            messages: "server error"
        });
    }
}

exports.getChanels = getChanels;
exports.getChanelById = getChanelById;
exports.editChanel = editChanel;
exports.deleteChanel = deleteChanel;