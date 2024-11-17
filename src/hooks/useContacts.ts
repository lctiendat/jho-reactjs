import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import {
  fetchContacts,
  fetchContactById,
  createContact,
  updateContact,
  deleteContact,
  IContact,
} from '../features/contactSlice';
import { useEffect } from 'react';

export const useContacts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { contacts, contact, loading, error } = useSelector((state: RootState) => state?.contact);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const getContact = (id: number) => dispatch(fetchContactById(id));
  const addContact = (newContact: Partial<IContact>) => dispatch(createContact(newContact));
  const editContact = (updatedContact: IContact) => dispatch(updateContact(updatedContact));
  const removeContact = (id: number) => dispatch(deleteContact(id));

  return { contacts, contact, loading, error, getContact, addContact, editContact, removeContact };
};
