import React, { useEffect, useState } from "react";
import { get } from "lodash";
import { useDispatch, useSelector } from "react-redux";


import { Tables, Modal, Fields } from "components";
import EntityForm from "modules/entity/forms";
import EntityContainer from "modules/entity/containers";
import { LoadMoreVisible } from "components";
import { useModal } from "hooks/useModal";
import { Field } from "formik";
import { toast } from "react-toastify";
import Actions from "modules/entity/actions";

const OperatorNumber = () => {
	const dispatch = useDispatch();
	const [isUpdate, setIsUpdate] = useState(false);
	const [formData, setFormData] = useState();

	const { isOpen, handleOpen, handleClose } = useModal({
		onClose: () => {
			setIsUpdate(false);
			setFormData(null);
		}
	});
	const modalTrigger = useSelector(state => get(state, "modal.refetch"));
	const [appendData, setAppendData] = useState(true);


	// const handleSubmit = (values = {}) => {
	// 	const filterObj = {};
	// 	Object.keys(values).forEach(key => {
	// 		if (typeof values[key] === "object") filterObj[key] = values[key].id;
	// 		else filterObj[key] = values[key];
	// 	});
	//
	// };


	const fetchOp = (id) => {
		dispatch(
			Actions.Form.request({
				entity: "organization-number",
				name: "view",
				url: `/organization-number/${id}`,
				method: "get",
				cb: {
					success: data => {
						setFormData(get(data, "data"));
					},
					error: err => {
						setFormData(null);
						toast.error("Что то пошло не так");
					},
					finally: () => {
					}

				}
			})
		);
	};

	const deleteOp = (id) => {
		dispatch(
			Actions.Form.request({
				method: "delete",
				entity: "organization-number",
				name: "organization-number",
				id: id,
				url: `/organization-number/${id}`,
				deleteData: true,
				primaryKey: "id",
				cb: {
					success: () => {
						toast.success("Успешно удалено");
					},
					error: error => {
						toast.error("Что-то пошло не так")
					},
					finally: () => {
					}
				}
			})
		);
	};

	useEffect(() => {
		setPage(1);
		setAppendData(false);
	}, [modalTrigger]);


	const [page, setPage] = useState(1);


	return (
		<>
			<Modal isOpen={isOpen} size="500" toggle={() => {
			}} customClass="operator-phone">
				<div className="modal-wrapper">
					<div className="modal-header">
						<h5 className="modal-title" id="exampleModalLabel">
							Добавить Телефон организации
						</h5>
					</div>
					<div className="modal-body">
						<EntityForm.Main
							entity="organization-number"
							name="organization-number/list"
							url={isUpdate ? `/organization-number/${isUpdate}` : "/organization-number"}
							method={isUpdate ? "put" : "post"}
							fields={[
								{
									name: "name",
									type: "string",
									value: get(formData, "name", ""),
									required: true

								},
								{
									name: "number",
									type: "string",
									value: get(formData, "number", ""),
									required: true
								}
							]}
							className="caller"
							onSuccess={() => {
								handleClose();
								toast.success("Успешно обновлен!");
							}}
							onError={() => toast.error("Что то пошло не так")}

						>
							{() => <div className="row">
								<div className="col-12">
									<Field
										name="name"
										component={Fields.TextInput}
										type="text"
										size="large"
										label="Имя"
										className="caller-control mb-30"
									/>
									<Field
										name="number"
										component={Fields.MaskInput}
										type="text"
										mask="999999999"
										size="large"
										className="caller-control"
									/>

									<div className="modal-footer update">
										<button type="submit" className="modal-btn blue">Сохранить</button>
										<button type="reset" className="modal-btn red"
												onClick={handleClose}>Отменить
										</button>
									</div>
								</div>

							</div>}
						</EntityForm.Main>
					</div>
				</div>
			</Modal>
			<section className="main look customer sec-padding">
				<div className="main-form" onSubmit={(e) => e.preventDefault()}>
					<div className="main-date" />
					<div className="row">
						<div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
							<div className="main-card">
								<div className="main-top">
									<div className="flex-main">
										<div className="main-title">Телефоны Организации</div>
										<button className="modal-btn blue" onClick={handleOpen}>Создать</button>
									</div>

								</div>
								<div className="main-bottom">
									<div className="table">
										<EntityContainer.All
											entity="organization-number"
											name="organization-number"
											url="/organization-number"
											primaryKey="id"
											params={{
												modalTrigger
											}}
											metaKey={(data) => {
												return get(data, "meta");
											}}
											appendData={appendData}
										>
											{({ items, meta, isFetched }) => {
												return (
													<>
														<Tables.OperatorNumberTable tableData={items}
																					onEdit={(item) => {
																						fetchOp(get(item, "id"));
																						setIsUpdate(get(item, "id"));
																						handleOpen();
																					}}
																					onDelete={(item) => {
																						deleteOp(get(item, "id"));
																					}}
														/>
														{isFetched && (get(meta, "currentPage") < get(meta, "pageCount")) && (
															<LoadMoreVisible setPage={() => {
																setAppendData(true);
																setPage(page + 1);
															}} />
														)}
													</>

												);
											}}
										</EntityContainer.All>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default OperatorNumber;
