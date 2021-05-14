const constituencies = document.getElementsByTagName("path");
const constituencyArr = Array.from(constituencies);

async function mpData(entry) {
	const response = await fetch(
		`https://members-api.parliament.uk/api/Location/Constituency/Search?searchText=${entry.id}&skip=0`
	);
	const data = await response.json();
	const fullNameMP =
		data.items[0].value.currentRepresentation.member.value.nameFullTitle;
	const imageMP = await data.items[0].value.currentRepresentation.member.value
		.thumbnailUrl;
	$("#loading-area").hide();
	$("#member-pic > img").attr("src", `${imageMP}`);
	$("#member-name").text(fullNameMP);
	$("#member-area").text(entry.id);
	const mpParty = data.items[0].value.currentRepresentation.member.value.latestParty.name

	const mpPartyAbr =
		data.items[0].value.currentRepresentation.member.value.latestParty
			.abbreviation;
	if (mpPartyAbr === "Lab") {
		$("#member-info").css("background-color", "var(--labour)");
		const resLab = await fetch(`public/svg/${mpParty.replace(mpParty, "Labour")}.svg`);
		const svgLab = await resLab.text();
		$("#member-svg").html(svgLab);
	} else if (mpPartyAbr === "Con") {
		$("#member-info").css("background-color", "var(--conservative)");
		const resLab = await fetch(`public/svg/${mpParty}.svg`);
		const svgLab = await resLab.text();
		$("#member-svg").html(svgLab);
	} else if (mpPartyAbr === "LD") {
		$("#member-info").css("background-color", "var(--lib-dems)");
		const resLab = await fetch(`public/svg/Liberal-Democrat.svg`);
		const svgLab = await resLab.text();
		$("#member-svg").html(svgLab);
	} else {
		console.log("Invalid User");
	}
	console.log(data);

}

$(document).ready(() => {
	constituencyArr.forEach((c) => {
		$(c)
			.mouseover(() => {
				$(c).css("fill", "hsl(0, 100%, 100%)");
				$("#testing-area > p").text(c.id);
			})
			.mouseleave(() => {
				$(c).css("fill", "#17b794");
				$("#testing-area > p").text("Hover over a constituency");
			})
			.click(() => {
				$("#loading-area").animate({ height: "toggle" });
				mpData(c);
			});
	});
});
