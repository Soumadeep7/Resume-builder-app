import ContactInfo from "../ContactInfo";
const MinimalTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="max-w-4xl mx-auto bg-white text-gray-900 font-light shadow-lg">

            {/* Top Accent Bar */}
            <div className="h-2 w-full" style={{ backgroundColor: accentColor }}></div>

            <div className="p-8">

                {/* Header */}
                <header className="mb-6 flex flex-col items-center justify-center text-center">
                    <h1 className="text-4xl font-bold tracking-wide">
                        {data.personal_info?.full_name || "Your Name"}
                    </h1>

                    <div className="mt-2">
                       <ContactInfo personal_info={data.personal_info} />
                    </div>
                </header>

                {/* Professional Summary */}
                {data.professional_summary && (
                    <section className="mb-2">
                        <h2 className="text-sm uppercase tracking-widest font-semibold border-b pb-1 mb-1"
                            style={{ borderColor: accentColor }}>
                            Summary
                        </h2>

                        <p className="text-gray-700 leading-relaxed">
                            {data.professional_summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {data.experience?.length > 0 && (
                    <section className="mb-2">
                        <h2 className="text-sm uppercase tracking-widest font-semibold border-b pb-1 mb-1"
                            style={{ borderColor: accentColor }}>
                            Experience
                        </h2>

                        <div className="space-y-6">
                            {data.experience.map((exp, index) => (
                                <div key={index}>
                                    <div className="flex justify-between mb-1">
                                        <h3 className="font-semibold text-lg">{exp.position}</h3>

                                        <span className="text-sm text-gray-500">
                                            {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                        </span>
                                    </div>

                                    <p className="text-gray-600 mb-2">{exp.company}</p>

                                    {exp.description && (
                                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                            {exp.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {data.project?.length > 0 && (
                    <section className="mb-2">
                        <h2 className="text-sm uppercase tracking-widest font-semibold border-b pb-1 mb-2"
                            style={{ borderColor: accentColor }}>
                            Projects
                        </h2>

                        <div className="grid gap-4">
                            {data.project.map((proj, index) => (
                                <div key={index} className="border rounded-lg p-1.75 hover:shadow-md transition">

                                    <h3 className="font-semibold text-lg mb-1">
                                        {proj.name}
                                    </h3>

                                    <p className="text-gray-700">
                                        {proj.description}
                                    </p>

                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {data.education?.length > 0 && (
                    <section className="mb-3">
                        <h2 className="text-sm uppercase tracking-widest font-semibold border-b pb-2 mb-2"
                            style={{ borderColor: accentColor }}>
                            Education
                        </h2>

                        <div className="space-y-4">
                            {data.education.map((edu, index) => (
                                <div key={index} className="flex justify-between">
                                    <div>
                                        <h3 className="font-semibold">
                                            {edu.degree} {edu.field && `in ${edu.field}`}
                                        </h3>

                                        <p className="text-gray-600">{edu.institution}</p>

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
                    </section>
                )}

                {/* Skills */}
                {data.skills?.length > 0 && (
                    <section>
                        <h2 className="text-sm uppercase tracking-widest font-semibold border-b pb-1 mb-2"
                            style={{ borderColor: accentColor }}>
                            Skills
                        </h2>

                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 text-sm rounded-full bg-gray-100"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

            </div>
        </div>
    );
};

export default MinimalTemplate;