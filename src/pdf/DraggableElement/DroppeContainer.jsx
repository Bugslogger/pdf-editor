import React, { memo } from "react";
import { useDroppable } from "@dnd-kit/core";

const DroppeContainer = ({ id, children, className }) => {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div
      onDrop={(e) => {
        console.log("dropper: ", e);
      }}
      ref={setNodeRef}
      id={id}
      className={className}
    >
      {children}
    </div>
  );
};

export default memo(DroppeContainer);
