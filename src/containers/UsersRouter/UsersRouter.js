import React from 'react';
import { Route, Switch } from 'react-router-dom';

import UsersShow from '../UsersShow/UsersShow';
import UsersIndex from '../UsersIndex/UsersIndex';

const usersRouter = () => (
    <Switch>
        <Route path='/users/:userId' component={UsersShow} />
        <Route path='/users' exact component={UsersIndex} />
    </Switch>
);

export default usersRouter;