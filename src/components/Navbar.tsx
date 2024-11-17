
export default function Navbar() {
    return (
        <header className="flex h-[72px] justify-between items-center gap-4 bg-[#17202E] px-5 w-full">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <img
                    src="/images/logo.png"
                    alt="MetaForum Logo"
                    className="h-6 text-white"
                />
            </div>

            {/* Search Bar */}
            <div className="flex gap-3">
                <div className="flex flex-1 items-center gap-2">
                    <div className="relative flex-1 w-full max-h-[40px] ">
                        <img
                            src="/images/icon/search.png"
                            alt="Search"
                            className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-500"
                        />
                        <input
                            className="w-full pl-8 pr-3 py-2 bg-[#232B39] text-[12px] placeholder-white border-none rounded-[24px] text-white focus:outline-none focus:ring-2 focus:ring-[#f85149]"
                            placeholder="Rechercher dans MetaForum"
                            type="search"
                        />
                    </div>
                </div>
                {/* Add Button */}
                <button className="w-[40px] h-[40px] bg-[#DD5313] hover:bg-[#f85149]/90 text-white text-xl flex justify-center items-center font-bold rounded-full">
                    +
                </button>
            </div>




            {/* Icons */}
            <div className="flex">
                <nav className="flex items-center gap-4">
                    <button className="p-2 text-gray-400 hover:text-white">
                        <img
                            src="/images/icon/notification.png"
                            alt="Notifications"
                            className="w-4 h-4"
                        />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white">
                        <img
                            src="/images/icon/messages.png"
                            alt="Messages"
                            className="w-4 h-4"
                        />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white">
                        <img
                            src="/images/icon/setting.png"
                            alt="Settings"
                            className="w-4 h-4"
                        />
                    </button>
                </nav>

                {/* User Profile */}
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-sm font-medium">
                        SH
                    </div>
                    <div className="text-xs text-white">
                        <div>Sébastien Hannoux</div>
                        <div className="text-xs text-gray-400">CEO, Admin</div>
                    </div>
                </div>
            </div>

        </header>
    );
}