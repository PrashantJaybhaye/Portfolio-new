import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/comments/[id]/reply
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { reply } = await request.json()
    const resolvedParams = await params

    if (!reply) {
      return NextResponse.json({ error: 'Reply content is required' }, { status: 400 })
    }

    const updatedComment = await prisma.comment.update({
      where: { id: resolvedParams.id },
      data: { 
        // @ts-ignore
        adminReply: reply 
      }
    })

    return NextResponse.json(updatedComment)
  } catch (error) {
    console.error('Error replying to comment:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
