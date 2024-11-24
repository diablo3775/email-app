import React, { Children } from "react";

function EmailBody({ email }) {
    return (
        <div className="email-body-container">
            <div className="email-header">
                <div className="avatar">{email.from.name[0].toUpperCase()}</div>
                <div>
                    <h2>{email.subject}</h2>
                    <p className="email-date">
                        {new Date(email.date).toLocaleString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </p>
                </div>
            </div>
            <p style={{padding:"0 1rem"}}>{email.body}</p>
        </div>
    );
}

export default EmailBody;
