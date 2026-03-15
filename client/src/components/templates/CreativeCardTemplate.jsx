import ContactInfo from "../ContactInfo";

const CreativeCardTemplate = ({ data, accentColor }) => {

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="w-[794px] min-h-[1123px] mx-auto bg-gray-50 p-6">

      {/* Header Card */}
      <div
        className="p-3 rounded-xl text-white mb-2 break-inside-avoid"
        style={{ backgroundColor: accentColor }}
      >
        <h1 className="text-3xl font-bold">
          {data.personal_info?.full_name}
        </h1>

        <p>{data.personal_info?.profession}</p>
        <div className="mt-2"><ContactInfo personal_info={data.personal_info} /></div>
      </div>

      {/* Summary */}
      {data.professional_summary && (
        <div className="bg-white p-1 rounded-lg shadow mb-1 break-inside-avoid">
          <h2 className="font-semibold mb-2">Summary</h2>
          <p>{data.professional_summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <div className="bg-white p-1 rounded-lg shadow mb-1 break-inside-avoid">

          <h2
            className="font-semibold mb-2"
            style={{ color: accentColor }}
          >
            Professional Experience
          </h2>

          {data.experience.map((exp, i) => (
            <div key={i} className="mb-1.5">

              <div className="flex justify-between">

                <h3 className="font-semibold">
                  {exp.position} — {exp.company}
                </h3>

                <span className="text-sm text-gray-500">
                  {formatDate(exp.start_date)} -
                  {exp.is_current ? " Present" : formatDate(exp.end_date)}
                </span>

              </div>

              {exp.description &&
                exp.description.split("\n").map((line, idx) => (
                  <p key={idx} className="text-sm">• {line}</p>
                ))}

            </div>
          ))}

        </div>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <div className="bg-white p-1 rounded-lg shadow mb-1 break-inside-avoid">

          <h2
            className="font-semibold border-b pb-1 mb-1"
            style={{ color: accentColor }}
          >
            Education
          </h2>

          {data.education.map((edu, i) => (
            <div key={i} className="flex justify-between mb-1.5">

              <div>
                <h3 className="font-semibold">
                  {edu.degree} {edu.field && `in ${edu.field}`}
                </h3>

                <p className="text-gray-700">{edu.institution}</p>

                {edu.gpa && (
                  <p className="text-sm text-gray-500">
                    GPA: {edu.gpa}
                  </p>
                )}
              </div>

              <span className="text-sm text-gray-500">
                {formatDate(edu.graduation_date)}
              </span>

            </div>
          ))}

        </div>
      )}

      {/* Projects */}
      {data.project?.length > 0 && (
        <div className="bg-white p-1.5 rounded-lg shadow mb-1 break-inside-avoid">

          <h2
            className="font-semibold border-b pb-1 mb-1"
            style={{ color: accentColor }}
          >
            Projects
          </h2>

          {data.project.map((proj, i) => (
            <div key={i} className="mb-1">

              <h3 className="font-semibold">{proj.name}</h3>

              {proj.description && (
                <p className="text-sm text-gray-700">
                  {proj.description}
                </p>
              )}

            </div>
          ))}

        </div>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <div className="bg-white p-1 rounded-lg shadow mb-1 break-inside-avoid">

          <h2 className="font-semibold mb-1.5">Skills</h2>

          <div className="grid grid-cols-3 gap-2">
            {data.skills.map((skill, i) => (
              <div
                key={i}
                className="border p-1 rounded text-center"
              >
                {skill}
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};

export default CreativeCardTemplate;