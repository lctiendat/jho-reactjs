import { useState } from 'react'

export default function NavigationTabs() {
  const [activeTab, setActiveTab] = useState('contacts')

  const tabs = [
    {
      id: 'contacts',
      label: 'Contacts',
      icon: '/images/icon/contact.png'
    },
    {
      id: 'equestres',
      label: 'Equestres',
      icon: '/images/icon/tag.png'
    },
    {
      id: 'opportunites',
      label: 'Opportunités',
      icon: '/images/icon/ẻuo.png'
    },
    {
      id: 'taches',
      label: 'Tâches',
      icon: '/images/icon/tasks.png'
    }
  ]

  return (
    <nav className="bg-transparent devide-y">
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              group relative flex items-center gap-2 px-1 py-3 text-sm font-medium outline-none
              ${activeTab === tab.id ? 'text-white' : 'text-gray-400 hover:text-white'}
            `}
          >
            <img
              src={tab.icon}
              alt=""
              className="h-4 w-4"
            />
            <span>{tab.label}</span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 h-0.5 w-full bg-[#f85149]" />
            )}
          </button>
        ))}
      </div>
    </nav>
  )
}