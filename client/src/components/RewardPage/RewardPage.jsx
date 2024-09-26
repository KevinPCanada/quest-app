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
            <div className="rewardpage-left-top">
                <div className="rewardpage-header">
                    <h1>Rewards </h1>
                    <i className="material-icons">download_done</i>
                </div>
                <span>Your list of rewards</span>
            </div>
            <div className="rewardpage-left-bottom">
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
        </div>

        <div className="rewardpage-right">
        <div className="rewardpage-right-top">
            <div className="rewardpage-right-top-header">
                <h2>Set new reward</h2>
                <i className="material-icons">add</i>
            </div>
            <form>
                <input type="text" placeholder="Enter new reward" />
                <input type='submit' value='add new reward'/>
            </form>
        </div>
        <div className="rewardpage-right-bottom">
            <form>
                <div className="rewardpage-right-bottom-header">
                    <h2>Set milestone</h2>
                    <i className="material-icons">vertical_align_bottom</i>
                </div>
                <span>How often would you like to set your milestone?</span>
                    <RewardRadio label='Every level'></RewardRadio>
                    <RewardRadio label='Every 2 levels'></RewardRadio>
                    <RewardRadio label ='Every 5 levels'></RewardRadio>
                    <RewardRadio label='Every 10 levels'></RewardRadio>
            </form>
        </div>
        </div>
    </main>
    </>
    
}