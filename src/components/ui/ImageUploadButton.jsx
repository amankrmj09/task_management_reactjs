import React, { useState, useEffect } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

export const ImageUploadButton = ({ value, onChange, label = "Upload Image", onFileSelect, imageClass = "w-10 h-10" }) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (preview) URL.revokeObjectURL(preview);
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    if (onFileSelect) {
      onFileSelect(file);
    }
    
    onChange(`upload:${file.name}`);
    e.target.value = '';
  };

  // Determine what to display
  const isUploadPlaceholder = value && value.startsWith('upload:');
  const displayUrl = isUploadPlaceholder ? preview : value;

  return (
    <div className="flex items-center gap-3">
      {displayUrl ? (
        <div className={`relative group ${imageClass} rounded overflow-hidden border border-[var(--border-color)] flex-shrink-0`}>
          <img src={displayUrl} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gray-900/60 hidden group-hover:flex items-center justify-center">
             <label className="cursor-pointer text-white text-[10px] uppercase font-bold text-center w-full h-full flex items-center justify-center">
               Edit
               <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
             </label>
          </div>
        </div>
      ) : (
        <div className={`${imageClass} rounded border border-dashed border-[var(--border-color)] flex items-center justify-center flex-shrink-0 bg-[var(--bg-panel-hover)]`}>
          <ImageIcon size={16} className="text-[var(--text-muted)]" />
        </div>
      )}
      
      <label className="cursor-pointer flex items-center gap-2 text-xs font-semibold px-3 py-1.5 border border-[var(--border-color)] text-[var(--text-main)] rounded-lg hover:bg-[var(--bg-panel-hover)] transition-colors">
        <Upload size={14} />
        {value ? label.replace('Upload', 'Change') : label}
        <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
      </label>
    </div>
  );
};
