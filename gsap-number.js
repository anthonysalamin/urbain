/*
 * 🟢 URBAIN | gsap number V.4
 * dependency: gsap@3.7.1
 * build: 28.09.2021 14:18 | anthonysalamin.ch
 */
document.addEventListener("DOMContentLoaded", () => {
	// globals
	const log = console.log;
	// layout constants
	const thumbnails = document.querySelectorAll(".link-thumb"),
		numberElement = document.querySelector("#infonumber");
	// gsap variables
	let curentValue, newValue;
	const DURATION = 1.8,
		EASING = "Expo.easeOut";

	// for each thumbnail
	Array.from(thumbnails).forEach((thumbnail) => {
		thumbnail.addEventListener("click", () => {
			// get curent and new value
			curentValue = Number(numberElement.textContent);
			newValue = Number(
				thumbnail.querySelector(".helper-info.number").textContent
			);

			// gsap management
			let config = { curentValue: curentValue, newValue: newValue };
			const gsapNumber = gsap.timeline().to(config, {
				curentValue: config.newValue,
				duration: DURATION,
				snap: "curentValue",
				ease: EASING,
				onUpdate: () => {
					let value = config.curentValue.toString();
					const length = value.split("").length;		
					
					// formating
					if (length == 1) {
						value = `00${value}`;
					} else if (length == 2) {
						value = `0${value}`;
					} // end if
					numberElement.textContent = value;
				} // end onUpdate
				
			}); // end numberTween
		}); // end click
	}); // end for each thumbnail
}); // end DOM loaded

// go get an 🍦
