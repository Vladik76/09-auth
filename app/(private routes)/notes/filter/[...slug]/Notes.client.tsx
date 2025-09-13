"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import SearchBox from "@/components/SearchBox/SearchBox";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Pagination from "@/components//Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes } from "@/lib/api/clientApi";
import css from "./page.module.css";

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 400);

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, tag]);

  const { data, isError, isLoading, isFetching, isSuccess } = useQuery({
    queryKey: ["notes", tag, debouncedQuery, page],
    queryFn: () =>
      fetchNotes({
        page: page,
        search: debouncedQuery,
        ...(tag !== "All" && { tag }),
      }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox
            value={query}
            onChange={(query: string) => setQuery(query)}
          />
          {isSuccess && data.totalPages > 1 && (
            <Pagination
              pageCount={data.totalPages}
              currentPage={page}
              onPageChange={(selectedPage: number) => setPage(selectedPage)}
            />
          )}
          <Link href={"/notes/action/create"} className={css.button}>
            Create note +
          </Link>
        </header>

        {(isLoading || isFetching) && <Loader />}
        {isError && <ErrorMessage />}
        {isSuccess && data?.notes?.length === 0 && <p>No notes found.</p>}
        {data?.notes && data?.notes?.length > 0 && (
          <NoteList notes={data.notes} />
        )}
      </div>
    </>
  );
}
