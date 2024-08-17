const ServerDown: React.FC = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="d-flex flex-column align-items-center border rounded px-5 py-4 bg-light">
                <h1 className="text-danger">
                    There was an error with the server :(
                </h1>
                <h3 className="pt-3">
                    Try reloading the page or try again later
                </h3>
            </div>
        </div>
    )
}

export default ServerDown;