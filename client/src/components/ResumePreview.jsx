import React from 'react'
import ClassicTemplate from './templates/ClassicTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'
import ModernTemplate from './templates/ModernTemplate'
import ModernSidebarTemplate from './templates/ModernSideBarTemplate'
import CorporateTemplate from './templates/CorporateTemplate'
import CreativeCardTemplate from './templates/CreativeCardTemplate'

const ResumePreview = ({data, template, accentColor, classes = ""}) => {

    const cleanedData = {
            ...data,
            experience: data?.experience?.filter(
            exp => exp.company || exp.position || exp.description
        ) || []
    };

    const renderTemplate = ()=>{
        switch (template) {
            case "modern":
                return <ModernTemplate data={cleanedData} accentColor={accentColor} />;
            
            case "minimal":
                return <MinimalTemplate data={cleanedData} accentColor={accentColor} />;
                
            case "minimal-image":
                return <MinimalImageTemplate data={cleanedData} accentColor={accentColor} />;

            case "modern-sidebar":
                return <ModernSidebarTemplate data={cleanedData} accentColor={accentColor} />

            case "corporate":
                return <CorporateTemplate data={cleanedData} accentColor={accentColor} />

            case "creative-card":
                return <CreativeCardTemplate data={cleanedData} accentColor={accentColor} />
        
            default:
                return <ClassicTemplate data={cleanedData} accentColor={accentColor} />;
        }
    }

  return (
    <div className='w-full bg-gray-100'>
        <div
  id="resume-preview"
  style={{ userSelect: "text" }}
  className={"border border-gray-200 mx-auto w-[794px] bg-white " + classes}
>
            {renderTemplate()}

        </div>

        <style >
            {`
            @page {
  size: A4;
  margin: 0;
}

@media print {

  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  body * {
    visibility: hidden;
  }

  #resume-preview,
  #resume-preview * {
    visibility: visible;
  }

  #resume-preview {
    position: absolute;
    left: 0;
    top: 0;
    width: 794px;
    height: auto;
    margin: 0;
    padding: 0;
    box-shadow: none !important;
    border: none !important;
  }

  .break-inside-avoid {
    break-inside: avoid;
    page-break-inside: avoid;
  }
}
            `}
        </style>

    </div>
  )
}

export default ResumePreview