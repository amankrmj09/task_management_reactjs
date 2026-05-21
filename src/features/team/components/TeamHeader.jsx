import Button from "../../../components/common/Button";

function TeamHeader({
  title = "Team Members",
  subtitle = "Manage organization users",
  onInvite,
  actions,
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
        {subtitle && <p className="mt-1 text-gray-500">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {actions}
        {onInvite && <Button onClick={onInvite}>Invite Member</Button>}
      </div>
    </div>
  );
}

export default TeamHeader;
