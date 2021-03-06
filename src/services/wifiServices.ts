import * as wifiRepository from "../repositories/wifiRepository.js";
import * as dataUtils from "../utils/dataUtils.js";

export async function create(wifiData: wifiRepository.WifiData, userId: number) {
    await checkwifiExists(wifiData.title);

    wifiData.password = dataUtils.encrypt(wifiData.password);
    const data = { ...wifiData, userId };

    await wifiRepository.create(data);
}

export async function getAll(userId: number) {
    const wifi = await wifiRepository.getAll(userId);

    return wifi;
}

const checkwifiExists = async (title: string) => {
    const user = await wifiRepository.getByTitle(title);
    if (user) {
        throw {
            type: "conflict",
            message: "Wifi already registered"
        }
}
}

export async function getById(userId: number, id: number) {
    const wifi = await wifiRepository.getById(id);

    if (!wifi) {
        throw {
            type: "notFound",
            message: "Wifi not found",
        };
    }

    dataUtils.checkUser(wifi.userId, userId);
    wifi.password = dataUtils.decrypt(wifi.password);

    return wifi;
}

export async function deleteById(userId: number, id: number) {
    const wifi = await wifiRepository.getById(id);

    if (!wifi) {
        throw {
            type: "notFound",
            message: "Wifi not found",
        };
    }

    dataUtils.checkUser(wifi.userId, userId);

    return await wifiRepository.deleteById(id);
}