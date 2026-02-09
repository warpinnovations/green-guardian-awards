import Link from "next/link";

export default function AdminHome() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Admin</h1>
      <Link className="underline" href="/admin/submissions">
        View submissions →
      </Link>
    </div>
  );
}
