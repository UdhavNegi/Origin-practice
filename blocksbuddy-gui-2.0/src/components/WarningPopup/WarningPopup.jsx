import React from "react";
import styles from "./WarningPopup.css";
import warningImage from "../../lib/assets/warning.png";

function WarningPopup({ onClose, message, show }) {
    console.log(show);
    return (
        <div
            className={styles.warningPopup}
            style={{ display: show ? "block" : "none" }}
        >
            <div className={styles.overlayBg}></div>
            <div className={styles.content}>
                <div>
                    <img src={warningImage} height="200" />
                    {/* <h2>Alert!</h2> */}
                    <h2>{message}</h2>
                </div>
                <div>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default WarningPopup;
