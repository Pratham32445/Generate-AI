import axios from "axios";

export const getImage = async (imageId: string, model: string) => {
    const image = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/model/image?imageId=${imageId}&model=${model}`
    );
    return image;
};