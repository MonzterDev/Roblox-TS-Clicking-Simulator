import { Controller, OnInit } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Events, Functions } from "client/network";
import { DEFAULT_PLAYER_DATA, OFF_BUTTON, ON_BUTTON } from "shared/constants";
import { Settings } from "shared/types/PlayerData";
import { toTitleCase } from "shared/util/functions/toTileCase";
import { ButtonsGui, LeftButtons } from "./Guis";
import { CloseGui } from "./utils/Close";
import { DisplayGui } from "./utils/Display";

@Controller()
export class SettingsController implements OnInit {

    private button = <ImageButton>LeftButtons.WaitForChild( "Settings" )
    private gui = <ScreenGui>Players.LocalPlayer.WaitForChild( "PlayerGui" ).WaitForChild( "Settings" )
    private frame = this.gui.WaitForChild( "Frame" )

    private container = <ScrollingFrame>this.frame.WaitForChild( "Container" )
    private template = <Frame>this.container.WaitForChild( "Template" )

    onInit (): void | Promise<void> {
        DisplayGui( this.button, this.gui )
        CloseGui( this.gui )

        Functions.getData( "settings" ).andThen( ( settingTable ) => {
            if ( typeIs( settingTable, "table" ) ) {
                for ( const [setting, value] of pairs( settingTable ) ) {
                    this.generateTemplate( setting, value )
                }
            }
        } )
    }

    generateTemplate ( setting: keyof Settings, value: Settings[keyof Settings] ) {
        const clone = this.template.Clone()
        clone.Parent = this.container
        clone.Name = setting
        clone.Visible = true

        const settingLable = <TextLabel>clone.FindFirstChild( "Setting" )
        settingLable.Text = toTitleCase( setting.gsub( "_", " " )[0] )

        const toggleButton = <ImageButton>clone.FindFirstChild( "Button" )
        toggleButton.Image = value ? ON_BUTTON : OFF_BUTTON
        toggleButton.MouseButton1Click.Connect( () => {
            if ( toggleButton.Image === ON_BUTTON ) {
                toggleButton.Image = OFF_BUTTON
                Events.changeSetting( setting, false )
            } else {
                toggleButton.Image = ON_BUTTON
                Events.changeSetting( setting, true )
            }
        } )
    }
}