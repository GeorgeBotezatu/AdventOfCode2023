"use client";
import { useEffect, useState } from "react";
import {
	dayTitle,
	exampleArray,
	extraDetails,
	pageParagraphs,
	realData,
} from "./dayData";
import { getNumbersFromAString } from "@/utils";

type ColorArrEntry = {
	index: number;
	red: string[];
	green: string[];
	blue: string[];
};

type ColorMinimumBlocks = {
	index: number;
	red: Number;
	green: Number;
	blue: Number;
};

export default function December2() {
	const redLimit = 12;
	const greenLimit = 13;
	const blueLimit = 14;
	const [realDataState, setRealDataStae] = useState<string[]>(
		realData.split("\n")
	);

	const getColorArrays = (arr: string[]) => {
		let colorArr: ColorArrEntry[] = [];
		arr.map((entry, index) => {
			const gameEntry = entry.split(";");
			const red: string[] = [];
			const green: string[] = [];
			const blue: string[] = [];
			gameEntry.map((gameRound) => {
				const gameRoundSplited = gameRound.split(",");
				const firstPositionSanitised = gameRoundSplited[0].split(":");
				gameRoundSplited.shift();
				const sanitisedRound = [
					firstPositionSanitised.length > 1
						? firstPositionSanitised[1]
						: firstPositionSanitised[0],
					...gameRoundSplited,
				];
				const entrysWithoutWhiteSpaces = sanitisedRound.map((item) =>
					item.replaceAll(" ", "")
				);

				entrysWithoutWhiteSpaces.map((color) => {
					if (color.includes("red")) {
						const extractedNumber = color.match(getNumbersFromAString);
						if (extractedNumber) {
							red.push(extractedNumber[0]);
						}
					}
					if (color.includes("green")) {
						const extractedNumber = color.match(getNumbersFromAString);
						if (extractedNumber) {
							green.push(extractedNumber[0]);
						}
					}
					if (color.includes("blue")) {
						const extractedNumber = color.match(getNumbersFromAString);
						if (extractedNumber) {
							blue.push(extractedNumber[0]);
						}
					}
				});
			});

			colorArr.push({ index: index + 1, red, green, blue });
		});
		return colorArr;
	};

	const exampleColorArrays = getColorArrays(exampleArray);
	const realDataColorArrays = getColorArrays(realDataState);

	const getIDSumOfRealGames = (gameArr: ColorArrEntry[]) => {
		let IDSum = 0;
		gameArr.map((round: ColorArrEntry) => {
			let isOverTheLimit = false;
			round.red.map((entry) => {
				if (Number(entry) > redLimit) {
					isOverTheLimit = true;
				}
			});
			round.green.map((entry) => {
				if (Number(entry) > greenLimit) {
					isOverTheLimit = true;
				}
			});
			round.blue.map((entry) => {
				if (Number(entry) > blueLimit) {
					isOverTheLimit = true;
				}
			});
			if (isOverTheLimit === false) {
				IDSum += round.index;
			}
		});
		return IDSum;
	};

	const getMaxValue = (arr: string[]) => {
		let maxNumber = -1;
		arr.map((item: string) => {
			if (Number(item) > maxNumber) {
				maxNumber = Number(item);
			}
		});
		return maxNumber;
	};

	const getTheMinimumNumberOfBalls = (colorArrays: ColorArrEntry[]) => {
		const maxNumberOfBlocks: ColorMinimumBlocks[] = [];
		colorArrays.map((entry: ColorArrEntry) => {
			let red: Number = getMaxValue(entry.red);
			let green: Number = getMaxValue(entry.green);
			let blue: Number = getMaxValue(entry.blue);
			maxNumberOfBlocks.push({ index: entry.index, red, green, blue });
		});

		return maxNumberOfBlocks;
	};

	const calculateSumOfPowerSets = (minimumArr: ColorMinimumBlocks[]) => {
		let sum = 0;
		minimumArr.map((entry: ColorMinimumBlocks) => {
			const pow = Number(entry.red) * Number(entry.blue) * Number(entry.green);
			sum += pow;
		});
		return sum;
	};

	const minimumNumbersForExampleArr =
		getTheMinimumNumberOfBalls(exampleColorArrays);
	const minimumNumbersForRealDataArr =
		getTheMinimumNumberOfBalls(realDataColorArrays);

	getIDSumOfRealGames(exampleColorArrays);

	return (
		<main className="flex flex-col justify-center items-center gap-5 mx-auto mt-11 w-[80%] ">
			<h1 className="text-4xl mb-8">{dayTitle}</h1>
			<div className="flex gap-3 flex-col mx-auto w-[50%]">
				{pageParagraphs.map((paragraph, index) => {
					return <p key={paragraph[1] + paragraph[2] + index}>{paragraph}</p>;
				})}

				{exampleArray.map((item, index) => {
					return <p key={item[1] + item[2] + index}>{item}</p>;
				})}

				{extraDetails.map((paragraph, index) => {
					return <p key={paragraph[1] + paragraph[2] + index}>{paragraph}</p>;
				})}

				<h1>
					ID SUM for Example is {getIDSumOfRealGames(exampleColorArrays)} ===
					SUM : {calculateSumOfPowerSets(minimumNumbersForExampleArr)}
				</h1>
				<h1>
					ID SUM for Real data is {getIDSumOfRealGames(realDataColorArrays)} ===
					SUM {calculateSumOfPowerSets(minimumNumbersForRealDataArr)}
				</h1>
			</div>
		</main>
	);
}
