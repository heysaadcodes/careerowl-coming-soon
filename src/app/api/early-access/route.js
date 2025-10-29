import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import EarlyAccess from '@/models/EarlyAccess';
import { emailService } from '@/lib/email';

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, company, email, focusIndustry } = body;

    // Validation
    if (!name || !company || !email || !focusIndustry) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedName = name.trim();
    const sanitizedCompany = company.trim();
    const sanitizedIndustry = focusIndustry.trim();

    // Check if email already exists
    const existingSubmission = await EarlyAccess.findOne({ email: sanitizedEmail });
    if (existingSubmission) {
      return NextResponse.json(
        { error: 'This email has already been registered for early access' },
        { status: 409 }
      );
    }

    // Create new submission
    const newSubmission = await EarlyAccess.create({
      name: sanitizedName,
      company: sanitizedCompany,
      email: sanitizedEmail,
      focusIndustry: sanitizedIndustry,
    });

    console.log('✅ New early access submission saved to database:', sanitizedEmail);

    // Send emails in background - don't block the response
    emailService.sendEarlyAccessEmails(newSubmission)
      .then(results => {
        const status = {
          user: results.userEmail?.success ? '✅' : '❌',
          admin: results.adminEmail?.success ? '✅' : '❌',
        };

        console.log('📊 Email results:', status);

        if (results.userEmail?.error) {
          console.error('User email failed:', results.userEmail.error);
        }
        if (results.adminEmail?.error) {
          console.error('Admin email failed:', results.adminEmail.error);
        }
      })
      .catch(error => {
        console.error('Email background error:', error);
      });

    // Return success regardless of email status
    return NextResponse.json(
      {
        success: true,
        message: 'Successfully registered for early access! You will receive a confirmation email shortly.',
        data: {
          id: newSubmission._id,
          name: sanitizedName,
          email: sanitizedEmail,
          company: sanitizedCompany,
          focusIndustry: sanitizedIndustry,
          createdAt: newSubmission.createdAt
        },
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Early access submission error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process submission',
        details: error.message
      },
      { status: 500 }
    );
  }
}
// GET - Fetch all early access submissions (for admin)
export async function GET(request) {
  try {
    await connectDB();

    // Basic authentication for admin endpoint
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '');
      // In production, use a proper token verification
      if (token !== process.env.ADMIN_TOKEN) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
    } else {
      return NextResponse.json(
        { error: 'Authorization header required' },
        { status: 401 }
      );
    }

    const submissions = await EarlyAccess.find({})
      .sort({ createdAt: -1 })
      .select('-__v') // Exclude version key
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