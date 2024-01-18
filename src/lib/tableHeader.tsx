"use client"

import { Avatar, TableActions } from "@/components";
import defaultAvatar from "../../public/assets/images/avatar-placeholder.svg";
// import { deleteCourse } from "./removeData";

export const coursesHeader = [
    {
        title: "Course",
        key: "title",
        style: {
            minWidth: "30%"
        },
        render: (item: any) => (
            <div style={{ "display": "grid", "gridTemplateColumns": "min-content 1fr", "gap": "8px", "alignItems": "center" }}>
                <Avatar src={item.image} alt={item.title} size="M" type="square" />
                <span>{item.title}</span>
            </div>
        )
    },
    {
        title: "Category",
        key: "category"
    },
    {
        title: "Duration",
        key: "endDate",
        render: (item: any) => {
            const startDate: any = new Date(item.startDate);
            const endDate: any = new Date(item.endDate);

            const diffTime = Math.abs(endDate - startDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            return (
                <span>{diffDays + " days"}</span>
            )
        }
    },
    {
        title: "Level",
        key: "level"
    },
    {
        title: "Status",
        key: "status"
    }
]

export const usersHeader = [
    {
        title: "Email",
        key: "email",
        style: {
            minWidth: "30%"
        },
        render: (item: any) => (
            <div style={{ "display": "grid", "gridTemplateColumns": "min-content 1fr", "gap": "8px", "alignItems": "center" }}>
                <Avatar src={item.image ? item.image : defaultAvatar} alt={item.email} size="M" type="square" />
                <span>{item.email}</span>
            </div>
        )
    },
]

export const catalogsHeader = [
    {
        title: "Catalog",
        key: "title",
        style: {
            minWidth: "30%"
        }
    },
    {
        title: "Category",
        key: "category"
    },
    {
        title: "Duration",
        key: "endDate",
        render: (item: any) => {
            const startDate: any = new Date(item.startDate);
            const endDate: any = new Date(item.endDate);

            const diffTime = Math.abs(endDate - startDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            return (
                <span>{diffDays + " days"}</span>
            )
        }
    },
    {
        title: "Level",
        key: "level"
    },
    {
        title: "Status",
        key: "status"
    }
]