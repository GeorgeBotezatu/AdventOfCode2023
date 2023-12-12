"use client";

import {
	dayTitle,
	exampleArray,
	extraDetails,
	pageParagraphs,
	realData,
} from "./dayData";

export default function December3() {
	return (
		<main className="flex flex-col justify-center items-center gap-5 mx-auto mt-11 w-[80%] ">
			<h1 className="text-4xl mb-8">{dayTitle}</h1>
			<div className="flex gap-3 flex-col mx-auto w-[50%]"></div>
		</main>
	);
}
