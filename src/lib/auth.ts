import { NextAuthOptions } from 'next-auth';
import User from '@/models/authModels';
import credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import connectDB from './db';

export const authOptions: NextAuthOptions = {
  providers: [
    credentials({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({ email: credentials?.email }).select('+password');

        if (!user) throw new Error('Email invalid!');

        const passwordMatch = await bcrypt.compare(credentials!.password, user.password);

        if (!passwordMatch) throw new Error('Password incorrect!');
        return user;
      },
    }),
  ],
  session: { strategy: 'jwt' },
};
