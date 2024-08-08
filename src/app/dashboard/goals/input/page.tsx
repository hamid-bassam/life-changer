import { TagsInput } from "../../../../_components/TagsInput";

export default function Input() {
  return (
    <div className='flex-1 min-h-full bg-transparent nowheel nodrag px-6 ' style={{ overflow: 'auto' }}>
      <TagsInput />
    </div>
  );
}