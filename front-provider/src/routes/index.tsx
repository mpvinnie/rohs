import { Switch } from 'react-router-dom'

import { Contacts } from '../pages/Provider/Contacts'
import { Dashboard } from '../pages/Provider/Dashboard'
import { Documents } from '../pages/Provider/Documents'
import { NewContact } from '../pages/Provider/NewContact'
import { PartDetails } from '../pages/Provider/PartDetails'
import { Parts } from '../pages/Provider/Parts'
import { SignIn } from '../pages/Provider/SignIn'
import { Route } from './Route'

export function Routes(): JSX.Element {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route isPrivate path="/dashboard" exact component={Dashboard} />
      <Route isPrivate path="/parts" exact component={Parts} />
      <Route isPrivate path="/parts/:id" exact component={PartDetails} />
      <Route isPrivate path="/documents" exact component={Documents} />
      <Route isPrivate path="/contacts" exact component={Contacts} />
      <Route isPrivate path="/contacts/new" exact component={NewContact} />
    </Switch>
  )
}
