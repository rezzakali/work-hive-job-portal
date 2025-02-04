'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { ContactFormInterface } from '../clientPages/contact-us/contact.interface';
import { PostAJobInterface } from '../clientPages/dashboard/dashboard.interface';
import {
  ChangeAddressInterface,
  PasswordChangeInterface,
} from '../clientPages/profile/profile.interface';
import { SigninInterface } from './signin/signin.interface';
import { SignupInterface } from './signup/signup.interface';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

// singup
export const signup = async (formData: SignupInterface) => {
  const res = await fetch(`${BASE_PATH}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const errorData = await res.json(); // Parse error response
    throw new Error(
      JSON.stringify({ status: errorData.status, message: errorData.message })
    );
  }

  return await res.json(); // Return the successful response data
};

// signin
export const signin = async (formData: SigninInterface) => {
  const res = await fetch(`${BASE_PATH}/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const errorData = await res.json(); // Parse error response
    throw new Error(
      JSON.stringify({ status: errorData.status, message: errorData.message })
    );
  }

  return await res.json(); // Return the successful response data
};

// get jobs
export const getJobs = async ({
  search,
  page,
  limit,
}: {
  search: string;
  page: number;
  limit: number;
}) => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('client.sid')?.value || '';

  const res = await fetch(
    `${BASE_PATH}/jobs?page=${page}&limit=${limit}${
      search !== '' ? `&search=${search}` : ''
    }`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': cookie,
      },
    }
  );

  if (!res.ok) {
    const errorData = await res.json(); // Parse error response
    throw new Error(
      JSON.stringify({ status: errorData.status, message: errorData.message })
    );
  }

  return await res.json(); // Return the successful response data
};

// get a single job
export const getJob = async ({ id }: { id: string }) => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('client.sid')?.value || '';
  const res = await fetch(`${BASE_PATH}/jobs/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': cookie,
    },
    credentials: 'include',
  });
  if (!res.ok) {
    const errorData = await res.json(); // Parse error response
    throw new Error(
      JSON.stringify({ status: errorData.status, message: errorData.message })
    );
  }
  return await res.json(); // Return the successful response data
};

// get employer's jobs
export const getEmployerJob = async ({ id }: { id: string }) => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('client.sid')?.value || '';
  const res = await fetch(`${BASE_PATH}/jobs/employer/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': cookie,
    },
    credentials: 'include',
    next: { tags: ['EmployerJobs'] },
  });
  if (!res.ok) {
    const errorData = await res.json(); // Parse error response
    return errorData;
  }
  return await res.json(); // Return the successful response data
};

// get profile details
export const getProfile = async () => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('client.sid')?.value || '';

  const res = await fetch(`${BASE_PATH}/auth/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': cookie,
    },
  });

  if (!res.ok) {
    const errorData = await res.json(); // Parse error response
    throw new Error(
      JSON.stringify({ status: errorData.status, message: errorData.message })
    );
  }

  return await res.json(); // Return the successful response data
};

// password change
export const changePassword = async (formData: PasswordChangeInterface) => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('client.sid')?.value || '';

  const res = await fetch(`${BASE_PATH}/auth/password-change`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': cookie,
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const errorData = await res.json(); // Parse error response
    throw new Error(
      JSON.stringify({ status: errorData.status, message: errorData.message })
    );
  }

  return await res.json(); // Return the successful response data
};

// password address
export const changeAddress = async (formData: ChangeAddressInterface) => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('client.sid')?.value || '';

  const res = await fetch(`${BASE_PATH}/auth/change-address`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': cookie,
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const errorData = await res.json(); // Parse error response
    throw new Error(
      JSON.stringify({ status: errorData.status, message: errorData.message })
    );
  }
  revalidatePath('/profile');
  return await res.json(); // Return the successful response data
};

// logout handler
export const logout = async () => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('client.sid')?.value || '';

  const res = await fetch(`${BASE_PATH}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': cookie,
    },
    body: '',
  });

  if (!res.ok) {
    const errorData = await res.json(); // Parse error response
    throw new Error(
      JSON.stringify({ status: errorData.status, message: errorData.message })
    );
  }
  (await cookies()).delete('client.sid');
  revalidatePath('/', 'layout');
  return await res.json(); // Return the successful response data
};

