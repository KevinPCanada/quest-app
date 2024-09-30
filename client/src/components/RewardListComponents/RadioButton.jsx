import React from "react"
import "./RadioButton.css"

export default function RewardRadio({ label }) {
  const id = `radio-${label}`; // Unique id for each radio input

  return (
    <div className="reward-radio">
      <label htmlFor={id}>{label}</label>
      <input id={id} name="milestone" type="radio" />
    </div>
  )
}