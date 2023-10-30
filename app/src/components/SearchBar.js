import {searchOutline} from "ionicons/icons"


const SearchBar = ({Posts, setSearchResults}) => {
    const handleSubmit = (e) => e.preventDefault()
        const handleSearchChange = (e) => {
            if (!e.target.value) return setSearchResults(Posts)      
                const resultsArray = Posts.filter(Posts => Posts.title.include(e.target.value) || Posts.body.includes(e.target.value))

        setSearchResults(resultsArray)
    }
    
    return (
        <header>
            <form className="Search" onSubmit={handleSubmit}>
                <input 
                    className="search_input" 
                    type="text"
                    id="search"
                    // onChange={handleSearchChange}
                    border solid
                    class="pl-10 pr-4 py-2 w-full rounded-md border-5"
                />
                <button className="search_button">
                    <ion-icon icon= {searchOutline} 
                        class="absolute left-3 top-14 transform -translate-y-1/2 text-gray-400 text-lg pointer-events-none border-solid"  /> 
                </button>
            </form>
        </header>
    )
}

export default SearchBar