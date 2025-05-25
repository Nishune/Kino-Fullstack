'use client';
import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { Step2BookingModalProps } from './types/BookingModalTypes';
import { useSession } from 'next-auth/react';

export default function Step2BookingModal({ userInfo, onInputChange }: Step2BookingModalProps) {
  const { data } = useSession();
  const user = data?.user;
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const e: Record<string, string> = {};
    if (!userInfo.name.trim()) e.name = 'Name is required';
    if (!userInfo.email.trim()) e.email = 'Email is required';
    else if (!userInfo.email.includes('@')) e.email = 'Enter a valid email';
    if (!userInfo.phoneNumber.trim()) e.phoneNumber = 'Phone number is required';
    setErrors(e);
  }, [userInfo]);

  useEffect(() => {
    onInputChange('name', user?.name || '');
    onInputChange('email', user?.email || '');
    onInputChange('phoneNumber', user?.number || '');
  }, [user, onInputChange]);

  const field = (name: keyof typeof userInfo, label: string, type: string = 'text') => (
    <TextField
      fullWidth
      size='small'
      variant='outlined'
      type={type}
      label={label}
      name={name}
      value={userInfo[name] || ''}
      error={!!(touched[name] && errors[name])}
      helperText={touched[name] ? errors[name] : ''}
      onChange={e => onInputChange(name, e.target.value)}
      onBlur={() => setTouched(t => ({ ...t, [name]: true }))}
    />
  );

  return (
    <Box display='flex' flexDirection='column' gap={2}>
      <Typography variant='body2'>Please provide your information to continue:</Typography>

      {field('name', 'Name')}
      {field('email', 'Email', 'email')}
      {field('phoneNumber', 'Phone Number', 'tel')}
    </Box>
  );
}
