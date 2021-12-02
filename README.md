# London Government MPs

## Description

A website that displays the current Member of parliament depending on the input the user searches for or the constituency the user clicks on the map. It will display the name, picture and their respective constituency which is fetched from the [UK Parliament Member API](https://members-api.parliament.uk/index.html).

### Features

The map was taken from the Wikipedia London Constituency map, and inserted inside the HTML file so the id of each SVG constituency could be read of as an array to manipulate the data in Javascript.

Uses Jquery to shorten the use of vanilla javascript, this web page has a variety of UI components to give the user a sleek experience. The tooltip will show the name of the constituency on hover, with colour change, to allow the user to locate the name of the area. The website has to options, a map search or a search list, allowing for more accessibility should a user not know the area of London.

```js
const tooltip = document.querySelector(".map-tooltip");
constituencyArr.forEach((item) => {
	item.addEventListener("mousemove", function (e) {
		tooltip.style.display = "block";
		tooltip.style.top = 10 + e.clientY + "px";
		tooltip.style.left = 20 + e.clientX + "px";
		tooltip.textContent = e.target.getAttribute("id");
	});

	item.addEventListener("mouseleave", () => {
		tooltip.style.display = "none";
	});
});
```

The search uses Regex to filter the number of found results depending on the letter typed and matches with the id of the SVG element that is extracted using the Jquery script. I then had to map out the div inside the search container, but I do feel that with an upgrade to the webpage interface by using a front-end framework, preferably React.

```js
search.addEventListener("input", (e) => {
	let matches = constituencyArr.filter((constit) => {
		const regex = new RegExp(`^${e.target.value}`, "gi");
		return constit.id.match(regex);
	});

	constituencyList.innerHTML = matches
		.map(
			(match) =>
				`<div id="${match.id}" class="suggestions" onclick="show(event)">${match.id}</div>`
		)
		.join("");
});
```

### What to improve

SVG is difficult to convert to responsive, especially for grid/flexbox layouts, so I would be continuing its implementation of its other uses in more projects. In addition, creation of a raw map of London containing the locations of each constituency is essential should I face any issues with copyright from third-party websites.

For the next version would be to include the votes of the MPs, adding a graph to display the data, as well as show different attributes of the chosen MP to give a more detailed info page on their interests and policies.
