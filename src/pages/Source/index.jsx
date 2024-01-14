import React, { useEffect, useState } from "react";
import { get } from "lodash";
import { useDispatch, useSelector } from "react-redux";

import { Modal, Fields, AppTable } from "components";
import EntityForm from "modules/entity/forms";
import EntityContainer from "modules/entity/containers";
import { LoadMoreVisible } from "components";
import { useModal } from "hooks/useModal";
import { Field } from "formik";
import { toast } from "react-toastify";
import Actions from "modules/entity/actions";

const Source = () => {
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

	const fetchOp = id => {
		dispatch(
			Actions.Form.request({
				entity: "source",
				name: "view",
				url: `/source/${id}`,
				method: "get",
				cb: {
					success: data => {
						setFormData(get(data, "data"));
					},
					error: err => {
						setFormData(null);
						toast.error("Что то пошло не так");
					},
					finally: () => {}
				}
			})
		);
	};

	const deleteOp = id => {
		dispatch(
			Actions.Form.request({
				method: "delete",
				entity: "source",
				name: "source",
				id: id,
				url: `/source/${id}`,
				deleteData: true,
				primaryKey: "id",
				cb: {
					success: () => {
						toast.success("Успешно удалено");
					},
					error: error => {
						toast.error("Что-то пошло не так");
					},
					finally: () => {}
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
			<Modal
				isOpen={isOpen}
				size="500"
				toggle={() => {}}
				customClass="operator-phone">
				<div className="modal-wrapper">
					<div className="modal-header">
						<h5 className="modal-title" id="exampleModalLabel">
							Добавить Источник
						</h5>
					</div>
					<div className="modal-body">
						<EntityForm.Main
							entity="source"
							name="source/list"
							url={isUpdate ? `/source/${isUpdate}` : "/source"}
							method={isUpdate ? "put" : "post"}
							fields={[
								{
									name: "name",
									type: "object",
									value: get(formData, "name", {}),
									required: true
								}
							]}
							className="caller"
							onSuccess={() => {
								handleClose();
								toast.success("Успешно обновлен!");
							}}
							onError={() => toast.error("Что то пошло не так")}>
							{() => (
								<div className="row">
									<div className="col-12">
										<Field
											name="name.uz"
											component={Fields.TextInput}
											type="text"
											size="large"
											placeholder="Наименование"
											className="caller-control mb-30"
										/>

										<div className="modal-footer update">
											<button
												type="submit"
												className="modal-btn blue">
												Сохранить
											</button>
											<button
												type="reset"
												className="modal-btn red"
												onClick={handleClose}>
												Отменить
											</button>
										</div>
									</div>
								</div>
							)}
						</EntityForm.Main>
					</div>
				</div>
			</Modal>

			<section className="main look customer sec-padding">
				<div className="main-form" onSubmit={e => e.preventDefault()}>
					<div className="main-date" />
					<div className="row">
						<div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
							<div className="main-card">
								<div className="main-top">
									<div className="flex-main">
										<div className="main-title">
											Источники
										</div>
										<button
											className="modal-btn blue"
											onClick={handleOpen}>
											Создать
										</button>
									</div>
								</div>
								<div className="main-bottom">
									<div className="table">
										<EntityContainer.All
											entity="source"
											name="source"
											url="/source"
											primaryKey="id"
											params={{
												modalTrigger
											}}
											metaKey={data => {
												return get(data, "meta");
											}}
											appendData={appendData}>
											{({ items, meta, isFetched }) => {
												return (
													<>
														<AppTable
															columns={[
																{
																	title: "ID",
																	dataKey:
																		"id",
																	render: value =>
																		value
																},
																{
																	title:
																		"Наименование",
																	dataKey:
																		"name",
																	render: value =>
																		get(
																			value,
																			"uz"
																		)
																}
															]}
															items={items}
															editAction={item => {
																fetchOp(
																	get(
																		item,
																		"id"
																	)
																);
																setIsUpdate(
																	get(
																		item,
																		"id"
																	)
																);
																handleOpen();
															}}
															deleteAction={item => {
																deleteOp(
																	get(
																		item,
																		"id"
																	)
																);
															}}
														/>

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
																	setPage={() => {
																		setAppendData(
																			true
																		);
																		setPage(
																			page +
																				1
																		);
																	}}
																/>
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

export default Source;
