export function CloseGui ( gui: ScreenGui ) {
    gui.GetDescendants().forEach( ( descendant ) => {
        if ( descendant.Name === "Exit" && ( descendant.IsA( "TextButton" ) || descendant.IsA( "ImageButton" ) ) ) {
            descendant.MouseButton1Click.Connect( () => gui.Enabled = false )
        }
    } )
}