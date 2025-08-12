
"use client";

import { useState, useCallback, ChangeEvent, DragEvent } from "react";
import {
  Upload,
  File,
  Code2,
  FileText,
  Trash2,
  CheckCircle,
  AlertCircle,
  Loader2,
  Download,
} from "lucide-react";
import * as mammoth from "mammoth";

// ----------------------
// Types
// ----------------------
type FileType = "code" | "document" | "data" | "unknown";
type Complexity = "Low" | "Medium" | "High";

interface FileTypeInfo {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  type: FileType;
  lang: string;
}

interface FileAnalysis {
  totalLines: number;
  codeLines: number;
  functions: number;
  comments: number;
  complexity: Complexity;
}

interface UploadedFile {
  id: number;
  file: File;
  name: string;
  size: number;
  type: FileType;
  language: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  content: string;
  analysis?: FileAnalysis | null;
  status: "processed";
}

// ----------------------
// File Types Map
// ----------------------
const fileTypes: Record<string, FileTypeInfo> = {
  ".js": { icon: Code2, color: "text-yellow-500", type: "code", lang: "JavaScript" },
  ".jsx": { icon: Code2, color: "text-blue-500", type: "code", lang: "React JSX" },
  ".ts": { icon: Code2, color: "text-blue-600", type: "code", lang: "TypeScript" },
  ".tsx": { icon: Code2, color: "text-blue-600", type: "code", lang: "React TSX" },
  ".py": { icon: Code2, color: "text-green-500", type: "code", lang: "Python" },
  ".java": { icon: Code2, color: "text-orange-500", type: "code", lang: "Java" },
  ".cpp": { icon: Code2, color: "text-purple-500", type: "code", lang: "C++" },
  ".c": { icon: Code2, color: "text-purple-400", type: "code", lang: "C" },
  ".cs": { icon: Code2, color: "text-purple-600", type: "code", lang: "C#" },
  ".php": { icon: Code2, color: "text-indigo-500", type: "code", lang: "PHP" },
  ".rb": { icon: Code2, color: "text-red-500", type: "code", lang: "Ruby" },
  ".go": { icon: Code2, color: "text-cyan-500", type: "code", lang: "Go" },
  ".rs": { icon: Code2, color: "text-orange-600", type: "code", lang: "Rust" },
  ".kt": { icon: Code2, color: "text-purple-500", type: "code", lang: "Kotlin" },
  ".swift": { icon: Code2, color: "text-orange-500", type: "code", lang: "Swift" },
  ".html": { icon: Code2, color: "text-orange-400", type: "code", lang: "HTML" },
  ".css": { icon: Code2, color: "text-blue-400", type: "code", lang: "CSS" },
  ".scss": { icon: Code2, color: "text-pink-400", type: "code", lang: "SCSS" },
  ".sql": { icon: Code2, color: "text-teal-500", type: "code", lang: "SQL" },
  ".txt": { icon: FileText, color: "text-gray-500", type: "document", lang: "Text" },
  ".md": { icon: FileText, color: "text-blue-400", type: "document", lang: "Markdown" },
  ".pdf": { icon: FileText, color: "text-red-500", type: "document", lang: "PDF" },
  ".doc": { icon: FileText, color: "text-blue-600", type: "document", lang: "Word Doc" },
  ".docx": { icon: FileText, color: "text-blue-600", type: "document", lang: "Word Doc" },
  ".json": { icon: Code2, color: "text-yellow-400", type: "data", lang: "JSON" },
  ".xml": { icon: Code2, color: "text-orange-400", type: "data", lang: "XML" },
  ".yaml": { icon: Code2, color: "text-purple-400", type: "data", lang: "YAML" },
  ".yml": { icon: Code2, color: "text-purple-400", type: "data", lang: "YAML" },
};

// ----------------------
// Helper Functions
// ----------------------
const getFileInfo = (fileName: string): FileTypeInfo =>
  fileTypes[fileName.slice(fileName.lastIndexOf(".")).toLowerCase()] || {
    icon: File,
    color: "text-gray-400",
    type: "unknown",
    lang: "Unknown",
  };

