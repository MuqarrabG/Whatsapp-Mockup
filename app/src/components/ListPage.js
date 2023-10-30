import Posts from "../API/Posts"

const ListPage = ({ searchResults }) => {

    const results = searchResults.map(Posts => <Posts key={Posts.id} Posts ={Posts} />)
        const content = results?.length ? results : <dir><p>No Matching Post</p></dir>

    return(
        <main>{content}</main>
    )
}

export default ListPage