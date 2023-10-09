import React, { useState } from "react";
import { searchOutline } from "ionicons/icons";

function SearchBar() {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    console.log(query);

    // Trigger search functionality as user types
    //onSearch(newQuery);
  };

  return (
    <div className="relative p-4">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        className="pl-10 pr-4 py-2 w-full border rounded-md"
      />
      <ion-icon
        name="search"
        class="absolute left-7 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg pointer-events-none"
      ></ion-icon>
    </div>
  );
}

export default SearchBar;
