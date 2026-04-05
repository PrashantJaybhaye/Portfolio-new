import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

// GET /api/admin/comments
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const comments = await prisma.comment.findMany({

      include: {
        author: {
          select: { name: true }
        },
        post: {
          select: { title: true, slug: true }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(comments)
  } catch (error) {
    console.error('Error fetching admin comments:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
