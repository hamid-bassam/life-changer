

import dynamic from "next/dynamic";

const MantineEditor = dynamic(() => import("@/features/blocknote/MantineEditor"), { ssr: false });
export default function Note() {
  return (

    <div className='flex-1 min-h-full bg-transparent nowheel nodrag  ' style={{ overflow: 'auto' }}>
      <MantineEditor />
    </div>
  );
}