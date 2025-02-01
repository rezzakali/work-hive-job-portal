import { getProfile } from '@/src/app/actions';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/components/ui/tabs';
import Jobs from './jobs';
import PostJobForm from './post-a-job';

const Index = async () => {
  const user = await getProfile();

  return (
    <Tabs defaultValue="post-a-job" className="mt-10">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="post-a-job">Post A Job</TabsTrigger>
        <TabsTrigger value="jobs">Jobs</TabsTrigger>
      </TabsList>
      <TabsContent value="post-a-job">
        <PostJobForm />
      </TabsContent>
      <TabsContent value="jobs">
        <Jobs userId={user.data._id} />
      </TabsContent>
    </Tabs>
  );
};

export default Index;
