import { cn } from "@/lib/utils";

export const ColourDescription = ({
  colour,
  text,
}: {
  colour: string;
  text: string;
}) => {
  return (
    <div className="flex flex-row space-x-4 items-center mb-4">
      <div
        className={cn(`aspect-square w-16 border-2 border-solid rounded-md`)}
        style={{ background: `#${colour}` }}
      />
      <p>{text}</p>
    </div>
  );
};
