// "use client"

import { FormEvent, useState } from "react";
// import FileUpload from "@/components/FileUploadOld";
import FileUpload, { FileWithPreview } from "@/components/FileUpload";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import getServerSession from "next-auth/next";
import { useSession } from "next-auth/react"
import Side from "@/modules/Side";
import Main from "@/modules/Main";
import Content from "@/modules/Content";

import { useRouter } from "next/navigation"
import Toolbar from "@/modules/Toolbar";
import { getSignature, saveToDatabase } from "@/app/_actions";
import { NextResponse } from "next/server";
import { setCourses } from "@/lib/setData";
import CourseCreationForm from "@/modules/CourseCreationForm";
import Form from "@/components/FormClient";
import { Stepper } from "@/components";



const Page = async () => {

    const [activeStep, setActiveStep] = useState(0)

    const steps = [
        {
            name: "Course details",
            component: <CourseCreationForm key={0} />
        },
        {
            name: "Course content",
            component: <p>This is second step</p>
        },
        {
            name: "Course rewards",
            component: <p>This is third step</p>
        },
        {
            name: "Course participants",
            component: <p>This is fourth step</p>
        }
    ]

    return (
        <Stepper steps={steps} activeStep={activeStep} setActiveStep={setActiveStep} />
    )
}

export default Page