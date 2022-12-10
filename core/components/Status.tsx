export default function Status(props: { validity: boolean | null }) {
  const statusColor = props.validity
    ? "bg-green-400 text-slate-900"
    : "bg-red-500 text-slate-100";

  if (props.validity === null) return null;

  return (
    <div
      className={[
        "absolute top-0 w-full text-center py-1 text-lg font-medium",
        statusColor,
      ].join(" ")}
    >
      {props.validity ? "Success" : "Invalid Input"}
    </div>
  );
}
