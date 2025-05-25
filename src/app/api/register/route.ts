import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/authModels';
import bcrypt from 'bcryptjs';

const capitalize = (name: string) => {
  return name[0].toUpperCase() + name.slice(1).toLowerCase();
};

export async function POST(req: NextRequest) {
  try {
    const { firstname, lastname, email, phone, password } = await req.json();

    await connectDB();

    const capitalizedFirst = capitalize(firstname);
    const capitalizedLast = capitalize(lastname);
    const name = `${capitalizedFirst} ${capitalizedLast}`;

    const number = phone.trim().replace(/\D/g, '');
    const hashedPassword = await bcrypt.hash(password, 10);
    const emailToLower = email.toLowerCase().trim();

    const userFound = await User.findOne({ email });
    if (userFound) {
      return NextResponse.json({ created: false, message: 'Email already in use' }, { status: 406 });
    }

    if (number.length > 14 || number.length < 6) {
      return NextResponse.json({ created: false, message: 'Invalid phone number' }, { status: 406 });
    }

    if (name === '' || email === '' || phone === '' || password === '' || firstname === '' || lastname === '') {
      return NextResponse.json({ created: false, message: 'All fields must be filled' }, { status: 406 });
    }

    const newUser = new User({ name, email: emailToLower, number: number, password: hashedPassword });

    newUser.save();

    return NextResponse.json({ created: true, message: 'Created!' }, { status: 201 });
  } catch (error) {
    console.error(error as string);
    return NextResponse.json({ created: false, message: 'Invalid credentials' }, { status: 406 });
  }
}
