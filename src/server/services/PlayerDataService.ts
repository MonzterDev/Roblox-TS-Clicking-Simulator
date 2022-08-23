import { OnInit, Service } from "@flamework/core";
import ProfileService from "@rbxts/profileservice";
import { Profile } from "@rbxts/profileservice/globals";
import { DEFAULT_PLAYER_DATA } from "shared/constants";
import { PlayerData } from "shared/types/PlayerData";
import { forEveryPlayer } from "shared/util/functions/forEveryPlayer";
import { Events, Functions } from "server/network";

const DATASTORE_NAME = "PlayerData";
const KEY_TEMPLATE = "%d_Data";

@Service()
export class PlayerDataService implements OnInit {
	private profileStore = ProfileService.GetProfileStore( DATASTORE_NAME, DEFAULT_PLAYER_DATA );
	private profiles = new Map<Player, Profile<PlayerData>>();

	onInit () {
		forEveryPlayer(
			player => this.createProfile( player ),
			player => this.removeProfile( player ),
		);

		Functions.getData.setCallback( player => {
			const profile = this.profiles.get( player );

			return profile?.Data ?? false;
		} );
	}

	private createProfile ( player: Player ) {
		const userId = player.UserId;
		const profileKey = KEY_TEMPLATE.format( userId );
		const profile = this.profileStore.LoadProfileAsync( profileKey );

		if ( !profile ) {
			return player.Kick();
		}

		profile.ListenToRelease( () => {
			this.profiles.delete( player );
			player.Kick();
		} );

		profile.AddUserId( userId );
		profile.Reconcile();

		this.profiles.set( player, profile );
	}

	private removeProfile ( player: Player ) {
		const profile = this.profiles.get( player );
		profile?.Release();
	}

	public getProfile ( player: Player ) {
		const profile = this.profiles.get( player );

		if ( profile ) {

			const modifyTaps = ( value: number ) => {
				profile.Data.taps = value
				Events.modifiedTaps( player, value )
			}

			return {
				data: profile.Data,
				modifyTaps: modifyTaps,
			};
		}

		return false;
	}
}
