import SkillMatchChart from "./SkillMatchChart";

const SkillMatchSection = ({ skills }) => {
  if (!skills?.matched?.length && !skills?.missing?.length) return null;

  return (
    <div className="flex flex-col gap-6">
     <SkillMatchChart matched={skills.matched} missing={skills.missing} />




    </div>
  );
};


export default SkillMatchSection;
