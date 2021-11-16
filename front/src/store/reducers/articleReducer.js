import articles from '../../containers/articles';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    articles:[],
    selected: null,
    comments: [],
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.GET_ARTICLE_LIST:
            return {...state, articles: action.articles};
        case actionTypes.GET_ARTICLE:
            return {...state, selected: action.target};
        case actionTypes.CREATE_ARTICLE:
            const newArray = state.articles.concat([action.newArticle]);
            return {...state, articles: newArray, selected: action.newArticle};
        case actionTypes.EDIT_ARTICLE:
            const editArticle = state.articles.map(article =>
                (article.id == action.newArticle.id ? action.newArticle : article))
            return {...state, articles: editArticle};    
        case actionTypes.DELETE_ARTICLE:
            const deletedArticle = state.articles.find(article => article.id == action.deletedId);
            if(deletedArticle == undefined) return state;
            const idx = state.articles.indexOf(deletedArticle);
            const deletedArticleArray = state.articles.slice();
            deletedArticleArray.splice(idx, 1);
            return {...state, articles: deletedArticleArray};
        case actionTypes.GET_COMMENT_LIST:
            return {...state, comments: action.comments};
        case actionTypes.CREATE_COMMENT:
            const newComment = state.comments.concat([action.newComment]);
            return {...state, comments: newComment};
        case actionTypes.EDIT_COMMENT:
            const editComment = state.comments.map(comment =>
                (comment.id == action.newComment.id ? action.newComment : comment))
            return {...state, comments: editComment};    
        case actionTypes.DELETE_COMMENT:
            const deletedComment = state.comments.find(comment => comment.id == action.deletedId);
            if(deletedComment == undefined) return state;
            const commentIdx = state.comments.indexOf(deletedComment);
            const deletedCommentArray = state.articles.slice();
            deletedCommentArray.splice(commentIdx, 1);
            return {...state, comments: deletedCommentArray};
        default:
            return state;
    }
};

export default reducer;