const API_DEVELOPMENT='https://localhost:7167';
const API_PRODUCTION='https://appname.arurewebsites.net';

const endopoints ={

    get_all_post: 'get-all-posts',
    get_post_id: 'get-all-posts-by-id',
    create_post:'create-post',
    update_post:'update-post',
    delete_post:'delete-by-id'
};

const development={
    API_GET_ALL_POSTS: `${API_DEVELOPMENT}/${endopoints.get_all_post}`,
    API_GET_ID_POSTS:`${API_DEVELOPMENT}/${endopoints.get_post_id}`,
    API_CREATE_POSTS:`${API_DEVELOPMENT}/${endopoints.create_post}`,
    API_UPDATE_POSTS:`${API_DEVELOPMENT}/${endopoints.update_post}`,
    API_DELETE_POSTS:`${API_DEVELOPMENT}/${endopoints.delete_post}`,
};

const production={
    API_GET_ALL_POSTS:`${API_PRODUCTION}/${endopoints.get_all_post}`,
    API_GET_ID_POSTS:`${API_PRODUCTION}/${endopoints.get_post_id}`,
    API_CREATE_POSTS:`${API_PRODUCTION}/${endopoints.create_post}`,
    API_UPDATE_POSTS:`${API_PRODUCTION}/${endopoints.update_post}`,
    API_DELETE_POSTS:`${API_PRODUCTION}/${endopoints.delete_post}`,
};

const constants = process.env.NODE_ENV === 'development' ? development : production;

export default constants;