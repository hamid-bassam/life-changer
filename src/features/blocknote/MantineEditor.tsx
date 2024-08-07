"use client"; // this registers <Editor> as a Client Component
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, Theme, lightDefaultTheme } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
// import * as Form from "../../../components/ui/form";
import { PartialBlock } from "@blocknote/core";
import { Note } from "@prisma/client";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Save } from "lucide-react";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { Suspense, useState } from "react";
import { createNote, editNote } from "../../actions/actions";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";




function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(Math.min(k(n) - 3, 9 - k(n), 1), -1);
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hslToHex(hsl: string): string {
  const [h, s, l] = hsl.split(' ').map(value => parseFloat(value));
  const [r, g, b] = hslToRgb(h, s, l);
  return rgbToHex(r, g, b);
}


const lightTheme = {

  colors: {

    editor: {
      text: "lightDefaultTheme.colors.editor.text",
      background: lightDefaultTheme.colors.editor.background,
    },
    menu: {
      text: "HSL(210.77 97.5% 15.69%)",
      background: "#f0f9ff",
    },
    disabled: {
      text: " lightDefaultTheme.colors.disabled.text",
      background: "lightDefaultTheme.colors.disabled.background",
    },
    tooltip: {
      text: "HSL(195.65 62.16% 92.75%)",
      background: "HSL(196.46 98.87% 34.71%)",
    },
    hovered: {
      text: "HSL(210.77 97.5% 15.69%)",
      background: "HSL(195.65 62.16% 92.75%)",
    },
    selected: {
      text: "HSL(196.46 98.87% 34.71%)",
      background: "lightDefaultTheme.colors.selected.background",
    },

    shadow: hslToHex('193.1 28.48% 77.19%'), // HSL(193.1 28.48% 77.19%) to #c3e4ff
    border: hslToHex('0 0% 81.96%'), // HSL(0 0% 81.96%) to #d0d0d0
    sideMenu: 'HSL(193.64 46.05% 74.04%)', // HSL(193.64 46.05% 74.04%) to #b3c9d1
    highlights: lightDefaultTheme.colors.highlights, // Assuming highlights is pre-defined
  },

  borderRadius: 8,// Convert 0.5rem to px if needed, 1rem = 16px
  fontFamily: "Helvetica Neue, sans-serif",
} satisfies Theme;




const darkTheme = {
  colors: {
    editor: {
      text: hslToHex('180 100% 98.63%'), // HSL(180 100% 98.63%) to #f7ffff
      background: hslToHex('211.36 88% 9.8%'), // HSL(211.36 88% 9.8%) to #09142a
    },
    menu: {
      text: hslToHex('193.04 74.19% 93.92%'), // HSL(193.04 74.19% 93.92%) to #e0f5ff
      background: hslToHex('206.8 100% 20.2%'), // HSL(206.8 100% 20.2%) to #003366
    },
    tooltip: {
      text: hslToHex('210 34.03% 80.17%'), // HSL(210 34.03% 80.17%) to #b4d1e4
      background: hslToHex('210.77 97.5% 15.69%'), // HSL(210.77 97.5% 15.69%) to #031f40
    },
    hovered: {
      text: hslToHex('210 34.03% 80.17%'), // HSL(210 34.03% 80.17%) to #b4d1e4
      background: hslToHex('210.77 97.5% 15.69%'), // HSL(210.77 97.5% 15.69%) to #031f40
    },
    selected: {
      text: hslToHex('203.64 100% 19.41%'), // HSL(203.64 100% 19.41%) to #004c8c
      background: hslToHex('197.8 45.27% 60.59%'), // HSL(197.8 45.27% 60.59%) to #66b3cc
    },
    disabled: {
      text: hslToHex('0 0% 93%'), // HSL(0 0% 93%) to #eeeeee
      background: hslToHex('195.65 69.7% 93.53%'), // HSL(195.65 69.7% 93.53%) to #e2f0ff
    },
    shadow: hslToHex('204.68 56.74% 66.21%'), // HSL(204.68 56.74% 66.21%) to #a0d1ff
    border: hslToHex('0 0% 93%'), // HSL(0 0% 93%) to #eeeeee
    sideMenu: hslToHex('206.8 60.22% 31.11%'), // HSL(206.8 60.22% 31.11%) to #4c6477
    highlights: lightDefaultTheme.colors.highlights, // Assuming highlights is pre-defined

  },
  borderRadius: 8, // Convert 0.5rem to px if needed, 1rem = 16px
  fontFamily: "Helvetica Neue, sans-serif",
} satisfies Theme;
// Our <Editor> component we can reuse later
export default function MantineEditor({ userId, note }: { userId?: string, note?: Note | null }) {

  const router = useParams();
  const { id } = router;
  const initBlocks: PartialBlock[] = [
    {
      type: "paragraph",
      content: "Welcome to this demo!",
    },
    {
      type: "heading",
      content: "This is a heading block",
    },
    {
      type: "paragraph",
      content: "This is a paragraph block",
    },
    {
      type: "paragraph",
    },
  ];
  //load content from db 
  const [content, setContent] = useState<PartialBlock[]>(note ? note.document as PartialBlock[] : initBlocks);
  const [title, SetTitle] = useState<string>(note ? note.title as string : '');
  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    initialContent: content,
  }
  );
  const theme = useTheme();
  const blockTheme = theme.theme === "dark" ? "dark" : "light";
  const myTheme = blockTheme === "dark" ? darkTheme : lightTheme;
  // Renders the editor instance using a React component.

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetTitle(e.target.value);
  }
  const handleSubmitNote = async () => {

    const noteInput = {
      title,
      document: editor.document,
      userId,
    }
    id !== 'create' ? await editNote(id as string, noteInput) :
      await createNote(noteInput);
  }
  return (
    <div className="flex flex-col gap-4 ">
      {/* <div className='flex flex-row justify-between items-center pb-4'>
        <p>
          {id}
          {sessionStorage.getItem('userId')}
        </p>

      </div> */}

      <div className="inline-flex gap-2 items-center justify-start">
        <Label className="text-primary font-bold" >Title : </Label>
        <Input className="flex flex-1" placeholder="Title" value={title} onChange={handleChangeTitle} />
        <Suspense fallback={<div>Loading...</div>}>
          <Button onClick={() => handleSubmitNote()} className="ml-auto " variant={'outline'}><Save /></Button>
        </Suspense>
      </div>

      <BlockNoteView onChange={() => setContent(editor.document)} editor={editor} theme={myTheme} />
    </div>
  );
}