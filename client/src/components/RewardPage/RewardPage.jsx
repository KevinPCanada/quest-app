import React from "react";
import RewardRadio from "./RewardListComponents/RadioButton";
import RewardListItem from "./RewardListComponents/RewardListItem";

//On this page, the user can set a new reward, see their list of rewards and set their milestone 
//The milestone is how often the user can give themselves a reward

export default function RewardPage() {
    return <>
    <main>
                <h1>Rewards</h1>
                <div>
                    <h2>Set new reward</h2>
                    <form>
                        <input type="text" />
                        <input type='submit' value='add new reward'/>
                    </form>
                </div>

                <div>
                    <h2>See list of rewards</h2>
                    <RewardListItem reward="Coffee"></RewardListItem>
                    <RewardListItem reward="Fish and chips"></RewardListItem>
                    <RewardListItem reward="New watch"></RewardListItem>
                </div>

                <div>
                    <h2>
                        Set milestone
                    </h2>
                    <form>
                        <p>How often would you like to set your milestone?</p>
                        
                        <RewardRadio label='Every level'></RewardRadio>
                        <RewardRadio label='Every 2 levels'></RewardRadio>
                        <RewardRadio label ='Every 5 levels'></RewardRadio>
                        <RewardRadio label='Every 10 levels'></RewardRadio>
                    </form>

                </div>
            </main>
        </>
    
}