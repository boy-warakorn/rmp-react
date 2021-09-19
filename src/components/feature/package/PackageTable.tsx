import { Pagination } from "antd";
import React, { Fragment, useState } from "react";
import PackageCard from "../postal/PackageCard";

export interface PackageTableProps {
  content: {
    packages: any[];
    total: number;
  };
}

const PackageTable = ({ content }: PackageTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const onChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Fragment>
      <div className="mt-6 grid grid-cols-6 gap-6">
        {content.packages[currentPage - 1].map(() => (
          <PackageCard />
        ))}
      </div>
      <div className="flex mt-6 justify-end">
        <Pagination total={content.total} pageSize={4} onChange={onChange} />
      </div>
    </Fragment>
  );
};

export default PackageTable;
