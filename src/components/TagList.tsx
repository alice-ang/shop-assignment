import { Tag } from "@/lib/types";
import React, { FC } from "react";
import { Badge } from "./ui/badge";
import Link from "next/link";

type TagListProps = {
  tags: Tag[];
  handleClick: (tag: Tag) => void;
  activeTag?: string | null;
};

export const TagList: FC<TagListProps> = ({ tags, handleClick, activeTag }) => {
  return (
    <div className="space-x-4">
      {tags.map((tag) => (
        <Badge
          variant={activeTag === tag.id.toString() ? "default" : "secondary"}
          className="cursor-pointer"
          onClick={() => handleClick(tag)}
          key={tag.id}
        >
          {tag.name}
        </Badge>
      ))}
      {activeTag && (
        <Link href={"/"}>
          <Badge variant="destructive" className="cursor-pointer">
            Rensa filter
          </Badge>
        </Link>
      )}
    </div>
  );
};
