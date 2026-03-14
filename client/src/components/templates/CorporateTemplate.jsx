import ContactInfo from "../ContactInfo";
const CorporateTemplate = ({ data, accentColor }) => {

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-10">

      {/* Header */}
      <header className="border-b pb-4 mb-6">

        <h1 className="text-3xl font-bold">
          {data.personal_info?.full_name}
        </h1>

        <p className="text-gray-600">
          {data.personal_info?.profession}
        </p>
        <div className="mt-2"><ContactInfo personal_info={data.personal_info} /></div>

      </header>

      {/* Summary */}
      {data.professional_summary && (
        <section className="mb-6">
          <h2
            className="font-semibold border-b pb-1 mb-2"
            style={{ color: accentColor }}
          >
            Professional Summary
          </h2>

          <p>{data.professional_summary}</p>
        </section>
      )}

      {/* Experience */}
      {/* Experience */}
          {data.experience?.length > 0 && (
            <section className="mb-6">

          <h2
            className="font-semibold border-b pb-1 mb-3"
            style={{ color: accentColor }}>
            Professional Experience
          </h2>

        {data.experience.map((exp, i) => (
            <div key={i} className="mb-5">

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

      </section>
    )}

      {/* Education */}
{data.education?.length > 0 && (
  <section className="mb-6">

    <h2
      className="font-semibold border-b pb-1 mb-3"
      style={{ color: accentColor }}
    >
      Education
    </h2>

    {data.education.map((edu, i) => (
      <div key={i} className="flex justify-between mb-3">

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

  </section>
)}

    {/* Projects */}
{data.project?.length > 0 && (
  <section className="mb-6">

    <h2
      className="font-semibold border-b pb-1 mb-3"
      style={{ color: accentColor }}
    >
      Projects
    </h2>

    {data.project.map((proj, i) => (
      <div key={i} className="mb-3">

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
            className="font-semibold border-b pb-1 mb-2"
            style={{ color: accentColor }}
          >
            Skills
          </h2>

          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 border rounded text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};

export default CorporateTemplate;