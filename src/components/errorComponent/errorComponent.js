import { useCallback } from "react"

const ErrorComponent = () => {
    const renderError = useCallback(() => {
        return <div className="fs-4 text fw-bold text-danger">Ошибка! Попробуйте перезагрузить страницу или вернитесь к ней позже.</div>
    }, [])
    
    return <div className="text-center">{renderError()}</div>
}

export default ErrorComponent;