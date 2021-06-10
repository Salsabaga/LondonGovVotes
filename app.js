// Fetch Data function

async function mpData(entry) {
	const response = await fetch(
		`https://members-api.parliament.uk/api/Location/Constituency/Search?searchText=${entry.id}&skip=0`
	);
	const data = await response.json();
	const fullNameMP =
		data.items[0].value.currentRepresentation.member.value.nameFullTitle;
	const imageMP = await data.items[0].value.currentRepresentation.member.value
		.thumbnailUrl;
	const mpPartyAbr =
		data.items[0].value.currentRepresentation.member.value.latestParty
			.abbreviation;
	$("#loading-area").removeClass("active");
	$("#member-link").css("display", "block");
	$("#member-pic > img").attr("src", `${imageMP}`);
	$("#member-name").text(fullNameMP);
	$("#member-area").text(entry.id);
	if (mpPartyAbr === "Lab") {
		$("#member-card").css("background-color", "var(--labour)");
		$("#member-svg img").attr("src", "public/svg/Labour.svg");
	} else if (mpPartyAbr === "Con") {
		$("#member-card").css("background-color", "var(--conservative)");
		$("#member-svg img").attr("src", "public/svg/Conservative.svg");
	} else if (mpPartyAbr === "LD") {
		$("#member-card").css("background-color", "var(--lib-dems)");
		$("#member-svg img").attr("src", "public/svg/Liberal-Democrat.svg");
	} else {
		console.log("Invalid User");
	}
}

function show(e) {
	mpData(e.target);
	$("#loading-area").addClass("active");
	$(e.target.innerHTML).css("fill", "#448fda");
}

const constituencies = document.getElementsByTagName("path");
const constituencyArr = Array.from(constituencies);
const search = document.getElementById("mpSearch");
const constituencyList = document.getElementById("match-list");
const spinner = document.querySelector("#loading-area");

// Search Bar

constituencyList.innerHTML = constituencyArr
	.map(
		(match) =>
			`<div id="${match.id}" class="suggestions" onclick="show(event)">${match.id}</div>`
	)
	.join("");

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

// Hover over the constituencies

$(document).ready(() => {
	constituencyArr.forEach((c) => {
		$(c)
			.mouseover(() => {
				$(c).css("fill", "hsl(0, 100%, 100%)");
			})
			.mouseleave(() => {
				$(c).css("fill", "#17b794");
			})
			.click(() => {
				$(c).css("fill", "#b89bff");
				$("#loading-area").addClass("active");
				mpData(c);
			});
	});
});

// Tooltip

const tooltip = document.querySelector(".map-tooltip");

[].forEach.call(constituencyArr, function (item) {
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
