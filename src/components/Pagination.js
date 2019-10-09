import React, {useEffect, useState} from 'react';
import * as Bootstrap from 'react-bootstrap';

import './Pagination.css';

const Pagination = ({pages, onPageChanged}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const paginationItems = [];

  useEffect(() => {
    setCurrentPage(1);
  }, [pages]);

  const onPageSelected = page => {
    setCurrentPage(page);
    onPageChanged(page);
  };

  for (let i = 1; i <= pages; i++) {
    paginationItems.push(
      <Bootstrap.Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => onPageSelected(i)}
      >
        {i}
      </Bootstrap.Pagination.Item>
    )
  }

  if (paginationItems.length > 1) {
    paginationItems.unshift(
      <Bootstrap.Pagination.Prev
        key="prev"
        disabled={currentPage <= 1}
        onClick={() => onPageSelected(currentPage - 1)}
      />
    );
    paginationItems.push(
      <Bootstrap.Pagination.Next
        key="next"
        disabled={currentPage >= pages}
        onClick={() => onPageSelected(currentPage + 1)}
      />
    );
  }

  return (
    <div className="pagination-container">
      <Bootstrap.Pagination>
        {paginationItems}
      </Bootstrap.Pagination>
    </div>
  );
};

export default Pagination;
