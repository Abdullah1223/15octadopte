// 'use client';
// import { useState, useRef } from 'react';
// import { Upload } from 'lucide-react';
// import { useTranslation } from "../Context/TranslationContext.";

// const Uploadfilecomponent = ({ title, acceptableformats, onFileChange, fileType }) => {
//     const { translate } = useTranslation();
//     const [fileName, setFileName] = useState('');
//     const [fileSize, setFileSize] = useState('');
//     const [isDragging, setIsDragging] = useState(false);
//     const fileInputRef = useRef(null);

//     const handleFileChange = (event) => {
//         const selectedFile = event.target.files[0];
//         if (selectedFile) {
//             processFile(selectedFile);
//         }
//     };

//     const processFile = (file) => {
//         // Format file size
//         // const sizeInKB = file.size / 1024;
//         // const formattedSize = sizeInKB < 1024 
//         //     ? `${sizeInKB.toFixed(2)} KB` 
//         //     : `${(sizeInKB / 1024).toFixed(2)} MB`;
        
//         setFileName(file.name);
//         setFileSize(file.size);

//         // Pass file data to parent component
//         onFileChange({
//             file,
//             fileName: file.name,
//             fileType: file.type,
//             fileSize: file.size,
//             rawSize: file.size
//         });
//     };

//     const handleDragOver = (e) => {
//         e.preventDefault();
//         setIsDragging(true);
//     };

//     const handleDragLeave = () => {
//         setIsDragging(false);
//     };

//     const handleDrop = (e) => {
//         e.preventDefault();
//         setIsDragging(false);
        
//         if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
//             const droppedFile = e.dataTransfer.files[0];
//             processFile(droppedFile);
//         }
//     };

//     const handleChooseFile = () => {
//         fileInputRef.current.click();
//     };

//     return(
//         <>
//             <h1 className="font-bold text-black mt-3">{title}</h1>
//             <p className="mt-0 text-sm text-gray-400">
//                 {translate('acceptable_format_pdf')} {acceptableformats}
//             </p>
//             <div className="flex flex-col w-[17rem] sm:w-full lg:w-[21.5rem] xl:w-[25rem]">
//                 <div 
//                     className={`flex items-center justify-center border h-16 border-gray-400 border-dashed flex-col w-full
//                     ${isDragging ? 'bg-[#fff5e6] border-[#ff7300]' : ''} 
//                     transition-colors duration-200 cursor-pointer`}
//                     onDragOver={handleDragOver}
//                     onDragLeave={handleDragLeave}
//                     onDrop={handleDrop}
//                     onClick={handleChooseFile}
//                 >
//                     {fileName ? (
//                         <div className="flex flex-col items-center">
//                             <p className="text-[#ff7300] font-medium truncate max-w-[90%]">{fileName}</p>
//                             <p className="text-gray-500 text-xs">{fileSize}</p>
//                         </div>
//                     ) : (
//                         <div className="flex items-center gap-2">
//                             <Upload size={18} className="text-[#ff7300]" />
//                             <div className="flex gap-1"> 
//                                 <h1 className="font-bold hover:underline cursor-pointer text-[#ff7300]">{translate('choose_file')}</h1>
//                                 <h1 className="text-[black]">{translate('or_drop_here')}</h1>
//                             </div>
//                         </div>
//                     )}
//                 </div>
                
//                 <input 
//                     type="file" 
//                     ref={fileInputRef}
//                     onChange={handleFileChange}
//                     className="hidden"
//                     accept={acceptableformats.toLowerCase().split(' ').map(format => `.${format}`).join(',')}
//                 />
                
//                 {fileName && (
//                     <div className="mt-2 flex justify-between items-center">
//                         <button 
//                             onClick={(e) => {
//                                 e.stopPropagation();
//                                 setFileName('');
//                                 setFileSize('');
//                                 onFileChange(null);
//                                 fileInputRef.current.value = '';
//                             }}
//                             className="text-sm text-red-500 hover:text-red-700"
//                         >
//                             {translate('remove')}
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// };

// export default Uploadfilecomponent;


'use client';
import { useState, useRef } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { useTranslation } from "../Context/TranslationContext.";

