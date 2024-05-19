import { Tag } from "@/lib/types";
import React, { FC, useEffect } from "react";
import { Badge } from "./ui/badge";

type TagListProps = {
  tags: Tag[];
  handleClick: (tag: Tag) => void;
};

export const TagList: FC<TagListProps> = ({ tags, handleClick }) => {
  return (
    <div className="space-x-4">
      {tags.map((tag) => (
        <Badge
          variant="secondary"
          className="cursor-pointer"
          onClick={() => handleClick(tag)}
        >
          {tag.name}
        </Badge>
      ))}
    </div>
  );
};
