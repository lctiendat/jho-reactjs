import Filter from "../components/Filter";
import NavigationTabs from "../components/NavigationTabs";
import DashboardLayout from "../layouts/Dashboard";
import { useContacts } from '../hooks/useContacts';
import Modal from "../components/Modal";
import ContactFormModal from "../components/Contact/ContactForm";
import { useState } from "react";
import ContactForm from "../components/Contact/ContactForm";


const Contact = () => {

    const { contacts: list } = useContacts()

    const [isModalOpen, setModalOpen] = useState(false);    

    const handleAddContact = async () => {
        setModalOpen(false);
    };

    return (
        <>
            <DashboardLayout>
                <div className="flex justify-between items-center pb-4">
                    <div className='flex items-center gap-3' onClick={() => setModalOpen(true)}>
                        <button className="bg-orange-600 hover:bg-orange-500 text-white py-2 px-4 rounded flex items-center gap-2">
                            <img
                                src="/images/icon/plus.png"
                                alt="Search"
                                className=" left-2.5 top-2.5 w-4 h-4 text-white"
                            />
                            <p className='text-xs ' > Ajout de contact</p>
                        </button>
                        <p className='text-white text-sm font-semibold'>100 <span className='text-gray-400 font-normal'>Contacts</span></p>
                    </div>
                    <Filter />

                </div>
                <NavigationTabs />
                <div className="bg-[#17202E] p-6 rounded-lg shadow-lg mt-5">
                    <table className="min-w-full divide-y divide-gray-700 text-sm">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Nom du contact
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Téléphone
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Creater
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Manager
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Étiquettes
                                </th>
                                <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider text-center">
                                    <img
                                        src="/images/icon/setting.png"
                                        alt="Search"
                                        className="w-4 h-4 text-white"
                                    />
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {Array.isArray(list.data) && list.data.map((contact, index) => (
                                <tr key={index} className="hover:bg-gray-800">
                                    <td className="flex items-center">
                                        <input id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-red-600  border-gray-300 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <div className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-white">{contact.name}</div>
                                            <div className="text-gray-400 text-xs">Particulier</div>
                                        </div>

                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                        {contact.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                        {contact.phone}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                        {contact.creator.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                        {contact.manager.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex space-x-2">
                                            {Array.isArray(contact.tags) && contact.tags.map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className={`inline-flex items-center text-white px-1 text-xs font-medium rounded-lg bg-red-500`}
                                                >
                                                    {tag.name}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400">
                                        <button className="mr-3 hover:text-white"><img
                                            src="/images/icon/edit.png"
                                            alt="Search"
                                            className="w-4 h-4 text-white"
                                        /></button>
                                        <button className="hover:text-red-600">
                                            <img
                                                src="/images/icon/trash.png"
                                                alt="Search"
                                                className="w-4 h-4 text-white"
                                            />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Phân trang */}
                    <div className="flex justify-between items-center pt-4 text-gray-400">
                        <span>Éléments par page: 25 | 1-25 sur 500 éléments</span>
                        <div className="flex space-x-2">
                            <button className="hover:text-white">◀</button>
                            <span className="text-white">01</span>
                            <button className="hover:text-white">▶</button>
                        </div>
                    </div>
                    <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                        <h2 className="text-white text-lg mb-4">Add New Contact</h2>
                        <ContactForm onSubmit={handleAddContact} onClose={() => setModalOpen(false)} />
                    </Modal>
                </div>
            </DashboardLayout>
        </>
    );
};

export default Contact;
