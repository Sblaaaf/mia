import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/db';
import { NewsItem } from '@/types';

export async function GET() {
  try {
    const collection = await getCollection('news');
    
    // Only return news items that haven't expired
    const newsItems = await collection
      .find({ 
        expiresAt: { $gt: new Date() } 
      })
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json(newsItems);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { _id, ...newsData } = body;
    const newsItem: any = {
      ...newsData,
      expiresAt: new Date(body.expiresAt),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const collection = await getCollection('news');
    const result = await collection.insertOne(newsItem);
    
    return NextResponse.json(
      { _id: result.insertedId, ...newsItem },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating news item:', error);
    return NextResponse.json(
      { error: 'Failed to create news item' },
      { status: 500 }
    );
  }
}
