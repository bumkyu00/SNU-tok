import React, {Component} from 'react';

class Article extends Component{

    render(){
        return (
            <dir>
                <div>
                    <div>{this.props.id}: 
                        <button onClick = {() => this.props.history.push('/articles/' + this.props.id)}>{this.props.title}
                        </button>
                    </div>
                    <div>Author: {this.props.author}</div>
                </div>
            {this.props.content}
            </dir>
        );
    }
}

export default Article;