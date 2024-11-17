export default function Sidebar() {
    return (
      <aside className="flex min-h-screen w-[60px] flex-col bg-[#17202E] py-4">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img
            src="/images/logo-small.png"
            alt="Logo"
            className="h-6 w-6"
          />
        </div>
  
        {/* Navigation */}
        <nav className="flex flex-1 flex-col items-center gap-4">
          <button className="group relative p-2">
            <img
              src="/images/icon/paper.png"
              alt="Home"
              className="h-5 w-5 text-gray-400 transition-colors group-hover:text-white"
            />
          </button>
  
          <button className="group relative p-2">
            <img
              src="/images/icon/users.png"
              alt="Explore"
              className="h-5 w-5 text-gray-400 transition-colors group-hover:text-white"
            />
          </button>
  
          <button className="group relative p-2">
            <img
              src="/images/icon/box.png"
              alt="Messages"
              className="h-5 w-5 text-gray-400 transition-colors group-hover:text-white"
            />
          </button>
  
          <button className="group relative p-2">
            <img
              src="/images/icon/three-user.png"
              alt="Notifications"
              className="h-5 w-5 text-gray-400 transition-colors group-hover:text-white"
            />
          </button>
  
          <button className="group relative p-2">
            <img
              src="/images/icon/study.png"
              alt="Bookmarks"
              className="h-5 w-5 text-gray-400 transition-colors group-hover:text-white"
            />
          </button>
  
          <button className="group relative p-2">
            <img
              src="/images/icon/note.png"
              alt="Lists"
              className="h-5 w-5 text-gray-400 transition-colors group-hover:text-white"
            />
          </button>
  
          <button className="group relative p-2">
            <img
              src="/images/icon/start.png"
              alt="Profile"
              className="h-5 w-5 text-gray-400 transition-colors group-hover:text-white"
            />
          </button>
  
          <button className="group relative p-2">
            <img
              src="/images/icon/share.png"
              alt="More"
              className="h-5 w-5 text-[#f85149] transition-colors group-hover:text-[#f85149]/90"
            />
          </button>
          <button className="group relative p-2">
            <img
              src="/images/icon/card.png"
              alt="More"
              className="h-5 w-5 text-[#f85149] transition-colors group-hover:text-[#f85149]/90"
            />
          </button>
          <button className="group relative p-2">
            <img
              src="/images/icon/filter.svg"
              alt="More"
              className="h-5 w-5 text-white transition-colors group-hover:text-[#f85149]/90"
            />
          </button>
          <button className="group relative p-2">
            <img
              src="/images/icon/connect.png"
              alt="More"
              className="h-5 w-5 text-white transition-colors group-hover:text-[#f85149]/90"
            />
          </button>
        </nav>
  
        {/* Bottom Section */}
        <div className="mt-auto flex justify-center">
          <button className="group relative p-2">
            <img
              src="/images/icon/logout.png"
              alt="Logout"
              className="h-5 w-5 text-gray-400 transition-colors group-hover:text-white"
            />
          </button>
        </div>
      </aside>
    )
  }