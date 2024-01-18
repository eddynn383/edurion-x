"use client";

import { useRef, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import ProfileAvatar from "../../../public/assets/images/profile-avatar.png";
import Avatar from "@/components/Avatar";
import Link from "@/components/Link";
import useClickOutside from "@/hooks/useClickOutside";
import { IPropsProfile } from "./interface";

import sx from "@/styles/component.module.scss";

const Profile = ({ id, size, sessionData }: IPropsProfile) => {
    const { data: session, status } = useSession()
    const [showOptions, setShowOptions] = useState(false)
    const wrapperRef = useRef<HTMLDivElement>(null);

    useClickOutside(wrapperRef, () => setShowOptions(false));

    // if (status === "loading") {
    //     return <div>Loading...</div>
    // }

    // if (!session) {
    //     return <div>You are not logged in</div>
    // }

    const user = sessionData?.user
    const role = user?.role?.toUpperCase()

    return (
        <div className={sx["profile"]} id={id} data-size={size} onClick={() => setShowOptions(!showOptions)} aria-expanded={showOptions} >
            <div className={sx["profile-button"]}>
                <div className={sx["profile-left"]}>
                    <Avatar src={user?.image ? user.image : ProfileAvatar} alt={user?.email} size={size} type="square" />
                </div>
                <div className={sx["profile-right"]}>
                    <span className={sx["profile-name"]}>{user?.name ? user?.name : user?.email}</span>
                    {size !== "S" && <span className={sx["profile-role"]}>{role}</span>}
                </div>
            </div>
            {
                showOptions &&
                <div className={sx["profile-dropdown"]}>
                    <ul>
                        <li className={sx["dropdown-item"]}>
                            <Link href="/profile">Profile</Link>
                        </li>
                        <li className={sx["dropdown-item"]}>
                            <Link href="/my-purchases">My Purchases</Link>
                        </li>
                        <li className={sx["dropdown-item"]}>
                            <Link href="/settings">Settings</Link>
                        </li>
                        <li className={sx["dropdown-item"]}>
                            <Link status="fail" onClick={signOut}>Log Out</Link>
                        </li>
                    </ul>
                </div>
            }
        </div>
    )
}

export default Profile