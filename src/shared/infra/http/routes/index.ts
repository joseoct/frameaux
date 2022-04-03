import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import contentCreatorRouter from '@modules/users/infra/http/routes/contentCreator.routes';
import studentsRouter from '@modules/users/infra/http/routes/students.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

import rolesRouter from '@modules/roles/infra/http/routes/roles.routes';

import technologiesRouter from '@modules/technologies/infra/http/routes/technologies.routes';
import technologiesByUserRouter from '@modules/technologies/infra/http/routes/technologiesByUser.routes';

import topicsRouter from '@modules/topics/infra/http/routes/topics.routes';

import studentsTechnologiesRouter from '@modules/users_technologies/infra/http/routes/studentsTechnologies.routes';
import contentCreatorsTechnologiesRouter from '@modules/users_technologies/infra/http/routes/contentCreatorsTechnologies.routes';

import studentsTopicsRouter from '@modules/users_topics/infra/http/routes/studentsTopics.routes';

import dashboardsRouter from '@modules/dashboard/infra/http/routes/dashboards.routes';
import levelsByTopicRouter from '@modules/levels/infra/http/routes/levelsByTopic.routes';
import topicsByTechnologiesRouter from '@modules/topics/infra/http/routes/topicsByTechnology.routes';

import levelsRouter from '@modules/levels/infra/http/routes/levels.routes';

import exercisesByTopicAndDifficulty from '@modules/exercises/infra/http/routes/exercisesByTopicAndDifficulty.routes';
import alternativeExercisesRouter from '@modules/exercises/infra/http/routes/alternativeExercises.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);

routes.use('/content-creators', contentCreatorRouter);

routes.use('/students', studentsRouter);

routes.use('/roles', rolesRouter);

routes.use('/technologies', technologiesRouter);
routes.use('/user/technologies', technologiesByUserRouter);

routes.use('/topics', topicsRouter);
routes.use('/technologies', topicsByTechnologiesRouter);

routes.use('/levels', levelsRouter);
routes.use('/technologies/topics', levelsByTopicRouter);

routes.use('/technologies/topics', exercisesByTopicAndDifficulty);
routes.use('/technologies/topics/levels', alternativeExercisesRouter);

routes.use('/students-technologies', studentsTechnologiesRouter);
routes.use('/content-creators-technologies', contentCreatorsTechnologiesRouter);

routes.use('/students-topics', studentsTopicsRouter);

routes.use('/dashboard', dashboardsRouter);

export default routes;
