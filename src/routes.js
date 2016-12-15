import React from 'react';
import {Route,IndexRoute} from  'react-router';

import App from './components/app';
import PostIndex from './components/post_index';
import PostsNew from  './components/posts_new';
import PostsShow from './components/post_show';

const Greeting = () => {
  return <div>Hey there </div>;
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={PostIndex} />
    <Route path="greet" component={Greeting}/>
    <Route path="posts/new" component={PostsNew}/>
    <Route path="posts/:id" component={PostsShow}/> //this.props.params.id
  </Route>
)
