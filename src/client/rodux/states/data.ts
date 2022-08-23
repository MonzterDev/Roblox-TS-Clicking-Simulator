import { Action, createReducer } from "@rbxts/rodux";
import { DEFAULT_PLAYER_DATA } from "shared/constants";
import { PlayerData } from "shared/types/PlayerData";

interface UpdateDataAction extends Action<"updatePlayerData"> {
    newData: DataState;
}

export type DataState = PlayerData;
export type DataActions = UpdateDataAction;

export const dataReducer = createReducer<DataState, DataActions>( DEFAULT_PLAYER_DATA, {
    updatePlayerData: ( _, action ) => action.newData,
} );
