import React from 'react'
import './HomeSkeleton.css'
import BlankQuest from './BlankQuest'

export default function Skeleton() {


    return (
        <div className='skeleton-container'>

            

            <div className='skeleton-div'>

            <h1>
                ...
            </h1>
            <meter></meter>
            </div>


        <BlankQuest></BlankQuest>
        <BlankQuest></BlankQuest>
        <BlankQuest></BlankQuest>
        <BlankQuest></BlankQuest>

        </div>
    )
}