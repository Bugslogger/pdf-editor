import React, { useEffect } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useDraggable } from "@dnd-kit/core";

const Draggable = ({ children, id, title, style }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { title },
  });

  const styles = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      id="container"
      className="w-full"
      style={{ ...style, ...styles }}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
};

export default Draggable;
