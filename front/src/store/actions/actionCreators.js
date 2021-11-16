import * as actionTypes from './actionTypes';
import axios from 'axios';
import {push} from 'connected-react-router';
  
export const login = () => {
  return (dispatch) => {
    return axios.put('/api/user/1', {
      "id": 1,
      "email": "swpp@snu.ac.kr",
      "password": "iluvswpp",
      "name": "Software Lover",
      "logged_in": true
    })
      .then(res => {
        dispatch({type: actionTypes.LOG_IN});
      }
    );
  };
};

export const logout = () => {
  return (dispatch) => {
    return axios.put('/api/user/1', {
      "id": 1,
      "email": "swpp@snu.ac.kr",
      "password": "iluvswpp",
      "name": "Software Lover",
      "logged_in": false
    })
      .then(res => {
        dispatch({type: actionTypes.LOG_OUT});
        dispatch(push('/login'));
      }
    );
  };
}

export const checkLogin = () => {
  return (dispatch) => {
    return axios.get('/api/user/1')
      .then(res => {
        dispatch({type: actionTypes.CHECK_LOG_IN, login: res.data.logged_in});
        if(res.data.logged_in){
          dispatch(push('/articles'));
        }
      }
    )
  }
}

export const getUserList = () => {
  return (dispatch) => {
    return axios.get('/api/user')
      .then(res => {dispatch({type: actionTypes.GET_USER_LIST, users: res.data});
    })
  }
}

export const getArticleList = () => {
  return (dispatch) => {
    return axios.get('/api/articles/')
      .then(res => dispatch({type: actionTypes.GET_ARTICLE_LIST, articles: res.data}))
  }
}

export const getArticle = (id) => {
  return (dispatch) => {
    return axios.get('/api/articles/' + id)
      .then(res => {
        dispatch({type: actionTypes.GET_ARTICLE, target: res.data});
      }
    )
  }
}

export const createArticle = (newArticle) => {
  return (dispatch) => {
    return axios.post('/api/articles/', newArticle)
      .then(res => {
        dispatch({type: actionTypes.CREATE_ARTICLE, newArticle: res.data});
        dispatch(push('/articles/' + res.data.id));
      })
  }
}

export const editArticle = (id, editArticle) => {
  return (dispatch) => {
    return axios.put('/api/articles/' + id, editArticle)
      .then(res => {
        dispatch({type: actionTypes.EDIT_ARTICLE, newArticle: res.data});
        dispatch(push('/articles'));
      })
  }
}

export const deleteArticle = (id) => {
  return (dispatch) => {
    return axios.delete('/api/articles/' + id)
      .then(res => {
        dispatch({type: actionTypes.DELETE_ARTICLE, deletedId: id});
        dispatch(push('/articles'));
      })
  }
}

export const getCommentList = () => {
  return (dispatch) => {
    return axios.get('/api/comments/')
      .then(res => dispatch({type: actionTypes.GET_COMMENT_LIST, comments: res.data}))
  }
}

export const createComment = (newComment) => {
  return (dispatch) => {
    return axios.post('/api/comments/', newComment)
      .then(res => {
        dispatch({type: actionTypes.CREATE_COMMENT, newComment: res.data});
      })
  }
}

export const editComment = (id, editComment) => {
  return (dispatch) => {
    return axios.put('/api/comments/' + id, editComment)
      .then(res => {
        dispatch({type: actionTypes.EDIT_COMMENT, newComment: res.data});
      })
  }
}

export const deleteComment = (id) => {
  return (dispatch) => {
    return axios.delete('/api/comments/' + id)
      .then(res => {
        dispatch({type: actionTypes.DELETE_COMMENT, deletedId: id});
      })
  }
}