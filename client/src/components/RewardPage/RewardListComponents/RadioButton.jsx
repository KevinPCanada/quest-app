import React from "react"
import "./RadioButton.css"

export default function RewardRadio({ label }) {
  return (
    <div className="reward-radio">
      <p>{label}</p>
      <input name="milestone" type="radio" />
    </div>
  )
}
