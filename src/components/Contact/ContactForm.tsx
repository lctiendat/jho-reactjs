import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Select from 'react-select';
import { z } from 'zod';
import { useTags } from '../../hooks/useTags';
import { useState } from 'react';
import { useManagers } from '../../hooks/useManagers';
import { useContacts } from '../../hooks/useContacts';
import { useDispatch } from 'react-redux';
import { resetError } from '../../features/contactSlice';

const ContactSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(1, { message: 'Phone is required' }),
  tags: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
  // managed_by: z.number().min(1, { message: 'Manager is required' }),
});

type ContactFormInputs = z.infer<typeof ContactSchema>;


interface ContactFormProps {
  onSubmit: (data: ContactFormInputs) => void;
  onClose: () => void;
  onSuccess: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onClose, onSuccess }) => {
  const { register, reset, handleSubmit, control, formState: { errors } } = useForm<ContactFormInputs>({
    resolver: zodResolver(ContactSchema),
  });

  const { tags } = useTags()
  const { managers } = useManagers()
  const { addContact, error, success } = useContacts()
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [selectedManager, setSelectedManager] = useState<string>('');
  const dispatch = useDispatch()


  const onSubmit = async (data: any) => {
    const contactData = {
      ...data,
      tags: selectedTags.map((tag: any) => tag.id),
      managed_by: selectedManager?.id
    };

    addContact(contactData);
    dispatch(resetError())
    onClose();
    onSuccess()
    reset();
  };

  const handleTagChange = (selectedOptions: any) => {
    setSelectedTags(selectedOptions);
  };

  const handleManagerChange = (selectedOptions: any) => {
    setSelectedManager(selectedOptions);
  };



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Name Field */}
      {!success && error && <p className="text-red-500 text-xs">{error}</p>}

      <div>
        <label className="block text-gray-400">Name</label>
        <input
          type="text"
          {...register('name')}
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
      </div>

      {/* Email Field */}
      <div>
        <label className="block text-gray-400">Email</label>
        <input
          type="email"
          {...register('email')}
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-gray-400">Phone</label>
        <input
          type="text"
          {...register('phone')}
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
        />
        {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
      </div>
      <div>
        <label className="block text-gray-400">Manager</label>
        <Controller
          name="managed_by"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              {...register('managed_by')}

              options={managers.data}
              className="basic-multi-select text-black"
              classNamePrefix="select"
              onChange={handleManagerChange}
              value={field.id}
              getOptionLabel={manager => manager.name}
              getOptionValue={manager => manager.id}
            />
          )}
        />
        {errors.managed_by && <p className="text-red-500 text-xs">{errors.managed_by.message}</p>}

      </div>
      <div>
        <label className="block text-gray-400">Tags</label>
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              isMulti
              options={tags.data}
              className="basic-multi-select text-black"
              classNamePrefix="select"
              onChange={handleTagChange}
              value={field.id}
              getOptionLabel={tag => tag.name}
              getOptionValue={tag => tag.id}
            />
          )}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onClose} className="bg-gray-600 py-2 px-4 rounded">
          Cancel
        </button>
        <button type="submit" className="bg-[#DD5313] text-white py-2 px-4 rounded">
          Add Contact
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
