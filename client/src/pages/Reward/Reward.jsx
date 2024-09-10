
import React from 'react'
import './Reward.css'

export default function Reward() {



    
        return (
            <div>
                <h1>Rewards</h1>
                <div>
                    <h2>Set new reward</h2>
                    <form>
                        <input type="text" />
                        <input type='submit'>Add new reward</input>
                    </form>
                </div>

                <div>
                    <h2>See list of rewards</h2>
                    <p>Coffee</p>
                    <p>New watch</p>
                    <p>Fish and chips</p>
                </div>

                <div>
                    <h2>
                        Set milestone
                    </h2>
                    <form>
                        <p>How often would you like to set your milestone?</p>
                        <input name='milestone' type='radio'>Every level</input>
                        <input name='milestone' type='radio'>Every 2 levels</input>
                        <input name='milestone' type='radio'>Every 5 levels</input>
                        <input name='milestone' type='radio'>Every 10 levels</input>
                    </form>

                </div>
            </div>


        )
    }



//set new reward, list of rewards, set new milestone