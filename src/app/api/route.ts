import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import { options } from './auth/[...nextauth]/options'

export async function GET(request: Request) {
    const session = await getServerSession(options)

    if (!session) {
        return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
            status: 401
        })
    }

    console.log('GET API', session)
    return NextResponse.json({ authenticated: !!session })
}