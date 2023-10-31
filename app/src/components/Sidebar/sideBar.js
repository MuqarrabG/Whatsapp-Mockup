import TopBar from "./topBar";
import SearchBar from "./searchBar";
import ChatList from "./chatList";

function Sidebar({ user, chats }) {
  return (
    <div className="w-1/3 border flex flex-col border-black">
      <TopBar user={user} />
      <SearchBar />
      <ChatList user={user} chats={chats} />
    </div>
  );
}
export default Sidebar;
