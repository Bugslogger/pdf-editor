import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import pdf from "./Design_Procedure_of_a_Topologically_Opti.pdf";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdDragIndicator } from "react-icons/md";
import { DndContext, useDroppable, useDndContext } from "@dnd-kit/core";
import Draggable from "./DraggableElement/Draggable";
import DroppeContainer from "./DraggableElement/DroppeContainer";

const PdfContainer = () => {
  const [pageNumber, setpageNumber] = useState(2);
  const [totalPages, settotalPages] = useState(null);
  const dndContext = useDndContext();
  const [newItems, setnewItems] = useState([]);
  const el = document.getElementById("droppable1");

  const fields = ["Text Input", "Image", "Date"];

  function onDoc({ numPages }) {
    settotalPages(numPages);
    console.log(Array(numPages));
  }
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }, []);

  const changePage = (param) => {
    if (param === "prev") {
      setpageNumber((prev) => prev - 1);
    }

    if (param === "next") {
      setpageNumber((prev) => prev + 1);
    }
  };

  function onDragEnd(e) {
    const newItem = e.active.data.current?.title;

    if (!newItem) {
      return;
    }
    if (e.over?.id === "droppable") 
      const temp = [...newItems];
      temp.push({
        id: e.active.id,
        content: newItem,
        position: {
          x: e.delta.x,
          y: e.delta.y,
        },
      });
      setnewItems(temp);
    }
    console.log("X: " + e.delta.x, "Y: " + e.delta.y);
    console.log("PG: ", pageNumber);
  }

  return (
    <div className=" w-full h-screen flex justify-start items-start overflow-hidden">
      <div className="border-r-2 border-gray-400 px-3 w-60 p-2 h-full">
        <div className="px-2 py-3 border-b-2 text-center font-semibold text-lg">
          Documents
        </div>
        <Document
          className={
            "flex flex-col justify-start items-center overflow-auto h-full"
          }
          file={pdf}
          onLoadSuccess={onDoc}
        >
          {Array(totalPages)
            .fill()
            .map((_, i) => (
              <div
                onClick={() => setpageNumber(i + 1)}
                className={`border-[4px] cursor-pointer relative rounded my-2 ${
                  pageNumber == i + 1 ? "border-gray-400" : "border-transparent"
                }`}
              >
                <Page height={180} pageNumber={i + 1}></Page>
                <div className="absolute bg-black/40 bottom-0 left-0 right-0 flex justify-center items-center text-white">
                  {i + 1}
                </div>
              </div>
            ))}
        </Document>
      </div>
      <div id="parent-container" className="w-full bg-slate-100 h-full">
        <div className="bg-white h-16 py-2 px-4 flex justify-between items-center">
          <div className="font-semibold text-lg">Document Name</div>
          <div className="flex justify-center items-center gap-1">
            <IoIosArrowBack
              className="cursor-pointer"
              onClick={() => changePage("prev")}
            />
            <div className="px-3 py-1 rounded">{pageNumber}</div>
            of
            <div className="px-3 py-1 rounded">{totalPages}</div>
            <IoIosArrowForward
              className="cursor-pointer"
              onClick={() => changePage("next")}
            />
          </div>
          <div>
            <button className="bg-black text-white px-6 cursor-pointer py-2 rounded">
              Download
            </button>
          </div>
        </div>
        <div className="w-full bg-slate-100 p-4 h-full overflow-auto flex justify-between items-start">
          <DndContext onDragEnd={onDragEnd}>
            <div className={"w-full relative justify-center items-start flex"}>
              <Document
                className={" h-full relative border-2"}
                file={pdf}
                onLoadSuccess={onDoc}
              >
                <Page pageNumber={pageNumber}>
                  <div
                    id="droppable1"
                   
                    className="absolute z-20 top-0 left-0 w-full h-full"
                  >
                    <DroppeContainer
                      className={"relative h-full"}
                      id={"droppable"}
                    >
                      {newItems.map((values, index) => (
                        <div
                          key={index}
                          style={{
                            position: "absolute",
                            // transform: `translate(${values.position.x}px,${values.position.y}px)`,
                            top: `${values.position.y}px`,
                            left: `${values.position.x}px`,
                            zIndex: "99px",
                          }}
                          className="bg-green-200/35 border border-green-400 flex justify-start items-center gap-1 p-2 rounded w-40 text-sm"
                        >
                          <span>{values.content}</span>
                        </div>
                      ))}
                    </DroppeContainer>
                  </div>
                </Page>
              </Document>
            </div>
            <div className="border w-60 gap-2 rounded  right-0 p-2 font-semibold flex justify-start flex-col items-center">
              {fields.map((values, index) => (
                <Draggable id={index} title={values} key={index}>
                  <div
                    onMouseEnter={(e) => {
                      console.log(e);
                    }}
                    className="bg-white flex justify-start items-center gap-1 p-2 rounded w-full text-sm"
                  >
                    <span className="cursor-move">
                      <MdDragIndicator />
                    </span>
                    <span>{values}</span>
                  </div>
                </Draggable>
              ))}
            </div>
          </DndContext>
        </div>
      </div>
    </div>
  );
};

export default PdfContainer;

// <div className="border w-60 gap-2 h-full rounded absolute right-0 p-2 font-semibold flex justify-start flex-col items-center">
//   {fields.map((values, index) => (
//     <Draggable id={index} title={values} key={index}>
//       <div className="bg-white flex justify-start items-center gap-1 p-2 rounded w-full text-sm">
//         <span className="cursor-move">
//           <MdDragIndicator />
//         </span>
//         <span>{values}</span>
//       </div>
//     </Draggable>
//   ))}
// </div>;
