import * as React from "react"
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import JsonTree from "react-json-tree";
import { FixedSizeList as List } from "react-window";
import {
  useTable,
  useColumns,
  useRows,
  useGroupBy,
  useFilters,
  useSortBy,
  useExpanded,
  usePagination,
  useFlexLayout,
  TableProps
} from "react-table";

import {
  Table,
  Row,
  HeaderRow,
  Header,
  Cell,
  Button,
  Select,
  Input,
  Emoji,
  Pagination
} from "./Styles";

const useInfiniteScroll = ({
  enabled,
  sortBy,
  groupBy,
  filters,
  pageIndex,
  pageSize
}) => {
  const listRef = useRef<List>(null);
  const [scrollToIndex, setScrollToIndex] = useState(0);
  const [rowHeight, setRowHeight] = useState(55);
  const [height, setHeight] = useState(500);
  const [overscan, setOverscan] = useState(25);

  useEffect(
    () => {
      if (!enabled) {
        return;
      }
      if (listRef && listRef.current) {
        listRef.current.scrollToItem(scrollToIndex, "start");
      }
    },
    [scrollToIndex]
  );

  useEffect(() => {}, []);

  useLayoutEffect(
    () => {
      if (!enabled) {
        return;
      }
      if (listRef && listRef.current) {
        listRef.current.scrollToItem(0, "start");
      }
    },
    [sortBy, groupBy, filters]
  );

  return {
    listRef,
    scrollToIndex,
    setScrollToIndex,
    rowHeight,
    setRowHeight,
    height,
    setHeight,
    overscan,
    setOverscan
  };
};

interface MyTableProps {
  infinite:boolean,
  loading?:boolean,
  onRowSelect?:any,
  tableProps:TableProps
}
export default function MyTable(props:MyTableProps) {
  const instance = useTable(
    {
      ...props.tableProps
    },
    useColumns,
    useRows,
    useGroupBy,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useFlexLayout
  );

  const {
    data,
    getTableProps,
    headerGroups,
    rows,
    getRowProps,
    pageOptions,
    page,
    state: [{ pageIndex, pageSize, sortBy, groupBy, filters }],
    gotoPage,
    prepareRow,
    previousPage,
    nextPage,
    setPageSize,
    canPreviousPage,
    canNextPage
  } = instance;

  const {
    listRef,
    scrollToIndex,
    setScrollToIndex,
    rowHeight,
    setRowHeight,
    height,
    setHeight,
    overscan,
    setOverscan
  } = useInfiniteScroll({
    enabled: props.infinite,
    sortBy,
    groupBy,
    filters,
    pageIndex,
    pageSize
  });

  let tableBody;

  const [rowSelected, setRowSelected] = useState()

  const renderRow = (row, index, style = {}) => {
    if (!row) {
      return (
        <Row {...{ style, even: index % 2 }}>
          <Cell>Loading more...</Cell>
        </Row>
      );
    }
    prepareRow(row);
    return (
      <Row {...row.getRowProps({
          style,
          even: index % 2,
          selected: (props.onRowSelect) ? row.index === rowSelected : false,
          onClick: (e) => {
            if (props.onRowSelect) {
              setRowSelected(row.index)
              props.onRowSelect(row)
            }
          }
          })}>
        {row.cells.map(cell => {
          const isPivot = row.groupByID === cell.column.id;
          const showAggregate = row.subRows && !isPivot;
          return (
            <Cell {...cell.getCellProps()}>
              {showAggregate ? (
                cell.column.aggregate ? (
                  cell.render("Aggregated")
                ) : null
              ) : (
                <span>
                  {isPivot ? (
                    <span
                      style={{
                        cursor: "pointer",
                        paddingLeft: `${row.depth * 2}rem`,
                        paddingRight: "1rem",
                        whiteSpace: "nowrap"
                      }}
                      onClick={() => row.toggleExpanded()}
                    >
                      <Emoji style={{}}>{row.isExpanded ? "👇" : "👉"}</Emoji>
                    </span>
                  ) : null}
                  {cell.render("Cell")}
                  {isPivot ? <span> ({row.subRows.length})</span> : null}
                </span>
              )}
            </Cell>
          );
        })}
      </Row>
    );
  };

  if (props.infinite) {
    tableBody = (
      <List
        ref={listRef}
        height={height}
        itemCount={rows.length + 1}
        itemSize={rowHeight}
        overscanCount={overscan}
        scrollToAlignment="start"
        {...getRowProps()}
      >
        {({ index, style }) => {
          const row = rows[index];
          return renderRow(row, index, style);
        }}
      </List>
    );
  } else {
    tableBody =
      page && page.length ? page.map((row, i) => renderRow(row, i)) : null;
  }

  let pagination;

  if (props.infinite) {
    pagination = (
      <Pagination {...getRowProps()}>
        <Cell>
          <span>
            Go to result:{" "}
            <Input
              type="number"
              defaultValue={scrollToIndex + 1}
              onChange={e => {
                const start = e.target.value ? Number(e.target.value) - 1 : 0;
                setScrollToIndex(start);
              }}
              style={{ width: "100px" }}
            />
          </span>{" "}
          Table Height:{" "}
          <Select
            value={height}
            onChange={e => {
              setHeight(Number(e.target.value));
            }}
          >
            {[100, 500, 1000].map(height => (
              <option key={height} value={height}>
                {height}px
              </option>
            ))}
          </Select>{" "}
          Overscan:{" "}
          <Input
            type="number"
            value={overscan}
            onChange={e => {
              setOverscan(Number(e.target.value));
            }}
            style={{ width: "100px" }}
          />{" "}
          Row Height:{" "}
          <Input
            type="number"
            value={rowHeight}
            onChange={e => {
              setRowHeight(Number(e.target.value));
            }}
            style={{ width: "100px" }}
          />
        </Cell>
      </Pagination>
    );
  } else {
    pagination = pageOptions.length ? (
      <Pagination {...getRowProps()}>
        <Cell>
          <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </Button>{" "}
          <Button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </Button>{" "}
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span>
            | Go to page:{" "}
            <Input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px" }}
            />
          </span>{" "}
          <Select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        </Cell>
      </Pagination>
    ) : null;
  }

  return (
    <div>
      <Table {...getTableProps()}>
        {headerGroups.map(headerGroup => (
          <HeaderRow {...headerGroup.getRowProps()}>
            {headerGroup.headers.map(column => (
              <Header
                {...column.getHeaderProps()}
                sorted={column.sorted}
                sortedDesc={column.sortedDesc}
                sortedIndex={column.sortedIndex}
              >
                <div>
                  <span {...column.getSortByToggleProps()}>
                    {column.render("Header")}
                  </span>{" "}
                  {column.canGroupBy ? (
                    <Emoji {...column.getGroupByToggleProps()}>
                      {column.grouped ? "🛑" : "👊"}
                    </Emoji>
                  ) : null}
                </div>
                {column.canFilter ? <div>{column.render("Filter")}</div> : null}
              </Header>
            ))}
          </HeaderRow>
        ))}
        {tableBody}
        <Row {...getRowProps()}>
          {props.loading ? (
            <Cell>
              <strong>Loading...</strong>
            </Cell>
          ) : (
            <Cell>{rows.length} Total Records</Cell>
          )}
        </Row>
        {pagination}
      </Table>
      <JsonTree data={instance}/>
    </div>
  );
}
