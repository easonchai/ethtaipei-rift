import React from "react";
import * as RadioGroupR from "@radix-ui/react-radio-group";
import moment from "moment";
import { parseBigIntString } from "@/utils/formatting";

interface IRadioGroupR {
  options: {
    name: string;
    time: number;
    receiveAmount: string;
  }[];
  asset: string;
  selectedProvider: any;
  setSelectedProvider: any;
}

const RadioGroup = ({
  options,
  asset,
  selectedProvider,
  setSelectedProvider,
}: IRadioGroupR) => {
  return (
    <RadioGroupR.Root
      className="flex flex-col gap-2.5"
      value={selectedProvider}
      defaultValue={options[0].name}
      onValueChange={(value) => {
        setSelectedProvider(value);
      }}
    >
      <div className="flex flex-col items-start gap-y-3">
        {options.map((option) => (
          <div className="flex flex-row items-center w-full" key={option.name}>
            <RadioGroupR.Item
              className="border border-rift-grey-900 w-[16px] h-[16px] rounded-full hover:bg-rift-grey-500 outline-none cursor-default flex-shrink-0"
              value={option.name}
              id={option.name}
            >
              {selectedProvider === option.name && (
                <RadioGroupR.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[8px] after:h-[8px] after:rounded-[50%] after:bg-rift-grey-900" />
              )}
            </RadioGroupR.Item>
            <div
              className="flex flex-row items-center w-full justify-between bg-white rounded-sm border border-rift-grey-900 px-4 py-3 ml-4 cursor-pointer"
              onClick={() => {
                setSelectedProvider(option.name);
              }}
            >
              <label className="font-bold" htmlFor={option.name}>
                {option.name}
              </label>
              <div className="flex flex-row items-start">
                <p className="text-xs mr-[6px]">Time</p>
                <div className="bg-rift-yellow-1 h-full font-bold border border-rift-grey-900 p-[10px] mr-[11px]">
                  {option.time < 60
                    ? `${Math.floor(option.time)} secs`
                    : `${moment
                        .duration(option.time, "seconds")
                        .minutes()} mins`}
                </div>
                <p className="text-xs mr-[6px]">Receive</p>
                <div className="bg-rift-yellow-1 h-full font-bold border border-rift-grey-900 p-[10px]">
                  {parseBigIntString(option.receiveAmount)} {asset}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </RadioGroupR.Root>
  );
};

export default RadioGroup;
