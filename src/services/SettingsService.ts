import { getCustomRepository, Repository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";
import { Settings } from "../entities/Settings";

interface ISettingsCreate {
    chat: boolean;
    username: string;
}

export class SettingsService {

    private settingsRepository: Repository<Settings>;

    constructor() {
        this.settingsRepository = getCustomRepository(SettingsRepository);
    }

    async create({ chat, username }: ISettingsCreate) {


        //Select * from Settings where Username = "username" limit 1
        const userAlreadyExists = await this.settingsRepository.findOne({
            username
        });

        if (userAlreadyExists) {
            throw new Error("User already exists!");
        }

        const settings = this.settingsRepository.create({
            chat, username
        })

        await this.settingsRepository.save(settings);

        return settings;

    }

    async findByUsername(username: string) {
        const settings = await this.settingsRepository.findOne({
            username
        })

        return settings;
    }

    async update(username: string, chat: boolean) {
        const settings = await this.settingsRepository.createQueryBuilder()
            .update(Settings).
            set({ chat }).
            where("username = :username", { username })
            .execute();
    }
}