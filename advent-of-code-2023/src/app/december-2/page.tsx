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

export default function December1() {
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
			</div>
		</main>
	);
}
