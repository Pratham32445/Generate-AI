import axios, { isAxiosError } from "axios"

export const deleteUserImage = async (imageId: string, type: string) => {
    try {
        const tokenData = await axios.get("/api/token");
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/image/delete`, { imageId, type }, {
            headers: {
                Authorization: `Bearer ${tokenData.data.token}`,
            },
        });
        return { status: 200, message: res.data.message }
    } catch (error) {
        if (isAxiosError(error)) {
            return { status: 401, message: error?.response?.data.message }
        }
    }
}