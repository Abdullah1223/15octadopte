import { AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { ReactNode, SetStateAction } from "react";

interface EditModalCandidateInterface{
    isOpen:boolean,
    onClose:()=>void,
    title:string,
    children:ReactNode
}
export const EditModalCandidate = ({ isOpen, onClose, title, children }:EditModalCandidateInterface) => (
  <AnimatePresence>
    {isOpen && (
      <div
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        // exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <div
          // initial={{ scale: 0.9, opacity: 0 }}
          // animate={{ scale: 1, opacity: 1 }}
          // exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {children}
        </div>
      </div>
    )}
  </AnimatePresence>
);
