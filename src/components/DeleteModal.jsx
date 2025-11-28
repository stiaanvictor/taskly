function DeleteModal({ setDisplay, deleteFunction }) {
  return (
    <div className="fixed left-1/2 top-1/2 w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-lg border-2 border-borders bg-white px-8 py-4 shadow-md dark:border-dark-borders dark:bg-dark-background lg:w-auto">
      <h1 className="text-center text-xl">
        Are you sure you want to delete this task?
      </h1>
      <div className="mt-4 flex justify-around">
        <button
          className="w-24 rounded-md bg-primary text-lg text-white hover:brightness-90"
          onClick={deleteFunction}
        >
          Yes
        </button>
        <button
          onClick={() => setDisplay(false)}
          className="w-24 rounded-md bg-error text-lg text-white hover:brightness-90"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteModal;
