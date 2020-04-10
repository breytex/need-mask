import React, { useCallback, ReactElement } from "react";
import { Button, Box } from "@chakra-ui/core";

interface PaginationButtonProps {
  children: string;
  active?: boolean;
  onClick?: (params) => void;
}

function PaginationButton(props: PaginationButtonProps): ReactElement {
  const { children, active, onClick = () => {} } = props;
  return (
    <Button
      onClick={onClick}
      variant={active ? "solid" : "outline"}
      variantColor={active ? "blue" : "gray"}
      size="sm"
      m="5px"
    >
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
  onPageChange: (params) => void;
  mb?: string;
  mt?: string;
}

export const Pagination = (props: PaginationProps): ReactElement => {
  const { maxPages, currentPage, onPageChange, mb, mt } = props;

  const _renderButton = useCallback(
    (pageNumber) => (
      <React.Fragment key={pageNumber}>
        {pageNumber < 0 && <PaginationButton>...</PaginationButton>}
        {pageNumber >= 0 && (
          <PaginationButton
            onClick={() => onPageChange({ page: pageNumber })}
            active={pageNumber === currentPage}
          >
            {pageNumber}
          </PaginationButton>
        )}
      </React.Fragment>
    ),
    [currentPage]
  );

  const pagesToRender = _getPagesToRender(maxPages, currentPage);

  return (
    <Box mb={mb} mt={mt} minH="42px">
      {pagesToRender.length > 1 && pagesToRender.map(_renderButton)}
    </Box>
  );
};