const Uploadfilecomponent = ({ title, acceptableformats, onFileChange, fileType, hasError }) => {
    const { translate } = useTranslation();
    const [fileName, setFileName] = useState('');
    const [fileSize, setFileSize] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [fileError, setFileError] = useState('');
    const fileInputRef = useRef(null);

    // const formatFileSize = (sizeInBytes) => {
    //     if (sizeInBytes < 1024) {
    //         return `${sizeInBytes} B`;
    //     } else if (sizeInBytes < 1024 * 1024) {
    //         return `${(sizeInBytes / 1024).toFixed(2)} KB`;
    //     } else {
    //         return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
    //     }
    // };

    const validateFile = (file) => {
        // Validate file type
        const acceptedTypes = acceptableformats.toLowerCase().split(' ');
        const fileExtension = file.name.split('.').pop().toLowerCase();
        
        if (!acceptedTypes.includes(fileExtension)) {
            return translate('invalid_file_format');
        }
        
        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            return translate('file_too_large');
        }
        
        return null;
    };

    const processFile = (file) => {
        const error = validateFile(file);
        
        if (error) {
            setFileError(error);
            return;
        }
        
        setFileError('');
        setFileName(file.name);
        setFileSize(file.size);

        // Pass file data to parent component
        onFileChange({
            file,
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size,
            rawSize: file.size
        });
    };
    
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            processFile(selectedFile);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const droppedFile = e.dataTransfer.files[0];
            processFile(droppedFile);
        }
    };

    const handleChooseFile = () => {
        fileInputRef.current.click();
    };

    const handleRemoveFile = (e) => {
        e.stopPropagation();
        setFileName('');
        setFileSize('');
        setFileError('');
        onFileChange(null);
        fileInputRef.current.value = '';
    };

    return(
        <>
            <h1 className="font-bold text-black mt-3">{title}</h1>
            <p className="mt-0 text-sm text-gray-400">
                {translate('acceptable_format_pdf')} {acceptableformats}
            </p>
            <div className="flex flex-col w-[17rem] sm:w-full lg:w-[21.5rem] xl:w-[25rem]">
                <div 
                    className={`flex items-center justify-center border h-16 border-dashed flex-col w-full
                    ${isDragging ? 'bg-[#fff5e6] border-[#ff7300]' : hasError ? 'border-red-500' : 'border-gray-400'} 
                    transition-colors duration-200 cursor-pointer relative`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleChooseFile}
                    role="button"
                    tabIndex={0}
                    aria-label={translate('choose_file')}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleChooseFile();
                        }
                    }}
                >
                    {fileName ? (
                        <div className="flex flex-col items-center">
                            <p className="text-[#ff7300] font-medium truncate max-w-[90%]">{fileName}</p>
                            <p className="text-gray-500 text-xs">{fileSize}</p>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Upload size={18} className="text-[#ff7300]" />
                            <div className="flex gap-1 flex-wrap justify-center"> 
                                <h1 className="font-bold hover:underline cursor-pointer text-[#ff7300]">{translate('choose_file')}</h1>
                                <h1 className="text-[black]">{translate('or_drop_here')}</h1>
                            </div>
                        </div>
                    )}
                </div>
                
                <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept={acceptableformats.toLowerCase().split(' ').map(format => `.${format}`).join(',')}
                    aria-hidden="true"
                />
                
                <div className="mt-2 flex justify-between items-center">
                    {fileError && (
                        <div className="flex items-center text-red-500 text-xs">
                            <AlertCircle size={12} className="mr-1" />
                            <span>{fileError}</span>
                        </div>
                    )}
                    {hasError && !fileError && (
                        <div className="flex items-center text-red-500 text-xs">
                            <AlertCircle size={12} className="mr-1" />
                            <span>{translate('file_required')}</span>
                        </div>
                    )}
                    {fileName && (
                        <button 
                            onClick={handleRemoveFile}
                            className="text-sm text-red-500 hover:text-red-700 ml-auto"
                            aria-label={translate('remove_file')}
                        >
                            {translate('remove')}
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default Uploadfilecomponent;