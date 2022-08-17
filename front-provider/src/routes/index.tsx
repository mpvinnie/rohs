import { Switch } from 'react-router-dom'

import { Contacts } from '../pages/Provider/Contacts'
import { Dashboard } from '../pages/Provider/Dashboard'
import { Documents } from '../pages/Provider/Documents'
import { NewContact } from '../pages/Provider/NewContact'
import { NewPart } from '../pages/Provider/NewPart'
import { Parts } from '../pages/Provider/Parts'
import { SignIn } from '../pages/Provider/SignIn'
import { Subparts } from '../pages/Provider/Subparts'
import { Route } from './Route'

export function Routes(): JSX.Element {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route isPrivate path="/dashboard" exact component={Dashboard} />
      <Route isPrivate path="/parts" exact component={Parts} />
      <Route isPrivate path="/parts/new" exact component={NewPart} />
      <Route isPrivate path="/parts/subparts/:id" exact component={Subparts} />
      <Route isPrivate path="/documents" exact component={Documents} />
      <Route isPrivate path="/contacts" exact component={Contacts} />
      <Route isPrivate path="/contacts/new" exact component={NewContact} />
    </Switch>
  )
}
