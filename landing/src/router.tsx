import { Switch, Route } from 'wouter-preact';

import HomePage from 'page/home';
import BlockExplorerPage from 'page/block-explorer';
import NotFoundPage from 'page/notfound';

import Body from 'component/body';

export default function Router(): JSX.Element {
  return (
    <Body>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/block-explorer" component={BlockExplorerPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Body>
  );
}
