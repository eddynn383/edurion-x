"use server"

import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { NextResponse } from "next/server";

export async function getCatalogs() {
    return await prisma.catalog.findMany()
    // try {
    //     // return NextResponse.json({catalogs}, {status: 200})
    // } catch (error: any) {
    //     return new NextResponse(error)
    // }
}

export async function getCourses() {
    try {
        const courses = await prisma.course.findMany()
        return new NextResponse(JSON.stringify(courses))
    } catch (error: any) {
        return new NextResponse(error)
    }
}

export async function getCourse(id: string) {
    return prisma.course.findUnique({
        where: { id }
    })
}

export async function getPages() {
    const session = await getServerSession(options);
    const role = session?.user.role

    return prisma.page.findMany({
        where: {
            allowedRole: {
                has: role // Check if the 'role' is present in the 'allowedRole' array
            }
        },
        include: {
            children: {
                orderBy: {
                    position: 'asc' // This will order the children by 'position' in ascending order
                }
            },
        },
        orderBy: {
            position: 'asc' // This will order the pages by 'position' in ascending order
        },
    })
}

export async function getPageById(id: string) {
    return prisma.page.findUnique({
        where: { id }
    })
}

export async function getPageByURL(url: string) {
    return prisma.page.findUnique({
        where: {
            url
        },
    })
}

export async function getCoursePrice(id: string) {
    if (id) {
        return prisma.price.findUnique({
            where: { id },
        })
    }
}

export async function getCourseRating(id: string) {
    if (id) {
        return prisma.rating.findUnique({
            where: { id },
        })
    }
}

export async function getUsers() {
    return prisma.user.findMany()
}

export async function getUser(id: string) {
    return prisma.user.findUnique({
        where: { id }
    })
}

export async function getProfiles(user: string | undefined) {
    if (user) {
        console.log("getProfiles USER ID: ", user)
        return prisma.profile.findUnique({
            where: {
                userEmail: user
            }
        })
    }
}

export async function getTheme() {
    const session = await getServerSession(options);
    const userId = session?.user?.id

    return prisma.theme.findUnique({
        where: {
            id: userId
        }
    })
}

export async function getUserPreferences() {
    const session = await getServerSession(options);
    const userId = session?.user?.id

    console.log("USER ID ()", userId)

    if (userId) {
        return prisma.userPreferences.findUnique({
            where: {
                userId: userId
            }
        })
    }

}