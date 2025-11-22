import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/db';
import { Artwork } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const featured = searchParams.get('featured');
    
    const collection = await getCollection('artworks');
    
    let query: any = {};
    if (featured === 'true') {
      query.featured = true;
    }
    
    const artworks = await collection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json(artworks);
  } catch (error) {
    console.error('Error fetching artworks');
    return NextResponse.json(
      { error: 'Failed to fetch artworks' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { _id, ...artworkData } = body;
    const artwork: any = {
      ...artworkData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const collection = await getCollection('artworks');
    const result = await collection.insertOne(artwork);
    
    return NextResponse.json(
      { _id: result.insertedId, ...artwork },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating artwork');
    return NextResponse.json(
      { error: 'Failed to create artwork' },
      { status: 500 }
    );
  }
}
