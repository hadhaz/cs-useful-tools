export default function Status(props: {
  validity: boolean | null;
  message: string | null;
}) {
  const statusColor = props.validity
    ? "bg-green-400 text-slate-900"
    : "bg-red-500 text-slate-100";

  if (props.validity === null) return null;

  const msg =
    props.message !== "" && props.message !== null
      ? props.message
      : props.validity
      ? "Success"
      : "Invalid Input";

  return (
    <div
      className={[
        "absolute top-0 w-full text-center py-1 text-lg font-medium",
        statusColor,
      ].join(" ")}
    >
      {msg}
    </div>
  );
}
