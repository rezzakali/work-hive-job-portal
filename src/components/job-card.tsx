import { Button } from '@/src/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import moment from 'moment';
import Link from 'next/link';
import { JobInterface } from '../clientPages/home/home.interface';
import { Badge } from './ui/badge';

export function Job({
  _id,
  company,
  createdAt,
  description,
  employmentType,
  experienceLevel,
  location,
  salary,
  skills,
  status,
  title,
}: JobInterface) {
  return (
    <Card className="w-full shadow border rounded-lg">
      <CardHeader className="pb-2 ">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">{title}</CardTitle>
          <p className="text-sm text-gray-400">{moment(createdAt).fromNow()}</p>
        </div>
        <div className="mt-1 flex flex-wrap items-center space-x-2 text-sm text-muted-foreground">
          <span className="font-medium">{company}</span>
          <span>•</span>
          <span>{location}</span>
          <span>•</span>
          <Badge variant={'secondary'}>{employmentType}</Badge>
          <span>•</span>
          <span className="font-semibold ">{salary}k/month</span>
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <p className="text-sm line-clamp-3">{description}</p>

        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Required Skills:</h4>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between my-3">
          <div>
            <h4 className="text-sm font-medium"> Experience Level :</h4>{' '}
            <Badge variant="outline" className="mt-1">
              {experienceLevel}
            </Badge>
          </div>
          <Button asChild variant={'outline'} size={'sm'}>
            <Link href={`/job/${_id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
