import get from "lodash/get";
import truncate from "lodash/truncate";

const isEnableLang = (lang) => {

	switch (lang) {
		case 'oz':
			return true;
		case 'uz':
			return true;
		default:
			return false;
	}
};

export const genderOptions = [
	{ value: 1, label: "Мужчина" },
	{ value: 2, label: "Женщина" },
]

export const typeOptions = [
	{ value: 1, label: "Информация1" },
	{ value: 2, label: "Информация2" },
	{ value: 3, label: "Информация3" },
]

export const channelOptions = [
	{ value: 1, label: "Facebook1" },
	{ value: 2, label: "Facebook2" },
	{ value: 3, label: "Facebook3" },
]

export const statusOptions = [
	{ id: null, label: "Все" },
	{ id: 2, label: "Входящий" },
	{ id: 4, label: "Исходящий" },
	{ id: 3, label: "Пропущенный" },
]

export const gnidaOptions = [
	{ value: 1, label: "Да1" },
	{ value: 2, label: "Да3" },
	{ value: 3, label: "Да3" },
]



const generateNewPath = (langCode, item, key = "slug") => {

	let newPath = "";

	const pathname = window.location.pathname;
	const splitPath = pathname.split("/");

	let _l = get(item, "translations", []).find(i => i.lang === langCode);
	let hasL = isEnableLang(splitPath[1]);

	if (item) {
		if (_l) {
			let beingArr = ["", langCode];
			let arr = [];
			if (hasL) {
				arr = [...beingArr, splitPath[2], _l[key]];
			} else {
				arr = [...beingArr, splitPath[1], _l[key]];
			}
			newPath = arr.join('/');
		} else {
			let beingArr = ["", langCode];
			newPath = beingArr.join('/');
		}
	}

	if (!item) {
		if (isEnableLang(splitPath[1])) {
			splitPath[1] = langCode;

			newPath = splitPath.join('/');
		} else {
			let beingArr = ["", langCode];
			let arr = [...beingArr, ...splitPath.slice(1)];

			newPath = arr.join('/');
		}
	}

	return newPath;
};


const cutStringText = (word, length, last) => {
	if (typeof word === 'string') {
		return truncate(
			word, {
			'length': length,
			'omission': last ? last : '...'
		}
		);
	} else {
		return null
	}
}


const formatDate = (date, format) => {
	let dt = new Date(date);
	let month = ("00" + (dt.getMonth() + 1)).slice(-2);
	let day = ("00" + dt.getDate()).slice(-2);
	let year = dt.getFullYear();
	let hours = ("00" + dt.getHours()).slice(-2);
	let minutes = ("00" + dt.getMinutes()).slice(-2);
	let seconds = ("00" + dt.getSeconds()).slice(-2);

	switch (format) {
		case "DD-MM-YYYY":
			return day + '-' + month + '-' + year;
		case "DD.MM.YYYY / HH:mm:ss":
			return day + '.' + month + '.' + year + ' / ' + hours + ':' + minutes + ':' + seconds;
		default:
			return day + '.' + month + '.' + year
	}
};

const RandomColors = ["#FFF3C9", "#C5FFDF", "#FFDBBA", "#FFC8E2", "#F1DEFF", "#CEF6FF", "#FFF3C9", "#C5FFDF", "#FFDBBA", "#FFC8E2"]

const PostTypes = [
	{ value: 1, title: "Янгилик" },
	{ value: 2, title: "Билиш зарур" },
	{ value: 3, title: "Юртни кумсаб" },
	{ value: 4, title: "Муваффаккият сирлари" },
	{ value: 5, title: "Қонунчилик" },
]

const stringToCode = (element) => {
	const content = element.textContent;

	function toNode(iframeString) {
		const div = document.createElement("div");
		div.innerHTML = iframeString;
		return div;
	}
	const parent = element.parentNode;
	const childOembed = parent.querySelector("code");
	childOembed.replaceWith(toNode(content));
};

const regions = [
	"Toshkent", "Buxoro", "Andijon", "Navoiy",
	"Farg'ona", "Jizzax", "Xorazm", "Namangan",
	"Qashqadaryo", "Qoraqalpog'iston", "Samarqand",
	"Sirdaryo", "Surxondaryo"
]



function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function animateValue(obj, start, end, duration) {
	let startTimestamp = null;
	const step = (timestamp) => {
		if (!startTimestamp) startTimestamp = timestamp;
		const progress = Math.min((timestamp - startTimestamp) / duration, 1);
		obj.innerHTML = Math.floor(progress * (end - start) + start);
		if (progress < 1) {
			window.requestAnimationFrame(step);
		}
	};
	window.requestAnimationFrame(step);
}

const formatSeconds = (seconds) => {
	if(!seconds) return 0;

	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds - hours * 3600) / 60);
	const extraSeconds = seconds % 60;

	return hours ? `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(extraSeconds)}` : `${formatTime(minutes)}:${formatTime(extraSeconds)}`
}

const formatTime = (time) => {
	if(time > 9) return time;
	else if(time <= 0) return "00";
	return `0${time}`
}

export default {
	isEnableLang,
	generateNewPath,
	cutStringText,
	formatDate,
	RandomColors,
	PostTypes,
	stringToCode,
	regions,
	numberWithCommas,
	animateValue,
	formatSeconds
}
