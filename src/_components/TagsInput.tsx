"use client"
import { useRef, useState } from 'react';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { cn } from '../lib/utils';
import { ColorPicker } from './ColorPicker';
import { TagInputType } from './Goal/GoalInputUtils';

export const TagsInput = ({ tags, setTags }: { tags: TagInputType[], setTags: React.Dispatch<React.SetStateAction<TagInputType[]>> }) => {
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [inputValue, setInputValue] = useState('');

  function handleKeyDown(e: any) {
    // space instead of enter
    if (e.key !== 'Enter') return;
    const value = e.target.value;
    if (!value.trim()) return;

    const newTag = { name: value };
    setTags([...tags, newTag]);
    setInputValue('');
  }

  function removeTag(index: number) {
    console.log("clicked rm")
    setTags(tags.filter((_, i) => i !== index))
  }

  return (
    <>
      <h2>Enter Some Tags ...</h2>
      <div className="bg-card mt-1 flex flex-col items-center gap-2">
        {/* className="flex flex-grow p-0.5 outline-none border-none" */}
        <Input
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Type somthing and press enter to add a tag"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} />
        <div className="flex flex-wrap gap-1">
          {tags.map((tag, index) => (

            <div key={index} className='flex pr-1 space-x-0.5' >
              <ColorPicker onChange={(color) => {
                setTags(tags.map((el, i) => {
                  if (i === index) {
                    return { ...el, color: color };
                  }
                  return el;
                }));
              }}
              >
                <Badge
                  ref={(el: HTMLDivElement | null) => { badgeRefs.current[index] = el }}
                  className={cn('rounded-full cursor-crosshair ', tag.color, `hover:`, tag.color)}
                  key={index}
                >
                  {tag.name}


                </Badge>
              </ColorPicker>
              <span className="h-4 w-4 ml-2 rounded-full bg-muted text-muted-foreground inline-flex justify-center items-center p-1 text-sm cursor-pointer"
                onMouseDown={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  removeTag(index);
                }}>
                &times;
              </span>
            </div>
          ))}
        </div>
      </div >
    </>
  );
};