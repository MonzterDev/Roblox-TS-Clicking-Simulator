export function DisplayGui ( button: TextButton | ImageButton, gui: ScreenGui ) {
    button.MouseButton1Click.Connect( () => {
        gui.Enabled = !gui.Enabled
    } )
}