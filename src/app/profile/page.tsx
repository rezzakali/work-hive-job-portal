import ProfilePage from '@/src/clientPages/profile';
import { getProfile } from '../actions';

const page = async () => {
  const user = await getProfile();

  return <ProfilePage data={user.data} />;
};

export default page;
