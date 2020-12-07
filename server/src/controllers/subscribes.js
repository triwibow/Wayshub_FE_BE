const {
    Chanel,
    Subscribe,
    Video,
    Comment,
    sequelize
} = require('../../models');

const { QueryTypes } = require('sequelize');

const Joi = require('joi');

const addSubscribe = async (req, res) => {
    try {
        const { id } = req.user;
        const { body } = req;

        console.log(body.chanelId);

        const isChanelExist = await Chanel.findOne({
            where : {
                id: body.chanelId
            }
        });

        console.log(isChanelExist);

        if(id === body.chanelId){
            return res.status(400).send({
                status: 'error',
                error: {
                    message: "Cannot subscribe"
                }
            });
        }

        if(!isChanelExist){
            return res.status(400).send({
                status: 'error',
                error: {
                    message: "chanel not exist"
                }
            });
        }

        const isSubscribed = await Subscribe.findOne({
            where: {
                chanelId: body.chanelId,
                subscriberId: id
            }
        });

        const schema = Joi.object({
            chanelId: Joi.number().integer().required()
        });

        const { error } = schema.validate(body ,{
            abortEarly: false
        });

        if(error){
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

        if(isSubscribed){
            return res.status(400).send({
                status: 'error',
                error: {
                    message: "Already subscribe to this chanel"
                }
            });
        }

        await Subscribe.create({
            ...body,
            subscriberId: id
        });

        const chanel = await Chanel.findOne({
            where: {
                id: body.chanelId
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
            }
        });

        res.send({
            status: "success",
            data: {
                subscribe: {
                    chanel
                }
            }
        })

    } catch(err){
        console.log(err);
        return res.status(500).send({
            status: "error",
            messages: "server error"
        });
    }
}

const unSubscribe = async (req, res) => {
    try {
        const { id:subscriberId } = req.user;
        const { chanelId } = req.params;

        const isSubscribed = await Subscribe.findOne({
            where: {
                chanelId,
                subscriberId
            }
        });

        if(!isSubscribed){
            return res.status(400).send({
                status: 'error',
                error: {
                    message: "Resource not found"
                }
            });
        }

        isSubscribed.destroy();

        res.send({
            status: "success",
            data: {
                id: chanelId
            }
        })

    } catch(err){
        console.log(err);
        return res.status(500).send({
            status: "error",
            messages: "server error"
        });
    }
}

const getSubscribtion = async (req, res) => {
    try {
        const { id } = req.user;

        const subscribtion = await sequelize.query(
            `SELECT title, videos.thumbnail, videos.description, video, videos.createdAt, viewCount FROM videos LEFT JOIN chanels on chanels.id = videos.chanelId LEFT JOIN subscribes on subscribes.chanelId = chanels.id WHERE subscribes.subscriberId = ${id}`,
            {
              replacements: { status: 'active' },
              type: QueryTypes.SELECT
            }
        );


        if(subscribtion.length === 0){
            return res.status(400).send({
                status: 'error',
                error: {
                    message: "Resource not found"
                }
            });
        }


        res.send({
            status: "success",
            data : {
                subscribtion
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

exports.addSubscribe = addSubscribe;
exports.unSubscribe = unSubscribe;
exports.getSubscribtion = getSubscribtion;