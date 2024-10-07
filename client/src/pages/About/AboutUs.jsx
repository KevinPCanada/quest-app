import React from 'react';
import './AboutUs.css';

function AboutUs() {
    const teamMembers = [
        { name: "Kevo", role: "Project Manager", image: "../../src/assets/img/classes/mage.png", intro: "Kevin does the heavy lifting, keeps everything on track and ensures our projects run smoothly." },
        { name: "Stepho", role: "Lead Developer", image: "../../src/assets/img/classes/knight.png", intro: "Stephen codes our solutions and tackles the toughest programming challenges." },
        { name: "Ayumo", role: "UX Designer", image: "../../src/assets/img/classes/rogue.png", intro: "Ayumu designs intuitive and user-friendly interfaces for our apps." },
        { name: "Jack", role: "Odd-Jobs", image: "../../src/assets/img/classes/priest.png", intro: "Jack is also here." }
    ];

    return (
        <div className='AboutUs'>
            <section className='TeamContainer'>
                {teamMembers.map((member, index) => (
                    <div key={index} className='TeamMember'>
                        <img src={member.image} alt={member.name} className='TeamImage' />
                        <h2 className='TeamName'>{member.name}</h2>
                        <h3 className='TeamRole'>{member.role}</h3>
                        <p className='TeamIntro'>{member.intro}</p>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default AboutUs;
