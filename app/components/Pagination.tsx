"use client"

import { useRouter } from "next/navigation"
import ReactPaginate from "react-paginate"

type Props = {
    pageCount: number
}

const Pagination = ({ pageCount }: Props) => {
    const router = useRouter()

    const handlePageClick = (event: any) => {
        router.push(`/?page=${event.selected + 1}`)
    }

    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
            onPageChange={handlePageClick}
            className="flex items-center gap-2 mx-auto my-5 max-w-full"
            pageClassName=""
            pageLinkClassName="py-2 px-3 bg-slate-100 border border-slate-300 rounded-lg hover:border-slate-400"
            activeLinkClassName="py-2 px-3 bg-slate-800 text-white border border-slate-800 rounded-lg hover:border-slate-400"
            previousLinkClassName="py-2 px-3 bg-slate-100 border border-slate-300 rounded-lg hover:border-slate-400"
            nextLinkClassName="py-2 px-3 bg-slate-100 border border-slate-300 rounded-lg hover:border-slate-400"
            disabledLinkClassName="bg-slate-50 text-slate-300 pointer-events-none cursor-not-allowed"
        />
    )
}

export default Pagination