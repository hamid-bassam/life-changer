"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { cn } from "../../lib/utils";
export type SelectGoalComponentProps = {
  goals: { id: string, title: string, depth: number, tags: { id: string, name: string, color: string | null }[] }[];

};

export const SelectGoalComponent = (props: SelectGoalComponentProps) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<{ id: string, name: string, color: string | null }>();
  const filteredGoals = props.goals.filter(goal => {
    const matchesSearch = goal.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag ?

      goal.tags.some(tag => tag.name.toLowerCase().includes(selectedTag.name.toLowerCase())) : true;

    return matchesSearch && matchesTag;
  });
  const uniqueTags: { id: string, name: string, color: string | null }[] = [...new Set(props.goals.flatMap(goal => goal.tags))];
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a parent goal" />
      </SelectTrigger>
      <SelectContent>
        {/* Barre de Recherche */}
        <div className="p-2">
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        {/* Filtres par Tag */}
        <SelectGroup>
          <SelectLabel>Filter by Tag</SelectLabel>
          <div className=" gap-2 p-2 inline-flex flex-wrap">

            <button
              onClick={() => setSelectedTag(undefined)}
              className={`p-1 rounded ${selectedTag?.name === '' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              All
            </button>
            {uniqueTags.map(tag => (
              <Button
                asChild
                key={tag.id}
                onClick={() => setSelectedTag(tag)}
                className={`p-1 rounded ${selectedTag === tag ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                <Badge
                  className={cn(tag.color, "h-5")}>
                  {tag.name}
                </Badge>
              </Button>
            ))}
          </div>
        </SelectGroup>

        <SelectGroup>
          {filteredGoals.map(goal => (
            <SelectItem key={goal.id} value={goal.id}>
              {goal.title}
            </SelectItem>
          ))}
        </SelectGroup>
        {/* {props.goals.map(goal => (
          <SelectItem key={goal.id} value={goal.id}>
            {goal.title}
          </SelectItem>
        ))} */}
      </SelectContent>
    </Select>
  );
};