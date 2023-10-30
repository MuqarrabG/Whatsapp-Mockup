const Posts = ({Posts}) => {
    return (
        <dir>
            <h2>{Posts.title}</h2>
            <p>{Posts.body}</p>
            <p>Posts ID: {Posts.id}</p>
        </dir>
    )
}

export default Posts