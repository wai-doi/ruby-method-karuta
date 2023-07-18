const Config = (props: {
  showReadingText: boolean;
  handleShowReadingTextCheckBox: React.ChangeEventHandler<HTMLInputElement>;
  readingSpeed: number;
  handleReadingSpeedSlider: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <div className="absolute right-0 z-50 h-fit w-fit space-y-12 rounded-lg bg-white p-7 text-black shadow-xl">
      <div className="space-y-3">
        <p className="text-xl font-bold">読み上げテキストの表示</p>
        <div className="flex space-x-10">
          <div>
            <input
              type="radio"
              id="showReadingText"
              value="true"
              checked={props.showReadingText}
              onChange={(e) => props.handleShowReadingTextCheckBox(e)}
            />
            <label htmlFor="showReadingText" className="ml-2 cursor-pointer">
              表示する
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="hideReadingText"
              value="false"
              checked={!props.showReadingText}
              onChange={(e) => props.handleShowReadingTextCheckBox(e)}
            />
            <label htmlFor="hideReadingText" className="ml-2 cursor-pointer">
              表示しない
            </label>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <p className="text-xl font-bold">読み上げ速度</p>
        <div className="flex">
          <span className="w-20">x {props.readingSpeed.toFixed(2)}</span>
          <input
            type="range"
            id="speed"
            name="speed"
            min="0.7"
            max="1.3"
            step="0.05"
            value={props.readingSpeed}
            onChange={(e) => props.handleReadingSpeedSlider(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default Config;
