import React from "react"
import "./RadioButton.css"

export default function RewardRadio({ label, value, checked, onChange }) {
  const id = `radio-${value}`; // Unique id for each radio input

  return (
    <div className="reward-radio">
      <input 
        id={id} 
        name="milestone" 
        type="radio" 
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}