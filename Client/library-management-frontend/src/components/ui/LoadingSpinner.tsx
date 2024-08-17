import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Spinner animation="border" variant="light" style={{ width: "4rem", height: "4rem" }} />
        </div>
    )
}

export default LoadingSpinner;