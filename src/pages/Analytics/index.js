import React, { useEffect, useState } from "react";
import { Fields, Charts } from "components";
import { get, sum } from "lodash";
import { useSelector } from "react-redux";

import { api, queryBuilder, time } from "services";

import "./styles.scss";
import { ButtonExport } from "components";

const gender_categories = ["Женщины", "Мужчины"];

const Analytice = () => {
	const date = new Date();
	// const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
	// const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
	const modalTrigger = useSelector(state => get(state, "modal.refetch"));

	const [regionsStat, setRegionsStat] = useState();
	const [gendersStat, setGendersStat] = useState();
	const [agesStat, setAgesStat] = useState();
	const [sourceStat, setSourceStat] = useState();
	const [serviceStat, setServiceStat] = useState();
	const [dateRange, setDateRange] = useState(time.getThisMonth());

	useEffect(() => {
		if (!dateRange.includes(null)) {
			const extra = time.getRange(dateRange[0], dateRange[1]);

			api.request
				.get(
					queryBuilder("/statistics/region", {
						extra
					})
				)
				.then(({ data }) => {
					const chardData = [];
					const chartLabel = [];
					data.data.forEach((item, index) => {
						chardData[index] = get(item, "count", 0);
						chartLabel[index] = get(item, "name")
							? get(item, "name")
							: "";
					});
					setRegionsStat({ data: chardData, regions: chartLabel });
				});

			api.request
				.get(
					queryBuilder("/statistics/gender", {
						extra
					})
				)
				.then(({ data }) => {
					let chartData = Array(2).fill(0);
					data.data.forEach((item, index) => {
						const count = get(item, "count", 0);
						if (get(item, "gender") === 1) chartData[1] = count;
						else chartData[0] = count;
					});
					const totalSum = sum(chartData);
					setGendersStat(
						totalSum
							? chartData.map(item =>
									Math.round((item / totalSum) * 100)
							  )
							: [0, 0]
					);
				});

			api.request
				.get(
					queryBuilder("/statistics/age", {
						extra
					})
				)
				.then(({ data }) => {
					const values = Object.values(data);
					const totalSum = sum(values);
					setAgesStat({
						labels: Object.keys(data),
						data: values.map(item =>
							totalSum !== 0
								? Math.round((item * 100) / totalSum)
								: 0
						)
					});
				});

			api.request
				.get(
					queryBuilder("/statistics/source", {
						extra
					})
				)
				.then(({ data }) => {
					const chardData = [];
					const chartLabel = [];
					data.data.forEach((item, index) => {
						chardData[index] = get(item, "count", 0);
						chartLabel[index] = get(item, "name")
							? get(item, "name")
							: "";
					});
					setSourceStat({ data: chardData, regions: chartLabel });
				});

			api.request
				.get(
					queryBuilder("/statistics/service", {
						extra
					})
				)
				.then(({ data }) => {
					const chardData = [];
					const chartLabel = [];
					data.data.forEach((item, index) => {
						chardData[index] = get(item, "count", 0);
						chartLabel[index] = get(item, "name")
							? get(item, "name")
							: "";
					});
					setServiceStat({ data: chardData, regions: chartLabel });
				});
		}
	}, [dateRange, modalTrigger]);

	return (
		<section className="analytics main sec-padding">
			<form className="main-form" action="#!">
				<div className="main-calendar">
					<div className="main-date">
						<Fields.RangeDatePicker
							{...{
								dateRange,
								setDateRange
							}}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-8 col-xxl-8">
						<div className="main-card">
							<div className="main-top flex-main">
								<div className="main-title">
									История Клиентов
								</div>
								<label className="input__wrapper select__wrapper" />

								<ButtonExport
									range={time.getRange(
										dateRange[0],
										dateRange[1]
									)}
									url="export/region"
								/>
							</div>
							<div
								className="main-bottom"
								style={{ overflowX: "visible" }}>
								<div className="chartWrapper">
									{regionsStat && (
										<Charts.BarChart
											data={regionsStat.data}
											regions={regionsStat.regions}
										/>
									)}
								</div>
							</div>
						</div>
						<div className="grid-charts">
							<div className="main-card">
								<div className="main-top flex-main">
									<div className="main-title">Источник</div>
									<ButtonExport
										range={time.getRange(
											dateRange[0],
											dateRange[1]
										)}
										url="export/source"
									/>
								</div>
								<div className="main-bottom">
									{sourceStat && (
										<Charts.BarChart
											data={sourceStat.data}
											regions={sourceStat.regions}
										/>
									)}
								</div>
							</div>
							<div className="main-card">
								<div className="main-top flex-main">
									<div className="main-title">Услуги</div>
									<ButtonExport
										range={time.getRange(
											dateRange[0],
											dateRange[1]
										)}
										url="export/service"
									/>
								</div>
								<div className="main-bottom">
									{serviceStat && (
										<Charts.BarChart
											data={serviceStat.data}
											regions={serviceStat.regions}
										/>
									)}
								</div>
							</div>
						</div>
					</div>
					<div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
						<div className="main-card">
							<div className="main-top flex-main">
								<div className="main-title">
									История Звонков
								</div>
								<ButtonExport
									range={time.getRange(
										dateRange[0],
										dateRange[1]
									)}
									url="export/call-history"
								/>
							</div>
							<div className="main-bottom bottom">
								<div className="main-content">
									<div className="chartWrapper2">
										{gendersStat && (
											<Charts.Donut
												categories={gender_categories}
												values={gendersStat}
											/>
										)}
									</div>
								</div>
								<div className="main-content">
									<div className="chartWrapper2">
										{agesStat && (
											<Charts.Donut
												categories={agesStat.labels}
												values={agesStat.data}
											/>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</section>
	);
};

export default Analytice;
