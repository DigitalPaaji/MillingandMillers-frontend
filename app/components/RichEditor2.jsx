"use client";

import React, { useRef, useState, useEffect } from "react";

import { 
  FaBold, FaItalic, FaUnderline, FaStrikethrough,
  FaListUl, FaListOl, FaQuoteRight, FaCode,  FaUndo, FaRedo, FaParagraph
} from "react-icons/fa";

const RichEditor2 = ({ value = "", onChange }) => {
  const editorRef = useRef(null);
  const [history, setHistory] = useState([value]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // --- 1. HANDLE CONTENT CHANGES ---
  const handleInput = () => {
    if (!editorRef.current) return;
    const content = editorRef.current.innerHTML;
    
    // Only save if content changed
    if (content !== history[historyIndex]) {
      onChange?.(content);
      saveToHistory(content);
    }
  };


  const saveToHistory = (content) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(content);
    if (newHistory.length > 50) newHistory.shift(); 
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const prevValue = history[newIndex];
      editorRef.current.innerHTML = prevValue;
      onChange?.(prevValue);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      const nextValue = history[newIndex];
      editorRef.current.innerHTML = nextValue;
      onChange?.(nextValue);
    }
  };

  const execFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus(); 
    handleInput();
  };

  const handleToolbarButton = (e, command, value) => {
    e.preventDefault();
    execFormat(command, value);
  };

 

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
       if (document.activeElement !== editorRef.current) {
          editorRef.current.innerHTML = value;
       }
    }
  }, [value]);

  return (
    <div className="w-full border border-gray-300 rounded-lg bg-white shadow-sm flex flex-col">
      
      {/* --- TOOLBAR --- */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 bg-gray-50 rounded-t-lg sticky top-0 z-10">
        
        {/* Undo/Redo */}
        <div className="flex gap-1 mr-2 pr-2 border-r border-gray-300">
          <ToolbarButton 
            onClick={handleUndo} 
            disabled={historyIndex === 0} 
            icon={<FaUndo />} 
            title="Undo"
          />
          <ToolbarButton 
            onClick={handleRedo} 
            disabled={historyIndex === history.length - 1} 
            icon={<FaRedo />} 
            title="Redo"
          />
        </div>

        {/* Text Style */}
        <div className="flex gap-1 mr-2 pr-2 border-r border-gray-300">
          <ToolbarButton onMouseDown={(e) => handleToolbarButton(e, "bold")} icon={<FaBold />} title="Bold" />
          <ToolbarButton onMouseDown={(e) => handleToolbarButton(e, "italic")} icon={<FaItalic />} title="Italic" />
          <ToolbarButton onMouseDown={(e) => handleToolbarButton(e, "underline")} icon={<FaUnderline />} title="Underline" />
          <ToolbarButton onMouseDown={(e) => handleToolbarButton(e, "strikeThrough")} icon={<FaStrikethrough />} title="Strike" />
        </div>

        {/* Headings (Using Text + Icon mix for clarity) */}
        <div className="flex gap-1 mr-2 pr-2 border-r border-gray-300">
           <ToolbarButton onMouseDown={(e) => handleToolbarButton(e, "formatBlock", "P")} icon={<FaParagraph />} title="Paragraph" />
           {/* H1 and H2 often don't have perfect icons, so we use text labels inside the button */}
           <ToolbarButton 
             onMouseDown={(e) => handleToolbarButton(e, "formatBlock", "H1")} 
             label="H1"
             title="Heading 1" 
           />
           <ToolbarButton 
             onMouseDown={(e) => handleToolbarButton(e, "formatBlock", "H2")} 
             label="H2"
             title="Heading 2" 
           />
        </div>

        {/* Lists & Blocks */}
        <div className="flex gap-1 mr-2 pr-2 border-r border-gray-300">
          <ToolbarButton onMouseDown={(e) => handleToolbarButton(e, "insertUnorderedList")} icon={<FaListUl />} title="Bullet List" />
          <ToolbarButton onMouseDown={(e) => handleToolbarButton(e, "insertOrderedList")} icon={<FaListOl />} title="Numbered List" />
          <ToolbarButton onMouseDown={(e) => handleToolbarButton(e, "formatBlock", "blockquote")} icon={<FaQuoteRight />} title="Quote" />
          <ToolbarButton onMouseDown={(e) => handleToolbarButton(e, "formatBlock", "pre")} icon={<FaCode />} title="Code Block" />
        </div>

        {/* Media & Clear */}
        {/* <div className="flex gap-1">
          <ToolbarButton onMouseDown={handleLink} icon={<FaLink />} title="Link" />
          <ToolbarButton onMouseDown={handleImage} icon={<FaImage />} title="Image" />
          <ToolbarButton 
             onMouseDown={(e) => handleToolbarButton(e, "removeFormat")} 
             icon={<FaEraser />} 
             title="Clear Formatting" 
             className="text-red-500 hover:bg-red-50"
          />
        </div> */}
      </div>

      {/* --- EDITOR AREA --- */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="flex-1 p-4 min-h-[250px] outline-none prose prose-sm max-w-none focus:bg-white"
        style={{ whiteSpace: "pre-wrap" }}
      />
    </div>
  );
};

// Sub-component for buttons
const ToolbarButton = ({ icon, label, onClick, onMouseDown, disabled, title, className = "" }) => (
  <button
    type="button"
    onClick={onClick}
    onMouseDown={onMouseDown}
    disabled={disabled}
    title={title}
    className={`
      p-2 rounded text-gray-600 transition-colors flex items-center justify-center min-w-[32px] min-h-[32px]
      ${disabled ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-200 hover:text-black"}
      ${className}
    `}
  >
    {icon && <span className="text-sm">{icon}</span>}
    {label && <span className="text-xs font-bold ml-0.5">{label}</span>}
  </button>
);

export default RichEditor2;