const analyzeCode = (content: string): FileAnalysis => {
  const lines = content.split("\n");
  const nonEmptyLines = lines.filter((line) => line.trim().length > 0);

  const complexityPatterns = [
    /for\s*\(/g,
    /while\s*\(/g,
    /if\s*\(/g,
    /switch\s*\(/g,
    /catch\s*\(/g,
    /try\s*{/g,
    /else\s*{/g,
  ];
  const totalComplexity = complexityPatterns.reduce(
    (acc, pattern) => acc + (content.match(pattern) || []).length,
    0
  );

  let complexity: Complexity = "Low";
  if (totalComplexity > 20) complexity = "High";
  else if (totalComplexity > 10) complexity = "Medium";

  return {
    totalLines: lines.length,
    codeLines: nonEmptyLines.length,
    functions:
      (content.match(/function\s+\w+|def\s+\w+|class\s+\w+|public\s+\w+\s+\w+\(/g) || []).length,
    comments: (content.match(/\/\/|\/\*|\*\/|#|<!--|-->/g) || []).length,
    complexity,
  };
};

const parseFile = async (file: File): Promise<string> => {
  const extension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();

  if ([".txt", ".js", ".jsx", ".ts", ".tsx", ".py", ".java", ".cpp", ".c", ".cs", ".php", ".rb", ".go", ".rs", ".kt", ".swift", ".html", ".css", ".scss", ".sql", ".md", ".json", ".xml", ".yaml", ".yml"].includes(extension)) {
    return await file.text();
  }

  if (extension === ".pdf") {
    return `[PDF Content - ${file.name}]\nPDF parsing requires additional setup. File size: ${(file.size / 1024).toFixed(2)} KB`;
  }

  if (extension === ".doc" || extension === ".docx") {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      return result.value;
    } catch (error) {
      return `[Document Content - ${file.name}]\nError parsing document.`;
    }
  }

  return `[Binary File - ${file.name}]\nFile type not supported for content extraction.`;
};

// ----------------------
// Component
// ----------------------
export default function CodeUploader() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFiles = async (fileList: File[]) => {
    setIsProcessing(true);
    const newFiles: UploadedFile[] = [];

    for (const file of fileList) {
      const fileInfo = getFileInfo(file.name);
      const content = await parseFile(file);
      const analysis = fileInfo.type === "code" ? analyzeCode(content) : null;

      newFiles.push({
        id: Date.now() + Math.random(),
        file,
        name: file.name,
        size: file.size,
        type: fileInfo.type,
        language: fileInfo.lang,
        icon: fileInfo.icon,
        color: fileInfo.color,
        content,
        analysis,
        status: "processed",
      });
    }

    setFiles((prev) => [...prev, ...newFiles]);
    setIsProcessing(false);
  };

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(Array.from(e.dataTransfer.files));
  }, []);

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
      e.target.value = "";
    }
  };

  const removeFile = (id: number) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const downloadAnalysis = (file: UploadedFile) => {
    const analysisText = `
File Analysis Report
===================
File: ${file.name}
Type: ${file.language}
Size: ${(file.size / 1024).toFixed(2)} KB
${file.analysis ? `
Code Analysis:
- Total Lines: ${file.analysis.totalLines}
- Code Lines: ${file.analysis.codeLines}
- Functions/Classes: ${file.analysis.functions}
- Comments: ${file.analysis.comments}
- Complexity: ${file.analysis.complexity}
` : ""}
Content Preview:
${file.content.substring(0, 1000)}${file.content.length > 1000 ? "..." : ""}
    `.trim();

    const blob = new Blob([analysisText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file.name}_analysis.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (

    <div className="w-auto mx-auto p-6 bg-slate-900 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Code Upload & Analysis</h1>
        <p className="text-gray-400">Upload your code files, documents, and PDFs for instant analysis</p>
      </div>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${isDragging
            ? 'border-blue-500 bg-blue-500/10'
            : 'border-gray-600 hover:border-gray-500'
          }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">
          {isDragging ? 'Drop your files here' : 'Drag & Drop Files'}
        </h3>
        <p className="text-gray-400 mb-6">
          Support for 20+ programming languages, documents, and PDFs
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <label className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg cursor-pointer hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>Choose Files</span>
            <input
              type="file"
              multiple
              accept=".js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.cs,.php,.rb,.go,.rs,.kt,.swift,.html,.css,.scss,.sql,.txt,.md,.pdf,.doc,.docx,.json,.xml,.yaml,.yml"
              onChange={handleFileInput}
              className="hidden"
            />
          </label>
          <span className="text-gray-500">or drag and drop</span>
        </div>
      </div>

      {/* Processing Indicator */}
      {isProcessing && (
        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center space-x-3">
          <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
          <span className="text-blue-400">Processing files...</span>
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Uploaded Files ({files.length})</h2>
            <button
              onClick={() => setFiles([])}
              className="text-red-400 hover:text-red-300 transition-colors flex items-center space-x-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All</span>
            </button>
          </div>

          <div className="grid gap-6">
            {files.map((file) => (
              <div key={file.id} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 bg-slate-700 rounded-lg ${file.color}`}>
                      <file.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{file.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>{file.language}</span>
                        <span>•</span>
                        <span>{(file.size / 1024).toFixed(2)} KB</span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span>Processed</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => downloadAnalysis(file)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                      title="Download Analysis"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="p-2 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Analysis Results for Code Files */}
                {file.analysis && (
                  <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
                    <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4" />
                      <span>Code Analysis</span>
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">{file.analysis.totalLines}</div>
                        <div className="text-xs text-gray-400">Total Lines</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">{file.analysis.codeLines}</div>
                        <div className="text-xs text-gray-400">Code Lines</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">{file.analysis.functions}</div>
                        <div className="text-xs text-gray-400">Functions</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-400">{file.analysis.comments}</div>
                        <div className="text-xs text-gray-400">Comments</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${file.analysis.complexity === 'Low' ? 'text-green-400' :
                            file.analysis.complexity === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                          {file.analysis.complexity}
                        </div>
                        <div className="text-xs text-gray-400">Complexity</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Content Preview */}
                <div className="bg-slate-900 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-semibold">Content Preview</h4>
                    <span className="text-xs text-gray-400">
                      {file.content.length} characters
                    </span>
                  </div>
                  <div className="bg-black rounded p-3 overflow-x-auto">
                    <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                      {file.content.substring(0, 500)}
                      {file.content.length > 500 && (
                        <span className="text-gray-500">
                          ...
                          <br />
                          <small>[Content truncated. Full content available in download]</small>
                        </span>
                      )}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Supported File Types */}
      <div className="mt-12 p-6 bg-slate-800 rounded-lg border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Supported File Types</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 text-sm">
          {Object.entries(fileTypes).map(([ext, info]) => (
            <div key={ext} className="flex items-center space-x-2 text-gray-300">
              <info.icon className={`w-4 h-4 ${info.color}`} />
              <span>{ext}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}






