import Roact from "@rbxts/roact"
import { ButtonsUI } from "../ButtonsUI"

export = ( target: Frame ): ( () => void ) => {
    const app = <ButtonsUI />
    const mount = Roact.mount( app, target )

    return () => {
        Roact.unmount(mount)
    }
}