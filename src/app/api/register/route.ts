import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/authModels';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    await connectDB();

    const userFound = await User.findOne({ email });

    if (userFound) {
      return NextResponse.json({ created: false, message: 'Email already in use' }, { status: 406 });
    }

    if (name === '' || email === '' || password === '') {
      return NextResponse.json({ created: false, message: 'All fields must be filled' }, { status: 406 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });

    newUser.save();

    return NextResponse.json({ created: true, message: 'Created!' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ created: false, message: 'Invalid credentials' }, { status: 406 });
  }
}
