import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import {
  fetchTags,
  fetchTagById,
  createTag,
  updateTag,
  deleteTag,
  ITag,
} from '../features/tagSlice';
import { useEffect } from 'react';

export const useTags = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tags, tag, loading, error } = useSelector((state: RootState) => state?.tag);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  const getTag = (id: number) => dispatch(fetchTagById(id));
  const addTag = (newTag: Partial<ITag>) => dispatch(createTag(newTag));
  const editTag = (updatedTag: ITag) => dispatch(updateTag(updatedTag));
  const removeTag = (id: number) => dispatch(deleteTag(id));

  return { tags, tag, loading, error, getTag, addTag, editTag, removeTag };
};
