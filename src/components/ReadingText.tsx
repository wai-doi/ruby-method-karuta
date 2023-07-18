const ReadingText = (props: { text: String | null }) => {
  return (
    <div className="h-6 bg-white pl-2">
      <span className="font-bold">読み上げ：</span>
      {props.text}
    </div>
  );
};

export default ReadingText;
