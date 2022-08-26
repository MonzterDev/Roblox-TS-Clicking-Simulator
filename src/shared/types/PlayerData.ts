import { RebirthConfig } from "shared/configs/rebirthShop";

export interface PlayerData {
	taps: number;
	gems: number;
	settings: Settings
	rebirthButtons: RebirthButtons
}

export interface Settings {
	music: boolean,
	sound_effects: boolean
}

export type RebirthButtons = Map<number, boolean>