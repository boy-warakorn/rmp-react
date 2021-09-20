import { Package } from "@repository/PackageRepository";
import { Empty, Pagination, Spin } from "antd";
import React, { Fragment, useState } from "react";
import PackageCard from "../postal/PackageCard";

export interface PackageTableProps {
  content: {
    packages: Package[][];
    total: number;
  };
  loading: boolean;
  onConfirm(id: string, isConfirm: boolean): void;
}

const PackageTable = ({ content, loading, onConfirm }: PackageTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const onChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="flex justify-center h-72 items-center">
        <Spin />
      </div>
    );
  }

  if (!content.total) {
    return (
      <div className="flex flex-col justify-center h-72 items-center">
        <Empty description="No Packages" />
      </div>
    );
  }

  return (
    <Fragment>
      <div className="mt-6 grid grid-cols-6 gap-6">
        {content.packages[currentPage - 1].map((postal: Package) => (
          <PackageCard
            postal={postal}
            onConfirm={onConfirm}
            key={`${postal.id}Postal`}
          />
        ))}
      </div>
      <div className="flex mt-6 justify-end">
        <Pagination total={content.total} pageSize={8} onChange={onChange} />
      </div>
    </Fragment>
  );
};

export default PackageTable;
