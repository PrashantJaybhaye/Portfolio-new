import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/admin/comments
export async function GET() {
  try {
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
