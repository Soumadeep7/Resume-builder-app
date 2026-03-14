import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";
import ContactInfo
 from "../ContactInfo";
const ModernSidebarTemplate = ({ data, accentColor }) => {

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow grid grid-cols-3">

      {/* Sidebar */}
      <aside
        className="col-span-1 text-white p-6"
        style={{ backgroundColor: accentColor }}
        
      >
        <h1 className="text-2xl font-bold mb-2" >
          {data.personal_info?.full_name}
        </h1>

        <p className="text-sm mb-6">
          {data.personal_info?.profession}
        </p>
      
        {/* Contact */}
        <div className="space-y-2 text-sm">
          <div className="flex gap-2 items-center" >
            <Phone size={14} />
            {data.personal_info?.phone}
          </div>

          <div className="flex gap-2 items-center">
            <Mail size={14} />
            {data.personal_info?.email}
          </div>

          <div className="flex gap-2 items-center">
            <MapPin size={14} />
            {data.personal_info?.location}
          </div>
        </div>

  <div className="space-y-2 mt-2">

  {data.personal_info?.linkedin && (
    <div className="flex items-center gap-2">
      <Linkedin size={16} />
      <a
        href={
          data.personal_info.linkedin.startsWith("http")
            ? data.personal_info.linkedin
            : `https://${data.personal_info.linkedin}`
        }
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        LinkedIn
      </a>
    </div>
  )}

  {data.personal_info?.website && (
    <div className="flex items-center gap-2">
      <Globe size={16} />
      <a
        href={
          data.personal_info.website.startsWith("http")
            ? data.personal_info.website
            : `https://${data.personal_info.website}`
        }
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        Portfolio
      </a>
    </div>
  )}

</div>
        {/* Skills */}
        {data.skills?.length > 0 && (
          <div className="mt-8">
            <h2 className="font-semibold mb-2">Skills</h2>
            <ul className="space-y-1 text-sm">
              {data.skills.map((skill, i) => (
                <li key={i}>• {skill}</li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      {/* Content */}
      <main className="col-span-2 p-8">

        {/* Summary */}
        {data.professional_summary && (
          <section className="mb-4">
            <h2 className="font-bold text-lg mb-2">Summary</h2>
            <p>{data.professional_summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <section className="mb-4">
            <h2 className="font-bold text-lg mb-3">Experience</h2>

            {data.experience.map((exp, i) => (
              <div key={i} className="mb-2">

                <div className="flex justify-between">
                  <h3 className="font-semibold">{exp.position}</h3>

                  <span className="text-sm text-gray-500">
                    {formatDate(exp.start_date)} -
                    {exp.is_current ? " Present" : formatDate(exp.end_date)}
                  </span>
                </div>

                <p style={{ color: accentColor }}>{exp.company}</p>

                {exp.description &&
                  exp.description.split("\n").map((line, index) => (
                    <p key={index} className="text-sm">• {line}</p>
                  ))}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <section>
            <h2 className="font-bold text-lg mb-3">Education</h2>

            {data.education.map((edu, i) => (
              <div key={i} className="mb-3">
                <p className="font-semibold">{edu.degree}</p>
                <p>{edu.institution}</p>
                <p className="text-sm text-gray-500">
                  {formatDate(edu.graduation_date)}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {data.project?.length > 0 && (
          <section className="mb-4">

          <h2
            className="font-semibold border-b pb-1 mb-3"
            style={{ color: accentColor }}
          >
          Projects
        </h2>

          {data.project.map((proj, i) => (
              <div key={i} className="mb-2">

              <h3 className="font-semibold">{proj.name}</h3>

                {proj.description && (
                <p className="text-sm text-gray-700">
                {proj.description}
                </p>
            )}

          </div>
        ))}
        </section>
      )}
        {/* Skills */}
        {data.skills?.length > 0 && (
          <section>

        <h2
          className="font-semibold border-b pb-1 mb-3"
          style={{ color: accentColor }}>Skills</h2>

        <div className="flex flex-wrap gap-2">

        {data.skills.map((skill, i) => (
          <span
            key={i}
            className="px-3 py-1 border rounded text-sm">
              {skill}
              </span>
            ))}

          </div>

        </section>
      )}

      </main>
    </div>
  );
};

export default ModernSidebarTemplate;