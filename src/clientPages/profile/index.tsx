'use client';

import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { setUser } from '@/src/redux/user/userSlice';
import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AddUpdateResume from './add-update-resume';
import ChangeAddress from './change-address';
import ChangePasswordForm from './change-password';
import { ProfileInterface } from './profile.interface';

const ProfilePage = ({ data }: { data: ProfileInterface }) => {
  const { address, _id, email, phone, role, createdAt, resume } = data;
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data]);

  return (
    <React.Fragment>
      <div className="mx-auto p-6 space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Basic Details</CardTitle>
            <Badge variant="secondary">{role}</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                User ID: <span className="font-medium">{_id}</span>
              </p>
              <p>
                Email: <span className="font-medium">{email}</span>
              </p>
              <p>
                Phone: <span className="font-medium">{phone}</span>
              </p>
              <div className="flex items-center justify-between">
                <p>
                  Account Created:{' '}
                  <span className="">{moment(createdAt).format('ll')}</span>
                </p>
                {resume ? (
                  <Button variant={'outline'} size={'sm'}>
                    <Link
                      href={resume?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Resume
                    </Link>
                  </Button>
                ) : (
                  <AddUpdateResume />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address Section */}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between w-full">
            <CardTitle className="text-lg font-semibold">Address</CardTitle>
            <Button
              onClick={() => setOpen(true)}
              variant={'outline'}
              size={'sm'}
            >
              {address ? 'Change Address' : 'Add Address'}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                Street:{' '}
                <span className=" font-medium">{address?.street || ''}</span>
              </p>
              <p>
                City:{' '}
                <span className=" font-medium">{address?.city || ''}</span>
              </p>
              <p>
                State:{' '}
                <span className=" font-medium">{address?.state || ''}</span>
              </p>
              <p>
                Postal Code:{' '}
                <span className=" font-medium">
                  {address?.postalCode || ''}
                </span>
              </p>
              <p>
                Country:{' '}
                <span className=" font-medium">{address?.country || ''}</span>
              </p>
            </div>
          </CardContent>
        </Card>

        <ChangePasswordForm />
      </div>
      <ChangeAddress open={open} setOpen={setOpen} address={address} />
    </React.Fragment>
  );
};

export default ProfilePage;
