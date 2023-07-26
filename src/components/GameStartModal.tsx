import { useState } from 'react';
import { FaXmark } from 'react-icons/fa6';

const GameStartModal = (props: {
  show: boolean;
  setShow: Function;
  gameStart: Function;
}) => {
  const [clearNumber, setClearNumber] = useState<5 | 10 | 20 | 30 | 50>(50);

  const closeModal = () => {
    props.setShow(false);
  };

  const clickGameStart = () => {
    closeModal();
    props.gameStart(clearNumber);
  };

  if (props.show) {
    return (
      <div
        onClick={closeModal}
        className="fixed z-40 flex h-full w-full items-center justify-center bg-gray-500/75"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="z-50 w-1/2 rounded-lg bg-white p-2"
        >
          <div className="text-right">
            <button
              onClick={() => props.setShow(false)}
              className="cursor-pointer rounded-lg text-4xl text-gray-400 hover:bg-gray-200"
            >
              <FaXmark />
            </button>
          </div>
          <div className="pb-5 text-center">
            <p className="text-2xl font-bold">クリア枚数の設定</p>
            <div className="flex justify-between p-10">
              <div>
                <input
                  type="radio"
                  id="clear5"
                  checked={clearNumber === 5}
                  onChange={() => setClearNumber(5)}
                  className="peer/clear5 hidden"
                />

                <label
                  htmlFor="clear5"
                  className="flex h-32 w-32 cursor-pointer items-center justify-center rounded-lg border border-gray-300 text-xl font-bold text-gray-500 hover:bg-gray-100 peer-checked/clear5:border-blue-500 peer-checked/clear5:text-blue-500"
                >
                  5/50 枚
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="clear10"
                  checked={clearNumber === 10}
                  onChange={() => setClearNumber(10)}
                  className="peer/clear10 hidden"
                />

                <label
                  htmlFor="clear10"
                  className="flex h-32 w-32 cursor-pointer items-center justify-center rounded-lg border border-gray-300 text-xl font-bold text-gray-500 hover:bg-gray-100 peer-checked/clear10:border-blue-500 peer-checked/clear10:text-blue-500"
                >
                  10/50 枚
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="clear20"
                  checked={clearNumber === 20}
                  onChange={() => setClearNumber(20)}
                  className="peer/clear20 hidden"
                />

                <label
                  htmlFor="clear20"
                  className="flex h-32 w-32 cursor-pointer items-center justify-center rounded-lg border border-gray-300 text-xl font-bold text-gray-500 hover:bg-gray-100 peer-checked/clear20:border-blue-500 peer-checked/clear20:text-blue-500"
                >
                  20/50 枚
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="clear30"
                  checked={clearNumber === 30}
                  onChange={() => setClearNumber(30)}
                  className="peer/clear30 hidden"
                />

                <label
                  htmlFor="clear30"
                  className="flex h-32 w-32 cursor-pointer items-center justify-center rounded-lg border border-gray-300 text-xl font-bold text-gray-500 hover:bg-gray-100 peer-checked/clear30:border-blue-500 peer-checked/clear30:text-blue-500"
                >
                  30/50 枚
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="clear50"
                  checked={clearNumber === 50}
                  onChange={() => setClearNumber(50)}
                  className="peer/clear50 hidden"
                />

                <label
                  htmlFor="clear50"
                  className="flex h-32 w-32 cursor-pointer items-center justify-center rounded-lg border border-gray-300 text-xl font-bold text-gray-500 hover:bg-gray-100 peer-checked/clear50:border-blue-500 peer-checked/clear50:text-blue-500"
                >
                  50/50 枚
                </label>
              </div>
            </div>
            <button
              onClick={() => clickGameStart()}
              className="h-16 rounded-full bg-blue-600 p-4 text-center text-xl font-bold text-white hover:bg-blue-500"
            >
              ゲームスタート
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default GameStartModal;
