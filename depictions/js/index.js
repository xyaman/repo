const params = new URLSearchParams(window.location.search);
const package = params.get("p");

const website = window.location.href.split("?")[0];

if(package) {

	// Get package info (sileo info)
	// fetch(`https://${website}/${package}/sileo.json`)
	fetch(`https://repo.xyaman.xyz/depictions/${package}/depiction.json`)
	.then(response => response.json())
	.then(info => {

		// Get info from sileo.json
		const infoViews = info.tabs[0].views;
		const infoBanner = info.headerImage;
		const infoDescription = infoViews.filter(c => c.class === "DepictionMarkdownView")[0].markdown;
		const infoScreenshots = infoViews.filter(c => c.class === "DepictionScreenshotsView")[0].screenshots;
		const infoDetails = infoViews.filter(c => c.class === "DepictionTableTextView");

		const infoChangelog = infoViews.filter(c => c.class === "DepictionTableButtonView")[0];
		const infoDonate = infoViews.filter(c => c.class === "DepictionTableButtonView")[1];
		const infoTwitter = infoViews.filter(c => c.class === "DepictionTableButtonView")[2];


		// Set package header
		const banner = document.getElementById("package-banner");
		banner.src = infoBanner;

		// Add screenshots
		const screenshotsDiv = document.getElementById("package-screenshots");
		infoScreenshots.map(ss => {
			screenshotsDiv.innerHTML += `<li><img src=${ss.url} /></li>`;
		});

		// Set package description
		const description = document.getElementById("package-description");
		description.innerHTML = `${infoDescription}`;

		// Set package details
		const details = document.getElementById("package-details");
		infoDetails.map(row => {
			details.innerHTML += `
			<tr>
			  <th style="text-align:left">${row.title}</th>
			  <th style="text-align:right;padding-left:1em">${row.text}</th>
			</tr>
			`
		});

		// Set changelog
		const changelog = document.getElementById("package-changelog");
		changelog.href = infoChangelog.action;

		// Set Dev donate method
		const donate = document.getElementById("dev-donate");
		donate.href = infoDonate.action;
		donate.innerHTML += `${infoDonate.title}`;

		// Set Dev twitter
		const twitter = document.getElementById("dev-twitter");
		twitter.href = infoTwitter.action;
		twitter.innerHTML += `${infoTwitter.title}`;


	});

}