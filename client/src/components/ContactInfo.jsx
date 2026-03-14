import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ContactInfo = ({ personal_info }) => {

    const formatLink = (url) => {
        if (!url) return "";
        return url.startsWith("http") ? url : `https://${url}`;
    };

    return (
        <div className="flex flex-wrap gap-6 text-sm text-gray-600">

            {personal_info?.email && (
                <div className="flex items-center gap-1">
                    <Mail size={14} />
                    <span>{personal_info.email}</span>
                </div>
            )}

            {personal_info?.phone && (
                <div className="flex items-center gap-1">
                    <Phone size={14} />
                    <span>{personal_info.phone}</span>
                </div>
            )}

            {personal_info?.location && (
                <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>{personal_info.location}</span>
                </div>
            )}

            {personal_info?.linkedin && (
                <a
                    href={formatLink(personal_info.linkedin)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:underline"
                >
                    <Linkedin size={14} />
                    <span>LinkedIn</span>
                </a>
            )}

            {personal_info?.website && (
                <a
                    href={formatLink(personal_info.website)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:underline"
                >
                    <Globe size={14} />
                    <span>Portfolio</span>
                </a>
            )}

        </div>
    );
};

export default ContactInfo;