const Loading = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-10">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-gray-700 text-lg font-medium">{text}</p>
    </div>
  );
};

export default Loading;
