import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { fetchPosts } from '../actions/index';

class PostIndex extends Component {

  componentWillMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    console.log('posts: ' + this.props.posts);

    return this.props.posts.map((post) => {
      console.log('post: ' + post);
      return (
        <li className="list-group-item" key={post.id}>
            <Link to={'posts/' + post.id}>
              <span className="pull-xs-right">{post.categories}</span>
              <strong>{post.title}</strong>
            </Link>
        </li>
      );
    });

  }

  render() {

    return (
      <div>
        <div className="text-xs-right">
          <Link to="/posts/new" className="btn btn-primary">
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }

}

function mapStateToProps(state){
  console.log("state "+state);
  return {posts:state.posts.all};
}


function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchPosts},dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(PostIndex);


// {fetchPosts:fetchPosts} is a shortcut to avoid bindActionCreators
//export default connect(null,{fetchPosts:fetchPosts})(PostIndex);

// {fetchPosts} shortcut of {fetchPosts:fetchPosts}
//export default connect(mapStateToProps,{fetchPosts:fetchPosts})(PostIndex);
