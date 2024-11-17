export default function Filter() {
  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-1 max-w-[407px] max-h-[40px] ">
        <img
          src="/images/icon/preferences.png"
          alt="Search"
          className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-500"
        />
        <select className="w-full pl-8 pr-3 py-2 bg-transparent text-[12px] placeholder-white border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#f85149]" name="" id="">
          <option value="1" className="bg-transparent">Plus de filtre</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <div className="relative flex-1 max-w-[407px] max-h-[40px] ">
        <img
          src="/images/icon/users.png"
          alt="Search"
          className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-500"
        />
        <select className="w-full pl-8 pr-3 py-2 bg-transparent text-[12px] placeholder-transparent border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#f85149]" name="" id="">
          <option value="1">Plus de filtre</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <div className="relative flex-1 max-w-[407px] max-h-[40px] ">
        <img
          src="/images/icon/search.png"
          alt="Search"
          className="absolute left-2.5 top-2.5 w-4 h-4 text-white"
        />
        <input
          className="w-full pl-8 pr-3 py-2 bg-transparent text-[12px] placeholder-white border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#f85149]"
          placeholder="Text, contact, response..."
          type="search"
        />
      </div>
      <button className="border border-gray-700 rounded-lg w-8 h-8 flex items-center justify-center">
        <img
          src="/images/icon/setting.png"
          alt="Search"
          className="w-4 h-4 text-white"
        />
      </button>
    </div>
  )
}