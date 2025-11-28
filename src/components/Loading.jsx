const Loading = ({ text = "Loading..." }) => {
  return (
    <div className="flex h-full flex-col items-center justify-center py-10">
      <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      <p className="text-lg font-medium text-gray-700">{text}</p>
    </div>
  );
};

export default Loading;
