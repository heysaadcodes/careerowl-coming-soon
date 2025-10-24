import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import EarlyAccess from '@/models/EarlyAccess';

// POST - Create new early access submission
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, company, email, focusIndustry } = body;

    // Validate required fields
    if (!name || !company || !email || !focusIndustry) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingSubmission = await EarlyAccess.findOne({ email });
    if (existingSubmission) {
      return NextResponse.json(
        { error: 'This email has already been registered' },
        { status: 409 }
      );
    }

    // Create new submission
    const newSubmission = await EarlyAccess.create({
      name,
      company,
      email,
      focusIndustry,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully registered for early access',
        data: newSubmission,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Early access submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process submission', details: error.message },
      { status: 500 }
    );
  }
}

// GET - Fetch all early access submissions (for admin)
export async function GET(request) {
  try {
    await connectDB();

    const submissions = await EarlyAccess.find({})
      .sort({ createdAt: -1 }) // Latest first
      .lean();

    return NextResponse.json(
      {
        success: true,
        count: submissions.length,
        data: submissions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching early access submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions', details: error.message },
      { status: 500 }
    );
  }
}