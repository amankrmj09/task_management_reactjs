import MemberCard from "./MemberCard";

function TeamList({ members }) {
  if (!members?.length) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-gray-700">
          No Members Found
        </h2>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {members.map((member) => (
        <MemberCard
          key={member.id}
          member={member}
        />
      ))}
    </div>
  );
}

export default TeamList;