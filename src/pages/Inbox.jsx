import React, { useEffect, useState } from "react";
import axios from "axios";
import EmailList from "../components/EmailList";
import EmailBody from "../components/EmailBody";
import Loader from "../components/Loader";
import "../App.css";

const API_URL = "https://flipkart-email-mock.now.sh/";

function Inbox() {
    const [emails, setEmails] = useState([]);
    const [right, setRight] = useState(false);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState("all");
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(API_URL)
            .then((response) => {
                const emailsWithMetadata = response.data.list.map((email) => ({
                    ...email,
                    isRead: false,
                }));
                setEmails(emailsWithMetadata);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching emails:", error);
                setIsLoading(false);
            });
    }, []);

    const handleEmailClick = (emailId) => {
        setRight(true);
        const email = emails.find((e) => e.id === emailId);
        if (email) {
            setIsLoading(true);

            axios
                .get(`${API_URL}?id=${emailId}`)
                .then((response) => {
                    setSelectedEmail({ ...email, body: response.data.body });
                    setEmails((prevEmails) =>
                        prevEmails.map((e) =>
                            e.id === emailId ? { ...e, isRead: true } : e
                        )
                    );
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching email body:", error);
                    setIsLoading(false);
                });
        }
    };

    const handleFavorite = (emailId) => {
        setFavorites((prevFavorites) =>
            prevFavorites.includes(emailId)
                ? prevFavorites.filter((id) => id !== emailId)
                : [...prevFavorites, emailId]
        );
    };

    const filteredEmails = emails.filter((email) => {
        if (filter === "favorites") {
            return favorites.includes(email.id);
        } else if (filter === "read") {
            return email.isRead;
        } else if (filter === "unread") {
            return !email.isRead;
        }
        return true;
    });

    return (
        <div className="App">
            <div className="filter-container">
                Filter by:
                <button onClick={() => setFilter("all")}>All</button>
                <button onClick={() => setFilter("favorites")}>Favorites</button>
                <button onClick={() => setFilter("read")}>Read</button>
                <button onClick={() => setFilter("unread")}>Unread</button>
            </div>
            <div className="content">
                <div className="email-list">
                    {isLoading && <Loader />}
                    <EmailList
                        emails={filteredEmails}
                        favorites={favorites}
                        onEmailClick={handleEmailClick}
                        onFavorite={handleFavorite}
                    />
                </div>
                {right && <div className="email-body">
                    {selectedEmail ? (
                        <EmailBody email={selectedEmail} />
                    ) : (
                        <p className="placeholder">Select an email to view its details</p>
                    )}
                </div>}
            </div>
        </div>
    );
}

export default Inbox;
