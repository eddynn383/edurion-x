"use client"

import Side from "@/modules/Side";
import React, { useState, ReactNode } from "react";
import {Button} from "@/components";
import sx from "@/styles/component.module.scss"
import Content from "@/modules/Content";
import Toolbar from "@/modules/Toolbar";

interface Step {
    name: string;
    component: ReactNode;
  }

interface IStepperProps {
    steps: Step[];
    activeStep: number;
    setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const Stepper = ({ steps, activeStep, setActiveStep }: IStepperProps) => {

    const handleNext = () => setActiveStep(activeStep + 1);
    const handleBack = () => setActiveStep(activeStep - 1);

    console.log("test stepper load")

    return (
        <Content>
            <Content.Body orient="horizontal" leftWidth="1fr" rightWidth="260px">
                <div className={sx["stepper-active-step"]}>{steps[activeStep].component}</div>
                <Side>                
                    <div className={sx["stepper-available-steps"]}>
                        {
                            steps.map((item, idx) => (
                                <div key={idx} className={sx["stepper-step"]}> 
                                    <div className={sx["stepper-step-status"]}>
                                        <div className={sx["stepper-step-status-text"]}>
                                            {idx + 1}
                                        </div>
                                    </div>
                                    <div className={sx["stepper-step-details"]}>                                   
                                        <div className={sx["stepper-step-number"]}>{"Step " + (idx + 1)}</div>
                                        <div className={sx["stepper-step-name"]}>{item.name}</div>
                                    </div>                           
                                </div>
                            ))
                        }
                    </div>

                </Side>
            </Content.Body>
            <Content.Footer >
                {/* <Toolbar type="footer" /> */}
                <Button type="button" mode="secondary" size="S" disabled={activeStep === 0} onClick={handleBack} >Prev</Button>
                <Button type="button" mode="secondary" size="S" disabled={activeStep === steps.length - 1} onClick={handleNext}>Next</Button>
            </Content.Footer>
        </Content>
    )
}

export default Stepper