import { AddTagButton } from '@atoms/Tags/AddTagButton/AddTagButton';
import { TagList } from '@organisms/Tags/TagList/TagList';

export default function TagsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Tags</h1>
        <AddTagButton />
      </div>
      <TagList />
    </div>
  );
}
