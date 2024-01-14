import { get } from "lodash";
// import React, { useEffect, useState, forwardRef } from "react";
import React, { useEffect, useState } from "react";
import EntityForm from "modules/entity/forms";
import Form from "modules/entity/actions";
import { constants, time } from "services";
import { useModal } from "hooks/useModal";

import Spinner from "components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { CallHistory, ModalForm } from "./components";
import EntityContainer from "modules/entity/containers";
import { LoadMoreVisible } from "components";
import ModalActions from "store/actions/modal";
import Modal from "components/Modal";
import { toast } from "react-toastify";
import { genderOptions } from "services/helpers";

const NewModal = () => {
	const dispatch = useDispatch();
	const [formData, setFormData] = useState(null);
	const [regionId, setRegionId] = useState();
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const operator_id = useSelector(state => state.auth.user.id);
	const { isOpen, handleOpen, handleClose } = useModal({
		onClose: () => {
			setFormData(null);
		}
	});

	const [data, setData] = useState();

	window.handleOpen = data => {
		handleOpen();
		setData(data);
	};

	function loadMore(e, meta, isFetched) {
		const items = e.target.getElementsByClassName("history-items");
		const last = items[items.length - 1];
		const is_bottom =
			e.target.getBoundingClientRect().bottom + 100 >=
			last.getBoundingClientRect().bottom;
		if (
			is_bottom &&
			get(meta, "currentPage") < get(meta, "pageCount") &&
			isFetched
		) {
			setPage(page + 1);
		}
	}

	useEffect(() => {
		setLoading(true);
		get(data, "phone", "")
			? fetchUser(get(data, "phone", ""))
			: setLoading(false);
		// }
	}, [data]);

	const fetchUser = phone => {
		dispatch(
			Form.FormDefault.request({
				url: "customer/search",
				method: "get",
				params: {
					extra: {
						phone
					},
					include: "region,district,source"
				},
				cb: {
					success: data => {
						setFormData(get(data, "data"));
						setRegionId(get(data.data, "region.id"));
					},
					error: err => {
						setFormData(null);
					},
					finally: () => {
						setLoading(false);
					}
				}
			})
		);
	};

	return (
		<Modal isOpen={isOpen} toggle={() => {}} size={1190}>
			{loading ? (
				<Spinner id="modal-loader" />
			) : (
				<div className="modal-wrapper">
					<div className="modal-header">
						<h5 className="modal-title" id="exampleModalLabel">
							Добавить Историю
						</h5>
					</div>
					<div className="modal-body">
						<div className="row">
							<div className="col-lg-7 col-12">
								<EntityForm.Main
									entity="patientData"
									name="patientData"
									url={`/call-history`}
									method="post"
									fields={FormFields(
										data,
										formData,
										operator_id
									)}
									className="caller"
									onSuccess={(
										responseData,
										formValues,
										resetForm
									) => {
										dispatch(ModalActions.success());
										handleClose();
										resetForm();
										toast.success("Успешно!");
									}}>
									{({
										handleSubmit,
										values,
										errors,
										setFieldValue,
										handleReset
									}) => {
										return (
											<ModalForm
												{...{
													values,
													setFieldValue,
													formData,
													fetchUser,
													handleSubmit,
													handleClose,
													handleReset,
													regionId,
													setRegionId
												}}
											/>
										);
									}}
								</EntityForm.Main>
							</div>
							<div className="col-lg-5 col-12">
								<div className="main-card caller-shadow">
									<div className="caller-title">
										Последние звонки
									</div>
									<div className="main-bottom caller-border">
										{formData && (
											<EntityContainer.All
												entity="customerCallHistory"
												name="customerCallHistory"
												url={`/customer/${get(
													formData,
													"id"
												)}/history`}
												params={{
													limit: 10,
													page,
													filter: {
														status: [
															constants.STATUS_END,
															constants.STATUS_SELF
														]
													}
												}}
												metaKey={data => {
													return get(data, "meta");
												}}
												appendData={true}
												onSuccess={() => {
													dispatch({
														type: "open",
														payload: {}
													});
												}}>
												{({
													items,
													isFetched,
													meta
												}) => (
													<>
														<div
															className="history"
															onScroll={e =>
																loadMore(
																	e,
																	meta,
																	isFetched,
																	true
																)
															}>
															{(items || []).map(
																(h, i) => (
																	<CallHistory
																		key={
																			h.id
																		}
																		history={
																			h
																		}
																		status={
																			h.status
																		}
																		loadMore={
																			loadMore
																		}
																	/>
																)
															)}

															{isFetched &&
																get(
																	meta,
																	"currentPage"
																) <
																	get(
																		meta,
																		"pageCount"
																	) && (
																	<LoadMoreVisible
																		setPage={() =>
																			setPage(
																				page +
																					1
																			)
																		}
																	/>
																)}
														</div>
													</>
												)}
											</EntityContainer.All>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</Modal>
	);
};

export default NewModal;

const FormFields = (data, formData, operator_id) => {
	return [
		{
			name: "name",
			type: "string",
			value: get(formData, "name", "")
		},
		{
			name: "phone",
			type: "string",
			value: get(data, "phone", "")
		},
		{
			name: "birthdate",
			type: "string",
			value: time.to(get(formData, "birthdate")),
			onSubmitValue: value => {
				return time.customTimeStamp(value);
			}
			// required: true
		},
		{
			name: "district_id",
			type: "object",
			value: get(formData, "district"),
			onSubmitValue: value => get(value, "id", "")
		},
		{
			name: "region_id",
			type: "object",
			value: get(formData, "region"),
			onSubmitValue: value => get(value, "id", "")
		},
		{
			name: "source_id",
			type: "object",
			value: get(formData, "source"),
			onSubmitValue: value => get(value, "id", "")
		},
		{
			name: "service_ids",
			type: "array",
			value: get(formData, "service", []),
			onSubmitValue: value => value.map(item => get(item, "id", ""))
		},
		{
			name: "operator_id",
			value: operator_id
			// required: true
		},
		{
			name: "gender",
			value: genderOptions.find(
				item => item.value === get(formData, "gender", "")
			),
			onSubmitValue: option => option.value
			// required: true
		},
		{
			name: "comment",
			type: "string"
		},
		{
			name: "call_history_id",
			value: get(data, "call_history_id", "")
		},
		{
			name: "customer_id",
			value: get(formData, "id", "")
		}
	];
};
