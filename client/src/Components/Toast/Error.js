import React from 'react'

const Error = (props) => {
    return (
        <div>
            <div role="alert" aria-live="assertive" aria-atomic="true" className="toast" data-autohide="false">
                <div className="toast-header">
                    <img src="..." className="rounded mr-2" alt="..." />
                    <strong className="mr-auto">Success</strong>
                    <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div className="toast-body">
                   { props.message }
                </div>
            </div>
        </div>

    )
}

export default Error
