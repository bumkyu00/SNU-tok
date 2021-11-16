import React, {Component} from 'react';
import * as actionCreators from '../store/actions/actionCreators';
import { connect } from 'react-redux';
import Article from '../components/article';

class Articles extends Component{
    state = {
        url: <iframe width="560" height="315" src="https://www.youtube.com/embed/iQUVikckKZU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>,
    }
    componentDidMount(){
        this.props.getArticleList();
        this.props.getUserList();
    }

    checkLogin(){
        this.props.checkLogin();
    }

    render(){
        const users = this.props.storedUsers;
        if(users.length != 0){
            const articles = this.props.storedArticles.map( article => {
                let author_name = (users.find(user => (user.id == article.author_id))).name;
                return (
                    <Article
                        id = {article.id}
                        title = {article.title}
                        author = {author_name}
                        content = {article.content}
                    />
                )
            })
            return(
                <div>
                    <h1>Articles</h1>
                    {articles}
                    <button id='create-article-button' 
                    onClick={()=>this.props.history.push('/articles/create')}>
                    Create article</button>
                </div>
            );
        }
        return (
            <div>
                <h1>Articles</h1>
                <button onClick = {() => this.setState({url: <iframe width="560" height="315" src="https://www.youtube.com/embed/k0JrM3zvvRY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>})}>Change</button>
                {this.state.url}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        storedArticles: state.articles.articles,
        storedUsers: state.users.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
      getArticleList: () => dispatch(actionCreators.getArticleList()),
      getUserList: () => dispatch(actionCreators.getUserList()),
      checkLogin: () => dispatch(actionCreators.checkLogin())
    }
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Articles);