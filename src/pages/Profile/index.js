import React from 'react';
import EntityForm from "modules/entity/forms";
import { Field } from 'formik';
import { Fields } from 'components';
import { useModal } from 'hooks/useModal';
import Modal from "components/Modal/Modal"
import { UpdatePassword } from 'components/Modal/components';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import actions from 'store/actions';
import { toast } from 'react-toastify';



const Profile = () => {
    const { isOpen, handleClose, handleOpen } = useModal();
    const { username, full_name, status } = useSelector(state => get(state, 'auth.user'))
    const dispatch = useDispatch()

    return (
        <>
            <EntityForm.Default
                url={'user'}
                method={"put"}
                fields={[
                    {
                        name: 'username',
                        type: 'string',
                        required: true,
                        value: username
                    },
                    {
                        name: 'full_name',
                        type: 'string',
                        required: true,
                        value: full_name || ""
                    }
                ]}
                className="caller"
                onSuccess={(data) => {
                    dispatch(actions.auth.GetMeRequest.success(data.data))
                    toast.success("Успешно!")
                }}

                onError={(error) => {
                    toast.error(error.errorData.errors.username);
                }}
                
            >
                {
                    ({ handleSubmit, values, setFieldValue }) => {
                        return (
                            <section className='main'>
                                <div className="row bg_white p-t-35 p-r-35 p-l-35 p-b-35">
                                    <div className="col-4 col-sm-4 col-md-4 col-lg-4">
                                        <label className="caller-label">
                                            <div className="caller-name">Имя пользователя</div>
                                            <Field
                                                component={Fields.TextInput}
                                                // disabled={!!formData}
                                                name="username"
                                                type="text"
                                                size="large"
                                                className="caller-control"
                                                style={{
                                                    marginBottom: "20px"
                                                }}
                                            />
                                        </label>
                                    </div>
                                    <div className="col-4 col-sm-4 col-md-4 col-lg-4">
                                        <label className="caller-label">
                                            <div className="caller-name">Полное Имя</div>
                                            <Field
                                                component={Fields.TextInput}
                                                // disabled={!!formData}
                                                name="full_name"
                                                type="text"
                                                size="large"
                                                className="caller-control"
                                                style={{
                                                    marginBottom: "20px"
                                                }}
                                            />
                                        </label>
                                    </div>
                                    <div className="col-4 col-sm-4 col-md-4 col-lg-4">
                                        <label className="caller-label">
                                            <div className="caller-name">Статус</div>
                                            <input className='caller-control' value={status === 10 ? 'Aктивный' : ''} disabled />
                                        </label>
                                    </div>

                                    <div className="col-12 operator-update-control">
                                        <button
                                            type="submit"
                                            className="modal-btn blue"
                                            onClick={() => handleSubmit()}
                                        >
                                            Сохранить
                                        </button>
                                        <button
                                            type="reset"
                                            className="modal-btn blue"
                                            data-bs-dismiss="modal"
                                            onClick={handleOpen}
                                        >
                                            Изменить пароль
                                        </button>
                                    </div>
                                </div>
                            </section>
                        )
                    }
                }
            </EntityForm.Default>
            <Modal isOpen={isOpen} size={700}
                toggle={() => { }}
                customClass="update-modal">
                <UpdatePassword handleClose={handleClose}/>
            </Modal>
        </>

    );
}

export default Profile;
