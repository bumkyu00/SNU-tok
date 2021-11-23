import React, {Component} from 'react';
import * as actionCreators from '../store/actions/actionCreators';
import { connect } from 'react-redux';
import Article from '../components/article';

const Web3 = require('web3');
const url = "https://eth-ropsten.alchemyapi.io/v2/6xvB_IFEiLUg5uLrROiwjqj_nP-3qMBO"
const web3 = new Web3(url)

const abi = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "yurl",
		"outputs": [
			{
				"name": "url",
				"type": "string"
			},
			{
				"name": "owner",
				"type": "address"
			},
			{
				"name": "nheart",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "nowurl",
				"type": "string"
			}
		],
		"name": "addurl",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "givecoin",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "randomurl",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "heartcount",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getyurl",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
const address = "0xd9145CCE52D386f254917e481eB44e9943F39138";
const tether = new web3.eth.Contract(abi, address);

class Articles extends Component{
    state = {
        url: <iframe width="560" height="315" src="https://www.youtube.com/embed/iQUVikckKZU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>,
    }

    render(){

		tether.methods.getyurl(0).call().then(result => {
			console.log(result)
		})
        //tether.methods.addurl('https://www.youtube.com/watch?v=seoXmV6KCmE').send({from:'0xcACad72D9827f9C8DEbD75d7ec3b9D1Adf2354f2'})
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