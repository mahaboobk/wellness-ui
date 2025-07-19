import { useEffect } from "react"

const AppVersion = () => {
    useEffect(() => {
        console.log('App Version', __APP_VERSION__)
    }, [__BUILD_TIME__])
    return (
        <small style={{ opacity: 0.6 }}>
            Build: {__BUILD_TIME__}
            App Version: {__APP_VERSION__}
        </small>
    )
}

export default AppVersion