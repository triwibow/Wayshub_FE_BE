const { Chanel } = require('../../models');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { body } = req;

        const schema = Joi.object({
            email: Joi.string().email().required(),
            chanelName: Joi.string().required(),
            description: Joi.string().required(),
            password: Joi.string().required()
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

        if(checkEmail){
            return res.status(400).send({
                status: 'error',
                error: {
                    message: "email is already registered"
                }
            });
        }

        if(checkChanelName){
            return res.status(400).send({
                status: 'error',
                error: {
                    message: "chanel name is already registered"
                }
            });
        }

        const { email, chanelName, description, password } = body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await Chanel.create({
            email,
            chanelName,
            description,
            thumbnail: "default.png",
            photo: "default.png",
            password: hashedPassword
        });

        const privateKey = process.env.JWT_PRIVATE_KEY;
        const token = jwt.sign(
            {
                id: user.id
            },
            privateKey
        );

        res.send({
            status: 'success',
            data: {
                chanel: {
                    email: user.email,
                    token
                }
            }

        })

    } catch(err){
        console.log(err);
        return res.status(500).send({
            status: 'error',
            error: {
              message: "Server Error",
            }
        });
    }

}


exports.register = register;