const FinishPopup = (props: {
  answerCount: number;
  missCount: number;
  finishTime: number;
}) => {
  return (
    <div className="fixed inset-0 m-auto h-1/2 w-1/2 rounded-xl border-8 border-blue-900 bg-white p-8 text-center shadow-xl">
      <p className="text-5xl font-bold">お疲れ様でした!!</p>
      <div className="m-16 space-y-12">
        <p className="flex justify-center space-x-10 text-4xl">
          <span>取った札</span>
          <span>{props.answerCount} 枚</span>
        </p>
        <p className="flex justify-center space-x-10 text-4xl">
          <span>お手つき</span>
          <span>{props.missCount} 回</span>
        </p>
        <p className="flex justify-center space-x-10 text-4xl">
          <span>タイム</span>
          <span>
            {String(Math.floor(props.finishTime / 60)).padStart(2, '0')}:
            {String(props.finishTime % 60).padStart(2, '0')}
          </span>
        </p>
      </div>
    </div>
  );
};

export default FinishPopup;
