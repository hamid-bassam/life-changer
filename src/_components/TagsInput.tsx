"use client"
import { useState } from 'react';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
export const TagsInput = ({ tags, setTags }: { tags: string[], setTags: React.Dispatch<React.SetStateAction<string[]>> }) => {
  // const [tags, setTags] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('');
  function handleKeyDown(e: any) {
    // space instead of enter
    if (e.key !== ' ') return;
    const value = e.target.value;
    if (!value.trim()) return;
    setTags([...tags, value]);
    setInputValue('');
  }

  function removeTag(index: number) {
    setTags(tags.filter((el, i) => i !== index))
  }
  return (
    <>
      <h2>Enter Some Tags ...</h2>
      <div className="bg-muted/20 mt-1 flex flex-col items-center gap-2">
        {/* className="flex flex-grow p-0.5 outline-none border-none" */}
        <Input
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Type somthing"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} />
        <div className="flex flex-wrap gap-1">
          {tags.map((tag, index) => (
            <Badge className='rounded-full flex pr-1' key={index}>
              {tag}
              <span className="h-4 w-4 ml-2 rounded-full bg-muted text-muted-foreground inline-flex justify-center items-center p-1 text-sm cursor-pointer" onClick={() => removeTag(index)}>
                &times;
              </span>
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
};