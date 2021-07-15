const params = new URLSearchParams(window.location.search);
const package = params.get("p");

const website = window.location.href.split("?")[0];

if(package) {

	console.log(website);

	// Get package info (sileo info)
	// fetch(`https://${website}/${package}/sileo.json`)
	fetch(`https://repo.xyaman.xyz/depictions/visualyzer/sileo.json`)
	.then(response => response.json())
	.then(info => {

		// Get info from sileo.json
		const infoViews = info.tabs[0].views;
		const infoBanner = info.headerImage;
		const infoDescription = infoViews.filter(c => c.class === "DepictionMarkdownView")[0].markdown;
		const infoScreenshots = infoViews.filter(c => c.class === "DepictionScreenshotsView")[0].screenshots;

		// Set package header
		const banner = document.getElementById("package-banner");
		banner.src = infoBanner;

		// Add screenshots
		const screenshotsDiv = document.getElementById("package-screenshots");
		infoScreenshots.map(ss => {
			screenshotsDiv.innerHTML += `<li><img src=${ss.url} /></li>`;
		});

		// Replace package description
		const description = document.getElementById("package-description");
		description.innerHTML = `<p>${infoDescription}</p>`;
	});

}