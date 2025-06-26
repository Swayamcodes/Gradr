const ExperienceMatchSection = ({ experience }) => {
  if (!experience) return null;

  return (
    <div >
      <h3 className="text-white text-xl font-semibold mb-4"> Experience Relevance</h3>
      <p className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">
        {experience}
      </p>
    </div>
  );
};

export default ExperienceMatchSection;
