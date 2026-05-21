function usePagination({
  page,
  totalPages,
}) {
  const nextPage = () => {
    if (page < totalPages - 1) {
      return page + 1;
    }

    return page;
  };

  const prevPage = () => {
    if (page > 0) {
      return page - 1;
    }

    return page;
  };

  return {
    nextPage,
    prevPage,
  };
}

export default usePagination;