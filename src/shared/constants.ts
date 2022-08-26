import { RebirthShopConfig } from "./configs/rebirthShop";
import { PlayerData } from "./types/PlayerData";

export const DEFAULT_PLAYER_DATA: PlayerData = {
    taps: 0,
    gems: 0,
    settings: {
        music: true,
        sound_effects: true
    },
    rebirthButtons: new Map()
}

RebirthShopConfig.forEach( ( _, index ) => {
    DEFAULT_PLAYER_DATA.rebirthButtons.set( index, false )
} )

export const IMAGE_STRING_PREFIX = "rbxassetid//"
export const ON_BUTTON = "rbxassetid://10708452023"
export const OFF_BUTTON = "rbxassetid://10708452021"