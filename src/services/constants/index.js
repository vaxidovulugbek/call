// import { get } from "lodash";

export const constants = {
	STATUS_START: 1,
	STATUS_END: 2,
	STATUS_NO_ANSWER: 3,
	STATUS_SELF: 4,
	STATUS_IMPORT: 5,

	TYPE_AT_WORK: 1,
	TYPE_COFFEE_BREAK: 2,
	TYPE_AT_LUNCH: 3,
	TYPE_NOT_WORKING: 4,

	CONNECTED_TRUE: 1,
	CONNECTED_FALSE: 2,

	ROLE_MANAGER: 3,
	ROLE_ADMIN: 10,
	ROLE_OPERATOR: 2,
};

constants.statuses = [
	{
		label: "Входящий",
		id: constants.STATUS_END
	},
	{
		label: "Пропущенный",
		id: constants.STATUS_NO_ANSWER
	},
	{
		label: "Исходящий",
		id: constants.STATUS_SELF
	},
	{
		label: "Импортированный",
		id: constants.STATUS_IMPORT
	}
];

constants.types = [
	{
		label: "В работе",
		id: constants.TYPE_AT_WORK
	},
	{
		label: "Кофе перемена",
		id: constants.TYPE_COFFEE_BREAK
	},
	{
		label: "Обед",
		id: constants.TYPE_AT_LUNCH
	},
	{
		label: "Не работает",
		id: constants.TYPE_NOT_WORKING
	}
]

constants.getType = (type) => constants.types.find(item => item.id === type)