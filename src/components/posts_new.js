import _ from 'lodash';
import React,{Component,PropTypes} from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createPost } from '../actions/index';
import { Link } from 'react-router';


const FIELDS = {
  title:{
    type:'input',
    label:'Title for Posts'
  },
  categories:{
    type:'input',
    label:'Enter some category for this post.'
  },
  content:{
    type:'textarea',
    label:'Post content.'
  }
}

//['title','categories','content'];

class PostsNew extends Component{

  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    this.props.createPost(props).then(()=> this.context.router.push('/'));
  }


  renderInputField(fieldConfig,field){

    return(
        <div className={`form-group ${fieldConfig.error && fieldConfig.touched && 'has-danger'}`}>
        <label>Categories</label>
        <fieldConfig.type {...fieldConfig.input} placeholder={fieldConfig.label}  className="form-control"  />
        <div className="form-control-feedback">
          {fieldConfig.touched ? fieldConfig.error : ''}
        </div>
      </div>
    );
  };



  renderTextArea({ input, label, type, meta: { touched, error, warning } }) {
    return (
      <div className={`form-group ${error && touched && 'has-danger'}`}>
        <label>{label}</label>
        <textarea {...input} placeholder={label}  className="form-control"  />
        <div className="form-control-feedback">
          {touched ? error : ''}
        </div>
      </div>
    );
  }
  render() {
    const { handleSubmit, touched, valid } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

        <Field name="title" component={title =>
                  <div className={`form-group ${title.error && title.touched && 'has-danger'}`}>
                    <label>{title.label}</label>
                    <textarea {...title.input} placeholder={title.label}  className="form-control"  />
                    <div className="form-control-feedback">
                      {title.touched ? title.error : ''}
                    </div>
                  </div>
                }/>
              <Field name="categories" component={categories =>
                  <div className={`form-group ${categories.error && categories.touched && 'has-danger'}`}>
                    <label>{categories.label}</label>
                    <textarea {...categories.input} placeholder={categories.label}  className="form-control"  />
                    <div className="form-control-feedback">
                      {categories.touched ? categories.error : ''}
                    </div>
                  </div>
                }/>

        <Field name="content" component={this.renderTextArea} label="Content" />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }

/*
  render(){
    const { fields:{title,categories,content}, handleSubmit } = this.props;

    console.log(this.props);
    console.log(title);
    console.log(this.props.createPost);
    return (
      <form onSubmit={handleSubmit(createPost)}>
        <h4>Create a new Post</h4>
        <div className='form-group'>
          <label>Title</label>
          <input type="text" className="form-control" {...title}/>
          <label>Categories</label>
          <input type="text" className="form-control" {...categories}/>
          <label>Content</label>
          <textarea className="form-control" {...content}/>

          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    );
  }

  */
}

/*
connect: 1st arg is mapStateToProps, 2nd arg is mapDispatchToProps

reduxForm: 1st arg is form config, 2nd arg is mapStateToProps,
          3rd arg is mapDispatchToProps >> the name of the actionCreator=createPost
*/
function validate(values) {
  const errors = {};

  _.each(FIELDS,(type,field) => {
    if(!values[field]){
      errors[field] = `Enter a ${field}`
    }
  });

  /*
  if (!values.title) {
    errors.title = 'Enter a username';
  }
  if (!values.categories) {
    errors.categories = 'Enter categories';
  }
  if(!values.content) {
    errors.content = 'Enter some content';
  }
  */
  return errors;
}

const ComponentWithForm = reduxForm({
  form: 'PostsNewForm',
  validate
})(PostsNew);

/*
export default reduxForm({
  form:'PostNewForm',
  fields:['title','categories','content']
})(PostsNew);
*/
export default connect(null, { createPost })(ComponentWithForm);
