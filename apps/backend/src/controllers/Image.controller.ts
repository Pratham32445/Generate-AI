import express from "express"
import { authMiddleware } from "../middlewares/authMiddleware";
import prismaClient from "db";
import { FalAiModel } from "../models/FalAiModel";

const router = express.Router();
const falAImodel = new FalAiModel();
const GENERATE_IMAGE = 0.4;


router.post("/generate", authMiddleware, async (req, res) => {
    const prompt = req.body.prompt;
    if (!prompt) {
        return res.status(411).json({
            message: "Invalid Inputs"
        })
    }
    const user = await prismaClient.user.findFirst({
        where: {
            // @ts-ignore
            email: req.user.email!
        }
    })
    if (!user) return res.status(404).json({
        message: "User not found"
    })
    if (+user?.credits! < GENERATE_IMAGE) {
        res.status(401).send({
            message: "Not Enough Credits to Generate Image",
        });
        return;
    }
    const request_id = await falAImodel.generateImageWithoutModel(prompt);
    const image = await prismaClient.outputImagesWithoutModel.create({
        data: {
            prompt,
            userId: user.Id,
            falAiRequestId: request_id,
            imageUrl: "",
            status: "Pending"
        }
    })
    res.json({
        requestId : image.falAiRequestId,
        imageId: image.Id
    })
})

router.post("/delete", authMiddleware, async (req, res) => {
    const ImageId = req.body.imageId;
    const type = req.body.type;
    console.log(ImageId, type);
    const user = await prismaClient.user.findFirst({
        where: {
            // @ts-ignore
            email: req.user.email!
        }
    })
    if (!user) return res.status(404).json({
        message: "user not found"
    })
    if (type == "outputImage") {
        const deletedImage = await prismaClient.outputImages.delete({
            where: {
                Id: ImageId,
                userId: user?.Id
            }
        })
        if (!deletedImage) return res.status(401).json({
            message: "Some error Occured"
        })
        return res.json({
            message: "Image deleted Successfully"
        })
    }
    else {
        const deletedImage = await prismaClient.outputImagesWithoutModel.delete({
            where: {
                Id: ImageId,
                userId: user?.Id
            }
        })
        if (!deletedImage) return res.status(401).json({
            message: "Some error Occured"
        })
        return res.json({
            message: "Image deleted Successfully"
        })
    }
})

export default router;