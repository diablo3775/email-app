import React from "react";

function EmailList({ emails, favorites, onEmailClick, onFavorite }) {
    return (
        <ul className="email-list">
            {emails.map((email) => (
                <li
                    key={email.id}
                    className={`email-item`}
                    style={{
                        backgroundColor: emails.isRead ? "" : ""
                      }}
                    onClick={() => onEmailClick(email.id)}
                >
                    <div className="avatar">{email.from.name[0].toUpperCase()}</div>
                    <div className="email-details">
                    From: <span className="email-from">{email.from.email}</span><br />
                    Subject: <span className="email-subject">{email.subject}</span>
                        <p className="email-short">{email.short_description}...</p>
                        <p className="email-date">
                            {new Date(email.date).toLocaleString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        <span
                            className={`favorite-button ${favorites.includes(email.id) ? "favorited" : "unFavorited"
                                }`}
                            onClick={(e) => {
                                e.stopPropagation();
                                onFavorite(email.id);
                            }}
                        >
                            {favorites.includes(email.id) ? "Favorited" : "☆"}
                        </span>
                        </p>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default EmailList;
