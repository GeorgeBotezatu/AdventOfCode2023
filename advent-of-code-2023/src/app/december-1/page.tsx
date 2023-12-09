"use client";
import { useState } from "react";
import { dayTitle, exampleArray, pageParagraphs, realData } from "./dayData";
import { getNumbersFromAString } from "@/utils";

export default function December1() {
	const [exampleData, setExampleData] = useState(exampleArray);
	const [realDataState, setRealDataState] = useState(realData.split("\n"));

	const letterNumbers = [
		"zero",
		"one",
		"two",
		"three",
		"four",
		"five",
		"six",
		"seven",
		"eight",
		"nine",
	];
	const letterNumbersWithValue = [
		"zeo",
		"o1e",
		"t2o",
		"th3ee",
		"fo4r",
		"fi5e",
		"s6x",
		"se7en",
		"ei8ht",
		"n9ne",
	];

	const transformNumberLettersToNumbers = (number: string) => {
		let newNumber = number;
		let i = 0;
		while (i < 10) {
			if (newNumber.includes(letterNumbers[i])) {
				if (letterNumbers[i] === "zero") {
					newNumber = newNumber.replace(letterNumbers[i], `zeo`);
					i = 0;
				} else {
					newNumber = newNumber.replace(
						letterNumbers[i],
						letterNumbersWithValue[i]
					);
					i = 0;
				}
			} else {
				i++;
			}
		}
		return newNumber;
	};

	const getCalibrationValues = (data: string[]) => {
		const transformedNumbers = data.map((number) => {
			return transformNumberLettersToNumbers(number);
		});

		let calibratedValues: number[] = [];

		const extractedNumbers = transformedNumbers.map((item) => {
			return item.match(getNumbersFromAString)?.flatMap((str) => str.split(""));
		});
		extractedNumbers.map((numberArr) => {
			if (numberArr !== undefined && numberArr?.length > 0) {
				if (numberArr.length === 1) {
					calibratedValues.push(Number(`${numberArr[0]}${numberArr[0]}`));
				} else {
					calibratedValues.push(
						Number(`${numberArr[0]}${numberArr[numberArr.length - 1]}`)
					);
				}
			} else {
				calibratedValues.push(0);
			}
		});
		return calibratedValues;
	};

	const getSumOfCalibratedValues = (data: number[]) => {
		let sum: number = 0;
		for (let i = 0; i < data.length; i++) {
			sum += data[i];
		}
		return sum;
	};

	const exampleCalibratedValues = getCalibrationValues(exampleData);
	return (
		<main className="flex flex-col justify-center items-center gap-5 mx-auto mt-11 w-[80%] ">
			<h1 className="text-4xl mb-8">{dayTitle}</h1>
			<div className="flex gap-3 flex-col mx-auto w-[50%]">
				{pageParagraphs.map((paragraph, index) => {
					return <p key={paragraph[1] + paragraph[2] + index}>{paragraph}</p>;
				})}
				<p className="self-start">For Example :</p>
				{exampleArray.map((item, index) => {
					return (
						<p key={item[1] + item[2] + index}>
							{item} - {exampleCalibratedValues[index]}
						</p>
					);
				})}
				<p>
					The sum of the is :{" "}
					{getSumOfCalibratedValues(exampleCalibratedValues)}
				</p>

				<h1>
					The sum of the Real data input is :{" "}
					{getSumOfCalibratedValues(getCalibrationValues(realDataState))}
				</h1>
			</div>
		</main>
	);
}
