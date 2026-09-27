import React, { useState } from 'react';
import { X, Download, FileText, Check, ArrowRight, Share2, BookOpen } from 'lucide-react';
import { Publication } from '../data/pulsewireData';
import { getHighResImageUrl, getResponsiveSrcSet } from '../utils/imageOptimizer';

interface PublicationModalProps {
  publication: Publication | null;
  onClose: () => void;
}

export const PublicationModal: React.FC<PublicationModalProps> = ({
  publication,
  onClose
}) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!publication) return null;

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-sm flex justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="bg-white text-neutral-900 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-auto border border-neutral-200 flex flex-col relative max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="border-b border-neutral-200 px-6 py-4 flex items-center justify-between bg-neutral-50/70">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded bg-neutral-900 text-white font-mono-data text-[10px] font-bold uppercase tracking-wider">
              {publication.category}
            </span>
            <span className="text-xs text-neutral-500 font-mono-data">
              {publication.edition}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Cover Column */}
            <div className="space-y-3">
              <div className="aspect-3/4 rounded-xl overflow-hidden shadow-lg border border-neutral-200 relative bg-neutral-900">
                <img
                  src={getHighResImageUrl(publication.coverImage, 1600, 90)}
                  srcSet={getResponsiveSrcSet(publication.coverImage, [600, 1000, 1600])}
                  sizes="(max-width: 768px) 100vw, 400px"
                  alt={publication.title}
                  className="w-full h-full object-cover"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                  <span className="text-[10px] font-mono-data font-bold text-cyan-400">PULSEWIRE INTELLIGENCE</span>
                  <p className="text-xs font-bold leading-tight">{publication.title}</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-neutral-600 bg-neutral-50 p-3 rounded-lg border border-neutral-200 font-mono-data">
                <div className="flex justify-between">
                  <span>Pagination:</span>
                  <strong className="text-neutral-900">{publication.pages} pages</strong>
                </div>
                <div className="flex justify-between">
                  <span>Released:</span>
                  <strong className="text-neutral-900">{publication.releaseDate}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Format:</span>
                  <strong className="text-neutral-900">Open PDF / Interactive Data</strong>
                </div>
                <div className="flex justify-between">
                  <span>Circulation:</span>
                  <strong className="text-cyan-700">{publication.downloadCount} reads</strong>
                </div>
              </div>
            </div>

            {/* Details Column */}
            <div className="md:col-span-2 space-y-5">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-neutral-950">
                  {publication.title}
                </h2>
                <p className="text-xs text-neutral-500 mt-1 font-mono-data">
                  Published by Pulsewire Data Commons & Strategic Studies Desk
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono-data mb-1.5">
                  Executive Abstract
                </h4>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  {publication.summary}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono-data mb-2">
                  Key Methodological Highlights
                </h4>
                <div className="space-y-2">
                  {publication.highlights.map((h, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-neutral-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 mt-1.5 shrink-0"></span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="flex-1 py-3 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow"
                >
                  {downloading ? (
                    <span>Compiling Report PDF...</span>
                  ) : downloadSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Download Initiated!</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-cyan-400" />
                      <span>Download Full Monograph (PDF)</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => alert(`Citation: Pulsewire Media and Development Foundation (2026). "${publication.title}", Vol. 14, DOI: 10.1080/pulsewire.2026.09.`)}
                  className="px-4 py-3 rounded-xl border border-neutral-300 hover:bg-neutral-50 text-neutral-700 text-xs font-semibold flex items-center justify-center space-x-1 transition-colors"
                >
                  <span>Cite Report</span>
                </button>
              </div>

              <p className="text-[11px] text-neutral-400">
                Licensed under Creative Commons BY-NC 4.0. Free for policy research, academic citation, and sovereign civil service deployment.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
