import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchPost, deletePost } from '../actions/index';

class PostShow extends Component {

/*
necessary for the this.context.router.push("/");
*/
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    //this.props.params.id viene de la url
    this.props.fetchPost(this.props.params.id);
  }

  onDeleteClick() {
    this.props.deletePost(this.props.params.id).then(() => {
      this.context.router.push('/');
    });
  }

  render() {
    const { post } = this.props;

    console.log(this.props.post);
    if (!post) {
      return (<div>Loading...</div>);
    }
    return (
      <div>
        <Link to="/">Back to index</Link>
        <button
          onClick={this.onDeleteClick.bind(this)}
          className="btn btn-danger pull-xs-right">
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Category: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostShow);
