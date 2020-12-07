const {
    Video,
    Chanel,
    Comment
} = require('../../models');

const Joi = require('joi');
const { moveFile, deleteFile } = require('../helper/file');

const getVideos = async (req, res) => {
    try {
        const videos = await Video.findAll({
            attributes: {
                exclude:['updatedAt','chanelId', 'chanelid', 'ChanelId']
            },
            include: {
                model: Chanel,
                as: 'chanel',
                attributes:{
                    exclude:['updatedAt', 'createdAt', 'password']
                }
            }
        });

        res.send({
            status: "success",
            data : {
                videos
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

const getVideoById = async (req, res) => {
    try {
        const {id} = req.params;
        const video = await Video.findOne({
            where: {
                id
            },
            attributes:{
                exclude:['updatedAt','chanelId', 'chanelid', 'ChanelId'],
            },
            include: [
                {
                    model: Chanel,
                    as:'chanel',
                    attributes:{
                        exclude:['updatedAt', 'createdAt', 'password']
                    }
                },
                {
                    model:Comment,
                    as:"comments",
                    attributes:{
                        exclude:['chanelid', 'videoid', 'updatedAt', 'createdAt', 'ChanelId', 'VideoId', 'chanelId']
                    },
                    include: {
                        model: Chanel,
                        as:'chanel',
                        attributes:{
                            exclude:['updatedAt', 'createdAt', 'password']
                        }
                    }
                }
            ]

        });

        if(!video){
            return res.status(400).send({
                status: "error",
                messages: "Resource not found"
            });
        }

        res.send({
            status: "success",
            data : {
                video
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

const addVideo = async (req, res) => {
    try {
        const { id } = req.user;

        const { body, files } = req;
        const thumbnailName = (files.thumbnail) ? files.thumbnail[0].filename : null;
        const videoName = (files.video) ? files.video[0].filename : null;

        if(!id){
            deleteFile('tmp/thumbnail', thumbnailName);
            deleteFile('tmp/video', videoName);
            return res.status(400).send({
                status: 'error',
                error: {
                    message: "invalid user"
                }
            });
        }

        const schema = Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
        });

        const { error } = schema.validate(body ,{
            abortEarly: false
        });

        if(error){
            deleteFile('tmp/thumbnail', thumbnailName);
            deleteFile('tmp/video', videoName);
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

        if(!thumbnailName){
            deleteFile('tmp/thumbnail', thumbnailName);
            deleteFile('tmp/video', videoName);
            return res.status(400).send({
                status: 'error',
                error: {
                    message: "please select thumbnail"
                }
            });
        }

        if(!videoName){
            deleteFile('tmp/thumbnail', thumbnailName);
            deleteFile('tmp/video', videoName);
            return res.status(400).send({
                status: 'error',
                error: {
                    message: "please select video"
                }
            });
        }

        const postVideo = await Video.create(
            {
                ...body,
                chanelId: id,
                thumbnail: thumbnailName,
                video: videoName,
                viewCount: 0
            }
        );

        const video = await Video.findOne({
            where: {
                id: postVideo.id
            },
            attributes:{
                exclude:['updatedAt','chanelId', 'chanelid', 'ChanelId'],
            },
            include: [
                {
                    model: Chanel,
                    as:'chanel',
                    attributes:{
                        exclude:['updatedAt', 'createdAt', 'password', 'id']
                    }
                },
                {
                    model:Comment,
                    as:"comments",
                    attributes:{
                        exclude:['chanelid', 'videoid', 'updatedAt', 'createdAt', 'ChanelId', 'VideoId', 'chanelId']
                    },
                    include: {
                        model: Chanel,
                        as:'chanel',
                        attributes:{
                            exclude:['updatedAt', 'createdAt', 'password']
                        }
                    }
                }
            ]

        });


        moveFile('thumbnail', postVideo.thumbnail);
        moveFile('video', postVideo.video);

        return res.send({
            status: "success",
            data: {
                video
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

const editVideo = async (req, res) => {
    try {
        const currentUserLoginId = req.user.id;
        const { videoId } = req.params;

        const videoDb = await Video.findOne({
            where: {
                id: videoId,
                chanelId: currentUserLoginId
            }
        });

        const thumbnailDbName = (videoDb) ? videoDb.thumbnail:null;
        const videoDbName = (videoDb)? videoDb.video:null;

        const { body, files } = req;
        const thumbnailName = (files.thumbnail) ? files.thumbnail[0].filename : thumbnailDbName
        const videoName = (files.video) ? files.video[0].filename : videoDbName;

        if(!videoDb){
            deleteFile('tmp/thumbnail', thumbnailName);
            deleteFile('tmp/video', videoName);
            return res.status(400).send({
                status: "error",
                messages: "Resource not found"
            });
        }

        const schema = Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
        });

        const { error } = schema.validate(body ,{
            abortEarly: false
        });

        if(error){
            deleteFile('tmp/thumbnail', thumbnailName);
            deleteFile('tmp/video', videoName);
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

        await Video.update({
            ...body,
            thumbnail: thumbnailName,
            video: videoName,
        }, {
            where: {
                id: videoId
            }
        });

        const video = await Video.findOne({
            where: {
                id: videoId
            },
            attributes:{
                exclude:['updatedAt','chanelId', 'chanelid', 'ChanelId'],
            },
            include: [
                {
                    model: Chanel,
                    as:'chanel',
                    attributes:{
                        exclude:['updatedAt', 'createdAt', 'password', 'id']
                    }
                },
                {
                    model:Comment,
                    as:"comments",
                    attributes:{
                        exclude:['chanelid', 'videoid', 'updatedAt', 'createdAt', 'ChanelId', 'VideoId', 'chanelId']
                    },
                    include: {
                        model: Chanel,
                        as:'chanel',
                        attributes:{
                            exclude:['updatedAt', 'createdAt', 'password']
                        }
                    }
                }
            ]

        });

        moveFile('thumbnail', video.thumbnail);
        moveFile('video', video.video);
        
        if(video.thumbnail !== videoDb.thumbnail){
            deleteFile('thumbnail', videoDb.thumbnail);
        }

        if(video.video !== videoDb.video){
            deleteFile('video', videoDb.video);
        }

        
        return res.send({
            status: "success",
            data: {
                video
            }
        });


    } catch(err){
        console.log(err);
    }
}

const deleteVideo = async (req, res) => {
    try {

        const currentUserLoginId = req.user.id;
        const { videoId } = req.params;

        const videoDb = await Video.findOne({
            where: {
                id: videoId,
                chanelId: currentUserLoginId
            }
        });

        if(!videoDb){
            return res.status(400).send({
                status: "error",
                messages: "Resource not found"
            });
        }

        deleteFile('thumbnail', videoDb.thumbnail);
        deleteFile('video', videoDb.video);

        await Comment.destroy({
            where: {
                videoId
            }
        });

        await Video.destroy({
            where: {
                id: videoId
            }
        });

        return res.send({
            status: "success",
            data: {
                id: videoId
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

exports.getVideos = getVideos;
exports.getVideoById = getVideoById;
exports.addVideo = addVideo;
exports.editVideo = editVideo;
exports.deleteVideo = deleteVideo;