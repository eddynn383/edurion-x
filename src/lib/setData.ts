"use server"

import { options } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { getPages } from "./getData";

export async function setCourses(body: any) {
    if (body) {
        try {
            const newEntry = await prisma.course.create({
                data: body
            })

            return NextResponse.json({ newEntry }, { status: 200 })
        } catch (error: any) {
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
        }
    }
}

export async function setContent(body: any) {
    if (body) {
        try {
            const newEntry = await prisma.content.create({
                data: body
            })

            return NextResponse.json({ newEntry }, { status: 200 })
        } catch (error: any) {
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
        }
    }
}

export async function setTheme(body: any) {
    if (body) {
        try {
            const newEntry = await prisma.theme.create({
                data: body
            })

            return NextResponse.json({ newEntry }, { status: 200 })
        } catch (error: any) {
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
        }
    }
}

export async function setUsers(body: any) {
    if (body) {
        try {
            const newEntry = await prisma.user.create({
                data: body
            })

            return NextResponse.json({ newEntry }, { status: 200 })
        } catch (error: any) {
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
        }
    }
}

export async function setPage(body: any) {
    const { title, url, icon, isPublish, allowedRole, allowedUsers } = body
    const session = await getServerSession(options)
    const currentPages = await getPages()
    const currentPagesLength = currentPages.length
    console.log("currentPages: ", currentPagesLength)
    const userID = session?.user.id;
    try {
        const result = await prisma.page.create({
            data: {
                title,
                url,
                icon,
                allowedUsers,
                allowedRole,
                isPublish,
                createdBy: {
                    connect: {
                        id: userID
                    }
                },
                updatedBy: {
                    connect: {
                        id: userID
                    }
                },
                position: 0
            }
        })

        return NextResponse.json({ result }, { status: 200 })
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function setRole(body: any) {
    if (body) {
        try {
            const newEntry = await prisma.role.create({
                data: body
            })

            return NextResponse.json({ newEntry }, { status: 200 })
        } catch (error: any) {
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
        }
    }
}

export async function setCatalog(body: any) {
    if (body) {
        try {
            console.log("BODY: ", body)
            const session = await getServerSession(options)
            const userID = session?.user.id;
            console.log("SSESION: ", session)
            console.log("UUSERID: ", userID)
            const newEntry = await prisma.catalog.create({
                data: {
                    title: body.title,
                    description: body.description,
                    createdBy: {
                        connect: {
                            id: userID
                        }
                    },
                    updatedBy: {
                        connect: {
                            id: userID
                        }
                    },
                }
            })
            console.log("newEntry: ", newEntry)

            // return new NextResponse(JSON.stringify(newEntry))
            return NextResponse.json({ newEntry }, { status: 200 })
        } catch (error: any) {
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
        }
    }
}