import Button from "./Button";

function Pagination({
  page,
  totalPages,
  onNext,
  onPrev,
}) {
  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        variant="outline"
        onClick={onPrev}
        disabled={page === 0}
      >
        Previous
      </Button>

      <span className="font-medium text-gray-700">
        Page {page + 1} of {totalPages}
      </span>

      <Button
        variant="outline"
        onClick={onNext}
        disabled={page >= totalPages - 1}
      >
        Next
      </Button>
    </div>
  );
}

export default Pagination;