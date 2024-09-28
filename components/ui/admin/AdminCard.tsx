import React from "react";

interface AdminCardProps {
  title: string;
  total: number;
}

const AdminCard = ({ title, total }: AdminCardProps) => {
  return (
    <div className="rounded-md p-4 flex flex-col gap-2 capitalize bg-slate-300">
      <h1 className="text-xl">{title}</h1>
      <p className="text-md">
        Total {title}: {total}
      </p>
    </div>
  );
};

export default AdminCard;
