const Posts = ({Posts}) => {
    return (
        <dir>
            Logout.onClick={() => {window.location= '/'}}
            
            <h2>{Posts.title}</h2>

                {/* //Change Name would be save in search bar once typed in */}
                <p>{Posts.ChangeName}</p>

                    {/* //Notification would be save in search bar once typed in */}
                    <p>{Posts.Notification}</p>

                        {/* //Logout would be save in search bar once typed in */}
                        <p>{Posts.Logout}</p>

            <p>Posts ID: {Posts.id}</p>
        </dir>
    )
}

export default Posts