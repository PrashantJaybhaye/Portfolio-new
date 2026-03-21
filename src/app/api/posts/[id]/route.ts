import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    await prisma.post.delete({
      where: { id: resolvedParams.id },
    })
    return NextResponse.json({ message: 'Post deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}

// Get a single post
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const post = await prisma.post.findUnique({
      where: { id: resolvedParams.id },
      include: {
        categories: {
          include: {
            category: true
          }
        }
      }
    })
    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
}

// Update a post
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const { title, content, imageUrl, coverImage, categories } = await request.json()

    // First, delete existing category relationships
    await prisma.postCategory.deleteMany({
      where: { postId: resolvedParams.id }
    })

    // Update the post and create new category relationships
    const post = await prisma.post.update({
      where: { id: resolvedParams.id },
      data: {
        title,
        content,
        imageUrl: imageUrl || coverImage,
        coverImage: coverImage || imageUrl,
        categories: {
          create: categories.map((categoryId: string) => ({
            category: {
              connect: { id: categoryId }
            }
          }))
        }
      }
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
} 