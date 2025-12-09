"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  type Table,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@repo/ui/components/button";
import { ButtonGroup } from "@repo/ui/components/button-group";
import { Input } from "@repo/ui/components/input";
import { Badge } from "@repo/ui/components/badge";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@repo/ui/components/context-menu";
import { Search, ArrowUp, ArrowDown, ChevronsRight, ChevronsLeft, Pencil, Copy, Trash2 } from "lucide-react";

interface VoucherDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  searchPlaceholder?: string;
  toolbar?: (table: Table<TData>) => React.ReactNode;
}

export function VoucherDataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Search...",
  toolbar,
}: VoucherDataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="space-y-6">
      {/* Enhanced Header Section */}
      <div className="space-y-4">
        {/* Title Row with Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Voucher List</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage and monitor your voucher codes and their usage
            </p>
          </div>

          {/* Toolbar on the right */}
          {toolbar && (
            <div className="shrink-0 w-full sm:w-auto">
              {toolbar(table)}
            </div>
          )}
        </div>

        {/* Search Bar with Select All Button */}
        {searchKey && (
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
            {/* Select All Button */}
            <Button
              variant={table.getIsAllPageRowsSelected() ? "default" : "outline"}
              size="default"
              onClick={() => {
                if (table.getIsAllPageRowsSelected()) {
                  table.toggleAllPageRowsSelected(false);
                } else {
                  table.toggleAllPageRowsSelected(true);
                }
              }}
              className="w-full sm:w-auto"
            >
              {table.getIsAllPageRowsSelected() ? "Deselect All" : "Select All"}
            </Button>

            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  table.getColumn(searchKey)?.setFilterValue(event.target.value)
                }
                className="pl-9 h-11 bg-muted/50 border-border/60 focus-visible:ring-primary/20"
              />
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {/* Card-based rows */}
        <div className="space-y-3">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, index) => {
              const cells = row.getVisibleCells();
              const isSelected = row.getIsSelected();
              const voucher = row.original as any;

              return (
                <ContextMenu key={row.id}>
                  <ContextMenuTrigger asChild>
                    <div
                      data-state={isSelected && "selected"}
                      onClick={() => row.toggleSelected()}
                      className={`group relative rounded-xl border p-5 hover:shadow-sm transition-all duration-300 overflow-hidden cursor-pointer ${isSelected
                        ? 'border-blue-500/50 bg-blue-500/30 hover:bg-blue-500/40'
                        : 'border-border/60 bg-muted/40 hover:bg-muted/50 hover:border-muted/60'
                        }`}
                      style={{
                        animationDelay: `${index * 30}ms`,
                      }}
                    >
                      {/* Selected indicator - left edge */}
                      {isSelected && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-foreground/20 rounded-l-xl" />
                      )}

                      {/* Background pattern */}
                      <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity pointer-events-none">
                        <div className="absolute inset-0" style={{
                          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                          backgroundSize: '24px 24px'
                        }} />
                      </div>

                      {/* Gradient mesh background - more subtle */}
                      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

                      {/* Subtle gradient overlay on hover */}
                      <div className="absolute inset-0 rounded-xl bg-linear-to-r from-transparent via-primary/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                      {/* Card content with custom layout */}
                      <div className="relative grid grid-cols-[1fr_auto] gap-6 items-center">

                        {/* Middle section: Main content */}
                        <div className="flex-1 min-w-0 space-y-3">
                          {/* Primary row: Username/Code + Status */}
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 min-w-0">
                              {/* Username with badge */}
                              <div className="flex-1 min-w-0">
                                {flexRender(cells[0].column.columnDef.cell, cells[0].getContext())}
                              </div>
                            </div>

                            {/* Status badges */}
                            <div className="shrink-0">
                              {flexRender(cells[6].column.columnDef.cell, cells[6].getContext())}
                            </div>
                          </div>

                          {/* Secondary row: Metadata */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                            {/* Profile */}
                            <div className="flex flex-col gap-1">
                              <span className="text-xs text-muted-foreground font-medium">Profile</span>
                              <span className="text-foreground/80 truncate">
                                {flexRender(cells[1].column.columnDef.cell, cells[1].getContext())}
                              </span>
                            </div>

                            {/* Comment */}
                            <div className="flex flex-col gap-1">
                              <span className="text-xs text-muted-foreground font-medium">Comment</span>
                              <span className="text-foreground/80 truncate">
                                {flexRender(cells[2].column.columnDef.cell, cells[2].getContext())}
                              </span>
                            </div>

                            {/* Uptime */}
                            <div className="flex flex-col gap-1">
                              <span className="text-xs text-muted-foreground font-medium">Uptime</span>
                              <span className="text-foreground/80 font-mono text-xs">
                                {flexRender(cells[3].column.columnDef.cell, cells[3].getContext())}
                              </span>
                            </div>

                            {/* Data Usage */}
                            <div className="flex flex-col gap-1">
                              <span className="text-xs text-muted-foreground font-medium">Data Usage</span>
                              <div className="flex items-center gap-2 text-xs">
                                <span className="flex items-center gap-1 text-green-500 font-mono">
                                  <ArrowDown className="w-4 h-4" /> {flexRender(cells[4].column.columnDef.cell, cells[4].getContext())}
                                </span>
                                <span className="flex items-center gap-1 text-blue-500 font-mono">
                                  <ArrowUp className="w-4 h-4" /> {flexRender(cells[5].column.columnDef.cell, cells[5].getContext())}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right section: Actions (mobile only) */}
                        <div className="shrink-0 md:hidden">
                          {flexRender(cells[7].column.columnDef.cell, cells[7].getContext())}
                        </div>
                      </div>
                    </div>
                  </ContextMenuTrigger>
                  <ContextMenuContent className="w-48">
                    <ContextMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </ContextMenuItem>
                    {voucher.password === voucher.username && (
                      <ContextMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(voucher.username || '');
                        }}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Code
                      </ContextMenuItem>
                    )}
                    <ContextMenuItem variant="destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              );
            })
          ) : (
            <div className="rounded-xl border bg-card/50 backdrop-blur-sm p-12 text-center">
              <p className="text-muted-foreground text-sm">No results found.</p>
            </div>
          )}
        </div >
      </div >

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>

        <ButtonGroup>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>

          {/* Page Numbers - Hidden on mobile */}
          <div className="hidden md:contents">
            {Array.from({ length: table.getPageCount() }, (_, i) => i).map((pageIndex) => {
              const currentPage = table.getState().pagination.pageIndex;
              const totalPages = table.getPageCount();

              const showPage =
                pageIndex === 0 ||
                pageIndex === totalPages - 1 ||
                Math.abs(pageIndex - currentPage) <= 1;

              const showEllipsisBefore = pageIndex === currentPage - 2 && currentPage > 2;
              const showEllipsisAfter = pageIndex === currentPage + 2 && currentPage < totalPages - 3;

              if (!showPage && !showEllipsisBefore && !showEllipsisAfter) {
                return null;
              }

              if (showEllipsisBefore || showEllipsisAfter) {
                return (
                  <span key={pageIndex} className="px-2 text-muted-foreground">
                    ...
                  </span>
                );
              }

              return (
                <Button
                  key={pageIndex}
                  variant={currentPage === pageIndex ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => table.setPageIndex(pageIndex)}
                  className={`rounded-none ${currentPage === pageIndex ? "pointer-events-none" : ""}`}
                >
                  {pageIndex + 1}
                </Button>
              );
            })}
          </div>

          {/* Current page indicator for mobile */}
          <div className="md:hidden px-3 text-sm text-muted-foreground">
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </ButtonGroup>
      </div>
    </div >
  );
}
