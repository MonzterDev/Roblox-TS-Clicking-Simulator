import Roact from "@rbxts/roact"
import { ButtonsUI } from "../ButtonsUI"
import { CurrencyUI } from "../CurrencyUI"

export = ( target: Frame ): ( () => void ) => {
    const app = <CurrencyUI taps={1} gems={1} />
    const mount = Roact.mount( app, target )

    return () => {
        Roact.unmount(mount)
    }
}