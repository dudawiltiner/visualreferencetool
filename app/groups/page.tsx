import { AddGroupButton } from '@atoms/Groups/AddGroupButton/AddGroupButton';
import { GroupList } from '@organisms/Groups/GroupList/GroupList';

export default function GroupsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Groups</h1>
        <AddGroupButton />
      </div>
      <GroupList />
    </div>
  );
}
