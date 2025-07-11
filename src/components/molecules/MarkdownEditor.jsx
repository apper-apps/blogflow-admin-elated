import { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Textarea from "@/components/atoms/Textarea";

const MarkdownEditor = ({ value, onChange, placeholder = "Write your blog content..." }) => {
  const [activeTab, setActiveTab] = useState("edit");

  const handleToolbarAction = (action) => {
    const textarea = document.getElementById("markdown-textarea");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    let newText = value;
    let newCursorPos = start;

    switch (action) {
      case "bold":
        newText = value.substring(0, start) + `**${selectedText || "bold text"}**` + value.substring(end);
        newCursorPos = start + (selectedText ? 2 : 10);
        break;
      case "italic":
        newText = value.substring(0, start) + `*${selectedText || "italic text"}*` + value.substring(end);
        newCursorPos = start + (selectedText ? 1 : 12);
        break;
      case "heading":
        newText = value.substring(0, start) + `## ${selectedText || "Heading"}` + value.substring(end);
        newCursorPos = start + (selectedText ? 3 : 10);
        break;
      case "link":
        newText = value.substring(0, start) + `[${selectedText || "link text"}](url)` + value.substring(end);
        newCursorPos = start + (selectedText ? selectedText.length + 3 : 15);
        break;
      case "list":
        newText = value.substring(0, start) + `- ${selectedText || "list item"}` + value.substring(end);
        newCursorPos = start + (selectedText ? 2 : 12);
        break;
      case "quote":
        newText = value.substring(0, start) + `> ${selectedText || "quote"}` + value.substring(end);
        newCursorPos = start + (selectedText ? 2 : 8);
        break;
      default:
        break;
    }

    onChange({ target: { value: newText } });
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const renderPreview = () => {
    let html = value
      .replace(/^### (.*$)/gm, "<h3>$1</h3>")
      .replace(/^## (.*$)/gm, "<h2>$1</h2>")
      .replace(/^# (.*$)/gm, "<h1>$1</h1>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/^- (.*$)/gm, "<li>$1</li>")
      .replace(/^> (.*$)/gm, "<blockquote>$1</blockquote>")
      .replace(/\n\n/g, "</p><p>")
      .replace(/\n/g, "<br>");

    if (html.includes("<li>")) {
      html = html.replace(/(<li>.*?<\/li>)/gs, "<ul>$1</ul>");
    }

    if (!html.startsWith("<h") && !html.startsWith("<ul") && !html.startsWith("<blockquote")) {
      html = "<p>" + html + "</p>";
    }

    return { __html: html };
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleToolbarAction("bold")}
              title="Bold"
            >
              <ApperIcon name="Bold" size={16} />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleToolbarAction("italic")}
              title="Italic"
            >
              <ApperIcon name="Italic" size={16} />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleToolbarAction("heading")}
              title="Heading"
            >
              <ApperIcon name="Heading" size={16} />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleToolbarAction("link")}
              title="Link"
            >
              <ApperIcon name="Link" size={16} />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleToolbarAction("list")}
              title="List"
            >
              <ApperIcon name="List" size={16} />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleToolbarAction("quote")}
              title="Quote"
            >
              <ApperIcon name="Quote" size={16} />
            </Button>
          </div>
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant={activeTab === "edit" ? "primary" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("edit")}
            >
              <ApperIcon name="Edit" size={16} />
              Edit
            </Button>
            <Button
              type="button"
              variant={activeTab === "preview" ? "primary" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("preview")}
            >
              <ApperIcon name="Eye" size={16} />
              Preview
            </Button>
          </div>
        </div>
      </div>
      
      <div className="min-h-[400px]">
        {activeTab === "edit" ? (
          <Textarea
            id="markdown-textarea"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="border-0 rounded-none resize-none markdown-editor"
            style={{ minHeight: "400px" }}
          />
        ) : (
          <div
            className="p-4 markdown-preview"
            dangerouslySetInnerHTML={renderPreview()}
          />
        )}
      </div>
    </div>
  );
};

export default MarkdownEditor;