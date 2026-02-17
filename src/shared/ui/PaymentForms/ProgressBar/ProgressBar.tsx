'use client'
import React from 'react'
import s from './ProgressBar.module.scss'

const ProgressBar = ({ currentStage }:{currentStage:number}) => {
    const steps = [1, 2, 3];

    return (
        <div className={s.progressBarContainer}>
            <div className={s.line}>
                <div
                    className={s.lineActive}
                    style={{ width: `${((currentStage - 1) / (steps.length - 1)) * 100}%` }}
                ></div>
            </div>

            {steps.map(step => (
                <div
                    key={step}
                    className={`${s.step} ${currentStage >= step ? s.active : ''}`}
                >
                    <div className={s.stepCircle}>
                        {step}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProgressBar;