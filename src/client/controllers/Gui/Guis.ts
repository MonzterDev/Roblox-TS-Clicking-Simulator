import { Players } from "@rbxts/services";

export const ButtonsGui = <ScreenGui>Players.LocalPlayer.WaitForChild( "PlayerGui" ).WaitForChild( "Buttons" )
export const LeftButtons = <Frame>ButtonsGui.WaitForChild( "Left" )