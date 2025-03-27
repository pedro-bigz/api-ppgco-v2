import { Activation } from 'src/activations/entities';
import { Advisor, VAdvisor } from 'src/advisor/entities';
import { Course } from 'src/courses/entities';
import { DisconnectedStudent } from 'src/disconnected-student/entities';
import { Media } from 'src/media/entities';
import { Milestone, VMilestone } from 'src/milestone/entities';
import { MilestoneDocument } from 'src/milestone-document/entities';
import { MilestoneHistory } from 'src/milestone-history/entities';
import { MilestoneSituation } from 'src/milestone-situation/entities';
import { Notification, NotificationUsers } from 'src/notifications/entities';
import { Permission } from 'src/permissions/entities';
import { Project } from 'src/project/entities';
import { ProjectHasCoadvisor } from 'src/project-has-coadvisor/entities';
import { Publication, VPublication } from 'src/publication/entities';
import { PublicationCoauthor } from 'src/publication-coauthors/entities';
import { ResearchLine } from 'src/research-line/entities';
import { RoleHasPermission } from 'src/role-has-permissions/entities';
import { Role } from 'src/roles/entities';
import { Student, VStudent } from 'src/student/entities';
import { Subject, VSubject } from 'src/subjects/entities';
import { SystemApliance } from 'src/system-apliances/entities';
import { User } from 'src/user/entities';
import { UserHasPermission } from 'src/user-has-permissions/entities';
import { UserHasRole } from 'src/user-has-roles/entities';
import { UsersPasswordReset } from 'src/users-password-reset/entities';
import { Document } from 'src/documents/entities';
// {MODEL_IMPORT} Don't delete me, I'm used for automatic code generation

export const entities = {
  tables: [
    User,
    Milestone,
    MilestoneDocument,
    Project,
    Publication,
    Student,
    Advisor,
    ResearchLine,
    DisconnectedStudent,
    MilestoneHistory,
    ProjectHasCoadvisor,
    Role,
    UserHasRole,
    UserHasPermission,
    RoleHasPermission,
    Permission,
    Media,
    Activation,
    Course,
    Subject,
    SystemApliance,
    Document,
    MilestoneSituation,
    Notification,
    NotificationUsers,
    PublicationCoauthor,
    UsersPasswordReset,
    // {MODELS} Don't delete me, I'm used for automatic code generation
  ],
  views: [VMilestone, VSubject, VPublication, VStudent, VAdvisor],
};
