import { getEmployerJob, getProfile } from '@/src/app/actions';
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
  const jobs = user && (await getEmployerJob({ id: user.data._id }));

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
        <Jobs jobs={jobs.data} />
      </TabsContent>
    </Tabs>
  );
};

export default Index;