// add resume
export const addResume = async (formData: FormData) => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('client.sid')?.value || '';

  const res = await fetch(`${BASE_PATH}/auth/add-resume`, {
    method: 'PATCH',
    headers: {
      'x-access-token': cookie,
    },
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json(); // Parse error response
    throw new Error(
      JSON.stringify({ status: errorData.status, message: errorData.message })
    );
  }
  revalidatePath('/profile', 'page');
  return await res.json(); // Return the successful response data
};

// create a job (employeer)
export const createJob = async (data: PostAJobInterface) => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('client.sid')?.value || '';

  const res = await fetch(`${BASE_PATH}/jobs/create-job`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': cookie,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json(); // Parse error response
    throw new Error(
      JSON.stringify({ status: errorData.status, message: errorData.message })
    );
  }
  revalidatePath('/dashboard', 'page');
  return await res.json(); // Return the successful response data
};

// apply to job
export const applyJob = async (formData: FormData) => {
  const rawFormData: { [key: string]: any } = {};
  formData.forEach((value, key) => {
    rawFormData[key] = value;
  });

  const cookieStore = await cookies();
  const cookie = cookieStore.get('client.sid')?.value || '';

  const res = await fetch(`${BASE_PATH}/jobs/apply`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': cookie,
    },
    body: JSON.stringify(rawFormData),
  });

  if (!res.ok) {
    const errorData = await res.json(); // Parse error response
    throw new Error(
      JSON.stringify({ status: errorData.status, message: errorData.message })
    );
  }
  revalidatePath('/', 'layout');
  revalidatePath('/job/[id]', 'page');
  return await res.json(); // Return the successful response data
};

// check application
export const checkApplication = async (jobId: string) => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('client.sid')?.value || '';

  const res = await fetch(`${BASE_PATH}/jobs/check-application/${jobId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': cookie,
    },
  });

  if (!res.ok) {
    const errorData = await res.json(); // Parse error response
    throw new Error(
      JSON.stringify({ status: errorData.status, message: errorData.message })
    );
  }

  return await res.json(); // Return the successful response data
};

// edit job (employeer)
export const editJob = async ({
  data,
  id,
}: {
  data: PostAJobInterface;
  id: string;
}) => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('client.sid')?.value || '';

  const formattedData = { jobId: id, ...data };

  const res = await fetch(`${BASE_PATH}/jobs`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': cookie,
    },
    body: JSON.stringify(formattedData),
  });

  if (!res.ok) {
    const errorData = await res.json(); // Parse error response
    throw new Error(
      JSON.stringify({ status: errorData.status, message: errorData.message })
    );
  }
  revalidateTag('EmployerJobs');

  return await res.json(); // Return the successful response data
};

// close the job (employeer)
export const archiveJob = async (id: string) => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('client.sid')?.value || '';

  const res = await fetch(`${BASE_PATH}/jobs/${id}/close`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': cookie,
    },
  });

  if (!res.ok) {
    const errorData = await res.json(); // Parse error response
    throw new Error(
      JSON.stringify({ status: errorData.status, message: errorData.message })
    );
  }
  revalidatePath('/dashboard', 'page');
  return await res.json(); // Return the successful response data
};

// close the job (employeer)
export const contactApi = async (formData: ContactFormInterface) => {
  const res = await fetch(`${BASE_PATH}/general/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const errorData = await res.json(); // Parse error response
    throw new Error(
      JSON.stringify({ status: errorData.status, message: errorData.message })
    );
  }
  return await res.json(); // Return the successful response data
};

// fetch notifications
export const getNotifications = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('client.sid')?.value || '';

  const res = await fetch(
    `${BASE_PATH}/general/notifications/unread?page=${page}&limit=${limit}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': cookie,
      },
      next: { tags: ['Notifications'] },
    }
  );

  if (!res.ok) {
    const errorData = await res.json(); // Parse error response
    throw new Error(
      JSON.stringify({ status: errorData.status, message: errorData.message })
    );
  }
  return await res.json(); // Return the successful response data
};

// mark notification as read
export const markNotificationRead = async (notificationId: string) => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('client.sid')?.value || '';

  const res = await fetch(`${BASE_PATH}/general/notifications/mark-read`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': cookie,
    },
    body: JSON.stringify({ notificationId }),
  });

  if (!res.ok) {
    const errorData = await res.json(); // Parse error response
    throw new Error(
      JSON.stringify({ status: errorData.status, message: errorData.message })
    );
  }
  revalidateTag('Notifications');
  return await res.json(); // Return the successful response data
};
