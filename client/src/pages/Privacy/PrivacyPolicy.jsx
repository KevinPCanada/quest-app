import React from 'react';
import './PrivacyPolicy.css';
import cloud from '../../assets/img/landing-page/cloud.png';

function Privacy() {
    return (
        <div className='PrivacyPage'>
            <section className='Privacy'>
                <ul>
                    <li>At Task-Slayer, your data's well-guarded,</li>
                    <li>No profits or sale, we promise wholehearted.</li>
                    <li>It’s used just for tasks,</li>
                    <li>No marketing asks,</li>
                    <li>Only emails important and pure.</li>
                    <li>So, of our privacy policy, </li>
                    <li>don't worry be sure!</li>
                </ul>
            </section>
            {/* Clouds */}
            <img src={cloud} className="cloud cloud1 hide-full " alt="Cloud 1" />
            <img src={cloud} className="cloud cloud2 hide-full " alt="Cloud 2" />
            <img src={cloud} className="cloud cloud3 hide-full " alt="Cloud 3" />
            <img src={cloud} className="cloud cloud4 hide-full " alt="Cloud 4" />
        </div>
    );
}

export default Privacy;
