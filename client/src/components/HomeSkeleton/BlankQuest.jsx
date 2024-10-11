import React from "react";
import './BlankQuest.css'

export default function BlankQuest() {
    return (
        // We use an article tag for semantic HTML, as each quest is a self-contained piece of content
        <article className="quest-container">
            <div className="quest-container-bottom">
                <h2>Please Wait</h2>
                <div className="quest-container-left">
                    <p>...</p>
                    <div className="quest-options">
                        <div className="blank-button">
                            ...
                        </div>
                        <div className="blank-button">
                            ...
                        </div>
                    </div>
                </div>
            </div>
            <div className="quest-container-right">
                {/* Button to mark the quest as complete */}
                <div className="blank-button">
                    ...
                    </div>
            </div>
         
        </article>
    );
}
