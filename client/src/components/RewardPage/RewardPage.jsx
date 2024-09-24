import React from "react";
import RewardRadio from "./RewardListComponents/RadioButton";
import RewardListItem from "./RewardListComponents/RewardListItem";
import "./RewardPage.css";
import treasureChest from "../../assets/img/treasure-chest.png"

//On this page, the user can set a new reward, see their list of rewards and set their milestone 
//The milestone is how often the user can give themselves a reward

export default function RewardPage() {
    return <>
    <main className="rewardpage">
        <div className="rewardpage-left">
            <div className="rewardpage-left-container">
                <h1>【 Rewards 】</h1>
                <div className="rewardpage-left-form">
                <img src={treasureChest} ></img>
                <h2>Set new reward</h2>
                <form>
                    <input type="text" />
                    <input type='submit' value='add new reward'/>
                </form>
                </div>
                    <span>Set milestone</span>
                <form>
                    <p>How often would you like to set your milestone?</p>
                        <RewardRadio label='Every level'></RewardRadio>
                        <RewardRadio label='Every 2 levels'></RewardRadio>
                        <RewardRadio label ='Every 5 levels'></RewardRadio>
                        <RewardRadio label='Every 10 levels'></RewardRadio>
                </form>
            </div>
        </div>
        <div className="rewardpage-right">
        <div className="rewardpage-right-banner">
            <p>Some banner</p>
        </div>
                <RewardListItem reward="Coffee"></RewardListItem>
                <RewardListItem reward="Fish and chips"></RewardListItem>
                <RewardListItem reward="New watch"></RewardListItem>
                <RewardListItem reward="Coffee"></RewardListItem>
                <RewardListItem reward="Fish and chips"></RewardListItem>
                <RewardListItem reward="New watch"></RewardListItem>
                <RewardListItem reward="Coffee"></RewardListItem>
                <RewardListItem reward="Fish and chips"></RewardListItem>
                <RewardListItem reward="New watch"></RewardListItem>
                <RewardListItem reward="Coffee"></RewardListItem>
                <RewardListItem reward="Fish and chips"></RewardListItem>
                <RewardListItem reward="New watch"></RewardListItem>
            </div>
    </main>
    </>
    
}