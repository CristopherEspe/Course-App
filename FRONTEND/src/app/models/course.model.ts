import { User } from './user.model';
import { CourseUser } from './courseUser.model';

export interface Course {
    id: number;
    name: string;
    courseUsers: CourseUser[];
    users: User[];
}