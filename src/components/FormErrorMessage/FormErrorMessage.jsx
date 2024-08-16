export function FormErrorMessage (props) {

    if (props.message === '') {
        return
    }
    
    return (
        <>
            <div className="error-message-wrapper">
                <p>{props.message}</p>
            </div>
        </>
    )
}