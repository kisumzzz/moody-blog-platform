import React from "react";
import Post from "./Post/post"
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from '@material-ui/core'


const Posts = ({setCurrentId}) => {
    const posts = useSelector((state) => state.posts);
    console.log(posts);
    return (
        // if not posts.length -> return CircularProgress else: grid
        !posts.length ? <CircularProgress /> :
            <Grid className="" container alignItems="stretch" spacing={3}>
                {posts.map(post => (
                    <Grid key={post._id} item xs={12} sm={6}>
                        <Post post={post} setCurrentId={setCurrentId}/>
                    </Grid>
                ))
                }
            </Grid>
    )
};

export default Posts;