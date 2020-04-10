import React, { useCallback, ReactElement } from "react";
import { Button } from "@chakra-ui/core";
import Link from "next/link";

interface PaginationButtonProps {
  children: string;
  active?: boolean;
}

function PaginationButton(props: PaginationButtonProps): ReactElement {
  const { children, active } = props;
  return (
    <Button variant={active ? "solid" : "outline"} size="sm" m="5px">
      {children}
    </Button>
  );
}

const _getPagesToRender = (maxPages, currentPage) => {
  if (maxPages <= 9) {
    return Array.from(Array(maxPages).keys()).map((number) => number + 1);
  }
  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, 6, 7, -2, maxPages];
  }

  if (currentPage >= maxPages - 2) {
    return [
      1,
      -1,
      maxPages - 6,
      maxPages - 5,
      maxPages - 4,
      maxPages - 3,
      maxPages - 2,
      maxPages - 1,
      maxPages,
    ];
  }

  return [
    1,
    -1,
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
    -2,
    maxPages,
  ];
};

interface PaginationProps {
  maxPages: number;
  currentPage: number;
  path: string;
}

export const Pagination = (props: PaginationProps): ReactElement => {
  const { maxPages, currentPage, path } = props;

  const _renderButton = useCallback(
    (pageNumber) => (
      <React.Fragment key={pageNumber}>
        {pageNumber < 0 && <PaginationButton>...</PaginationButton>}
        {pageNumber >= 0 && (
          <Link href={`${path}${pageNumber}`}>
            <a>
              <PaginationButton active={pageNumber === currentPage}>
                {pageNumber}
              </PaginationButton>
            </a>
          </Link>
        )}
      </React.Fragment>
    ),
    [currentPage]
  );

  const pagesToRender = _getPagesToRender(maxPages, currentPage);

  return <React.Fragment>{pagesToRender.map(_renderButton)}</React.Fragment>;
};
